"use client";

import { Reveal } from "@/components/ui/Reveal";

const fit = [
  "Desarrollas proyectos de USD 80k+ por unidad.",
  "Inviertes en pauta y quieres saber qué pasa después del clic.",
  "Tienes equipo comercial pero no proceso documentado.",
  "Lanzas más de un proyecto al año.",
];

const notFit = [
  "Buscas un logo y un par de piezas sueltas.",
  "Tu objetivo principal es \"subir seguidores\".",
  "No quieres documentar tu operación.",
  "Esperas ventas en menos de 30 días.",
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
          <h2 className="display-lg max-w-[16ch]">
            No trabajamos con todo el mundo.{" "}
            <em className="not-italic text-bronze">Por eso funciona.</em>
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-6">
          {/* Sí */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-8 md:p-10 h-full overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] border border-[#2a2a4a]">
              {/* Subtle violet glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
                style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
              />
              <div className="relative flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-bronze flex items-center justify-center text-[14px] font-bold text-white">
                  ✓
                </div>
                <span className="font-display font-bold text-[17px] text-white">Es para ti si</span>
              </div>
              <ul className="relative space-y-4">
                {fit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-white/70 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* No */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl bg-cream-deep border border-line/60 p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full border border-line/60 flex items-center justify-center text-[14px] text-mute">
                  ✕
                </div>
                <span className="font-display font-bold text-[17px] text-ink/60">No es para ti si</span>
              </div>
              <ul className="space-y-4">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-mute leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-line mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom callout */}
        <Reveal delay={0.25}>
          <div className="mt-8 rounded-xl border border-bronze/25 bg-bronze/5 px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[15px] text-ink/70 max-w-lg">
              Solo tomamos <strong className="text-ink">2 proyectos nuevos por trimestre</strong> para garantizar ejecución real. Si encajas, aplica ahora.
            </p>
            <a
              href="#contacto"
              className="shrink-0 text-[13px] font-semibold text-bronze hover:underline underline-offset-4"
            >
              Solicitar diagnóstico →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
