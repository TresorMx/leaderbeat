"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Caso placeholder. Reemplazar con casos reales cuando estén disponibles.
 * Estructura pensada para que solo cambies los strings y la imagen.
 */
type Case = {
  slug: string;
  project: string;
  city: string;
  typology: string;
  year: string;
  metrics: { label: string; value: string }[];
  comingSoon?: boolean;
};

const cases: Case[] = [
  {
    slug: "caso-1",
    project: "Caso en preparación",
    city: "Cali",
    typology: "Preventa residencial",
    year: "2026",
    metrics: [
      { label: "Costo por lead calificado", value: "—" },
      { label: "Tasa de conversión a visita", value: "—" },
      { label: "Separaciones / trimestre", value: "—" },
    ],
    comingSoon: true,
  },
  {
    slug: "caso-2",
    project: "Caso en preparación",
    city: "Medellín",
    typology: "Mixed-use",
    year: "2026",
    metrics: [
      { label: "Reducción CPL", value: "—" },
      { label: "Tiempo de respuesta", value: "—" },
      { label: "Leads → escritura", value: "—" },
    ],
    comingSoon: true,
  },
  {
    slug: "caso-3",
    project: "Caso en preparación",
    city: "CDMX",
    typology: "Vertical premium",
    year: "2026",
    metrics: [
      { label: "ROAS de captación", value: "—" },
      { label: "Velocidad de venta", value: "—" },
      { label: "Ticket promedio", value: "—" },
    ],
    comingSoon: true,
  },
];

export function Work() {
  return (
    <section id="trabajo" className="section-y bg-cream-deep text-graphite">
      <div className="container-edge">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16 flex-wrap">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-bronze" />
                <span className="eyebrow !tracking-[0.25em]">04 — Trabajo seleccionado</span>
              </div>
              <h2 className="display-md max-w-[16ch]">
                Lo que ocurre cuando BEAT{" "}
                <em className="not-italic text-bronze font-normal">está instalado.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-mute text-[15px] max-w-sm">
              Una selección reciente de proyectos en los que operamos el sistema completo
              o módulos específicos. Cada caso publicado pasa por validación con el cliente.
            </p>
          </Reveal>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={0.08 + i * 0.08} y={32}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-cream rounded-md overflow-hidden border border-line/60 h-full flex flex-col"
              >
                {/* Image / visual placeholder */}
                <div className="relative aspect-[4/3] bg-ink overflow-hidden">
                  {/* Pure-CSS architectural pattern for now — to be replaced with real photo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-90"
                    style={{
                      background: `linear-gradient(135deg, var(--color-ink) 0%, var(--color-ink-soft) 100%)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        ${135 + i * 15}deg,
                        transparent,
                        transparent 22px,
                        rgba(184, 148, 111, 0.15) 22px,
                        rgba(184, 148, 111, 0.15) 23px
                      )`,
                    }}
                  />

                  {/* Top label */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-cream/60">
                      Caso 0{i + 1}
                    </span>
                    {c.comingSoon ? (
                      <span className="text-[10px] tracking-[0.25em] uppercase text-bronze">
                        Próximamente
                      </span>
                    ) : (
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        className="text-cream/60 group-hover:text-bronze transition-colors"
                      />
                    )}
                  </div>

                  {/* Bottom title */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-cream/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                      {c.city} · {c.typology}
                    </div>
                    <div className="font-display text-cream text-[28px] leading-tight">
                      {c.project}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <ul className="space-y-3">
                    {c.metrics.map((m) => (
                      <li
                        key={m.label}
                        className="flex items-baseline justify-between gap-4 pb-3 border-b border-line/50 last:border-0 last:pb-0"
                      >
                        <span className="text-[12px] tracking-[0.12em] uppercase text-mute">
                          {m.label}
                        </span>
                        <span className="font-display text-xl text-ink">
                          {m.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
