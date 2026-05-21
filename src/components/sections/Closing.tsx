"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";

const headline = ["El próximo proyecto", "que lances", "no debería", "empezar de cero."];

export function Closing() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax sutil del título
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-cream py-32 md:py-48 overflow-hidden"
    >
      {/* Gradient orbs (matching hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-bronze) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.05] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cream) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <span className="w-8 h-px bg-bronze" />
          <span className="eyebrow !text-bronze !tracking-[0.25em]">
            08 — Cierre
          </span>
        </motion.div>

        {/* Headline cinematográfica */}
        <motion.h2 style={{ y, opacity }} className="display-md max-w-[20ch]">
          {headline.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              {i === headline.length - 1 ? (
                <em className="not-italic text-bronze font-normal">{line}</em>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </motion.h2>

        {/* Two-column bottom: manifesto + CTA */}
        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <p className="text-cream/70 text-[18px] md:text-[20px] leading-relaxed max-w-xl">
              Si llegaste hasta acá, probablemente ya entendiste que no vendemos
              servicios sueltos. Vendemos un sistema que se queda operando contigo.
              <br /><br />
              <span className="text-cream">Hablemos.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex flex-col items-start gap-6"
          >
            <CTAButton href="#contacto" variant="inverse">
              Solicita tu diagnóstico
            </CTAButton>

            <div className="text-cream/40 text-[13px] tracking-wide">
              o escríbenos a{" "}
              <a
                href="mailto:hola@leaderbeat.io"
                className="text-bronze hover:text-cream transition-colors"
              >
                hola@leaderbeat.io
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom signature strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 md:mt-32 pt-6 border-t border-line-dark/60 flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-cream/40"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-bronze opacity-50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
            </span>
            Operando · Tomando 2 proyectos / trimestre
          </div>
          <div>LEADERBEAT.IO · 2026</div>
        </motion.div>
      </div>
    </section>
  );
}
