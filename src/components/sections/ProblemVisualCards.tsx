"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const leads = [
  {
    name: "Mariana G.",
    msg: "Hola! Me interesa el 2 recámaras, ¿precios?",
    time: "hace 6 h",
    badge: "Sin respuesta",
    badgeColor: "text-amber-300 bg-amber-400/10 border-amber-400/25",
    accent: "#F59E0B",
  },
  {
    name: "Carlos R.",
    msg: "¿Sigue disponible la unidad del piso 12?",
    time: "hace 14 h",
    badge: "Visto · sin respuesta",
    badgeColor: "text-orange-300 bg-orange-500/10 border-orange-400/25",
    accent: "#F97316",
  },
  {
    name: "Familia Herrera",
    msg: "Quedamos en que me mandaban el brochure…",
    time: "hace 3 días",
    badge: "Lead frío",
    badgeColor: "text-red-300 bg-red-500/10 border-red-400/25",
    accent: "#EF4444",
  },
  {
    name: "Inv. extranjero",
    msg: "Interested in pre-sale pricing. Please call.",
    time: "hace 1 semana",
    badge: "Perdido",
    badgeColor: "text-red-400/60 bg-red-900/20 border-red-700/25",
    accent: "#7F1D1D",
  },
];

export function ProblemVisualCards() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center"
      style={{ perspective: "900px", paddingTop: "2rem", paddingBottom: "2rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <div className="mb-6 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-white/30">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
        </span>
        47 leads sin respuesta · pauta activa
      </div>

      {/* Stacked cards */}
      <div className="relative w-full" style={{ height: hovered ? `${leads.length * 100}px` : "220px", transition: "height 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
        {leads.map((lead, i) => {
          const stackedY = i * -12;
          const stackedRotX = i * 6;
          const stackedScale = 1 - i * 0.04;
          const expandedY = i * 96;

          return (
            <motion.div
              key={lead.name}
              initial={{
                opacity: 0,
                y: stackedY - 40,
                rotateX: stackedRotX,
                scale: stackedScale,
              }}
              animate={inView ? {
                opacity: 1 - i * 0.18,
                y: hovered ? expandedY : stackedY,
                rotateX: hovered ? 0 : stackedRotX,
                scale: hovered ? 1 : stackedScale,
                zIndex: hovered ? leads.length - i : leads.length - i,
              } : {}}
              transition={{
                delay: inView ? 0.1 + i * 0.08 : 0,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 rounded-xl border border-white/10 bg-[#0e0e1a] px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              style={{
                transformOrigin: "50% 0%",
                borderLeftColor: lead.accent,
                borderLeftWidth: "3px",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-semibold text-white/85">{lead.name}</span>
                    <span className={`inline-block rounded-full border px-1.5 py-px text-[9px] tracking-[0.08em] uppercase ${lead.badgeColor}`}>
                      {lead.badge}
                    </span>
                  </div>
                  <p className="text-[12px] text-white/45 leading-snug truncate">{lead.msg}</p>
                </div>
                <span className="text-[10px] font-mono text-white/30 shrink-0">{lead.time}</span>
              </div>

              {/* No response indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[10px] text-white/20 italic">sin respuesta</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Costo perdido */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 flex items-center gap-3 rounded-full border border-red-500/20 bg-red-950/30 px-5 py-2.5"
      >
        <span className="text-[11px] text-white/40">Inversión quemada</span>
        <span className="font-mono font-bold text-[14px] text-red-300">$4,200 USD</span>
        <span className="text-white/20">·</span>
        <span className="text-[11px] text-white/40">0 visitas</span>
      </motion.div>
    </div>
  );
}
