"use client";

import { Reveal } from "@/components/ui/Reveal";

const pains = [
  {
    n: "01",
    head: "Inviertes en pauta,",
    tail: "pero los leads se evaporan en el CRM.",
  },
  {
    n: "02",
    head: "Tu marca compite por precio,",
    tail: "no por percepción.",
  },
  {
    n: "03",
    head: "Tu equipo responde tarde,",
    tail: "mal y sin un guion común.",
  },
  {
    n: "04",
    head: "Cada campaña empieza de cero",
    tail: "porque nada está documentado.",
  },
];

export function Problem() {
  return (
    <section className="section-y bg-cream text-graphite">
      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-bronze" />
            <span className="eyebrow !tracking-[0.25em]">01 — El problema</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[14ch]">
            Lo que está pasando hoy{" "}
            <em className="not-italic text-bronze font-normal">en tu operación.</em>
          </h2>
        </Reveal>

        <div className="mt-24 md:mt-32 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {pains.map((p, i) => (
            <Reveal key={p.n} delay={0.08 + i * 0.06} y={32}>
              <div className="group flex gap-6 md:gap-8 pb-10 border-b border-line/60">
                <span className="font-display italic text-bronze text-2xl leading-none mt-1.5 shrink-0">
                  {p.n}
                </span>
                <p className="text-[20px] md:text-[22px] leading-snug">
                  <span className="font-medium text-ink">{p.head}</span>{" "}
                  <span className="text-mute">{p.tail}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-20 max-w-[28ch] text-2xl md:text-3xl font-display italic text-ink leading-tight">
            Esto no es un problema de marketing. Es un problema de sistema.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
