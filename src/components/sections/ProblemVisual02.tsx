"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const searches = [
  { query: '"departamentos baratos cancún"', pct: 71 },
  { query: '"torre mira cancún"',           pct: 18 },
  { query: '"preventa cancún vista al mar"', pct: 11 },
];

const competitors = [
  { name: "Tu proyecto", price: "$185,000", anchor: "precio/m²", dim: false },
  { name: "Competencia A", price: "$183,000", anchor: "precio/m²", dim: true },
  { name: "Competencia B", price: "$179,000", anchor: "precio/m²", dim: true },
];

export function ProblemVisual02() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="w-full max-w-sm rounded-2xl border border-line-dark bg-ink-soft/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.08]">
        <div className="text-[13px] font-semibold text-cream mb-0.5">¿Cómo te encuentra el comprador?</div>
        <div className="text-[11px] text-cream/45">Búsquedas orgánicas · últimos 30 días</div>
      </div>

      {/* Search intent */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        {searches.map((s, i) => (
          <motion.div
            key={s.query}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-cream/60 font-mono">{s.query}</span>
              <span className="text-[11px] font-bold text-cream/70">{s.pct}%</span>
            </div>
            <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? "bg-red-400" : i === 1 ? "bg-bronze" : "bg-bronze/40"}`}
                initial={{ width: "0%" }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ delay: 0.3 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight chip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mx-4 mb-4 rounded-lg bg-red-500/8 border border-red-400/20 px-3 py-2"
      >
        <p className="text-[11px] text-red-300/80 leading-snug">
          71% te busca por precio. Tu marca no está en la ecuación — solo tu número.
        </p>
      </motion.div>

      {/* Competitor comparison */}
      <div className="border-t border-white/[0.08] divide-y divide-white/[0.05]">
        {competitors.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: c.dim ? 0.4 : 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            className="px-4 py-2.5 flex items-center justify-between"
          >
            <div>
              <div className={`text-[12px] font-medium ${i === 0 ? "text-cream" : "text-cream/60"}`}>{c.name}</div>
              <div className="text-[10px] text-cream/30">{c.anchor}</div>
            </div>
            <span className={`font-mono text-[13px] font-bold ${i === 0 ? "text-bronze" : "text-cream/40"}`}>{c.price}</span>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/[0.08] bg-amber-950/20">
        <p className="text-[10px] text-cream/30 leading-relaxed">Sin marca, eres un número más en una hoja de comparación.</p>
      </div>
    </div>
  );
}
