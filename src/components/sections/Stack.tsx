"use client";

import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    label: "CRM",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-400",
    items: ["HubSpot", "Salesforce", "Pipedrive"],
  },
  {
    label: "Automatización",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-400",
    items: ["n8n", "Zapier", "Make"],
  },
  {
    label: "Pauta digital",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-400",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "YouTube"],
  },
  {
    label: "Analítica",
    color: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-400",
    items: ["GA4", "Looker Studio", "Metabase"],
  },
  {
    label: "Conversacional",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-400",
    items: ["WhatsApp Business API", "Twilio", "Agentes propios"],
  },
  {
    label: "Diseño",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    dot: "bg-pink-400",
    items: ["Figma", "Adobe CC"],
  },
];

export function Stack() {
  return (
    <section className="section-y bg-ink text-cream overflow-hidden">
      {/* Violet orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 w-[40vw] h-[40vw] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="container-edge relative">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !text-cream/50 !tracking-[0.25em]">05 — Herramientas</span>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <Reveal delay={0.05}>
            <h2 className="display-lg max-w-[14ch]">
              El stack que{" "}
              <em className="not-italic text-bronze">nos respalda.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-cream/50 text-[15px] max-w-xs leading-relaxed">
              No inventamos herramientas. Dominamos las mejores y las conectamos para que trabajen juntas.
            </p>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.label} delay={0.06 + i * 0.05}>
              <div className="rounded-xl bg-ink-soft border border-line-dark/60 p-6 hover:border-bronze/30 transition-colors duration-300">
                {/* Category label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                  <span className="eyebrow !text-cream/40 !tracking-[0.2em]">{cat.label}</span>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full text-[13px] font-medium text-cream/80 bg-cream/[0.06] border border-cream/10 hover:bg-bronze/20 hover:border-bronze/30 hover:text-cream transition-all duration-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom statement */}
        <Reveal delay={0.3}>
          <div className="mt-14 pt-10 border-t border-line-dark/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-cream/40 text-[14px] max-w-md leading-relaxed">
              Trabajamos con las plataformas del cliente o instalamos las que mejor se adapten al proyecto. Ninguna herramienta es mandatoria — el sistema sí lo es.
            </p>
            <div className="flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-bronze shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              Stack actualizado 2026
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
