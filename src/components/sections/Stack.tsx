"use client";

import { Reveal } from "@/components/ui/Reveal";

const stack = [
  {
    label: "CRM",
    items: ["HubSpot", "Salesforce", "Pipedrive"],
  },
  {
    label: "Automatización",
    items: ["n8n", "Zapier", "Make"],
  },
  {
    label: "Pauta",
    items: ["Meta Business", "Google Ads", "TikTok Ads", "YouTube"],
  },
  {
    label: "Analítica",
    items: ["GA4", "Looker Studio", "Metabase"],
  },
  {
    label: "Conversacional",
    items: ["WhatsApp Business API", "Twilio", "Agentes propios"],
  },
  {
    label: "Diseño",
    items: ["Figma", "Adobe Creative Suite"],
  },
];

// Marquee items for the infinite scroll bar
const marquee = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "n8n",
  "Zapier",
  "Make",
  "Meta Business",
  "Google Ads",
  "TikTok Ads",
  "YouTube",
  "GA4",
  "Looker Studio",
  "Metabase",
  "WhatsApp Business",
  "Twilio",
  "Figma",
  "Adobe CC",
];

export function Stack() {
  return (
    <section className="section-y bg-cream text-graphite overflow-hidden">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">05 — Stack</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[18ch]">
            Las herramientas{" "}
            <em className="not-italic text-bronze font-normal">que nos respaldan.</em>
          </h2>
        </Reveal>

        {/* Stack table */}
        <Reveal delay={0.12}>
          <div className="mt-16 md:mt-20 border-t border-line/60">
            {stack.map((row) => (
              <div
                key={row.label}
                className="grid md:grid-cols-12 gap-4 md:gap-10 py-6 md:py-7 border-b border-line/60 items-baseline"
              >
                <div className="md:col-span-3">
                  <span className="eyebrow !text-bronze !tracking-[0.25em]">
                    {row.label}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[18px] md:text-[20px] font-display">
                    {row.items.map((item, i) => (
                      <span key={item} className="text-ink">
                        {item}
                        {i < row.items.length - 1 && (
                          <span className="text-line ml-3">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Infinite marquee — feels alive, low effort */}
      <Reveal delay={0.2}>
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-cream to-transparent pointer-events-none" />

          <div className="flex whitespace-nowrap animate-marquee">
            {[...marquee, ...marquee, ...marquee].map((item, i) => (
              <span
                key={i}
                className="font-display text-3xl md:text-5xl text-ink/15 mx-6 md:mx-10"
              >
                {item}
                <span className="text-bronze/25 ml-6 md:ml-10">/</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        :global(.animate-marquee) {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
