"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const leads = [
  { name: "Mariana G.",    msg: "Hola! Me interesa el 2 recámaras…",         time: "6h",  pct: 20 },
  { name: "Carlos R.",     msg: "¿Sigue disponible la unidad del piso 12?",   time: "14h", pct: 55 },
  { name: "Familia Herrera",msg: "Quedamos en que me mandaban el brochure…",  time: "3d",  pct: 80 },
  { name: "Inv. extranjero",msg: "Interested in pre-sale pricing. Please call.",time: "1wk",pct: 100},
];

export function ProblemVisual01() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="w-full max-w-sm rounded-2xl border border-line-dark bg-ink-soft/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div>
          <div className="text-[13px] font-semibold text-cream">Torre Mira · CRM</div>
          <div className="text-[11px] text-cream/45">47 leads sin responder · pauta activa</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-400/30 px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-red-300">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Lead rows */}
      <div className="divide-y divide-white/[0.06]">
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1 - i * 0.18, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-cream/80 mb-0.5">{lead.name}</div>
                <p className="text-[11px] text-cream/40 truncate">{lead.msg}</p>
              </div>
              <span className="text-[10px] font-mono text-cream/30 shrink-0">{lead.time}</span>
            </div>
            <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500"
                initial={{ width: "0%" }}
                animate={inView ? { width: `${lead.pct}%` } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.08] flex items-center justify-between bg-red-950/20">
        <div>
          <div className="text-[10px] tracking-[0.1em] uppercase text-cream/30 mb-0.5">Inversión quemada</div>
          <span className="font-mono font-bold text-[14px] text-red-300">$4,200 USD</span>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.1em] uppercase text-cream/30 mb-0.5">Visitas generadas</div>
          <span className="font-display font-bold text-[22px] text-red-400/70 leading-none">0</span>
        </div>
      </div>
    </div>
  );
}
