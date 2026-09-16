export type VisitorQuestion = {
  id: string;
  visitor_token?: string;
  visitor_name: string;
  visitor_email: string;
  visitor_ip?: string | null;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  created_at: string;
  answered_at: string | null;
  messages?: ChatMessage[];
};

export type ChatMessage = {
  role: "user" | "assistant" | "admin";
  content: string;
  created_at: string;
};

type SupabaseQuestion = Omit<VisitorQuestion, "visitor_token"> & {
  visitor_token: string;
};

function getSupabaseConfig() {
  const configuredUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configuredUrl || !key) throw new Error("SUPABASE_CONFIG_MISSING");

  let url: URL;
  try {
    url = new URL(configuredUrl.trim());
  } catch {
    throw new Error("SUPABASE_URL_INVALID");
  }

  if (!url.hostname.endsWith(".supabase.co")) throw new Error("SUPABASE_URL_INVALID");
  url.pathname = "";
  return { url: url.toString().replace(/\/$/, ""), key: key.trim() };
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = getSupabaseConfig();
  try {
    return await fetch(`${url}/rest/v1/visitor_questions${path}`, {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
  } catch {
    throw new Error("SUPABASE_CONNECTION_FAILED");
  }
}

export async function listQuestions() {
  const response = await supabaseRequest("?select=*&order=created_at.desc");
  if (!response.ok) throw new Error(`SUPABASE_HTTP_${response.status}`);
  return (await response.json()) as SupabaseQuestion[];
}

export async function startChat(input: Pick<VisitorQuestion, "visitor_name" | "visitor_email"> & { visitor_ip?: string }) {
  const question: VisitorQuestion = {
    id: crypto.randomUUID(),
    visitor_token: crypto.randomUUID(),
    ...input,
    question: "Phiên chat bắt đầu",
    answer: null,
    status: "pending",
    created_at: new Date().toISOString(),
    answered_at: null,
    messages: [],
  };
  const response = await supabaseRequest("", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(question),
  });
  if (!response.ok) throw new Error(`SUPABASE_HTTP_${response.status}`);
  const [savedQuestion] = (await response.json()) as SupabaseQuestion[];
  return savedQuestion;
}

export async function appendChatMessage(id: string, token: string, message: Omit<ChatMessage, "created_at">) {
  const response = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}&select=*`);
  if (!response.ok) throw new Error(`SUPABASE_HTTP_${response.status}`);
  const [question] = (await response.json()) as SupabaseQuestion[];
  if (!question) return null;

  const messages = [...(question.messages || []), { ...message, created_at: new Date().toISOString() }];
  const updateResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&visitor_token=eq.${encodeURIComponent(token)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ messages, question: messages.find((item) => item.role === "user")?.content || question.question }),
  });
  if (!updateResponse.ok) throw new Error(`SUPABASE_HTTP_${updateResponse.status}`);
  const [updated] = (await updateResponse.json()) as SupabaseQuestion[];
  return updated || null;
}

export async function answerQuestion(id: string, answer: string) {
  const currentResponse = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}&select=*`);
  if (!currentResponse.ok) throw new Error(`SUPABASE_HTTP_${currentResponse.status}`);
  const [current] = (await currentResponse.json()) as SupabaseQuestion[];
  if (!current) return null;
  const messages = [...(current.messages || []), { role: "admin" as const, content: answer, created_at: new Date().toISOString() }];
  const response = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ answer, status: "answered", answered_at: new Date().toISOString(), messages }),
  });
  if (!response.ok) throw new Error(`SUPABASE_HTTP_${response.status}`);
  const [question] = (await response.json()) as SupabaseQuestion[];
  return question || null;
}