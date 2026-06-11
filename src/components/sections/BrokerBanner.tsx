"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Captura al broker antes del form de Application (que es para
 * desarrolladoras). Sin esto, el broker llega al final y se va sin nada.
 */
export function BrokerBanner() {
  return (
    <section className="bg-cream text-graphite">
      <div className="container-edge pb-[clamp(5rem,10vw,9rem)]">
        <Reveal>
          <Link
            href="/beat-one"
            className="group block rounded-md border border-line bg-cream-deep/60 hover:border-bronze/60 transition-colors duration-300 p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="eyebrow !text-bronze !tracking-[0.25em] mb-3">
                  ¿Eres broker o asesor independiente?
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl max-w-[24ch]">
                  El mismo sistema, empaquetado:{" "}
                  <em className="not-italic text-bronze">BEAT One™</em> — desde
                  USD 149/mes.
                </h3>
                <p className="mt-3 text-[14px] text-mute leading-relaxed max-w-xl">
                  Agente de WhatsApp que responde y agenda 24/7, pipeline
                  pre-armado, scripts y dashboard. Activo en 48 horas, sin
                  precio de agencia.
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-2 text-[14px] font-semibold text-bronze">
                Conoce BEAT One
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
