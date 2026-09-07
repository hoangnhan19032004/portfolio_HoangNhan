"use client";

import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Inbox,
  LogIn,
  Mail,
  Menu,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  SunMoon,
  UserRound,
  X,
} from "lucide-react";

type Question = {
  id: string;
  visitor_name: string;
  visitor_email: string;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  created_at: string;
  answered_at?: string | null;
};

type Filter = "all" | "pending" | "answered";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
}

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isDark, setIsDark] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const loadQuestions = async (secret = password) => {
    setIsLoading(true);
    const response = await fetch("/api/questions", { headers: { "x-admin-password": secret } });
    const data = await response.json();
    setIsLoading(false);
    if (!response.ok) {
      setMessage(data.error || "Mật khẩu không đúng.");
      return;
    }
    setQuestions(data.questions);
    setIsLoggedIn(true);
    setSelectedId((current) => current || data.questions[0]?.id || null);
    setMessage("");
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  };

  const filteredQuestions = questions.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const searchText = `${item.visitor_name} ${item.visitor_email} ${item.question}`.toLowerCase();
    return matchesFilter && searchText.includes(search.toLowerCase());
  });

  const selectedQuestion = questions.find((item) => item.id === selectedId) || filteredQuestions[0];
  const pendingCount = questions.filter((item) => item.status === "pending").length;
  const answeredCount = questions.filter((item) => item.status === "answered").length;

  const reply = async (id: string) => {
    const answer = answers[id]?.trim();
    if (!answer) return;
    setIsLoading(true);
    const response = await fetch("/api/questions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, answer }),
    });
    const data = await response.json();
    setIsLoading(false);
    setMessage(data.message || data.error);
    if (response.ok) {
      setAnswers((current) => ({ ...current, [id]: "" }));
      await loadQuestions();
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="admin-shell flex min-h-screen items-center justify-center px-4">
        <form onSubmit={(event) => { event.preventDefault(); loadQuestions(); }} className="admin-login w-full max-w-md rounded-[28px] p-8 shadow-2xl">
          <div className="mb-8 flex items-center gap-3"><div className="admin-icon rounded-2xl p-3"><Sparkles className="h-5 w-5" /></div><div><p className="admin-eyebrow">Portfolio workspace</p><h1 className="admin-heading text-2xl font-black">Chào mừng trở lại</h1><p className="admin-muted mt-1 text-sm">Đăng nhập để quản lý câu hỏi khách hàng</p></div></div>
          <label className="admin-label mb-2 block text-xs font-bold uppercase tracking-wider">Mật khẩu quản trị</label>
          <input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu của bạn" className="admin-input w-full rounded-xl px-4 py-3 text-sm outline-none" />
          <button type="submit" disabled={isLoading || !password} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 font-bold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:opacity-50"><LogIn className="h-4 w-4" /> {isLoading ? "Đang xác thực..." : "Đăng nhập dashboard"}</button>
          {message && <p className="mt-4 rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell min-h-screen">
      <div className="flex min-h-screen">
        <aside className={`admin-sidebar fixed inset-y-0 left-0 z-40 w-64 p-5 transition-transform lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="admin-icon rounded-xl p-2"><Sparkles className="h-4 w-4" /></div><div><p className="admin-heading text-sm font-black">CodeWithHN</p><p className="admin-muted text-[10px] uppercase tracking-widest">Workspace</p></div></div><button className="admin-muted lg:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Đóng menu"><X className="h-5 w-5" /></button></div>
          <nav className="mt-12 space-y-2"><p className="admin-muted mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em]">Quản lý</p><button className="admin-nav-active flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold"><Inbox className="h-4 w-4" /> Inbox câu hỏi <span className="ml-auto rounded-full bg-sky-400/15 px-2 py-0.5 text-[10px] text-sky-300">{pendingCount}</span></button><a href="/" className="admin-nav flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold"><BarChart3 className="h-4 w-4" /> Xem portfolio</a></nav>
          <div className="admin-sidebar-note mt-auto rounded-2xl p-4"><MessageSquareText className="h-5 w-5 text-sky-300" /><p className="admin-heading mt-3 text-sm font-bold">Luôn kết nối</p><p className="admin-muted mt-1 text-xs leading-5">Theo dõi và phản hồi khách hàng nhanh chóng.</p></div>
          <div className="admin-muted mt-5 flex items-center gap-2 border-t border-white/10 pt-5 text-xs"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/15 text-sky-300"><UserRound className="h-4 w-4" /></div><span>Hoàng Nhân<br /><b className="admin-heading">Quản trị viên</b></span></div>
        </aside>
        {isSidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Đóng menu" />}
        <section className="min-w-0 flex-1">
          <header className="admin-header sticky top-0 z-20 flex items-center justify-between border-b px-4 py-4 md:px-8"><div className="flex items-center gap-3"><button className="admin-muted lg:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Mở menu"><Menu className="h-5 w-5" /></button><div><p className="admin-muted hidden text-xs md:block">Thứ hai, {new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(new Date())}</p><h1 className="admin-heading text-lg font-black md:text-xl">Tổng quan inbox</h1></div></div><div className="flex items-center gap-2"><button onClick={toggleTheme} className="admin-icon-button rounded-xl p-2.5" aria-label="Đổi giao diện"><SunMoon className="h-4 w-4" /></button><button onClick={() => loadQuestions()} className="admin-icon-button rounded-xl p-2.5" aria-label="Làm mới"><RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /></button></div></header>
          <div className="mx-auto max-w-[1500px] p-4 md:p-8">
            {message && <div className="mb-5 flex items-center justify-between rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-200">{message}<button onClick={() => setMessage("")} aria-label="Đóng thông báo"><X className="h-4 w-4" /></button></div>}
            <div className="mb-7 grid gap-4 sm:grid-cols-3"><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Tổng câu hỏi</span><div className="rounded-xl bg-sky-400/15 p-2 text-sky-300"><Inbox className="h-4 w-4" /></div></div><p className="admin-heading mt-4 text-3xl font-black">{questions.length}</p><p className="admin-muted mt-1 text-xs">Tất cả khách hàng</p></div><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Chờ phản hồi</span><div className="rounded-xl bg-amber-400/15 p-2 text-amber-300"><Clock3 className="h-4 w-4" /></div></div><p className="mt-4 text-3xl font-black text-amber-300">{pendingCount}</p><p className="admin-muted mt-1 text-xs">Cần xử lý sớm</p></div><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Đã trả lời</span><div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div></div><p className="mt-4 text-3xl font-black text-emerald-300">{answeredCount}</p><p className="admin-muted mt-1 text-xs">Đã hoàn tất</p></div></div>
            <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="admin-eyebrow">Customer messages</p><h2 className="admin-heading mt-1 text-2xl font-black">Tin nhắn gần đây</h2></div><div className="admin-search flex items-center gap-2 rounded-xl px-3 py-2.5 md:w-72"><Search className="admin-muted h-4 w-4" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm tên, email..." className="admin-search-input min-w-0 flex-1 bg-transparent text-sm outline-none" /></div></div>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{(["all", "pending", "answered"] as Filter[]).map((item) => <button key={item} onClick={() => setFilter(item)} className={`admin-filter shrink-0 rounded-full px-4 py-2 text-xs font-bold ${filter === item ? "active" : ""}`}>{item === "all" ? `Tất cả (${questions.length})` : item === "pending" ? `Chờ trả lời (${pendingCount})` : `Đã trả lời (${answeredCount})`}</button>)}</div>
            <div className="grid gap-5 xl:grid-cols-[minmax(330px,0.8fr)_minmax(450px,1.2fr)]">
              <div className="admin-list rounded-2xl p-2">{filteredQuestions.length === 0 ? <div className="admin-empty p-10 text-center text-sm font-semibold">{questions.length === 0 ? "Chưa có câu hỏi nào." : "Không tìm thấy kết quả phù hợp."}</div> : filteredQuestions.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`admin-list-item w-full rounded-xl p-4 text-left ${selectedQuestion?.id === item.id ? "selected" : ""}`}><div className="flex items-start gap-3"><div className="admin-avatar flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black">{initials(item.visitor_name)}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="admin-heading truncate text-sm font-bold">{item.visitor_name}</p><span className={`shrink-0 text-[10px] font-bold ${item.status === "pending" ? "text-amber-300" : "text-emerald-300"}`}>{item.status === "pending" ? "Chờ xử lý" : "Đã xong"}</span></div><p className="admin-muted truncate text-xs">{item.visitor_email}</p><p className="admin-list-question mt-2 line-clamp-2 text-xs leading-5">{item.question}</p><p className="admin-date mt-2 text-[10px]">{formatDate(item.created_at)}</p></div></div></button>)}</div>
              <div className="admin-detail rounded-2xl p-5 md:p-7">{selectedQuestion ? <><div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5"><div className="flex items-center gap-3"><div className="admin-avatar flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{initials(selectedQuestion.visitor_name)}</div><div><h3 className="admin-heading font-bold">{selectedQuestion.visitor_name}</h3>{selectedQuestion.visitor_email ? <a href={`mailto:${selectedQuestion.visitor_email}`} className="flex items-center gap-1 text-xs text-sky-300 hover:underline"><Mail className="h-3 w-3" /> {selectedQuestion.visitor_email}</a> : <p className="admin-muted text-xs">Khách đang trò chuyện trực tiếp</p>}</div></div><span className={`rounded-full px-3 py-1.5 text-xs font-bold ${selectedQuestion.status === "pending" ? "bg-amber-400/15 text-amber-300" : "bg-emerald-400/15 text-emerald-300"}`}>{selectedQuestion.status === "pending" ? "Chờ trả lời" : "Đã trả lời"}</span></div><div className="py-6"><p className="admin-eyebrow mb-3">Câu hỏi của khách · {formatDate(selectedQuestion.created_at)}</p><p className="admin-question whitespace-pre-wrap text-sm leading-7">{selectedQuestion.question}</p>{selectedQuestion.answer && <div className="admin-answer mt-6 rounded-xl p-4"><p className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Phản hồi đã gửi</p><p className="admin-muted whitespace-pre-wrap text-sm leading-6">{selectedQuestion.answer}</p></div>}</div>{selectedQuestion.status === "pending" && <div className="border-t border-white/10 pt-5"><label className="admin-label mb-2 block text-xs font-bold uppercase tracking-wider">Soạn phản hồi</label><textarea autoFocus value={answers[selectedQuestion.id] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [selectedQuestion.id]: event.target.value }))} placeholder="Viết câu trả lời thân thiện cho khách..." rows={5} className="admin-textarea w-full rounded-xl p-4 text-sm leading-6 outline-none" /><div className="mt-3 flex items-center justify-between gap-3"><p className="admin-muted text-xs">Câu trả lời sẽ được lưu vào inbox và hiển thị trực tiếp trong chat.</p><button disabled={isLoading || !answers[selectedQuestion.id]?.trim()} onClick={() => reply(selectedQuestion.id)} className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 disabled:opacity-40"><Send className="h-4 w-4" /> Gửi phản hồi</button></div></div>} </> : <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"><MessageSquareText className="admin-muted h-10 w-10" /><p className="admin-heading mt-4 font-bold">Chọn một câu hỏi</p><p className="admin-muted mt-1 text-sm">Nội dung hội thoại sẽ hiển thị ở đây.</p></div>}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
