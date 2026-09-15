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

## Deploy và inbox câu hỏi

### Chạy local

1. Tạo project Supabase và chạy toàn bộ `supabase-visitor-questions.sql` trong **SQL Editor**.
2. Copy `.env.example` thành `.env.local`.
3. Điền các biến bắt buộc:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
ADMIN_PASSWORD=choose_a_strong_admin_password
```

`SUPABASE_URL` chỉ là URL gốc. Không thêm `/rest/v1/`.

4. Chạy `npm run dev` và mở `/admin`.

### Deploy Netlify

1. Kết nối repository GitHub với Netlify.
2. Build command: `npm run build`.
3. Netlify sẽ dùng Node 20 theo `netlify.toml`.
4. Vào **Project configuration → Environment variables** và tạo:

```text
SUPABASE_URL = Project URL của đúng Supabase project
SUPABASE_SERVICE_ROLE_KEY = Secret key của đúng Supabase project
ADMIN_PASSWORD = mật khẩu admin
```

Chọn **All deploy contexts** cho mỗi biến, sau đó **Deploys → Trigger deploy → Deploy site**.

`SUPABASE_SERVICE_ROLE_KEY` là secret, chỉ dùng ở server và không được đưa lên client, GitHub hoặc `.env.example` dưới dạng giá trị thật.

### Tùy chọn

Để bật AI, thêm `OPENAI_API_KEY` và `OPENAI_MODEL=gpt-4o-mini`. Nếu chưa thêm OpenAI key, chat vẫn dùng câu trả lời nội bộ dự phòng.

Để gửi email, thêm `RESEND_API_KEY`, `RESEND_FROM` và `OWNER_EMAIL`. Email là tùy chọn; nếu Resend lỗi, câu hỏi vẫn được lưu vào Supabase.

Khách gửi câu hỏi tại portfolio. Hoàng Nhân đăng nhập `/admin`, chọn câu hỏi và gửi câu trả lời; dữ liệu được lưu trong bảng `visitor_questions`.

### Kiểm tra lỗi

- `401`: `ADMIN_PASSWORD` không đúng.
- `503` kèm thiếu biến: Netlify chưa có environment variable hoặc chưa redeploy.
- `HTTP 401`: Secret key Supabase sai hoặc đã bị revoke.
- `HTTP 404`: URL không thuộc project có bảng `visitor_questions`.
- `HTTP 422`: schema bảng không khớp SQL trong repository.