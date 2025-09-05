import React, { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound404: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "404 — Page Not Found | Swebi Coffee";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main
      role="main"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-zinc-100"
    >
      {/* GIF GIF background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gif.gif')",
        }}
      />

      {/* Overlay mờ để chữ dễ đọc */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Nội dung */}
      <section className="relative z-10 max-w-xl w-full text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.p
            aria-hidden="true"
            className="text-[7rem] leading-none font-extrabold tracking-tight select-none bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-md"
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            404
          </motion.p>

          <h1 className="text-2xl md:text-3xl font-semibold">
            Chúng tôi đang khắc phục sự cố này!
          </h1>
          <p className="text-sm md:text-base text-zinc-200">
            The page you are looking for is not available or may have been moved.
          </p>

          <div className="pt-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-lg shadow-black/20 ring-1 ring-white/10 hover:ring-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 bg-zinc-800/70 hover:bg-zinc-700/60 backdrop-blur"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 1 1-1.06 1.06L20 12.53V20a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-7.47l-.72.72a.75.75 0 1 1-1.06-1.06l8.25-8.25Z" />
              </svg>
              Go to Home
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-[10px] uppercase tracking-widest text-zinc-300/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Xin thông cảm vì sự bất tiện này!
        </motion.div>
      </section>
    </main>
  );
};

export default NotFound404;
