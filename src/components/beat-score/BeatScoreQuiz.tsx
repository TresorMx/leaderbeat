"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitBeatScore } from "@/app/actions";
import {
  QUESTIONS,
  MODULES,
  computeScores,
  getTier,
  type Segment,
  type ModuleKey,
} from "./quiz-data";

type Phase = "segment" | "quiz" | "result";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BeatScoreQuiz() {
  const [phase, setPhase] = useState<Phase>("segment");
  const [segment, setSegment] = useState<Segment>("desarrolladora");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  const result = useMemo(
    () => (phase === "result" ? computeScores(answers) : null),
    [phase, answers]
  );

  function pickSegment(s: Segment) {
    setSegment(s);
    setPhase("quiz");
  }

  function answer(optionIdx: number) {
    const next = { ...answers, [question.id]: optionIdx };
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setPhase("result");
    }
  }

  function back() {
    if (current > 0) setCurrent(current - 1);
    else setPhase("segment");
  }

  return (
    <div className="min-h-[100svh] bg-ink text-cream flex flex-col">
      {/* Orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.14] blur-3xl orb-violet"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.10] blur-3xl orb-violet"
      />

      {/* Top bar */}
      <header className="relative z-10 container-edge h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-[13px] tracking-[0.18em] uppercase text-cream hover:text-bronze transition-colors"
        >
          Leaderbeat<span className="text-bronze">.io</span>
        </Link>
        <span className="eyebrow !text-cream/50 !tracking-[0.25em]">
          BEAT Score™
        </span>
      </header>

      {/* Progress bar */}
      {phase === "quiz" && (
        <div className="relative z-10 container-edge">
          <div className="h-px bg-line-dark w-full overflow-hidden">
            <motion.div
              className="h-full bg-bronze"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>
      )}

      <main className="relative z-10 flex-1 flex flex-col container-edge py-10 md:py-14">
        <AnimatePresence mode="wait">
          {/* ============ FASE 1 — Segmento ============ */}
          {phase === "segment" && (
            <motion.div
              key="segment"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex-1 flex flex-col justify-center max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-bronze" />
                <span className="eyebrow !text-bronze !tracking-[0.25em]">
                  Diagnóstico gratuito · 2 minutos
                </span>
              </div>
              <h1 className="display-lg !text-cream">
                ¿Qué tan lista está tu operación para{" "}
                <em className="not-italic text-bronze">vender más</em>?
              </h1>
              <p className="mt-6 text-cream/65 text-[16px] md:text-[17px] leading-relaxed max-w-[38rem]">
                12 preguntas sobre tu marca, tu proceso comercial, tu captación
                y tu automatización. Al final: tu BEAT Score, tu módulo más
                débil y qué hacer al respecto.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl">
                {(
                  [
                    {
                      key: "desarrolladora" as Segment,
                      title: "Desarrolladora",
                      desc: "Desarrollo proyectos y tengo (o quiero) equipo comercial.",
                    },
                    {
                      key: "broker" as Segment,
                      title: "Broker / Asesor",
                      desc: "Vendo propiedades de forma independiente o en una agencia.",
                    },
                  ]
                ).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => pickSegment(opt.key)}
                    className="group text-left p-6 rounded-md border border-cream/15 hover:border-bronze bg-cream/[0.02] hover:bg-bronze/10 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-bold text-xl text-cream group-hover:text-bronze transition-colors">
                        {opt.title}
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        className="text-cream/40 group-hover:text-bronze transition-colors"
                      />
                    </div>
                    <p className="text-[14px] text-cream/55 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ============ FASE 2 — Preguntas ============ */}
          {phase === "quiz" && (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex-1 flex flex-col justify-center max-w-3xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-bronze text-lg">
                    {question.module}
                  </span>
                  <span className="eyebrow !text-cream/50 !tracking-[0.25em]">
                    {MODULES[question.module].tagline}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-cream/40">
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(QUESTIONS.length).padStart(2, "0")}
                </span>
              </div>

              <h2 className="display-md !text-cream max-w-[24ch]">
                {segment === "broker" && question.brokerText
                  ? question.brokerText
                  : question.text}
              </h2>

              <div className="mt-10 flex flex-col gap-3 max-w-2xl">
                {question.options.map((opt, i) => {
                  const selected = answers[question.id] === i;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => answer(i)}
                      className={cn(
                        "group flex items-center gap-4 text-left px-5 py-4 rounded-md border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
                        selected
                          ? "border-bronze bg-bronze/10"
                          : "border-cream/15 hover:border-bronze/60 hover:bg-cream/[0.03]"
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[12px] transition-colors",
                          selected
                            ? "border-bronze text-bronze"
                            : "border-cream/25 text-cream/45 group-hover:border-bronze/60 group-hover:text-bronze"
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-[15px] text-cream/85 leading-snug">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={back}
                className="mt-10 inline-flex items-center gap-2 text-[13px] text-cream/45 hover:text-bronze transition-colors self-start"
              >
                <ArrowLeft size={14} /> Anterior
              </button>
            </motion.div>
          )}

          {/* ============ FASE 3 — Resultado ============ */}
          {phase === "result" && result && (
            <ResultView
              key="result"
              segment={segment}
              total={result.total}
              modules={result.modules}
              weakest={result.weakest}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ========================================================================= */

function ResultView({
  segment,
  total,
  modules,
  weakest,
}: {
  segment: Segment;
  total: number;
  modules: { module: ModuleKey; pct: number }[];
  weakest: ModuleKey;
}) {
  const tier = getTier(total);

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    const res = await submitBeatScore({
      ...form,
      segment,
      score: total,
      moduleScores: modules.map((m) => ({ module: m.module, pct: m.pct })),
      weakest,
    });
    if (res.ok) {
      setState("done");
    } else {
      setState("error");
      setError(res.error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl">
        {/* Score + tier */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-bronze" />
            <span className="eyebrow !text-bronze !tracking-[0.25em]">
              Tu resultado
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="font-display font-bold text-bronze leading-none"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            >
              {total}
            </motion.span>
            <span className="font-mono text-cream/40 text-lg">/ 100</span>
          </div>

          <div className="mt-6">
            <div className="eyebrow !text-cream/50 mb-2">{tier.name}</div>
            <h2 className="display-md !text-cream max-w-[16ch]">
              {tier.headline}
            </h2>
            <p className="mt-5 text-cream/65 text-[15px] leading-relaxed max-w-md">
              {tier.body}
            </p>
          </div>
        </div>

        {/* Module bars + capture */}
        <div className="lg:col-span-7">
          <div className="space-y-5 mb-12">
            {modules.map((m, i) => (
              <div key={m.module}>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-bronze">
                      {m.module}
                    </span>
                    <span className="text-[13px] text-cream/70">
                      {MODULES[m.module].name}
                      <span className="text-cream/40">
                        {" "}
                        — {MODULES[m.module].tagline}
                      </span>
                    </span>
                    {m.module === weakest && (
                      <span className="text-[10px] tracking-[0.18em] uppercase text-bronze border border-bronze/40 rounded-full px-2 py-0.5">
                        Tu punto débil
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[12px] text-cream/50">
                    {m.pct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-cream/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-bronze"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: EASE }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Lead capture */}
          {state !== "done" ? (
            <form
              onSubmit={submit}
              className="border border-cream/15 rounded-md p-6 md:p-8 bg-cream/[0.02]"
            >
              <h3 className="font-display font-bold text-xl text-cream">
                Recibe tu reporte completo
              </h3>
              <p className="mt-2 text-[14px] text-cream/55 leading-relaxed">
                {segment === "desarrolladora"
                  ? "El desglose por módulo, qué corregir primero y cómo se compara tu operación con el mercado. Sin costo."
                  : "El desglose por módulo + acceso prioritario a BEAT One: el sistema BEAT empaquetado para brokers, sin precio de agencia."}
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border border-cream/20 rounded-md px-4 py-3 text-[14px] text-cream placeholder:text-cream/35 focus:border-bronze focus:outline-none transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border border-cream/20 rounded-md px-4 py-3 text-[14px] text-cream placeholder:text-cream/35 focus:border-bronze focus:outline-none transition-colors"
                />
                <input
                  required
                  placeholder="WhatsApp (con código de país)"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                  className="sm:col-span-2 bg-transparent border border-cream/20 rounded-md px-4 py-3 text-[14px] text-cream placeholder:text-cream/35 focus:border-bronze focus:outline-none transition-colors"
                />
              </div>

              {state === "error" && (
                <p className="mt-3 text-[13px] text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex items-center gap-3 px-7 py-3.5 bg-bronze text-cream rounded-full text-[15px] font-semibold hover:bg-bronze-soft hover:scale-[1.03] transition-all duration-500 disabled:opacity-60 disabled:hover:scale-100 shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
              >
                {state === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowUpRight size={16} />
                )}
                {segment === "desarrolladora"
                  ? "Quiero mi reporte + diagnóstico"
                  : "Quiero mi reporte + acceso a BEAT One"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border border-bronze/40 rounded-md p-6 md:p-8 bg-bronze/[0.06]"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-bronze flex items-center justify-center">
                  <Check size={16} className="text-cream" />
                </span>
                <h3 className="font-display font-bold text-xl text-cream">
                  Listo. Revisa tu email.
                </h3>
              </div>
              <p className="text-[14px] text-cream/65 leading-relaxed">
                {segment === "desarrolladora"
                  ? "Tu reporte va en camino. Te contactamos en menos de 24 horas hábiles para agendar tu diagnóstico."
                  : "Tu reporte va en camino y estás en la lista prioritaria de BEAT One. Te avisamos primero."}
              </p>
              <Link
                href={segment === "broker" ? "/beat-one" : "/"}
                className="mt-5 inline-flex items-center gap-2 text-[13px] text-bronze hover:underline underline-offset-4"
              >
                {segment === "broker"
                  ? "Conoce BEAT One y el precio fundador"
                  : "Volver al inicio"}{" "}
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
