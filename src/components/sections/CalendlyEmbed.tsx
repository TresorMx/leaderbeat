"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  /**
   * URL del Calendly. Ej: https://calendly.com/leaderbeat/diagnostico
   * Si está vacío, la sección renderiza un placeholder discreto.
   */
  calendlyUrl?: string;
};

export function CalendlyEmbed({ calendlyUrl }: Props) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lazy-load: solo carga el iframe cuando entra al viewport
  useEffect(() => {
    if (!ref.current || !calendlyUrl) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [calendlyUrl]);

  return (
    <section className="section-y bg-cream-deep text-graphite">
      <div className="container-edge">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-bronze" />
              <span className="eyebrow !tracking-[0.25em]">o agenda directo</span>
            </div>
            <h2 className="display-md max-w-[22ch]">
              ¿Prefieres reservar tu slot ahora?{" "}
              <em className="not-italic text-bronze font-normal">Hazlo aquí.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-mute text-[15px] leading-relaxed">
              Selecciona el espacio que mejor te funcione. La llamada es por Google Meet,
              30 minutos. Te llegará el invite al email automáticamente.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={ref}
            className="rounded-md overflow-hidden border border-line/60 bg-cream"
          >
            {calendlyUrl ? (
              shouldLoad ? (
                <iframe
                  src={calendlyUrl}
                  className="w-full"
                  style={{ height: "720px", border: 0 }}
                  loading="lazy"
                  title="Agenda una llamada con LEADERBEAT"
                />
              ) : (
                <div className="h-[720px] flex items-center justify-center">
                  <div className="text-mute text-[14px]">Cargando calendario...</div>
                </div>
              )
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center p-10 text-center">
                <div className="eyebrow !tracking-[0.25em] mb-4">Pendiente de configurar</div>
                <p className="text-mute text-[14px] max-w-md">
                  Cuando tengas tu URL de Calendly, pásala como prop{" "}
                  <code className="font-mono text-ink bg-cream-deep px-1.5 py-0.5 rounded">
                    calendlyUrl
                  </code>{" "}
                  al componente y este embed se activa.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
