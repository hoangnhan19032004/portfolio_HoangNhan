import { NextResponse } from "next/server";
import { isAdminRequest, sendEmail } from "@/lib/server";
import { addQuestion, answerQuestion, listQuestions } from "@/lib/questions-store";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

function storageError(error: unknown) {
  const code = error instanceof Error ? error.message : "UNKNOWN";
  if (code === "SUPABASE_CONFIG_MISSING") return "Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trên hosting.";
  if (code.startsWith("SUPABASE_HTTP_")) return `Supabase từ chối yêu cầu (${code.replace("SUPABASE_HTTP_", "HTTP ")}).`;
  return "Không thể kết nối Supabase từ hosting.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "Khách truy cập").trim();
    const email = String(body.email || "").trim();
    const question = String(body.question || "").trim();

    if (!question) {
      return NextResponse.json({ error: "Vui lòng nhập câu hỏi." }, { status: 400 });
    }

    const savedQuestion = await addQuestion({
      visitor_name: name.slice(0, 120),
      visitor_email: email.includes("@") ? email.slice(0, 200) : "",
      question: question.slice(0, 4000),
    });

    if (email.includes("@")) {
      await sendEmail({
        to: process.env.OWNER_EMAIL || "hoangnhan93204@gmail.com",
        subject: `Câu hỏi mới từ ${name}`,
        html: `<p>Bạn có một câu hỏi mới từ <strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}).</p><p>${escapeHtml(question).replace(/\n/g, "<br />")}</p><p>Mở trang quản trị để trả lời khách.</p>`,
      });
    }

    return NextResponse.json({ id: savedQuestion.id, token: savedQuestion.visitor_token, message: "Đã gửi câu hỏi cho Hoàng Nhân." }, { status: 201 });
  } catch (error) {
    console.error("Question submission failed:", error);
    return NextResponse.json({ error: storageError(error) }, { status: 503 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get("id");
  const visitorToken = searchParams.get("token");

  if (questionId && visitorToken) {
    const question = (await listQuestions()).find((item) => item.id === questionId && item.visitor_token === visitorToken);
    if (!question) return NextResponse.json({ error: "Không tìm thấy phiên chat." }, { status: 404 });
    return NextResponse.json({ status: question.status, answer: question.answer, answered_at: question.answered_at });
  }

  if (!isAdminRequest(request)) return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 401 });

  try {
    return NextResponse.json({ questions: await listQuestions() });
  } catch (error) {
    console.error("Question inbox failed:", error);
    return NextResponse.json({
      questions: [],
      warning: storageError(error),
    });
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 401 });

  try {
    const { id, answer } = await request.json();
    const cleanAnswer = String(answer || "").trim();
    if (!id || !cleanAnswer) return NextResponse.json({ error: "Nội dung trả lời không được trống." }, { status: 400 });

    const question = await answerQuestion(id, cleanAnswer.slice(0, 4000));
    if (!question) return NextResponse.json({ error: "Không tìm thấy câu hỏi." }, { status: 404 });

    if (question.visitor_email.includes("@")) {
      await sendEmail({
        to: question.visitor_email,
        subject: "Hoàng Nhân đã phản hồi câu hỏi của bạn",
        html: `<p>Xin chào ${escapeHtml(question.visitor_name)},</p><p>${escapeHtml(cleanAnswer).replace(/\n/g, "<br />")}</p><hr /><p><strong>Câu hỏi của bạn:</strong> ${escapeHtml(question.question).replace(/\n/g, "<br />")}</p>`,
      });
    }

    return NextResponse.json({ message: "Đã lưu câu trả lời và gửi trực tiếp vào chat." });
  } catch (error) {
    console.error("Question reply failed:", error);
    return NextResponse.json({ error: storageError(error) }, { status: 503 });
  }
}
