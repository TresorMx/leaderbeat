"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const pains = [
  {
    n: "01",
    head: "Inviertes en pauta,",
    tail: "pero los leads se evaporan en el CRM.",
    detail: "El problema no es el costo por lead — es que nadie los trabaja a tiempo ni con el mensaje correcto. El dinero muere en el inbox del broker.",
  },
  {
    n: "02",
    head: "Tu marca compite por precio,",
    tail: "no por percepción.",
    detail: "Si el comprador te compara solo por metros y precio, tu marca no está haciendo su trabajo. Una marca fuerte convierte antes, mejor y con menos fricción.",
  },
  {
    n: "03",
    head: "Tu equipo responde tarde,",
    tail: "mal y sin un guion común.",
    detail: "Cada broker improvisa. No hay script, no hay seguimiento, no hay proceso. Oportunidades perdidas que nunca aparecen en el reporte.",
  },
  {
    n: "04",
    head: "Cada campaña empieza de cero",
    tail: "porque nada está documentado.",
    detail: "Sin playbooks ni templates, el conocimiento se va con los colaboradores. Los errores se repiten y el tiempo se desperdicia en lo ya resuelto.",
  },
];

export function Problem() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section-y bg-cream text-graphite">
      <div className="container-edge">
        {/* Two-column: content left, visual right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* LEFT — content */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-bronze" />
                <span className="eyebrow !tracking-[0.25em]">01 — El problema</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="display-md max-w-[16ch] mb-10">
                Lo que frena tu operación{" "}
                <em className="not-italic text-bronze">hoy.</em>
              </h2>
            </Reveal>

            {/* Problem rows — compact */}
            <div>
              {pains.map((p, i) => {
                const isActive = active === p.n;
                return (
                  <Reveal key={p.n} delay={0.06 + i * 0.04}>
                    <button
                      className="w-full text-left group"
                      onClick={() => setActive(isActive ? null : p.n)}
                    >
                      <div className={`border-t border-line/60 py-4 grid grid-cols-[2rem_1fr_1.5rem] gap-3 items-start transition-colors duration-300 ${isActive ? "border-bronze/30" : "hover:border-bronze/20"}`}>
                        <span className={`text-[11px] font-bold tracking-[0.15em] mt-1 transition-colors duration-300 ${isActive ? "text-bronze" : "text-line group-hover:text-bronze/40"}`}>
                          {p.n}
                        </span>
                        <div>
                          <p className="text-[14px] md:text-[15px] font-medium leading-snug text-ink/80">
                            {p.head}{" "}
                            <span className="text-mute font-normal">{p.tail}</span>
                          </p>
                          <AnimatePresence>
                            {isActive && (
                              <motion.p
                                key="detail"
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[13px] text-mute leading-relaxed overflow-hidden"
                              >
                                {p.detail}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <motion.div
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={`text-[18px] leading-none mt-0.5 transition-colors duration-300 ${isActive ? "text-bronze" : "text-line group-hover:text-bronze/40"}`}
                        >
                          +
                        </motion.div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
              <div className="border-t border-line/60" />
            </div>

            <Reveal delay={0.25}>
              <p className="mt-8 text-[16px] md:text-[18px] font-display font-bold text-ink leading-tight max-w-[22ch]">
                No es un problema de marketing.{" "}
                <span className="text-bronze">Es un problema de sistema.</span>
              </p>
            </Reveal>
          </div>

          {/* RIGHT — visual */}
          <Reveal delay={0.1} className="hidden md:block sticky top-28 self-start">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#0F0F18] via-[#16162A] to-[#0A0A14]">
              {/* Violet glow */}
              <div
                aria-hidden
                className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full opacity-25 blur-3xl"
                style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
              />
              <div
                aria-hidden
                className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full opacity-15 blur-2xl"
                style={{ background: "radial-gradient(circle, #9B95FF 0%, transparent 70%)" }}
              />

              {/* Geometric architectural lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 400 533"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor plan lines */}
                <rect x="60" y="80" width="280" height="180" stroke="#6C63FF" strokeWidth="0.8" />
                <rect x="80" y="100" width="100" height="140" stroke="#9B95FF" strokeWidth="0.5" />
                <rect x="200" y="100" width="120" height="60" stroke="#9B95FF" strokeWidth="0.5" />
                <rect x="200" y="180" width="120" height="60" stroke="#9B95FF" strokeWidth="0.5" />
                <line x1="60" y1="260" x2="340" y2="260" stroke="#6C63FF" strokeWidth="0.5" />
                {/* Lower section */}
                <rect x="60" y="300" width="130" height="150" stroke="#6C63FF" strokeWidth="0.8" />
                <rect x="210" y="300" width="130" height="150" stroke="#6C63FF" strokeWidth="0.8" />
                <line x1="60" y1="375" x2="190" y2="375" stroke="#9B95FF" strokeWidth="0.4" />
                <line x1="210" y1="375" x2="340" y2="375" stroke="#9B95FF" strokeWidth="0.4" />
                {/* Grid dots */}
                {[120,200,280].map(x => [140,220,300,380].map(y => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#6C63FF" opacity="0.4" />
                )))}
              </svg>

              {/* Label overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-1">
                  Sistema comercial activo
                </div>
                <div className="text-[22px] font-display font-bold text-white/80 leading-tight">
                  BEAT<span className="text-bronze">.</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {["Marca", "CRM", "Pauta", "Auto"].map((t) => (
                    <span key={t} className="px-2 py-1 rounded-full text-[10px] font-medium text-white/50 bg-white/5 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
