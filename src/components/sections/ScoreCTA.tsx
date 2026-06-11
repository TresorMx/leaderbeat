"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Banda de conversión a mitad del scroll — único bloque de color pleno
 * de toda la página. Debe interrumpir, no camuflarse.
 */
export function ScoreCTA() {
  return (
    <section className="bg-bronze text-cream">
      <div className="container-edge py-14 md:py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-cream/70" />
                <span className="eyebrow !text-cream/80 !tracking-[0.25em]">
                  BEAT Score™ · Gratis · 2 minutos
                </span>
              </div>
              <h2 className="display-md !text-cream max-w-[20ch]">
                ¿Cuántos de estos módulos ya tienes funcionando?
              </h2>
              <p className="mt-4 text-cream/80 text-[15px] leading-relaxed max-w-xl">
                12 preguntas y te decimos tu score, tu módulo más débil y por
                dónde se está fugando tu venta. Sin llamadas, sin compromiso.
              </p>
            </div>

            <Link
              href="/beat-score"
              className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 bg-ink text-cream rounded-full text-[15px] font-semibold hover:scale-[1.03] transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Calcula tu BEAT Score
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
