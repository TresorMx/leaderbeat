"use client";

import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";

const headline = "El sistema operativo comercial de las marcas inmobiliarias modernas.";

// Splits headline into words for stagger reveal
const words = headline.split(" ");

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25 + i * 0.045,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-ink text-cream pt-28 md:pt-36 pb-12">
      {/* Subtle gradient orb for depth — pure CSS, no images */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-bronze) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.05] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cream) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-bronze" />
          <span className="eyebrow !text-bronze !tracking-[0.25em]">
            Real Estate · Estudio comercial
          </span>
        </motion.div>

        {/* Massive headline with word-stagger reveal */}
        <h1 className="display-xl max-w-[18ch]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="show"
              variants={wordVariants}
              className="inline-block mr-[0.22em]"
            >
              {word === "modernas." ? (
                <em className="not-italic text-bronze font-normal">{word}</em>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Tagline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25 + words.length * 0.045 + 0.2,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <p className="max-w-md text-cream/70 text-[17px] leading-relaxed">
            Construimos las marcas, los procesos y la tecnología discreta que cierran ventas
            mientras tu competencia todavía piensa en encender pauta.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <CTAButton href="#contacto" variant="inverse">
              Solicita tu diagnóstico
            </CTAButton>
            <a
              href="#sistema"
              className="text-cream/60 text-[14px] tracking-wide hover:text-bronze transition-colors"
            >
              o conoce el sistema BEAT →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip — live indicator + scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="container-edge relative mt-16 md:mt-24 pt-6 border-t border-line-dark/60 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-cream/40"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-bronze opacity-50 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
          </span>
          Operando · Proyectos activos
        </div>
        <div className="hidden sm:block">
          Cali · Medellín · México · US Hispanic
        </div>
        <div className="hidden md:block">
          Scroll ↓
        </div>
      </motion.div>
    </section>
  );
}
