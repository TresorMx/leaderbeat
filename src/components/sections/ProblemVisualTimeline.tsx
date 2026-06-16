"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";

const messages = [
  { from: "lead",    name: "Mariana G.", text: "Hola! Me interesa el 2 recámaras, ¿precios?", time: "9:47",  delay: 0.2  },
  { from: "silence", delay: 0.75 },
  { from: "lead",    name: "Mariana G.", text: "¿Siguen disponibles? 🙏",                      time: "11:02", delay: 1.2  },
  { from: "silence", delay: 1.75 },
  { from: "lead",    name: "Mariana G.", text: "¿Sigue disponible la unidad del piso 12?",     time: "14:15", delay: 2.1  },
  { from: "silence", delay: 2.7  },
];

function ChatContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (!inView) return;
    const timers = [0.9, 1.9, 2.8, 3.3].map((t) =>
      setTimeout(scrollToBottom, t * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] shrink-0">
        <div className="relative shrink-0">
          <Image
            src="/anachat.png"
            alt="Mariana G."
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink-soft" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-cream leading-tight">Mariana G.</div>
          <div className="text-[9px] text-cream/50">en línea</div>
        </div>
        <div className="flex items-center gap-3.5 text-cream/40">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3C16.3 5.9 13.4 3 9.8 3S3.3 5.9 3.3 9.7s2.9 6.7 6.5 6.7c1.6 0 3-.6 4.1-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.1 0C7.2 14.3 4.8 11.9 4.8 9S7.2 3.7 9.8 3.7s5 2.4 5 5.3-2.4 5.3-5 5.3z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {messages.map((m, i) => {
          if (m.from === "lead") {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: m.delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] rounded-xl rounded-bl-sm px-3 py-2 text-[11.5px] leading-snug bg-white/10 text-cream/90">
                  {m.text}
                  <span className="block text-right text-[9px] mt-1 font-mono text-cream/35">{m.time}</span>
                </div>
              </motion.div>
            );
          }

          if (m.from === "silence") {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: m.delay, duration: 0.35 }}
                className="flex justify-end"
              >
                <div className="flex items-center gap-1 text-[9.5px] italic text-cream/30">
                  <span>sin respuesta</span>
                  <svg width="14" height="9" viewBox="0 0 16 10" fill="none" opacity="0.6">
                    <path d="M1 5l3 3L11 1M6 5l3 3 4-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-cream/40" />
                  </svg>
                </div>
              </motion.div>
            );
          }
        })}

        {/* Summary pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.9, duration: 0.4 }}
          className="flex justify-center py-1"
        >
          <span className="px-3 py-[3px] rounded-full text-[9px] bg-white/[0.06] text-cream/35">
            3 mensajes · 0 respuestas
          </span>
        </motion.div>

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 3.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-[9.5px] tracking-[0.1em] uppercase text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            Lead perdido · sin respuesta
          </span>
        </motion.div>

      </div>

      {/* Input bar */}
      <div className="shrink-0 px-3 py-2.5 flex items-center gap-2 border-t border-white/[0.07]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream/35 shrink-0">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
        <div className="flex-1 rounded-full px-3 py-[6px] text-[11px] bg-white/[0.08] text-cream/30">
          Mensaje
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cream/35 shrink-0">
          <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
        </svg>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-bronze/80">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ProblemVisualTimeline() {
  return (
    <IPhoneFrame>
      <ChatContent />
    </IPhoneFrame>
  );
}
