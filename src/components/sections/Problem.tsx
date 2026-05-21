"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const pains = [
  {
    n: "01",
    head: "Inviertes en pauta,",
    tail: "pero los leads se evaporan en el CRM.",
    detail: "El problema no es el costo por lead. Es que nadie los trabaja a tiempo, con el mensaje correcto, en el canal correcto. El dinero se gasta en traer leads que mueren en el inbox del broker.",
  },
  {
    n: "02",
    head: "Tu marca compite por precio,",
    tail: "no por percepción.",
    detail: "Si el comprador te compara con el de al lado solo por metros cuadrados y precio, tu marca no está haciendo su trabajo. Una marca fuerte convierte antes, a mejor precio y con menos fricción.",
  },
  {
    n: "03",
    head: "Tu equipo responde tarde,",
    tail: "mal y sin un guion común.",
    detail: "Cada broker improvisa. El lead llega y tarda horas en ser contactado. No hay script, no hay seguimiento, no hay proceso documentado. El resultado: oportunidades perdidas que nunca aparecen en el reporte.",
  },
  {
    n: "04",
    head: "Cada campaña empieza de cero",
    tail: "porque nada está documentado.",
    detail: "Sin playbooks ni templates, cada lanzamiento reinventa la rueda. El conocimiento se va con los colaboradores. Los errores se repiten. El tiempo se desperdicia en lo que ya debería estar resuelto.",
  },
];

export function Problem() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section-y bg-cream text-graphite">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">01 — El problema</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[14ch]">
            Lo que está frenando{" "}
            <em className="not-italic text-bronze">tu operación.</em>
          </h2>
        </Reveal>

        {/* Interactive rows */}
        <div className="mt-16 md:mt-20">
          {pains.map((p, i) => {
            const isActive = active === p.n;
            return (
              <Reveal key={p.n} delay={0.06 + i * 0.05}>
                <button
                  className="w-full text-left group"
                  onClick={() => setActive(isActive ? null : p.n)}
                  aria-expanded={isActive}
                >
                  <div
                    className={`border-t border-line/60 py-6 md:py-7 grid grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start transition-colors duration-300 ${
                      isActive ? "border-bronze/40" : "hover:border-bronze/30"
                    }`}
                  >
                    {/* Number */}
                    <span
                      className={`font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-none transition-colors duration-300 ${
                        isActive ? "text-bronze" : "text-line group-hover:text-bronze/40"
                      }`}
                    >
                      {p.n}
                    </span>

                    {/* Text */}
                    <div>
                      <p
                        className={`text-[clamp(1rem,2.2vw,1.4rem)] font-medium leading-snug transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-ink/80"
                        }`}
                      >
                        {p.head}{" "}
                        <span className={`transition-colors duration-300 ${isActive ? "text-mute" : "text-mute/70"}`}>
                          {p.tail}
                        </span>
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            key="detail"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[15px] text-mute leading-relaxed max-w-2xl overflow-hidden"
                          >
                            {p.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Toggle indicator */}
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center mt-1 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "border-bronze bg-bronze text-cream"
                          : "border-line text-mute group-hover:border-bronze/40"
                      }`}
                    >
                      <motion.span
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[16px] leading-none"
                      >
                        +
                      </motion.span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
          <div className="border-t border-line/60" />
        </div>

        <Reveal delay={0.25}>
          <p className="mt-14 max-w-[22ch] text-[clamp(1.4rem,3vw,2rem)] font-display font-bold text-ink leading-tight">
            Esto no es un problema de marketing.{" "}
            <span className="text-bronze">Es un problema de sistema.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
