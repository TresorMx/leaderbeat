"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";

type HeadlinePart = { text: string; accent?: boolean };
type HeadlineLine = HeadlinePart[];

const headline: HeadlineLine[] = [
  [{ text: "Tu lead esperó" }],
  [{ text: "6 horas.", accent: true }],
  [{ text: "Tu competencia" }],
  [{ text: "respondió en " }, { text: "90 segundos.", accent: true }],
];

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ------------------------------------------------------------------ */
/* Chat demo — la prueba del headline                                  */
/* ------------------------------------------------------------------ */

type Bubble = {
  from: "buyer" | "agent";
  text: string;
  time: string;
};

const chat: Bubble[] = [
  {
    from: "buyer",
    text: "Hola, vi Torre Mira en Instagram. ¿Precios de 2 recámaras?",
    time: "9:47 PM",
  },
  {
    from: "agent",
    text: "¡Hola! Claro — los 2R van desde $185,000 USD con vista al mar. ¿Lo buscas para vivir o como inversión?",
    time: "9:47 PM",
  },
  { from: "buyer", text: "Inversión 👀", time: "9:48 PM" },
  {
    from: "agent",
    text: "Buena elección: renta proyectada del 8% anual. ¿Te agendo visita este sábado 11 AM? Te aparto el lugar.",
    time: "9:48 PM",
  },
];

const CHAT_START = 1.3; // arranca cuando el headline ya casi terminó
const BUBBLE_GAP = 0.55;

function ChatDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: CHAT_START - 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl border border-line-dark bg-ink-soft/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-line-dark/70">
        <div className="relative w-8 h-8 rounded-full bg-bronze/25 flex items-center justify-center font-display font-bold text-bronze text-sm">
          TM
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink-soft" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-cream">
            Torre Mira · Ventas
          </div>
          <div className="text-[11px] text-cream/55">
            en línea · responde en segundos
          </div>
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-cream/45 font-mono">
          WhatsApp
        </span>
      </div>

      {/* Messages */}
      <div className="px-4 py-5 space-y-3">
        {chat.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: CHAT_START + i * BUBBLE_GAP,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex ${b.from === "agent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-snug ${
                b.from === "agent"
                  ? "bg-bronze text-cream rounded-br-sm"
                  : "bg-cream/10 text-cream/90 rounded-bl-sm"
              }`}
            >
              {b.text}
              <span
                className={`block text-right text-[10px] mt-1 font-mono ${
                  b.from === "agent" ? "text-cream/65" : "text-cream/40"
                }`}
              >
                {b.time}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: CHAT_START + chat.length * BUBBLE_GAP + 0.3,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex justify-center pt-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-bronze/50 bg-bronze/15 px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase text-bronze">
            <Check size={12} strokeWidth={3} />
            Visita agendada · 90 segundos
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Counting number — slot machine style                                 */
/* ------------------------------------------------------------------ */

function CountingHours() {
  const [count, setCount] = useState(1);
  const target = 6;

  useEffect(() => {
    // arranca después del delay de la línea 1 (0.3s) + un poco más
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= target) { clearInterval(interval); return c; }
          return c + 1;
        });
      }, 180);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(start);
  }, []);

  return (
    <span className="inline-flex items-baseline overflow-hidden" style={{ verticalAlign: "baseline" }}>
      <span className="relative inline-block" style={{ minWidth: "0.6em" }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="inline-block"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden text-cream">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #0d0d0f 40%, #3d1a6e 100%)" }}
        />

        {/* Pulsing radial overlays */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 80%),
              radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 80%)
            `,
            backgroundSize: "100% 100%",
            animation: "aurora-pulse 10s infinite",
          }}
        />

        {/* Animated blobs */}
        <motion.div className="absolute inset-0 mix-blend-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl opacity-35"
            style={{ background: "#6C63FF" }}
            animate={{ x: [-50, 50, -50], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl opacity-35"
            style={{ background: "#9B35B5" }}
            animate={{ x: [50, -50, 50], y: [20, -20, 20], scale: [1, 1.3, 1] }}
            transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full blur-3xl opacity-25"
            style={{ background: "#4F46E5" }}
            animate={{ x: [20, -20, 20], y: [-30, 30, -30], rotate: [0, 360, 0] }}
            transition={{ duration: 50, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </motion.div>

        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            initial={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              opacity: 0,
            }}
            animate={{ opacity: [0, (((i * 7) % 8) + 2) / 10, 0] }}
            transition={{
              duration: (i % 3) + 2,
              repeat: Infinity,
              delay: (i * 0.17) % 5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container-edge relative flex-1 flex items-center lg:items-stretch pt-20 pb-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-end w-full">
          {/* Left — copy */}
          <div className="lg:col-span-8 lg:self-center pb-8 text-center lg:text-left">
            {/* Logo — solo visible en móvil */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:hidden mb-6"
            >
              <Image src="/leaderbeat.svg" alt="Leaderbeat" width={237} height={55} priority />
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-[clamp(1rem,2.5vh,2rem)]"
            >
              <span className="w-6 h-px bg-bronze" />
              <span className="eyebrow !text-bronze !tracking-[0.25em]">
                Sistema Comercial Inmobiliario
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display font-bold tracking-[-0.04em] leading-[1.05]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw + 1vh, 4.2rem)" }}
            >
              {headline.map((line, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={lineVariants}
                  className="block"
                >
                  {i === 1 ? (
                    <em className="not-italic text-bronze">
                      <CountingHours /> horas.
                    </em>
                  ) : line.map((part, j) =>
                    part.accent ? (
                      <em key={j} className="not-italic text-bronze">{part.text}</em>
                    ) : (
                      <span key={j}>{part.text}</span>
                    )
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Tagline + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + headline.length * 0.1 + 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-[clamp(1.25rem,3vh,2.5rem)]"
            >
              <p className="text-cream/65 leading-relaxed max-w-none" style={{ fontSize: "clamp(13px, 1.5vw + 0.5vh, 17px)" }}>
                Leaderbeat es el sistema operativo comercial de las marcas
                inmobiliarias: marca, proceso, captación y automatización
                operando como una sola máquina — para que ningún lead vuelva a
                esperar.
              </p>

              <div className="mt-[clamp(1.25rem,3vh,2rem)] flex flex-col sm:flex-row items-center gap-4">
                <CTAButton href="#contacto" variant="primary">
                  Solicita tu diagnóstico
                </CTAButton>
                <a
                  href="/beat-score"
                  className="text-cream/60 text-[13px] tracking-wide hover:text-bronze transition-colors"
                >
                  Calcula tu BEAT Score™ gratis →
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — hero image (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-end self-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{
                maskImage: "linear-gradient(to top, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 12%), linear-gradient(to left, transparent 0%, black 12%)",
                maskComposite: "intersect",
                WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 12%), linear-gradient(to left, transparent 0%, black 12%)",
                WebkitMaskComposite: "source-in",
              }}
            >
              <Image
                src="/migue.png"
                alt="Migue"
                width={480}
                height={600}
                className="object-contain object-bottom opacity-75"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="container-edge relative py-4 border-t border-[#9B8FFF]/40 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-cream/55"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-bronze opacity-50 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze" />
          </span>
          Operando · Proyectos activos
        </div>
        <div className="hidden sm:block">Cancún · México · US Hispanic</div>
        <div className="hidden md:block">Scroll ↓</div>
      </motion.div>
    </section>
  );
}
