"use client";

/** Versión original — inbox de leads sin responder */
export function ProblemVisualInbox() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F0F18] via-[#16162A] to-[#0A0A14] border border-line-dark/60 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div aria-hidden className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }} />

      <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div>
          <div className="text-[13px] font-semibold text-white/85">Leads · Torre Mira</div>
          <div className="text-[11px] text-white/40">47 conversaciones sin responder</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-400/30 px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase text-red-300">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          Pauta activa
        </span>
      </div>

      <div className="relative divide-y divide-white/[0.06]">
        {[
          { name: "Mariana G.", msg: "Hola! Me interesa el 2 recámaras, ¿precios?", time: "hace 6 h", status: "Sin respuesta", tone: "text-amber-300 bg-amber-400/10 border-amber-400/25", dim: "" },
          { name: "Carlos R.", msg: "¿Sigue disponible la unidad del piso 12?", time: "hace 14 h", status: "Visto · sin respuesta", tone: "text-amber-300 bg-amber-400/10 border-amber-400/25", dim: "opacity-85" },
          { name: "Familia Herrera", msg: "Quedamos en que me mandaban el brochure…", time: "hace 3 días", status: "Lead frío", tone: "text-white/45 bg-white/5 border-white/15", dim: "opacity-65" },
          { name: "Inv. extranjero", msg: "Interested in pre-sale pricing. Please call.", time: "hace 1 semana", status: "Perdido", tone: "text-red-300 bg-red-500/10 border-red-400/25", dim: "opacity-45" },
        ].map((lead) => (
          <div key={lead.name} className={`px-5 py-4 ${lead.dim}`}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-[13px] font-medium text-white/80">{lead.name}</span>
              <span className="text-[10px] font-mono text-white/35 shrink-0">{lead.time}</span>
            </div>
            <p className="text-[12px] text-white/50 leading-snug truncate mb-2">{lead.msg}</p>
            <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase ${lead.tone}`}>{lead.status}</span>
          </div>
        ))}
      </div>

      <div className="relative px-5 py-4 border-t border-white/10 flex items-baseline justify-between">
        <span className="text-[11px] text-white/40">Inversión en pauta este mes</span>
        <span className="font-mono text-[13px] text-white/70">$4,200 USD <span className="text-red-300/80">→ 0 visitas</span></span>
      </div>
    </div>
  );
}
