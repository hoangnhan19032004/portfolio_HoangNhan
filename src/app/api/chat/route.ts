import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "AI chưa được cấu hình" }, { status: 503 });
  }

  try {
    const { messages } = await request.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Bạn là trợ lý portfolio của Hoàng Nhân, một Full-Stack Developer ở Ho Chi Minh City. Trả lời bằng tiếng Việt, ngắn gọn, thân thiện. Chỉ khẳng định thông tin có trong portfolio; nếu không biết, hãy hướng người dùng liên hệ qua email hoangnhan93204@gmail.com.",
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) return NextResponse.json({ error: "Không thể kết nối AI" }, { status: 502 });
    const data = await response.json();
    return NextResponse.json({ message: data.choices?.[0]?.message?.content || "Mình chưa có câu trả lời phù hợp." });
  } catch {
    return NextResponse.json({ error: "Dữ liệu chat không hợp lệ" }, { status: 400 });
  }
}