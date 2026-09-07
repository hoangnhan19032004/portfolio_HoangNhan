# portfolio_HoangNhan

## CV PDF

Đặt file CV PDF của bạn tại `public/cv-hoang-nhan.pdf`. Nút `Xem CV` trên portfolio sẽ mở file này trong tab mới.

## Chat AI

Portfolio có sẵn cửa sổ chat ở góc phải màn hình. Không cần cấu hình, chat sẽ trả lời các câu hỏi thường gặp về kỹ năng, dự án và liên hệ bằng dữ liệu nội bộ.

Để bật trả lời AI tự do, tạo file `.env.local` và thêm:

```env
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o-mini
```

API key chỉ được sử dụng ở server thông qua route `/api/chat`.

## Inbox câu hỏi khách hàng

1. Copy `.env.example` thành `.env.local`, sau đó đặt `ADMIN_PASSWORD`.
2. Inbox được lưu local trong `data/visitor-questions.json`, không cần Supabase.
3. (Tùy chọn) Tạo tài khoản Resend, xác minh domain gửi email rồi đặt `RESEND_API_KEY` và `RESEND_FROM`.
4. Khởi động lại app bằng `npm run dev` và mở `/admin`.

Khách có thể nhập tên/email ở cửa sổ chat để gửi câu hỏi. Hoàng Nhân đăng nhập `/admin`, viết câu trả lời và bấm gửi; câu trả lời sẽ được lưu lại. Nếu đã cấu hình Resend, câu trả lời cũng được gửi tới email của khách. Các secret chỉ nằm trong `.env.local` và không được đưa lên client.