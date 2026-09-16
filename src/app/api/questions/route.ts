import { NextResponse } from "next/server";
import { isAdminRequest, sendEmail } from "@/lib/server";
import { appendChatMessage, answerQuestion, listQuestions, startChat } from "@/lib/questions-store";

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
  if (code === "SUPABASE_URL_INVALID") return "SUPABASE_URL không hợp lệ. Chỉ nhập URL gốc dạng https://project-ref.supabase.co.";
  if (code === "SUPABASE_CONNECTION_FAILED") return "Không thể kết nối Supabase từ hosting. Kiểm tra Project URL và trạng thái project.";
  if (code.startsWith("SUPABASE_HTTP_")) return `Supabase từ chối yêu cầu (${code.replace("SUPABASE_HTTP_", "HTTP ")}).`;
  return "Không thể kết nối Supabase từ hosting.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = String(body.action || "start");

    if (action === "message") {
      const id = String(body.id || "").trim();
      const token = String(body.token || "").trim();
      const content = String(body.content || "").trim();
      const role = body.role === "assistant" ? "assistant" : "user";
      if (!id || !token || !content) return NextResponse.json({ error: "Dữ liệu phiên chat không hợp lệ." }, { status: 400 });
      const session = await appendChatMessage(id, token, { role, content: content.slice(0, 4000) });
      if (!session) return NextResponse.json({ error: "Không tìm thấy phiên chat." }, { status: 404 });
      return NextResponse.json({ messages: session.messages || [] });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Vui lòng cung cấp họ tên và địa chỉ email trước khi chat." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const visitorIp = forwardedFor || request.headers.get("x-real-ip") || "unknown";
    const savedQuestion = await startChat({
      visitor_name: name.slice(0, 120),
      visitor_email: email.slice(0, 200),
      visitor_ip: visitorIp.slice(0, 100),
    });

    return NextResponse.json({ id: savedQuestion.id, token: savedQuestion.visitor_token, messages: savedQuestion.messages || [] }, { status: 201 });
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
    try {
      const question = (await listQuestions()).find((item) => item.id === questionId && item.visitor_token === visitorToken);
      if (!question) return NextResponse.json({ error: "Không tìm thấy phiên chat." }, { status: 404 });
      return NextResponse.json({ status: question.status, answer: question.answer, messages: question.messages || [], answered_at: question.answered_at });
    } catch (error) {
      return NextResponse.json({ error: storageError(error) }, { status: 503 });
    }
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
