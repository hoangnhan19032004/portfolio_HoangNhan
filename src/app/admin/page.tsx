"use client";

import React from "react";
import { CheckCircle2, Clock3, Inbox, Mail, RefreshCw, Send } from "lucide-react";

type ChatMessage = { role: "user" | "assistant" | "admin"; content: string; created_at: string };
type Question = {
  id: string;
  visitor_name: string;
  visitor_email: string;
  visitor_ip?: string | null;
  question: string;
  answer: string | null;
  messages?: ChatMessage[];
  status: "pending" | "answered";
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
}

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loadQuestions = async (secret = password) => {
    setLoading(true);
    const response = await fetch("/api/questions", { headers: { "x-admin-password": secret } });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || "Mật khẩu không đúng.");
      return;
    }
    setQuestions(data.questions || []);
    setSelectedId((current) => current || data.questions?.[0]?.id || null);
    setLoggedIn(true);
    setMessage(data.warning || "");
  };

  const selected = questions.find((item) => item.id === selectedId) || questions[0];
  const pendingCount = questions.filter((item) => item.status === "pending").length;
  const answeredCount = questions.filter((item) => item.status === "answered").length;

  const reply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected || !replyText.trim()) return;
    setLoading(true);
    const response = await fetch("/api/questions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id: selected.id, answer: replyText.trim() }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data.message || data.error || "");
    if (response.ok) {
      setReplyText("");
      await loadQuestions();
    }
  };

  if (!loggedIn) {
    return <main className="admin-shell flex min-h-screen items-center justify-center px-4"><form onSubmit={(event) => { event.preventDefault(); loadQuestions(); }} className="admin-login w-full max-w-md rounded-[28px] p-8 shadow-2xl"><h1 className="admin-heading text-2xl font-black">Đăng nhập quản trị</h1><p className="admin-muted mt-2 text-sm">Quản lý các phiên chat của khách hàng.</p><input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mật khẩu quản trị" className="admin-input mt-6 w-full rounded-xl px-4 py-3 text-sm outline-none" /><button type="submit" disabled={!password || loading} className="mt-4 w-full rounded-xl bg-sky-500 px-4 py-3 font-bold text-white disabled:opacity-50">{loading ? "Đang xác thực..." : "Đăng nhập"}</button>{message && <p className="mt-4 text-sm text-rose-300">{message}</p>}</form></main>;
  }

  return <main className="admin-shell min-h-screen"><header className="admin-header sticky top-0 z-20 flex items-center justify-between border-b px-4 py-4 md:px-8"><div><p className="admin-eyebrow">CodeWithHN workspace</p><h1 className="admin-heading text-xl font-black">Phiên chat khách hàng</h1></div><div className="flex items-center gap-3"><span className="admin-muted text-sm">{pendingCount} cần phản hồi</span><button onClick={() => loadQuestions()} className="admin-icon-button rounded-xl p-2.5" aria-label="Làm mới"><RefreshCw className={loading ? "animate-spin" : ""} /></button></div></header><div className="mx-auto max-w-[1400px] p-4 md:p-8">{message && <p className="mb-5 rounded-xl bg-sky-400/10 px-4 py-3 text-sm text-sky-200">{message}</p>}<div className="mb-7 grid gap-4 sm:grid-cols-3"><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Tổng phiên chat</span><div className="rounded-xl bg-sky-400/15 p-2 text-sky-300"><Inbox className="h-4 w-4" /></div></div><p className="admin-heading mt-4 text-3xl font-black">{questions.length}</p><p className="admin-muted mt-1 text-xs">Tất cả khách hàng</p></div><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Chờ phản hồi</span><div className="rounded-xl bg-amber-400/15 p-2 text-amber-300"><Clock3 className="h-4 w-4" /></div></div><p className="mt-4 text-3xl font-black text-amber-300">{pendingCount}</p><p className="admin-muted mt-1 text-xs">Cần xử lý sớm</p></div><div className="admin-stat rounded-2xl p-5"><div className="flex items-center justify-between"><span className="admin-muted text-sm">Đã phản hồi</span><div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div></div><p className="mt-4 text-3xl font-black text-emerald-300">{answeredCount}</p><p className="admin-muted mt-1 text-xs">Đã hoàn tất</p></div></div><div className="grid gap-5 md:grid-cols-[minmax(300px,0.7fr)_minmax(450px,1.3fr)]"><section className="admin-list rounded-2xl p-2">{questions.length === 0 ? <p className="admin-empty p-10 text-center text-sm">Chưa có phiên chat nào.</p> : questions.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`admin-list-item w-full rounded-xl p-4 text-left ${selected?.id === item.id ? "selected" : ""}`}><div className="flex gap-3"><div className="admin-avatar flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black">{initials(item.visitor_name)}</div><div className="min-w-0"><p className="admin-heading truncate text-sm font-bold">{item.visitor_name}</p><p className="admin-muted truncate text-xs">{item.visitor_email}</p><p className="admin-list-question mt-2 line-clamp-2 text-xs">{item.messages?.at(-1)?.content || item.question}</p><p className="admin-date mt-2 text-[10px]">{formatDate(item.created_at)}</p></div></div></button>)}</section><section className="admin-detail rounded-2xl p-5 md:p-7">{selected ? <><div className="border-b border-white/10 pb-5"><h2 className="admin-heading font-bold">{selected.visitor_name}</h2><a href={`mailto:${selected.visitor_email}`} className="flex items-center gap-1 text-xs text-sky-300"><Mail className="h-3 w-3" />{selected.visitor_email}</a><p className="admin-muted mt-1 text-[10px]">IP: {selected.visitor_ip || "Không xác định"}</p></div><div className="my-6 flex max-h-[min(60vh,560px)] flex-col gap-3 overflow-y-auto">{(selected.messages?.length ? selected.messages : [{ role: "user" as const, content: selected.question, created_at: selected.created_at }, ...(selected.answer ? [{ role: "admin" as const, content: selected.answer, created_at: selected.created_at }] : [])]).map((item, index) => <div key={`${item.created_at}-${index}`} className={`rounded-xl p-3 text-sm leading-6 ${item.role === "user" ? "ml-8 bg-sky-400/10" : "mr-8 bg-white/5"}`}><p className="admin-eyebrow mb-1">{item.role === "user" ? selected.visitor_name : item.role === "admin" ? "Hoàng Nhân" : "Trợ lý AI"}</p><p className="whitespace-pre-wrap">{item.content}</p></div>)}</div><form onSubmit={reply} className="border-t border-white/10 pt-5"><label className="admin-label mb-2 block text-xs font-bold uppercase tracking-wider">Trả lời trong cùng phiên chat</label><textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} rows={4} placeholder="Viết phản hồi cho khách..." className="admin-input w-full rounded-xl p-3 text-sm outline-none" /><button type="submit" disabled={loading || !replyText.trim()} className="mt-3 flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-white disabled:opacity-50"><Send className="h-4 w-4" />Gửi phản hồi</button></form></> : <p className="admin-empty p-10 text-center">Chọn một phiên chat.</p>}</section></div></div></main>;
}
