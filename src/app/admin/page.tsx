"use client";

import React from "react";
import {
  ArrowLeft,
  BarChart3,
  Check,
  CheckCheck,
  CheckCircle2,
  Clock3,
  Download,
  Inbox,
  Mail,
  Menu,
  MessageCircle,
  MessageSquareText,
  Moon,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant" | "admin";
  content: string;
  created_at: string;
};

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

type Filter = "all" | "pending" | "answered";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
}

function lastMessage(question: Question) {
  const messages = question.messages || [];
  return messages[messages.length - 1];
}

function needsReply(question: Question) {
  return question.status === "pending" || lastMessage(question)?.role === "user";
}

function exportQuestions(questions: Question[]) {
  const escapeCsv = (value: string) => {
    const safeValue = /^[=+\-@]/.test(value.trimStart()) ? `'${value}` : value;
    return `"${safeValue.replace(/"/g, '""')}"`;
  };
  const rows = [
    ["Tên", "Email", "Trạng thái", "Tin nhắn gần nhất", "Ngày tạo"].map(escapeCsv).join(","),
    ...questions.map((question) => [
      question.visitor_name,
      question.visitor_email,
      needsReply(question) ? "Cần phản hồi" : "Đã phản hồi",
      lastMessage(question)?.content || question.question,
      formatDate(question.created_at),
    ].map(escapeCsv).join(",")),
  ];
  const blob = new Blob(["\uFEFF", rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `portfolio-inbox-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [message, setMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [dark, setDark] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = React.useState(false);
  const [lastSyncedAt, setLastSyncedAt] = React.useState<Date | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem("admin-theme");
    const useDark = savedTheme ? savedTheme === "dark" : true;
    setDark(useDark);
    document.documentElement.classList.toggle("dark", useDark);
  }, []);

  const loadQuestions = React.useCallback(async (secret = password, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch("/api/questions", {
        headers: { "x-admin-password": secret },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Mật khẩu không đúng.");
        return;
      }
      const updatedQuestions: Question[] = data.questions || [];
      setQuestions(updatedQuestions);
      setSelectedId((current) =>
        current && updatedQuestions.some((question) => question.id === current)
          ? current
          : updatedQuestions[0]?.id || null,
      );
      setLoggedIn(true);
      setLastSyncedAt(new Date());
      if (data.warning || !silent) setMessage(data.warning || "");
    } catch (error) {
      setMessage(error instanceof Error ? `Không thể tải danh sách chat: ${error.message}` : "Không thể tải danh sách chat.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [password]);

  React.useEffect(() => {
    if (!loggedIn) return;
    let active = true;
    let timeout: number;

    const refresh = async () => {
      await loadQuestions(password, true);
      if (active) timeout = window.setTimeout(refresh, 3000);
    };

    timeout = window.setTimeout(refresh, 3000);
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [loggedIn, loadQuestions, password]);

  const selected = questions.find((item) => item.id === selectedId) || null;
  const pendingCount = questions.filter(needsReply).length;
  const answeredCount = questions.length - pendingCount;
  const filteredQuestions = React.useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    return questions.filter((question) => {
      const matchesFilter = filter === "all"
        || (filter === "pending" && needsReply(question))
        || (filter === "answered" && !needsReply(question));
      const searchableText = [
        question.visitor_name,
        question.visitor_email,
        question.question,
        ...(question.messages || []).map((item) => item.content),
      ].join(" ").toLocaleLowerCase("vi");
      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [filter, questions, search]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("admin-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  const reply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected || !replyText.trim() || sending) return;
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/questions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id: selected.id, answer: replyText.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Không thể gửi câu trả lời.");
        return;
      }
      setReplyText("");
      setMessage(data.message || "Đã gửi câu trả lời.");
      await loadQuestions(password, true);
    } catch (error) {
      setMessage(error instanceof Error ? `Không thể gửi câu trả lời: ${error.message}` : "Không thể gửi câu trả lời.");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.visitor_email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setMessage("Không thể sao chép email. Vui lòng kiểm tra quyền clipboard của trình duyệt.");
    }
  };

  React.useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("admin-search")?.focus();
      }
      if (event.key === "Escape") {
        setMobileDetailOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  if (!loggedIn) {
    return (
      <main className="admin-shell flex min-h-screen items-center justify-center px-4 py-10">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void loadQuestions();
          }}
          className="admin-login w-full max-w-md rounded-[28px] p-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="admin-icon rounded-2xl p-3"><Sparkles className="h-5 w-5" /></div>
            <div>
              <p className="admin-eyebrow">Portfolio workspace</p>
              <h1 className="admin-heading text-2xl font-black">Chào mừng trở lại</h1>
              <p className="admin-muted mt-1 text-sm">Đăng nhập để quản lý các phiên chat</p>
            </div>
          </div>
          <label htmlFor="admin-password" className="admin-label mb-2 block text-xs font-bold uppercase tracking-wider">
            Mật khẩu quản trị
          </label>
          <input
            id="admin-password"
            autoFocus
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            className="admin-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={!password || loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 font-bold text-white hover:bg-sky-400 disabled:opacity-50"
          >
            {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
            {loading ? "Đang xác thực..." : "Đăng nhập dashboard"}
          </button>
          {message && <p role="alert" className="mt-4 text-sm text-rose-300">{message}</p>}
          <p className="admin-muted mt-6 text-center text-xs">Khu vực quản trị · CodeWithHN</p>
        </form>
      </main>
    );
  }

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: questions.length },
    { id: "pending", label: "Cần phản hồi", count: pendingCount },
    { id: "answered", label: "Đã phản hồi", count: answeredCount },
  ];

  return (
    <main className="admin-shell min-h-screen">
      <div className="flex min-h-screen">
        <aside className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col p-5 transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <a href="/" className="flex items-center gap-3 rounded-xl">
            <div className="admin-icon rounded-xl p-2.5"><Sparkles className="h-4 w-4" /></div>
            <div>
              <p className="admin-heading text-sm font-black">CodeWithHN</p>
              <p className="admin-muted text-[10px] uppercase tracking-[0.2em]">Admin workspace</p>
            </div>
          </a>

          <div className="admin-sidebar-note mt-10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-200">Tổng phiên chat</span>
              <Inbox className="h-4 w-4 text-sky-300" />
            </div>
            <p className="mt-3 text-3xl font-black text-white">{questions.length}</p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-sky-100/70">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Inbox đang đồng bộ
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            <p className="admin-muted mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em]">Không gian làm việc</p>
            <button className="admin-nav-active flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold">
              <Inbox className="h-4 w-4" />
              Inbox chat
              <span className="ml-auto rounded-full bg-sky-400/15 px-2 py-0.5 text-[10px] text-sky-300">{pendingCount}</span>
            </button>
            <a href="/" className="admin-nav flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold">
              <BarChart3 className="h-4 w-4" /> Xem portfolio
            </a>
          </nav>

          <div className="mt-auto">
            <div className="admin-sidebar-note rounded-2xl p-4">
              <MessageSquareText className="h-5 w-5 text-sky-300" />
              <p className="admin-heading mt-3 text-sm font-bold">Luôn kết nối</p>
              <p className="admin-muted mt-1 text-xs leading-5">Theo dõi và phản hồi khách hàng ngay trong dashboard.</p>
            </div>
            <div className="admin-muted mt-5 flex items-center gap-2 border-t border-white/10 pt-5 text-xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/15 text-sky-300"><UserRound className="h-4 w-4" /></div>
              <span>Hoàng Nhân<br /><b className="admin-heading">Quản trị viên</b></span>
            </div>
          </div>
        </aside>

        {sidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Đóng menu" />}

        <section className="min-w-0 flex-1">
          <header className="admin-header sticky top-0 z-20 flex items-center justify-between border-b px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button className="admin-icon-button rounded-xl p-2 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Mở menu">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="admin-muted hidden text-xs md:block">Bảng quản trị CodeWithHN</p>
                <h1 className="admin-heading text-lg font-black md:text-xl">Hộp thư khách hàng</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="admin-muted hidden items-center gap-2 text-xs sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {lastSyncedAt ? `Đồng bộ ${formatTime(lastSyncedAt.toISOString())}` : "Đang kết nối"}
              </span>
              <button
                onClick={() => void loadQuestions(password)}
                disabled={loading}
                className="admin-icon-button flex items-center gap-2 rounded-xl p-2.5 disabled:opacity-60"
                aria-label="Làm mới inbox"
                title="Làm mới inbox"
              >
                <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                <span className="hidden text-xs font-semibold sm:inline">Làm mới</span>
              </button>
              <button onClick={toggleTheme} className="admin-icon-button rounded-xl p-2.5" aria-label={dark ? "Chuyển giao diện sáng" : "Chuyển giao diện tối"}>
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] p-4 md:p-7 xl:p-9">
            {message && (
              <div role="status" className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-200">
                <span>{message}</span>
                <button onClick={() => setMessage("")} aria-label="Đóng thông báo"><X className="h-4 w-4" /></button>
              </div>
            )}

            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="admin-eyebrow mb-2">Xin chào, Hoàng Nhân 👋</p>
                <h2 className="admin-heading text-2xl font-black tracking-tight md:text-3xl">Cùng xem inbox nhé</h2>
                <p className="admin-muted mt-2 text-sm">Quản lý và phản hồi các cuộc trò chuyện của khách truy cập.</p>
              </div>
              <button
                onClick={() => exportQuestions(filteredQuestions)}
                disabled={filteredQuestions.length === 0}
                className="admin-export-button flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> Xuất CSV
              </button>
            </div>

            <div className="mb-7 grid gap-4 sm:grid-cols-3">
              <article className="admin-stat admin-stat-total rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="admin-muted text-sm font-medium">Tổng phiên chat</span>
                  <div className="rounded-xl bg-sky-400/15 p-2.5 text-sky-300"><Inbox className="h-4 w-4" /></div>
                </div>
                <p className="admin-heading mt-4 text-3xl font-black">{questions.length}</p>
                <p className="admin-muted mt-1 text-xs">Tất cả khách hàng</p>
              </article>
              <article className="admin-stat admin-stat-pending rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="admin-muted text-sm font-medium">Cần phản hồi</span>
                  <div className="rounded-xl bg-amber-400/15 p-2.5 text-amber-300"><Clock3 className="h-4 w-4" /></div>
                </div>
                <p className="mt-4 text-3xl font-black text-amber-300">{pendingCount}</p>
                <p className="admin-muted mt-1 text-xs">Đang chờ bạn xử lý</p>
              </article>
              <article className="admin-stat admin-stat-answered rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="admin-muted text-sm font-medium">Đã phản hồi</span>
                  <div className="rounded-xl bg-emerald-400/15 p-2.5 text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div>
                </div>
                <p className="mt-4 text-3xl font-black text-emerald-300">{answeredCount}</p>
                <p className="admin-muted mt-1 text-xs">Các phiên đã được trả lời</p>
              </article>
            </div>

            <div className="admin-workspace grid min-h-[610px] overflow-hidden rounded-2xl lg:grid-cols-[minmax(310px,0.78fr)_minmax(430px,1.22fr)]">
              <section className={`admin-inbox flex min-h-[610px] flex-col border-r ${mobileDetailOpen ? "hidden lg:flex" : "flex"}`}>
                <div className="border-b border-white/10 p-4 md:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="admin-heading font-bold">Hộp thư đến</h3>
                      <p className="admin-muted mt-1 text-xs">{filteredQuestions.length} cuộc trò chuyện</p>
                    </div>
                    <button
                      onClick={() => exportQuestions(filteredQuestions)}
                      disabled={filteredQuestions.length === 0}
                      className="admin-icon-button rounded-lg p-2 lg:hidden"
                      aria-label="Xuất danh sách CSV"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  <label className="admin-search flex items-center gap-2 rounded-xl px-3 py-2.5">
                    <Search className="admin-muted h-4 w-4 shrink-0" />
                    <input
                      id="admin-search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Tìm tên, email, nội dung..."
                      className="admin-search-input min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                    <kbd className="admin-shortcut hidden rounded-md px-1.5 py-0.5 text-[10px] md:inline">Ctrl K</kbd>
                  </label>
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {filters.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setFilter(item.id)}
                        className={`admin-filter flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${filter === item.id ? "active" : ""}`}
                      >
                        {item.label}<span className="opacity-70">{item.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="admin-conversation-list flex-1 overflow-y-auto p-2">
                  {filteredQuestions.length === 0 ? (
                    <div className="admin-empty flex h-full min-h-64 flex-col items-center justify-center px-6 text-center">
                      <div className="admin-empty-icon mb-4 rounded-2xl p-4"><Search className="h-6 w-6" /></div>
                      <p className="admin-heading text-sm font-bold">{questions.length ? "Không tìm thấy cuộc trò chuyện" : "Chưa có phiên chat nào"}</p>
                      <p className="admin-muted mt-2 max-w-xs text-xs leading-5">{questions.length ? "Thử từ khóa khác hoặc đổi bộ lọc để tìm cuộc trò chuyện." : "Các cuộc trò chuyện mới sẽ xuất hiện tại đây."}</p>
                      {(search || filter !== "all") && (
                        <button onClick={() => { setSearch(""); setFilter("all"); }} className="mt-4 text-xs font-bold text-sky-400 hover:text-sky-300">
                          Xóa bộ lọc
                        </button>
                      )}
                    </div>
                  ) : filteredQuestions.map((item) => {
                    const latest = lastMessage(item);
                    const active = selected?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setSelectedId(item.id); setMobileDetailOpen(true); }}
                        className={`admin-list-item w-full rounded-xl p-3.5 text-left ${active ? "selected" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className="admin-avatar relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-black">
                            {initials(item.visitor_name)}
                            {needsReply(item) && <span className="admin-avatar-dot absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="admin-heading truncate text-sm font-bold">{item.visitor_name}</p>
                              <span className="admin-date shrink-0 text-[10px]">{formatDate(latest?.created_at || item.created_at)}</span>
                            </div>
                            <p className="admin-muted mt-0.5 truncate text-xs">{item.visitor_email}</p>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <p className="admin-list-question line-clamp-1 text-xs">
                                {latest?.content || item.question}
                              </p>
                              <span className={`admin-status shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${needsReply(item) ? "pending" : "answered"}`}>
                                {needsReply(item) ? "Cần trả lời" : "Đã trả lời"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="admin-inbox-footer flex items-center justify-between border-t border-white/10 px-4 py-3 text-[11px]">
                  <span className="admin-muted flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Tự động đồng bộ</span>
                  <span className="admin-muted">Mỗi 3 giây</span>
                </div>
              </section>

              <section className={`admin-detail-panel min-w-0 ${mobileDetailOpen ? "flex" : "hidden lg:flex"}`}>
                {!selected ? (
                  <div className="admin-empty flex min-h-[610px] flex-1 flex-col items-center justify-center p-8 text-center">
                    <MessageCircle className="mb-4 h-10 w-10 opacity-50" />
                    <p className="admin-heading font-bold">Chọn một cuộc trò chuyện</p>
                    <p className="admin-muted mt-2 text-sm">Nội dung chat sẽ hiển thị tại đây.</p>
                  </div>
                ) : (
                  <div className="flex min-h-[610px] min-w-0 flex-1 flex-col">
                    <div className="admin-detail-header flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 md:px-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <button onClick={() => setMobileDetailOpen(false)} className="admin-icon-button rounded-lg p-2 lg:hidden" aria-label="Quay lại danh sách">
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <div className="admin-avatar flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-black">{initials(selected.visitor_name)}</div>
                        <div className="min-w-0">
                          <h3 className="admin-heading truncate font-bold">{selected.visitor_name}</h3>
                          <button onClick={() => void copyEmail()} className="admin-muted mt-0.5 flex max-w-full items-center gap-1 truncate text-xs hover:text-sky-300" title="Sao chép email">
                            <span className="truncate">{selected.visitor_email}</span>
                            {copiedEmail ? <Check className="h-3 w-3 shrink-0" /> : <Mail className="h-3 w-3 shrink-0" />}
                          </button>
                        </div>
                      </div>
                      <span className={`admin-status flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold sm:px-3 sm:text-xs ${needsReply(selected) ? "pending" : "answered"}`}>
                        {needsReply(selected) ? <Clock3 className="h-3.5 w-3.5" /> : <CheckCheck className="h-3.5 w-3.5" />}
                        <span className="hidden sm:inline">{needsReply(selected) ? "Cần phản hồi" : "Đã phản hồi"}</span>
                        <span className="sm:hidden">{needsReply(selected) ? "Chờ" : "Xong"}</span>
                      </span>
                    </div>

                    <div className="admin-contact-strip flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/10 px-5 py-3 text-xs">
                      <span className="admin-muted flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{selected.visitor_name}</span>
                      <span className="admin-muted flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{selected.visitor_email}</span>
                      <span className="admin-muted flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />Bắt đầu {formatDate(selected.created_at)}</span>
                    </div>

                    <div className="admin-chat-history flex-1 space-y-5 overflow-y-auto px-4 py-6 md:px-7">
                      {(selected.messages || []).length === 0 ? (
                        <div className="admin-empty py-12 text-center text-sm">Chưa có tin nhắn trong phiên chat này.</div>
                      ) : (selected.messages || []).map((chatMessage, index) => {
                        const isVisitor = chatMessage.role === "user";
                        const isAdmin = chatMessage.role === "admin";
                        return (
                          <div key={`${chatMessage.created_at}-${index}`} className={`flex ${isVisitor ? "justify-start" : "justify-end"}`}>
                            <div className={`max-w-[88%] sm:max-w-[78%] ${isVisitor ? "" : "items-end"}`}>
                              <div className={`mb-1.5 flex items-center gap-2 text-[10px] ${isVisitor ? "admin-muted" : "admin-muted justify-end"}`}>
                                <span className="font-bold">{isVisitor ? selected.visitor_name : isAdmin ? "Bạn" : "Trợ lý AI"}</span>
                                <span>{formatTime(chatMessage.created_at)}</span>
                              </div>
                              <div className={`admin-chat-bubble rounded-2xl px-4 py-3 text-sm leading-6 ${isVisitor ? "visitor" : isAdmin ? "admin" : "assistant"}`}>
                                <p className="whitespace-pre-wrap break-words">{chatMessage.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <form onSubmit={reply} className="admin-reply-area border-t border-white/10 p-4 md:p-5">
                      <label htmlFor="admin-reply" className="admin-muted mb-2 block text-xs font-semibold">Trả lời khách hàng</label>
                      <div className="admin-composer flex items-end gap-2 rounded-2xl p-2">
                        <textarea
                          id="admin-reply"
                          value={replyText}
                          onChange={(event) => setReplyText(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                              event.preventDefault();
                              event.currentTarget.form?.requestSubmit();
                            }
                          }}
                          rows={2}
                          maxLength={4000}
                          placeholder={`Nhắn tin cho ${selected.visitor_name}...`}
                          className="admin-composer-input max-h-36 min-h-[52px] flex-1 resize-y bg-transparent px-3 py-2 text-sm outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!replyText.trim() || sending}
                          className="admin-send-button flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          {sending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          <span className="hidden sm:inline">{sending ? "Đang gửi" : "Gửi"}</span>
                        </button>
                      </div>
                      <div className="admin-muted mt-2 flex items-center justify-between gap-3 text-[10px]">
                        <span>Enter để gửi · Shift + Enter để xuống dòng</span>
                        <span>{replyText.length}/4000</span>
                      </div>
                    </form>
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
