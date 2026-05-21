"use client";

import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";

const words = "El sistema operativo comercial de las marcas inmobiliarias modernas.".split(" ");

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.04,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden bg-ink text-cream">
      {/* Violet gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle at center, #6C63FF 0%, #9B95FF 40%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle at center, #6C63FF 0%, transparent 65%)" }}
      />

      {/* Main content — takes all available space between nav and bottom strip */}
      <div className="container-edge relative flex-1 flex flex-col justify-center pt-20 pb-4">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="w-6 h-px bg-bronze" />
          <span className="eyebrow !text-bronze !tracking-[0.25em]">
            Real Estate · Estudio comercial
          </span>
        </motion.div>

        {/* Headline — clamp más ajustado para caber en viewport */}
        <h1
          className="font-display font-bold tracking-[-0.04em] leading-[0.92] max-w-[18ch]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
        >
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
                <em className="not-italic text-bronze">{word}</em>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2 + words.length * 0.04 + 0.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10"
        >
          <p className="max-w-sm text-cream/65 text-[15px] md:text-[17px] leading-relaxed">
            Construimos las marcas, los procesos y la tecnología que cierran
            ventas mientras tu competencia todavía piensa en encender pauta.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <CTAButton href="#contacto" variant="primary">
              Solicita tu diagnóstico
            </CTAButton>
            <a
              href="#sistema"
              className="text-cream/50 text-[13px] tracking-wide hover:text-bronze transition-colors"
            >
              Ver el sistema BEAT →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="container-edge relative py-4 border-t border-line-dark/50 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-cream/35"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-bronze opacity-50 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze" />
          </span>
          Operando · Proyectos activos
        </div>
        <div className="hidden sm:block">Cali · Medellín · México · US Hispanic</div>
        <div className="hidden md:block">Scroll ↓</div>
      </motion.div>
    </section>
  );
}
