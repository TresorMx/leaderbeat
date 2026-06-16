"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const docs = [
  { label: "Script de primera respuesta WhatsApp", status: "missing" },
  { label: "Guion de seguimiento 24h / 48h / 7d",  status: "missing" },
  { label: "Proceso de calificación de leads",       status: "missing" },
  { label: "Playbook de objeciones de precio",       status: "missing" },
];

const campaigns = [
  { name: "Q1 2024", note: "Empezó desde cero" },
  { name: "Q3 2024", note: "Empezó desde cero" },
  { name: "Q1 2025", note: "Empezó desde cero" },
];

export function ProblemVisual04() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="w-full max-w-sm rounded-2xl border border-line-dark bg-ink-soft/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-cream">Playbooks · Torre Mira</div>
          <div className="text-[11px] text-cream/45">Base de conocimiento comercial</div>
        </div>
        <span className="text-[10px] font-mono text-cream/30 border border-white/10 rounded px-1.5 py-0.5">0 docs</span>
      </div>

      {/* Missing docs */}
      <div className="px-4 pt-4 pb-2 space-y-2.5">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.label}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-4 h-4 rounded border border-white/15 shrink-0 flex items-center justify-center">
              <span className="text-red-400/60 text-[10px] leading-none">—</span>
            </div>
            <span className="text-[11.5px] text-cream/40 leading-snug">{doc.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mx-4 mt-3 mb-4 rounded-lg bg-amber-500/8 border border-amber-400/20 px-3 py-2"
      >
        <p className="text-[11px] text-amber-300/70 leading-snug">
          Sin documentación, cada campaña es como la primera. El equipo improvisa, los errores se repiten.
        </p>
      </motion.div>

      {/* Campaign history */}
      <div className="border-t border-white/[0.08]">
        <div className="px-4 pt-3 pb-1">
          <span className="text-[10px] tracking-[0.12em] uppercase text-cream/25">Historial de campañas</span>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {campaigns.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 - i * 0.1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="px-4 py-2.5 flex items-center justify-between"
            >
              <span className="text-[12px] text-cream/50">{c.name}</span>
              <span className="text-[10px] text-red-300/50 italic">{c.note}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/[0.08] bg-amber-950/15">
        <p className="text-[10px] text-cream/25">El conocimiento se va con quien renuncia.</p>
      </div>
    </div>
  );
}
