"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const fit = [
  "Desarrollas o comercializas proyectos de USD 80k en adelante por unidad.",
  "Inviertes más de USD 5k/mes en pauta y quieres saber qué pasa después del clic.",
  "Tienes equipo comercial pero no proceso documentado.",
  "Lanzas más de un proyecto al año y necesitas no empezar de cero cada vez.",
  "Estás dispuesto a documentar y entrenar a tu equipo.",
];

const notFit = [
  "Buscas un freelance que te haga un logo y un par de piezas.",
  "Tu único objetivo es \"subir seguidores\".",
  "No quieres documentar tu operación.",
  "Esperas resultados de venta en menos de 30 días.",
  "Compras siempre por el precio más bajo.",
];

export function WhoFor() {
  return (
    <section className="section-y bg-cream text-graphite">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">06 — Para quién</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[18ch]">
            No trabajamos con todo el mundo.{" "}
            <em className="not-italic text-bronze font-normal">Por eso funciona.</em>
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-24 grid md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Sí */}
          <Reveal delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center">
                  <Check size={18} strokeWidth={2} />
                </div>
                <span className="eyebrow !text-ink !tracking-[0.25em]">Es para ti si</span>
              </div>

              <ul className="space-y-5">
                {fit.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 pb-5 border-b border-line/60 text-[16px] leading-relaxed"
                  >
                    <span className="font-display italic text-bronze text-sm mt-1 shrink-0 w-6">
                      0{i + 1}
                    </span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* No */}
          <Reveal delay={0.18}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full border border-line text-mute flex items-center justify-center">
                  <X size={18} strokeWidth={2} />
                </div>
                <span className="eyebrow !tracking-[0.25em]">No es para ti si</span>
              </div>

              <ul className="space-y-5">
                {notFit.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 pb-5 border-b border-line/40 text-[16px] leading-relaxed"
                  >
                    <span className="font-display italic text-mute/60 text-sm mt-1 shrink-0 w-6">
                      0{i + 1}
                    </span>
                    <span className="text-mute">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
