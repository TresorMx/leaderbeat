"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProblemVisual01 } from "@/components/sections/ProblemVisual01";
import { ProblemVisual02 } from "@/components/sections/ProblemVisual02";
import { ProblemVisualTimeline } from "@/components/sections/ProblemVisualTimeline";
import { ProblemVisual04 } from "@/components/sections/ProblemVisual04";

const pains = [
  {
    n: "01",
    head: "Leads que se evaporan",
    detail: "Inviertes en pauta pero nadie los trabaja a tiempo ni con el mensaje correcto. El dinero muere en el inbox del broker.",
  },
  {
    n: "02",
    head: "Compites por precio",
    detail: "Si el comprador te compara solo por metros y precio, tu marca no está haciendo su trabajo.",
  },
  {
    n: "03",
    head: "Sin guion común",
    detail: "Cada broker improvisa. No hay script, no hay seguimiento. Las oportunidades desaparecen.",
  },
  {
    n: "04",
    head: "Cada campaña desde cero",
    detail: "Sin playbooks, los errores se repiten y el conocimiento se va con quien renuncia.",
  },
];

const AUTO_PLAY = 5000;

const VISUALS = [
  () => <ProblemVisual01 />,
  () => <ProblemVisual02 />,
  () => <ProblemVisualTimeline />,
  () => <ProblemVisual04 />,
];

const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? "6%" : "-6%", opacity: 0, scale: 0.98 }),
  center: { y: 0, opacity: 1, scale: 1, zIndex: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? "-6%" : "6%", opacity: 0, scale: 0.98, zIndex: 0 }),
};

export function Problem() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((i) => (i + 1) % pains.length);
  }, []);

  const handleTabClick = (idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(handleNext, AUTO_PLAY);
    return () => clearInterval(t);
  }, [activeIdx, isPaused, handleNext]);

  return (
    <section className="section-y bg-cream text-graphite">
      <div className="container-edge">

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 flex flex-col">

            <div className="mb-10">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-bronze" />
                  <span className="eyebrow !tracking-[0.25em]">01 — El problema</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="display-md max-w-[18ch]">
                  Lo que frena tu operación{" "}
                  <em className="not-italic text-bronze">hoy.</em>
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col">
              {pains.map((p, i) => {
                const isActive = activeIdx === i;
                return (
                  <Reveal key={p.n} delay={0.04 + i * 0.04}>
                    <button
                      onClick={() => handleTabClick(i)}
                      className={`
                        group relative flex items-start gap-5 py-6 pl-[52px] text-left
                        border-t border-ink/10 first:border-0
                        transition-all duration-500
                        ${isActive ? "text-ink" : "text-ink/35 hover:text-ink/65"}
                      `}
                    >
                      {/* Left progress rail */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-ink/8 rounded-full overflow-hidden">
                        {isActive && (
                          <motion.div
                            key={`rail-${i}-${isPaused}`}
                            className="absolute top-0 left-0 w-full bg-bronze origin-top"
                            initial={{ height: "0%" }}
                            animate={isPaused ? { height: "0%" } : { height: "100%" }}
                            transition={{ duration: AUTO_PLAY / 1000, ease: "linear" }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Number + title on same row, number centered to title */}
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-bold tracking-[0.2em] shrink-0 transition-colors duration-300 ${isActive ? "text-bronze" : "text-[#9B8FFF]/50"}`}>
                            {p.n}
                          </span>
                          <p className="text-[22px] md:text-[26px] font-display font-medium leading-tight tracking-tight">
                            {p.head}
                          </p>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              key="detail"
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                              className="text-[13px] text-mute leading-relaxed overflow-hidden max-w-xs pl-8"
                            >
                              {p.detail}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-10 text-[15px] md:text-[17px] font-display font-bold text-ink leading-tight max-w-[22ch]">
                No es un problema de marketing.{" "}
                <span className="text-bronze">Es un problema de sistema.</span>
              </p>
            </Reveal>
          </div>

          {/* RIGHT — visual with vertical slide */}
          <div
            className="hidden lg:flex lg:col-span-7 justify-center items-start sticky top-28 self-start"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 280, damping: 30 },
                    opacity: { duration: 0.35 },
                    scale: { duration: 0.35 },
                  }}
                  className="w-full flex justify-center"
                >
                  {VISUALS[activeIdx]()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
