"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Loader2,
  MessageSquare,
  Workflow,
  FileText,
  Gauge,
  X,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { submitBeatOneWaitlist, type BeatOneWaitlistData } from "@/app/actions";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Contenido                                                           */
/* ------------------------------------------------------------------ */

const FOUNDER_PRICE = 149; // USD/mes — precio fundador waitlist
const REGULAR_PRICE = 249; // USD/mes — precio regular post-lanzamiento

const includes = [
  {
    icon: MessageSquare,
    title: "Tu agente de primer contacto",
    body: "Responde en WhatsApp en segundos, 24/7. Califica al comprador, responde lo básico del proyecto y agenda la visita directo en tu calendario. Tú solo despiertas cuando el lead es real.",
  },
  {
    icon: Workflow,
    title: "Pipeline pre-armado",
    body: "Tu CRM configurado con el flujo BEAT: etapas, recordatorios y enrutamiento listos desde el día uno. Sin consultores, sin meses de implementación.",
  },
  {
    icon: FileText,
    title: "Scripts y plantillas del sistema",
    body: "Los mismos guiones de llamada, manejo de objeciones y cadencias de seguimiento que usamos con desarrolladoras. Copia, pega, cierra.",
  },
  {
    icon: Gauge,
    title: "Dashboard de tu operación",
    body: "Cuántos leads entraron, cuántos respondiste a tiempo, cuántas visitas agendaste. Una pantalla. Sin Excel.",
  },
];

const comparison = [
  { item: "Respuesta a leads 24/7", one: true, agency: true, alone: false },
  { item: "Activación en 48 horas", one: true, agency: false, alone: true },
  { item: "Proceso comercial documentado", one: true, agency: true, alone: false },
  { item: "Precio fijo mensual, sin contratos anuales", one: true, agency: false, alone: true },
  { item: "Costo", one: "USD 149/mes", agency: "USD 2,000+/mes", alone: "Tu tiempo" },
];

const faqs = [
  {
    q: "¿Necesito tener un CRM?",
    a: "No. Te entregamos el pipeline pre-armado sobre un CRM gratuito y lo dejamos conectado a tu WhatsApp. Si ya tienes uno, lo adaptamos al flujo BEAT.",
  },
  {
    q: "¿El agente suena a robot?",
    a: "No. Está entrenado con el contexto de tus propiedades y tu tono. Califica, responde y agenda — y cuando la conversación necesita criterio humano, te la pasa con todo el contexto.",
  },
  {
    q: "¿Qué pasa con los leads que ya tengo?",
    a: "Se importan a tu pipeline en el onboarding. Nada se pierde.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Mes a mes. Si no te hace vender más, cancelas en dos clics.",
  },
  {
    q: "¿En qué se diferencia del BEAT System completo?",
    a: "BEAT One es el sistema empaquetado: software, plantillas y onboarding. El BEAT System es nuestro equipo operando contigo — marca, pauta y automatización a medida para desarrolladoras. Mismo método, distinta escala.",
  },
];

/* ------------------------------------------------------------------ */

export function BeatOnePage() {
  return (
    <div className="bg-ink text-cream">
      {/* Orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.14] blur-3xl orb-violet"
      />

      {/* Top bar */}
      <header className="relative z-10 container-edge h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-[13px] tracking-[0.18em] uppercase text-cream hover:text-bronze transition-colors"
        >
          Leaderbeat<span className="text-bronze">.io</span>
        </Link>
        <Link
          href="/beat-score"
          className="text-[13px] text-cream/50 hover:text-bronze transition-colors"
        >
          Calcula tu BEAT Score™ →
        </Link>
      </header>

      <main className="relative z-10">
        {/* ============ HERO ============ */}
        <section className="container-edge pt-14 md:pt-20 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-bronze" />
              <span className="eyebrow !text-bronze !tracking-[0.25em]">
                BEAT One™ · Para brokers y asesores
              </span>
            </div>

            <h1 className="display-lg !text-cream max-w-[20ch]">
              El sistema de las grandes desarrolladoras,{" "}
              <em className="not-italic text-bronze">
                al precio de un broker.
              </em>
            </h1>

            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="text-cream/65 text-[16px] md:text-[17px] leading-relaxed max-w-[36rem]">
                Mientras lees esto, un comprador le escribió a tres asesores.
                Le va a comprar al que respondió primero. BEAT One responde,
                califica y agenda por ti — en segundos, a cualquier hora.
              </p>

              <div className="flex flex-col items-start gap-3">
                <a
                  href="#waitlist"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 bg-bronze text-cream rounded-full text-[15px] font-semibold hover:bg-bronze-soft hover:scale-[1.03] transition-all duration-500 shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
                >
                  Asegura el precio fundador
                  <ArrowUpRight size={16} />
                </a>
                <span className="text-[12px] text-cream/60 font-mono">
                  USD {FOUNDER_PRICE}/mes · después USD {REGULAR_PRICE}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============ QUÉ INCLUYE ============ */}
        <section className="bg-cream text-graphite section-y">
          <div className="container-edge">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-px bg-bronze" />
                <span className="eyebrow !tracking-[0.25em]">
                  01 — Qué incluye
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md max-w-[18ch]">
                Todo lo que necesitas para no perder{" "}
                <em className="not-italic text-bronze">ni un lead más.</em>
              </h2>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 gap-6">
              {includes.map((item, i) => (
                <Reveal key={item.title} delay={0.08 + i * 0.06} y={24}>
                  <div className="h-full p-7 rounded-md border border-line/60 bg-cream-deep/60 hover:border-bronze/50 transition-colors duration-300">
                    <item.icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-bronze mb-5"
                    />
                    <h3 className="font-display font-bold text-xl mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-mute leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ COMPARATIVA ============ */}
        <section className="section-y container-edge">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-bronze" />
              <span className="eyebrow !text-cream/60 !tracking-[0.25em]">
                02 — Por qué BEAT One
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md !text-cream max-w-[18ch]">
              Ni agencia cara, ni hacerlo todo{" "}
              <em className="not-italic text-bronze">tú solo.</em>
            </h2>
          </Reveal>

          {/* Mobile: cards apiladas */}
          <Reveal delay={0.12}>
            <div className="mt-10 md:hidden space-y-4">
              {comparison.map((row) => (
                <div
                  key={row.item}
                  className="rounded-md border border-line-dark/80 bg-cream/[0.02] p-5"
                >
                  <div className="text-[14px] text-cream/85 font-medium mb-4">
                    {row.item}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        ["BEAT One", row.one],
                        ["Agencia", row.agency],
                        ["Solo", row.alone],
                      ] as const
                    ).map(([label, cell], i) => (
                      <div key={label} className="flex flex-col items-start gap-1.5">
                        <span
                          className={`text-[10px] tracking-[0.15em] uppercase ${
                            i === 0 ? "text-bronze" : "text-cream/45"
                          }`}
                        >
                          {label}
                        </span>
                        {typeof cell === "boolean" ? (
                          cell ? (
                            <Check
                              size={16}
                              className={i === 0 ? "text-bronze" : "text-cream/50"}
                            />
                          ) : (
                            <X size={16} className="text-cream/25" />
                          )
                        ) : (
                          <span
                            className={`text-[12px] font-mono leading-tight ${
                              i === 0 ? "text-bronze" : "text-cream/55"
                            }`}
                          >
                            {cell}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Desktop: tabla */}
          <Reveal delay={0.12}>
            <div className="mt-12 hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line-dark">
                    <th className="py-4 pr-4 eyebrow !text-cream/50">&nbsp;</th>
                    <th className="py-4 px-4 font-display font-bold text-bronze text-lg">
                      BEAT One
                    </th>
                    <th className="py-4 px-4 text-[13px] font-medium text-cream/60">
                      Agencia
                    </th>
                    <th className="py-4 px-4 text-[13px] font-medium text-cream/60">
                      Por tu cuenta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr
                      key={row.item}
                      className="border-b border-line-dark/60"
                    >
                      <td className="py-4 pr-4 text-[14px] text-cream/75">
                        {row.item}
                      </td>
                      {([row.one, row.agency, row.alone] as const).map(
                        (cell, i) => (
                          <td key={i} className="py-4 px-4">
                            {typeof cell === "boolean" ? (
                              cell ? (
                                <Check
                                  size={17}
                                  className={
                                    i === 0 ? "text-bronze" : "text-cream/45"
                                  }
                                />
                              ) : (
                                <X size={17} className="text-cream/25" />
                              )
                            ) : (
                              <span
                                className={`text-[14px] font-mono ${
                                  i === 0 ? "text-bronze" : "text-cream/55"
                                }`}
                              >
                                {cell}
                              </span>
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* ============ WAITLIST ============ */}
        <WaitlistSection />

        {/* ============ FAQ ============ */}
        <section className="bg-cream text-graphite section-y">
          <div className="container-edge max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-px bg-bronze" />
                <span className="eyebrow !tracking-[0.25em]">
                  04 — Preguntas frecuentes
                </span>
              </div>
            </Reveal>

            <div className="space-y-0 divide-y divide-line">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={0.04 * i}>
                  <details className="group py-6">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-display font-bold text-lg pr-6">
                        {f.q}
                      </span>
                      <span className="text-bronze transition-transform duration-300 group-open:rotate-45 text-2xl leading-none shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[15px] text-mute leading-relaxed max-w-2xl">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-14 p-7 rounded-md border border-line bg-cream-deep/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <div className="font-display font-bold text-lg">
                    ¿Eres desarrolladora?
                  </div>
                  <p className="text-[14px] text-mute mt-1">
                    BEAT One es para brokers. Para proyectos, el sistema
                    completo se opera a medida.
                  </p>
                </div>
                <Link
                  href="/#contacto"
                  className="shrink-0 inline-flex items-center gap-2 text-[14px] font-semibold text-bronze hover:underline underline-offset-4"
                >
                  Conoce el BEAT System <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer mínimo */}
      <footer className="relative z-10 container-edge py-8 flex items-center justify-between text-[11px] tracking-[0.15em] uppercase text-cream/55">
        <span>© {new Date().getFullYear()} Leaderbeat</span>
        <Link href="/" className="hover:text-bronze transition-colors">
          leaderbeat.io
        </Link>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

const volumes: { value: BeatOneWaitlistData["volume"]; label: string }[] = [
  { value: "<20", label: "Menos de 20" },
  { value: "20-50", label: "20 a 50" },
  { value: "50-150", label: "50 a 150" },
  { value: "150+", label: "Más de 150" },
];

function WaitlistSection() {
  const [form, setForm] = useState<BeatOneWaitlistData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    volume: "<20",
  });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    const res = await submitBeatOneWaitlist(form);
    if (res.ok) setState("done");
    else {
      setState("error");
      setError(res.error);
    }
  }

  const inputCls =
    "bg-transparent border border-cream/20 rounded-md px-4 py-3 text-[14px] text-cream placeholder:text-cream/35 focus:border-bronze focus:outline-none transition-colors";

  return (
    <section id="waitlist" className="section-y container-edge">
      <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-bronze" />
              <span className="eyebrow !text-bronze !tracking-[0.25em]">
                03 — Acceso anticipado
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md !text-cream max-w-[14ch]">
              Precio fundador. Cupos limitados.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display font-bold text-bronze text-6xl">
                ${FOUNDER_PRICE}
              </span>
              <span className="text-cream/50 text-sm">
                USD/mes ·{" "}
                <span className="line-through">USD {REGULAR_PRICE}</span> al
                lanzar
              </span>
            </div>
            <p className="mt-5 text-cream/60 text-[14px] leading-relaxed max-w-sm">
              La primera cohorte entra con precio fundador de por vida y
              onboarding 1:1 con nuestro equipo. Cuando se llene, el precio
              sube.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {state !== "done" ? (
            <Reveal delay={0.12}>
              <form
                onSubmit={submit}
                className="border border-cream/15 rounded-md p-6 md:p-8 bg-cream/[0.02]"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={inputCls}
                  />
                  <input
                    required
                    placeholder="WhatsApp (con código de país)"
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm({ ...form, whatsapp: e.target.value })
                    }
                    className={inputCls}
                  />
                  <input
                    required
                    placeholder="Ciudad donde vendes"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="mt-6">
                  <div className="eyebrow !text-cream/50 mb-3">
                    ¿Cuántos leads manejas al mes?
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {volumes.map((v) => (
                      <button
                        key={v.value}
                        type="button"
                        onClick={() => setForm({ ...form, volume: v.value })}
                        className={`px-4 py-2 rounded-full border text-[13px] transition-all duration-300 ${
                          form.volume === v.value
                            ? "border-bronze bg-bronze/10 text-bronze"
                            : "border-cream/20 text-cream/55 hover:border-bronze/50"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {state === "error" && (
                  <p className="mt-4 text-[13px] text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="mt-7 inline-flex items-center gap-3 px-7 py-3.5 bg-bronze text-cream rounded-full text-[15px] font-semibold hover:bg-bronze-soft hover:scale-[1.03] transition-all duration-500 disabled:opacity-60 disabled:hover:scale-100 shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
                >
                  {state === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                  Entrar a la lista fundadora
                </button>
                <p className="mt-3 text-[12px] text-cream/55">
                  Sin compromiso. Solo aseguras tu lugar y el precio.
                </p>
              </form>
            </Reveal>
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
                  Estás dentro.
                </h3>
              </div>
              <p className="text-[14px] text-cream/65 leading-relaxed max-w-md">
                Tu lugar en la cohorte fundadora está reservado con el precio
                de USD {FOUNDER_PRICE}/mes. Te escribimos por WhatsApp antes
                del lanzamiento.
              </p>
              <Link
                href="/beat-score"
                className="mt-5 inline-flex items-center gap-2 text-[13px] text-bronze hover:underline underline-offset-4"
              >
                Mientras tanto: calcula tu BEAT Score™{" "}
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
