"use client";

import { Reveal } from "@/components/ui/Reveal";
import * as si from "simple-icons";

// Custom SVG paths for tools not in simple-icons
const custom: Record<string, { path: string; hex: string; viewBox?: string }> = {
  Salesforce: {
    hex: "00A1E0",
    path: "M10.5 5.5c.9-1 2.2-1.5 3.5-1.5 2 0 3.7 1.1 4.6 2.7.7-.3 1.5-.5 2.4-.5 3 0 5 2 5 5s-2 5-5 5H6c-2.2 0-4-1.8-4-4 0-2 1.5-3.7 3.5-4 .5-1.5 1.7-2.7 5-2.7z",
    viewBox: "0 0 24 24",
  },
  Pipedrive: {
    hex: "017737",
    path: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.5 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    viewBox: "0 0 24 24",
  },
  Twilio: {
    hex: "F22F46",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-5c-.83 0-1.5-.67-1.5-1.5S9.17 7.5 10 7.5s1.5.67 1.5 1.5S10.83 10.5 10 10.5zm4 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
    viewBox: "0 0 24 24",
  },
  "Adobe CC": {
    hex: "DA1F26",
    path: "M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm6.23 0L24 22.624V1.376z",
    viewBox: "0 0 24 24",
  },
  "Agentes propios": {
    hex: "9B8FFF",
    path: "M12 2a2 2 0 012 2v1h3a2 2 0 012 2v2a2 2 0 01-2 2h-1v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1H5a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2zm0 2v1H9V4h3zm0 0h3v1h-3V4zM9 10a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zM8 16h8v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1zm-2 4h12v1H6v-1z",
    viewBox: "0 0 24 24",
  },
  "WhatsApp Business API": {
    hex: "25D366",
    path: si.siWhatsapp.path,
    viewBox: "0 0 24 24",
  },
  "Looker Studio": {
    hex: "4285F4",
    path: si.siLooker.path,
    viewBox: "0 0 24 24",
  },
};

const siMap: Record<string, { path: string; hex: string }> = {
  HubSpot:    { path: si.siHubspot.path,          hex: si.siHubspot.hex },
  n8n:        { path: si.siN8n.path,              hex: si.siN8n.hex },
  Zapier:     { path: si.siZapier.path,           hex: si.siZapier.hex },
  Make:       { path: si.siMake.path,             hex: si.siMake.hex },
  "Meta Ads": { path: si.siMeta.path,             hex: si.siMeta.hex },
  "Google Ads":{ path: si.siGoogleads.path,       hex: si.siGoogleads.hex },
  "TikTok Ads":{ path: si.siTiktok.path,          hex: "010101" },
  YouTube:    { path: si.siYoutube.path,          hex: si.siYoutube.hex },
  GA4:        { path: si.siGoogleanalytics.path,  hex: si.siGoogleanalytics.hex },
  Metabase:   { path: si.siMetabase.path,         hex: si.siMetabase.hex },
  WhatsApp:   { path: si.siWhatsapp.path,         hex: si.siWhatsapp.hex },
  Figma:      { path: si.siFigma.path,            hex: si.siFigma.hex },
};

function ToolIcon({ name }: { name: string }) {
  const data = siMap[name] ?? custom[name];
  if (!data) return null;

  const color = `#${data.hex}`;

  return (
    <div
      title={name}
      className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill={color}
        aria-label={name}
      >
        <path d={data.path} />
      </svg>
    </div>
  );
}

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
            <h2 className="display-md max-w-[12ch]">
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

                {/* Icons */}
                <div className="md:col-span-5 flex flex-wrap gap-2">
                  {cat.items.map((tool) => (
                    <ToolIcon key={tool} name={tool} />
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

        {/* Bottom callout */}
        <Reveal delay={0.3}>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              { n: "6",   label: "categorías de stack",      sub: "CRM · Pauta · Auto · Analytics · Conv · Diseño" },
              { n: "17+", label: "plataformas integradas",   sub: "Best-in-class para cada función del sistema" },
              { n: "1",   label: "sistema conectado",        sub: "Todo opera como una sola máquina, no como piezas sueltas" },
            ].map((item) => (
              <div
                key={item.n}
                className="rounded-xl p-6 bg-gradient-to-br from-[#f8f8fd] to-[#f0f0f8] border border-line/50"
              >
                <div className="font-display font-bold text-[2.5rem] leading-none text-ink mb-1">{item.n}</div>
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
