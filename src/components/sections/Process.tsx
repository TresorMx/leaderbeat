"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const phases = [
  {
    n: "01",
    name: "Diagnóstico",
    time: "Semanas 1–2",
    body:
      "Auditamos marca, datos, stack, pipeline y equipo. Devolvemos un blueprint con prioridades, caso de inversión y roadmap. Ideal antes de un lanzamiento o un cambio de operación.",
  },
  {
    n: "02",
    name: "Diseño",
    time: "Semanas 3–5",
    body:
      "Diseñamos el sistema BEAT a la medida del proyecto. Validamos cada decisión con el equipo comercial antes de construir. Nada se ejecuta sin alineación interna.",
  },
  {
    n: "03",
    name: "Instalación",
    time: "Semanas 6–10",
    body:
      "Construimos marca, configuramos el motor, lanzamos campañas y entrenamos al equipo hasta que el sistema opera sin nosotros encima. Documentamos todo.",
  },
  {
    n: "04",
    name: "Operación",
    time: "Mes 3 en adelante",
    body:
      "Corremos el motor contigo. Revisión mensual ejecutiva, optimización continua de pauta y proceso, nuevas iniciativas trimestrales medidas contra negocio.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax on the progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="proceso" className="section-y bg-cream text-graphite">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">03 — Cómo trabajamos</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[18ch]">
            Del diagnóstico a la operación,{" "}
            <em className="not-italic text-bronze font-normal">en cuatro fases.</em>
          </h2>
        </Reveal>

        {/* Timeline with animated progress line */}
        <div ref={sectionRef} className="relative mt-20 md:mt-28">
          {/* Static rail */}
          <div className="absolute left-[14px] md:left-1/2 top-2 bottom-2 w-px bg-line/70 md:-translate-x-1/2" />

          {/* Animated progress fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[14px] md:left-1/2 top-2 w-px bg-bronze origin-top md:-translate-x-1/2"
          />

          <div className="space-y-20 md:space-y-32">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={0.05 + i * 0.04} y={28}>
                <div
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-20 items-start ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute left-[14px] md:left-1/2 top-2 w-3 h-3 rounded-full bg-bronze ring-4 ring-cream md:-translate-x-1/2 z-10" />

                  {/* Content card */}
                  <div className={`pl-12 md:pl-0 md:[direction:ltr] ${i % 2 === 1 ? "md:pr-16" : "md:pl-16"}`}>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-display italic text-3xl text-bronze">{p.n}</span>
                      <span className="eyebrow !tracking-[0.25em] !text-mute">
                        {p.time}
                      </span>
                    </div>
                    <h3 className="display-md mb-5">{p.name}</h3>
                    <p className="text-[16px] text-mute leading-relaxed max-w-md">
                      {p.body}
                    </p>
                  </div>

                  {/* Empty side — keeps zigzag layout breathing room */}
                  <div className="hidden md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
