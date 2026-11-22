export type VisitorQuestion = {
  id: string;
  visitor_token?: string;
  visitor_name: string;
  visitor_email: string;
  visitor_ip?: string | null;
  question: string;
  answer: string | null;
  status: "pending" | "answered" | "closed";
  created_at: string;
  last_activity_at: string;
  answered_at: string | null;
  messages?: ChatMessage[];
};

export type ChatMessage = {
  role: "user" | "assistant" | "admin" | "system";
  content: string;
  created_at: string;
};

type SupabaseQuestion = Omit<VisitorQuestion, "visitor_token"> & {
  visitor_token: string;
};

function getSupabaseConfig() {
  const configuredUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configuredUrl || !key) throw new Error("SUPABASE_CONFIG_MISSING");
  if (key.trim().startsWith("sb_publishable_")) throw new Error("SUPABASE_SECRET_KEY_INVALID");

  let url: URL;
  try {
    url = new URL(configuredUrl.trim());
  } catch {
    throw new Error("SUPABASE_URL_INVALID");
  }

  if (!url.hostname.endsWith(".supabase.co")) throw new Error("SUPABASE_URL_INVALID");
  url.pathname = "";
  const normalizedKey = key.trim();
  return {
    url: url.toString().replace(/\/$/, ""),
    key: normalizedKey,
    isSecretKey: normalizedKey.startsWith("sb_secret_"),
  };
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key, isSecretKey } = getSupabaseConfig();
  try {
    const headers = new Headers(init.headers);
    headers.set("apikey", key);
    headers.set("Content-Type", "application/json");
    if (isSecretKey) {
      headers.delete("Authorization");
    } else {
      headers.set("Authorization", `Bearer ${key}`);
    }

    return await fetch(`${url}/rest/v1/visitor_questions${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error("SUPABASE_CONNECTION_FAILED");
  }
}

async function supabaseError(response: Response) {
  let diagnostic = "";
  try {
    const body = await response.clone().json() as { code?: unknown; message?: unknown };
    const code = typeof body.code === "string" ? body.code : "";
    const message = typeof body.message === "string" ? body.message.replace(/\s+/g, " ").slice(0, 240) : "";
    diagnostic = [code, message].filter(Boolean).join(": ");
  } catch {
  }
  return `SUPABASE_HTTP_${response.status}${diagnostic ? `|${diagnostic}` : ""}`;
}

export async function listQuestions() {
  const response = await supabaseRequest("?select=*&order=created_at.desc");
  if (!response.ok) throw new Error(await supabaseError(response));
  return (await response.json()) as SupabaseQuestion[];
}

export async function startChat(input: Pick<VisitorQuestion, "visitor_name" | "visitor_email"> & { visitor_ip?: string }) {
  const createdAt = new Date().toISOString();
  const question: VisitorQuestion = {
    id: crypto.randomUUID(),
    visitor_token: crypto.randomUUID(),
    ...input,
    question: "Phiên chat bắt đầu",
    answer: null,
    status: "pending",
    created_at: createdAt,
    last_activity_at: createdAt,
    answered_at: null,
    messages: [],
  };
  const response = await supabaseRequest("", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(question),
  });
  if (!response.ok) throw new Error(await supabaseError(response));
  const [savedQuestion] = (await response.json()) as SupabaseQuestion[];
  return savedQuestion;
}

export async function appendChatMessage(id: string, token: string, message: Omit<ChatMessage, "created_at">) {
  const response = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&select=*`);
  if (!response.ok) throw new Error(await supabaseError(response));
  const [question] = (await response.json()) as SupabaseQuestion[];
  if (!question || question.status === "closed") return null;

  const createdAt = new Date().toISOString();
  const messages = [...(question.messages || []), { ...message, created_at: createdAt }];
  const updateResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&status=neq.closed`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      messages,
      question: messages.find((item) => item.role === "user")?.content || question.question,
      last_activity_at: createdAt,
    }),
  });
  if (!updateResponse.ok) throw new Error(await supabaseError(updateResponse));
  const [updated] = (await updateResponse.json()) as SupabaseQuestion[];
  return updated || null;
}

export async function appendInactivityWarning(id: string, token: string, lastUserAt: number, content: string) {
  const currentResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&select=*`);
  if (!currentResponse.ok) throw new Error(await supabaseError(currentResponse));
  const [current] = (await currentResponse.json()) as SupabaseQuestion[];
  if (!current || current.status === "closed") return null;

  const messages = current.messages || [];
  let lastUserIndex = -1;
  for (let index = 0; index < messages.length; index += 1) {
    if (messages[index].role === "user") lastUserIndex = index;
  }
  const lastUserMessage = messages[lastUserIndex];
  if (
    !lastUserMessage
    || Date.parse(lastUserMessage.created_at) !== lastUserAt
    || Date.now() - lastUserAt < 60_000
  ) {
    return { question: current, added: false };
  }

  const existingWarning = messages.slice(lastUserIndex + 1).some((message) => message.role === "system");
  if (existingWarning) return { question: current, added: false };

  const createdAt = new Date().toISOString();
  const updatedMessages = [...messages, { role: "system" as const, content, created_at: createdAt }];
  const response = await supabaseRequest(
    `?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&status=neq.closed&last_activity_at=eq.${encodeURIComponent(current.last_activity_at)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ messages: updatedMessages, last_activity_at: createdAt }),
    },
  );
  if (!response.ok) throw new Error(await supabaseError(response));
  const [updated] = (await response.json()) as SupabaseQuestion[];
  return { question: updated || current, added: Boolean(updated) };
}

export async function closeChat(id: string, token: string, warningAt: number) {
  const currentResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&select=*`);
  if (!currentResponse.ok) throw new Error(await supabaseError(currentResponse));
  const [current] = (await currentResponse.json()) as SupabaseQuestion[];
  if (!current) return null;
  if (current.status === "closed") return { question: current, closed: true };

  const messages = current.messages || [];
  let lastUserIndex = -1;
  let matchingWarningIndex = -1;
  for (let index = 0; index < messages.length; index += 1) {
    if (messages[index].role === "user") lastUserIndex = index;
    if (messages[index].role === "system" && Date.parse(messages[index].created_at) === warningAt) {
      matchingWarningIndex = index;
    }
  }
  if (
    lastUserIndex < 0
    || matchingWarningIndex <= lastUserIndex
    || Date.now() - warningAt < 180_000
  ) {
    return { question: current, closed: false };
  }

  const response = await supabaseRequest(
    `?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&status=neq.closed&last_activity_at=eq.${encodeURIComponent(current.last_activity_at)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status: "closed" }),
    },
  );
  if (!response.ok) throw new Error(await supabaseError(response));
  const [closedQuestion] = (await response.json()) as SupabaseQuestion[];
  return { question: closedQuestion || current, closed: Boolean(closedQuestion) };
}

export async function answerQuestion(id: string, answer: string) {
  const currentResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&select=*`);
  if (!currentResponse.ok) throw new Error(await supabaseError(currentResponse));
  const [current] = (await currentResponse.json()) as SupabaseQuestion[];
  if (!current) return null;
  if (current.status === "closed") return null;
  const answeredAt = new Date().toISOString();
  const messages = [...(current.messages || []), { role: "admin" as const, content: answer, created_at: answeredAt }];
  const response = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ answer, status: "answered", answered_at: answeredAt, last_activity_at: answeredAt, messages }),
  });
  if (!response.ok) throw new Error(await supabaseError(response));
  const [question] = (await response.json()) as SupabaseQuestion[];
  return question || null;
}