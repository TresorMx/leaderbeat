"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const phases = [
  {
    n: "01",
    name: "Diagnóstico",
    time: "Semanas 1–2",
    icon: "◎",
    body: "Auditamos marca, datos, stack, pipeline y equipo. Devolvemos un blueprint con prioridades, caso de inversión y roadmap claro.",
    items: [
      "Auditoría de marca y posicionamiento actual",
      "Análisis del pipeline y tasa de conversión",
      "Revisión del stack tecnológico y CRM",
      "Entrevistas con equipo comercial",
      "Blueprint con roadmap y caso de inversión",
    ],
  },
  {
    n: "02",
    name: "Diseño",
    time: "Semanas 3–5",
    icon: "◈",
    body: "Diseñamos el sistema BEAT a la medida del proyecto. Cada decisión se valida con el equipo comercial antes de construir.",
    items: [
      "Arquitectura de marca y sistema visual",
      "Diseño del flujo comercial por etapa",
      "Estructura de campañas y creativos",
      "Configuración de automatizaciones",
      "Validación con equipo antes de ejecutar",
    ],
  },
  {
    n: "03",
    name: "Instalación",
    time: "Semanas 6–10",
    icon: "◐",
    body: "Construimos, configuramos y lanzamos. Entrenamos al equipo hasta que el sistema corre solo. Todo queda documentado.",
    items: [
      "Construcción de identidad y aplicaciones",
      "Configuración y limpieza del pipeline",
      "Lanzamiento de campañas y landings",
      "Instalación de agente conversacional",
      "Entrenamiento al equipo + documentación",
    ],
  },
  {
    n: "04",
    name: "Operación",
    time: "Mes 3 en adelante",
    icon: "◉",
    body: "Corremos el motor contigo. Revisión mensual ejecutiva, optimización continua y nuevas iniciativas trimestrales.",
    items: [
      "Reunión ejecutiva mensual con métricas",
      "Optimización continua de pauta y proceso",
      "A/B testing de creativos y mensajes",
      "Iniciativas trimestrales medidas vs negocio",
      "Soporte directo al equipo comercial",
    ],
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const current = phases[active];

  return (
    <section id="proceso" className="section-y bg-cream-deep text-graphite">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">03 — Cómo trabajamos</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[16ch]">
            Cuatro fases.{" "}
            <em className="not-italic text-bronze">Un sistema.</em>
          </h2>
        </Reveal>

        {/* Step tabs */}
        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {phases.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.n}
                  onClick={() => setActive(i)}
                  className={`relative text-left p-4 md:p-5 rounded-xl border transition-all duration-400 ${
                    isActive
                      ? "border-bronze/60 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] text-cream shadow-[0_4px_24px_rgba(108,99,255,0.18)]"
                      : "border-line/60 bg-gradient-to-br from-white to-[#f8f8fd] hover:border-bronze/30 hover:shadow-sm"
                  }`}
                >
                  {/* Progress dot */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] tracking-[0.2em] uppercase font-medium ${isActive ? "text-bronze" : "text-mute"}`}>
                      {p.n}
                    </span>
                    <span className={`text-lg ${isActive ? "text-bronze" : "text-line"}`}>{p.icon}</span>
                  </div>
                  <div className={`font-display font-bold text-[15px] md:text-[17px] ${isActive ? "text-cream" : "text-ink"}`}>
                    {p.name}
                  </div>
                  <div className={`mt-1 text-[11px] tracking-wide ${isActive ? "text-cream/50" : "text-mute"}`}>
                    {p.time}
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Content panel */}
        <Reveal delay={0.15}>
          <div className="mt-6 md:mt-8 rounded-2xl border border-line/60 bg-gradient-to-br from-white to-[#f8f8fd] overflow-hidden shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 md:p-10 grid md:grid-cols-12 gap-8 md:gap-12"
              >
                {/* Left: description */}
                <div className="md:col-span-5">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-bronze leading-none">
                      {current.n}
                    </span>
                    <span className="display-md text-ink">{current.name}</span>
                  </div>
                  <p className="text-[16px] text-mute leading-relaxed mt-2">
                    {current.body}
                  </p>
                </div>

                {/* Right: deliverables */}
                <div className="md:col-span-7">
                  <div className="eyebrow !tracking-[0.2em] !text-mute mb-5">
                    Entregables de esta fase
                  </div>
                  <ul className="space-y-3">
                    {current.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 text-[15px] text-ink/80 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom progress bar */}
            <div className="h-1 bg-line/40 mx-0">
              <motion.div
                className="h-full bg-bronze rounded-full"
                animate={{ width: `${((active + 1) / phases.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
