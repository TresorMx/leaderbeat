"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Bubble = { from: "buyer" | "agent"; text: string; time: string; delay: number };

const chat: Bubble[] = [
  { from: "buyer", text: "Hola, vi Torre Mira en Instagram. ¿Precios de 2 recámaras?",                                        time: "9:47 PM", delay: 0.4 },
  { from: "agent", text: "¡Hola! Claro — los 2R van desde $185,000 USD con vista al mar. ¿Lo buscas para vivir o inversión?", time: "9:47 PM", delay: 2.8 },
  { from: "buyer", text: "Inversión 👀",                                                                                        time: "9:48 PM", delay: 4.8 },
  { from: "agent", text: "Buena elección: renta proyectada del 8% anual. ¿Te agendo visita este sábado 11 AM?",                time: "9:48 PM", delay: 7.2 },
];

const CHIP_DELAY = 10.0;

// Typing bubble — pure keyframe, no state
function TypingBubble({ showAt, hideAt, inView }: { showAt: number; hideAt: number; inView: boolean }) {
  const duration = hideAt - showAt;
  return (
    <motion.div
      className="flex justify-end overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={inView ? {
        opacity: [0, 1, 1, 0],
        height: ["0px", "36px", "36px", "0px"],
      } : {}}
      transition={{
        delay: showAt,
        duration,
        times: [0, 0.12, 0.88, 1],
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center gap-[5px] rounded-xl rounded-br-sm bg-bronze/20 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-bronze"
            animate={inView ? { y: [0, -4, 0] } : {}}
            transition={{
              delay: showAt + 0.2 + i * 0.15,
              repeat: Infinity,
              duration: 0.55,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function ChatDemo({ bare = false }: { bare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = messagesRef.current;
    if (!el) return;
    // Only scroll if content actually overflows the container
    if (el.scrollHeight > el.clientHeight + 12) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!inView) return;
    // Only trigger scroll after 3rd and 4th messages, when overflow is likely
    const timers = [5.0, 7.4, 8.8, 10.2].map((t) =>
      setTimeout(scrollToBottom, t * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const content = (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] shrink-0">
        <div className="relative shrink-0">
          <Image src="/anachat.png" alt="Mariana G." width={32} height={32} className="rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink-soft" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-cream">Mariana G.</div>
          <div className="text-[11px] text-cream/50">en línea</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">

        {/* Buyer message 1 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: chat[0].delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[12px] leading-snug bg-white/10 text-cream/90">
            {chat[0].text}
            <span className="block text-right text-[10px] mt-1 font-mono text-cream/35">{chat[0].time}</span>
          </div>
        </motion.div>

        {/* Typing indicator 1 — after buyer msg 1, before agent reply */}
        <TypingBubble showAt={1.0} hideAt={2.8} inView={inView} />

        {/* Agent message 1 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: chat[1].delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-end"
        >
          <div className="max-w-[85%] rounded-xl rounded-br-sm px-3.5 py-2.5 text-[12px] leading-snug bg-bronze text-cream">
            {chat[1].text}
            <span className="block text-right text-[10px] mt-1 font-mono text-cream/60">{chat[1].time}</span>
          </div>
        </motion.div>

        {/* Buyer message 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: chat[2].delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[12px] leading-snug bg-white/10 text-cream/90">
            {chat[2].text}
            <span className="block text-right text-[10px] mt-1 font-mono text-cream/35">{chat[2].time}</span>
          </div>
        </motion.div>

        {/* Typing indicator 2 — after buyer msg 2, before agent reply */}
        <TypingBubble showAt={5.6} hideAt={7.2} inView={inView} />

        {/* Agent message 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: chat[3].delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-end"
        >
          <div className="max-w-[85%] rounded-xl rounded-br-sm px-3.5 py-2.5 text-[12px] leading-snug bg-bronze text-cream">
            {chat[3].text}
            <span className="block text-right text-[10px] mt-1 font-mono text-cream/60">{chat[3].time}</span>
          </div>
        </motion.div>

        {/* Buyer message 3 — reply to agent */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 8.6, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[12px] leading-snug bg-white/10 text-cream/90">
            Sí! El sábado a las 11 está perfecto 🙌
            <span className="block text-right text-[10px] mt-1 font-mono text-cream/35">9:49 PM</span>
          </div>
        </motion.div>

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: CHIP_DELAY, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center pt-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-bronze/50 bg-bronze/15 px-4 py-1.5 text-[10px] tracking-[0.12em] uppercase text-bronze">
            <Check size={11} strokeWidth={3} />
            Visita agendada · 90 segundos
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
    </>
  );

  if (bare) {
    return (
      <div ref={ref} className="flex flex-col h-full">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl border border-line-dark bg-ink-soft/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="flex flex-col">
        {content}
      </div>
    </motion.div>
  );
}
