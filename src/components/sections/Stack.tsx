"use client";

import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    label: "CRM",
    items: ["HubSpot", "Salesforce", "Pipedrive"],
    description: "Donde vive el pipeline y la relación con el lead.",
  },
  {
    label: "Automatización",
    items: ["n8n", "Zapier", "Make"],
    description: "Los flujos que mueven datos sin que nadie los toque.",
  },
  {
    label: "Pauta digital",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "YouTube"],
    description: "Captación full-funnel en los canales donde vive el comprador.",
  },
  {
    label: "Analítica",
    items: ["GA4", "Looker Studio", "Metabase"],
    description: "Visibilidad real sobre qué funciona y qué no.",
  },
  {
    label: "Conversacional",
    items: ["WhatsApp Business API", "Twilio", "Agentes propios"],
    description: "El primer contacto automatizado que califica antes de despertar al broker.",
  },
  {
    label: "Diseño",
    items: ["Figma", "Adobe CC"],
    description: "Donde la marca cobra forma visual.",
  },
];

export function Stack() {
  return (
    <section className="section-y bg-cream text-graphite overflow-hidden">
      <div className="container-edge">
        {/* Header row */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-14 md:mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-bronze" />
              <span className="eyebrow !tracking-[0.25em]">05 — Herramientas</span>
            </div>
            <h2 className="display-lg max-w-[12ch]">
              No inventamos herramientas.{" "}
              <em className="not-italic text-bronze">Las dominamos.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-mute text-[15px] leading-relaxed max-w-sm">
              Trabajamos con el stack del cliente o instalamos el que mejor se adapta al proyecto. Lo que no negociamos es que todo esté conectado.
            </p>
          </Reveal>
        </div>

        {/* Editorial list */}
        <div className="border-t border-line/50">
          {categories.map((cat, i) => (
            <Reveal key={cat.label} delay={0.04 + i * 0.04}>
              <div className="group border-b border-line/50 py-5 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-center hover:bg-cream-deep/60 transition-colors duration-300 px-1 -mx-1 rounded-sm">
                {/* Category */}
                <div className="md:col-span-2">
                  <span className="eyebrow !text-bronze !tracking-[0.2em]">{cat.label}</span>
                </div>

                {/* Tools */}
                <div className="md:col-span-5 flex flex-wrap gap-2">
                  {cat.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full text-[12px] font-medium text-graphite/70 bg-gradient-to-br from-[#f0f0f5] to-[#e8e8f0] border border-line/60 group-hover:border-bronze/25 transition-all duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-[13px] text-mute leading-relaxed">{cat.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom callout — branded, not generic */}
        <Reveal delay={0.3}>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              { n: "6", label: "categorías de stack", sub: "CRM · Pauta · Auto · Analytics · Conv · Diseño" },
              { n: "17+", label: "plataformas integradas", sub: "Best-in-class para cada función del sistema" },
              { n: "1", label: "sistema conectado", sub: "Todo opera como una sola máquina, no como piezas sueltas" },
            ].map((item) => (
              <div
                key={item.n}
                className="rounded-xl p-6 bg-gradient-to-br from-[#f8f8fd] to-[#f0f0f8] border border-line/50"
              >
                <div className="font-display font-bold text-[2.5rem] leading-none text-ink mb-1">
                  {item.n}
                </div>
                <div className="text-[13px] font-semibold text-ink/70 mb-1">{item.label}</div>
                <div className="text-[11px] text-mute leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
