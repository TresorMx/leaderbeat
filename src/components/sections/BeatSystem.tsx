"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

type Module = {
  letter: "B" | "E" | "A" | "T";
  name: string;
  category: string;
  headline: string;
  diff: string;
  deliverables: string[];
};

const modules: Module[] = [
  {
    letter: "B",
    name: "Brand",
    category: "Marca y posicionamiento",
    headline:
      "Construimos marcas inmobiliarias que el comprador recuerda antes de necesitarlas.",
    diff:
      "Investigación de mercado local, arquitectura de marca, naming de torres y desarrollos, sistema visual aplicado a cada punto de contacto del comprador — desde la valla de obra hasta el WhatsApp del broker.",
    deliverables: [
      "Manual de marca y sistema visual",
      "Naming de torres, desarrollos y unidades",
      "Aplicaciones: brochures, renders, signage, pauta digital",
      "Plantillas comerciales para equipo de venta",
    ],
  },
  {
    letter: "E",
    name: "Engine",
    category: "CRM y procesos de venta",
    headline:
      "Un CRM no es un software. Es la coreografía de cómo vendes.",
    diff:
      "Mapeamos tu funnel real (preventa, separación, promesa, escritura), lo modelamos en HubSpot, Salesforce o Pipedrive y entrenamos al equipo hasta que lo usen sin pensarlo.",
    deliverables: [
      "Flujo comercial documentado por etapa",
      "Pipeline configurado y limpio",
      "Scripts de llamada y de objeciones",
      "Plantillas de seguimiento y nurturing",
      "Dashboards de comisión por broker",
    ],
  },
  {
    letter: "A",
    name: "Attract",
    category: "Pauta y creativos de captación",
    headline:
      "Cada peso invertido busca el lead que firma, no el que da like.",
    diff:
      "Estrategia full-funnel en Meta, Google y YouTube. Creativos diseñados para los micro-momentos del comprador inmobiliario: curiosidad, validación y decisión.",
    deliverables: [
      "Estructura de campañas y segmentación",
      "Calendario creativo semanal",
      "Landings de captación optimizadas",
      "A/B testing continuo",
      "Reporting de costo por lead calificado",
    ],
  },
  {
    letter: "T",
    name: "Transform",
    category: "Automatización y agentes",
    headline:
      "Mientras tu competencia copia y pega, tu operación se ejecuta sola.",
    diff:
      "Conectamos Meta, CRM, WhatsApp Business, calendarios y portales en un solo flujo. Instalamos un agente conversacional de primer contacto que califica, agenda y solo despierta al broker cuando el lead es caliente.",
    deliverables: [
      "Workflows en n8n / Zapier / Make documentados",
      "Agente de primer contacto en WhatsApp y web",
      "Enrutamiento automático de leads por proyecto",
      "Recordatorios de visita y nurturing por etapa",
      "Panel de monitoreo y runbook de incidentes",
    ],
  },
];

export function BeatSystem() {
  const [active, setActive] = useState<Module>(modules[0]);

  return (
    <section
      id="sistema"
      className="bg-ink text-cream section-y relative overflow-hidden"
    >
      {/* faint texture orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full opacity-[0.06] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-bronze) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !text-cream/60 !tracking-[0.25em]">
              02 — El sistema
            </span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          <Reveal delay={0.05} className="md:col-span-5">
            <h2 className="display-md">
              BEAT<span className="text-bronze">.</span>
            </h2>
            <p className="mt-8 max-w-md text-cream/65 text-[17px] leading-relaxed">
              El sistema operativo que convierte interés en escritura. Cuatro
              módulos integrados — marca, motor comercial, captación y
              automatización — que operan como una sola máquina.
            </p>
          </Reveal>

          {/* Letter selector */}
          <Reveal delay={0.12} className="md:col-span-7">
            <div className="grid grid-cols-4 gap-3 md:gap-4 mb-12">
              {modules.map((m) => {
                const isActive = m.letter === active.letter;
                return (
                  <button
                    key={m.letter}
                    onMouseEnter={() => setActive(m)}
                    onFocus={() => setActive(m)}
                    onClick={() => setActive(m)}
                    className={`group relative aspect-[3/4] rounded-md border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
                      isActive
                        ? "border-bronze bg-bronze/10"
                        : "border-cream/15 hover:border-cream/40"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 flex items-center justify-center font-display transition-colors duration-500 ${
                        isActive ? "text-bronze" : "text-cream/40 group-hover:text-cream/80"
                      }`}
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        lineHeight: 1,
                      }}
                    >
                      {m.letter}
                    </span>
                    <span
                      className={`absolute bottom-2.5 left-0 right-0 text-center text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                        isActive ? "text-bronze" : "text-cream/35"
                      }`}
                    >
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.letter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[24rem]"
              >
                <div className="eyebrow !text-bronze !tracking-[0.25em] mb-4">
                  {active.category}
                </div>

                <h3 className="display-md max-w-[20ch]">
                  {active.headline}
                </h3>

                <div className="mt-10 grid md:grid-cols-2 gap-10">
                  <div>
                    <div className="eyebrow !text-cream/50 mb-3">
                      Cómo lo hacemos diferente
                    </div>
                    <p className="text-cream/80 leading-relaxed text-[15px]">
                      {active.diff}
                    </p>
                  </div>
                  <div>
                    <div className="eyebrow !text-cream/50 mb-3">
                      Entregables
                    </div>
                    <ul className="space-y-2.5">
                      {active.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex gap-3 text-[14px] text-cream/75 leading-relaxed"
                        >
                          <span className="text-bronze mt-2 shrink-0 w-1 h-1 rounded-full bg-bronze" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
