"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const leads = [
  {
    name: "Mariana G.",
    msg: "Hola! Me interesa el 2 recámaras, ¿precios?",
    hoursAgo: 6,
    barPct: 25,
    barColor: "bg-amber-400",
    badge: "Sin respuesta",
    badgeColor: "text-amber-300 bg-amber-400/10 border-amber-400/25",
  },
  {
    name: "Carlos R.",
    msg: "¿Sigue disponible la unidad del piso 12?",
    hoursAgo: 14,
    barPct: 55,
    barColor: "bg-orange-500",
    badge: "Visto · sin respuesta",
    badgeColor: "text-orange-300 bg-orange-500/10 border-orange-400/25",
  },
  {
    name: "Familia Herrera",
    msg: "Quedamos en que me mandaban el brochure…",
    hoursAgo: 72,
    barPct: 80,
    barColor: "bg-red-500",
    badge: "Lead frío",
    badgeColor: "text-red-300 bg-red-500/10 border-red-400/25",
  },
  {
    name: "Inv. extranjero",
    msg: "Interested in pre-sale pricing. Please call.",
    hoursAgo: 168,
    barPct: 100,
    barColor: "bg-red-700",
    badge: "Perdido",
    badgeColor: "text-red-400/70 bg-red-900/20 border-red-700/25",
  },
];

function CostTicker({ inView }: { inView: boolean }) {
  const [cost, setCost] = useState(4200);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setCost((c) => +(c + 0.14).toFixed(2));
    }, 80);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <span className="font-mono text-[15px] font-bold text-red-300 tabular-nums">
      ${cost.toFixed(2)} USD
    </span>
  );
}

export function ProblemVisualDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
    >
      {/* Violet glow */}
      <div aria-hidden className="pointer-events-none absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full opacity-[0.15] blur-3xl" style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }} />

      {/* ── TOP METRICS ── */}
      <div className="relative grid grid-cols-3 divide-x divide-white/[0.08] border-b border-white/[0.08]">
        {[
          { label: "Sin responder", value: "47", sub: "leads activos", color: "text-white" },
          { label: "Tasa de respuesta", value: "0%", sub: "este mes", color: "text-red-400" },
          { label: "Pauta corriendo", value: "LIVE", sub: "dinero saliendo", color: "text-emerald-400", pulse: true },
        ].map((m) => (
          <div key={m.label} className="px-4 py-4 flex flex-col gap-0.5">
            <span className="text-[10px] tracking-[0.12em] uppercase text-white/35">{m.label}</span>
            <span className={`font-display font-bold text-[22px] leading-none ${m.color} flex items-center gap-1.5`}>
              {m.pulse && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              )}
              {m.value}
            </span>
            <span className="text-[10px] text-white/30">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* ── LEAD ROWS ── */}
      <div className="relative divide-y divide-white/[0.06]">
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="px-4 py-3.5"
            style={{ opacity: 1 - i * 0.18 }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-medium text-white/85">{lead.name}</span>
                  <span className={`inline-block rounded-full border px-1.5 py-px text-[9px] tracking-[0.08em] uppercase ${lead.badgeColor}`}>
                    {lead.badge}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 truncate">{lead.msg}</p>
              </div>
              <span className="text-[10px] font-mono text-white/30 shrink-0 mt-0.5">
                {lead.hoursAgo < 24 ? `${lead.hoursAgo}h` : lead.hoursAgo < 72 ? `${Math.round(lead.hoursAgo / 24)}d` : lead.hoursAgo < 168 ? "3 días" : "1 sem"}
              </span>
            </div>

            {/* Decay bar */}
            <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${lead.barColor}`}
                initial={{ width: "0%" }}
                animate={inView ? { width: `${lead.barPct}%` } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── FOOTER — costo quemado ── */}
      <div className="relative px-4 py-4 border-t border-white/[0.08] flex items-center justify-between gap-4 bg-red-950/20">
        <div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/35 mb-0.5">
            Dinero quemado este mes
          </div>
          <CostTicker inView={inView} />
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/35 mb-0.5">
            Visitas generadas
          </div>
          <span className="font-display font-bold text-[22px] text-red-400/80 leading-none">0</span>
        </div>
      </div>
    </div>
  );
}
