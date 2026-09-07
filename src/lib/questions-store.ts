import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "visitor-questions.json");

async function readQuestions(): Promise<VisitorQuestion[]> {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as VisitorQuestion[];
  } catch {
    return [];
  }
}

async function writeQuestions(questions: VisitorQuestion[]) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(questions, null, 2), "utf8");
}

export async function listQuestions() {
  return (await readQuestions()).sort((first, second) => second.created_at.localeCompare(first.created_at));
}

export async function addQuestion(input: Pick<VisitorQuestion, "visitor_name" | "visitor_email" | "question">) {
  const questions = await readQuestions();
  const question: VisitorQuestion = {
    id: crypto.randomUUID(),
    visitor_token: crypto.randomUUID(),
    ...input,
    answer: null,
    status: "pending",
    created_at: new Date().toISOString(),
    answered_at: null,
  };
  await writeQuestions([...questions, question]);
  return question;
}

export async function answerQuestion(id: string, answer: string) {
  const questions = await readQuestions();
  const question = questions.find((item) => item.id === id);
  if (!question) return null;

  question.answer = answer;
  question.status = "answered";
  question.answered_at = new Date().toISOString();
  await writeQuestions(questions);
  return question;
}