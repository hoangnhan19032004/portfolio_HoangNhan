export type VisitorQuestion = {
  id: string;
  visitor_token?: string;
  visitor_name: string;
  visitor_email: string;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  created_at: string;
  answered_at: string | null;
};

type SupabaseQuestion = Omit<VisitorQuestion, "visitor_token"> & {
  visitor_token: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are missing");
  return { url: url.replace(/\/$/, ""), key };
}

function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = getSupabaseConfig();
  return fetch(`${url}/rest/v1/visitor_questions${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function listQuestions() {
  const response = await supabaseRequest("?select=*&order=created_at.desc");
  if (!response.ok) throw new Error(`Supabase list failed: ${response.status}`);
  return (await response.json()) as SupabaseQuestion[];
}

export async function addQuestion(input: Pick<VisitorQuestion, "visitor_name" | "visitor_email" | "question">) {
  const question: VisitorQuestion = {
    id: crypto.randomUUID(),
    visitor_token: crypto.randomUUID(),
    ...input,
    answer: null,
    status: "pending",
    created_at: new Date().toISOString(),
    answered_at: null,
  };
  const response = await supabaseRequest("", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(question),
  });
  if (!response.ok) throw new Error(`Supabase insert failed: ${response.status}`);
  const [savedQuestion] = (await response.json()) as SupabaseQuestion[];
  return savedQuestion;
}

export async function answerQuestion(id: string, answer: string) {
  const response = await supabaseRequest(`?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ answer, status: "answered", answered_at: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error(`Supabase update failed: ${response.status}`);
  const [question] = (await response.json()) as SupabaseQuestion[];
  return question || null;
}