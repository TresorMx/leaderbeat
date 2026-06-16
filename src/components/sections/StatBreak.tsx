"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ChatDemo } from "@/components/ui/ChatDemo";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";

/**
 * Momento de ruptura — un solo dato, tratamiento editorial oscuro.
 * Funde con BeatSystem (también ink) como una sola unidad cinemática.
 */

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

export function StatBreak() {
  return (
    <section className="relative text-cream overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-[0.5px]" style={{ background: "linear-gradient(to right, transparent, rgba(155,143,255,0.35) 30%, rgba(155,143,255,0.35) 70%, transparent)" }} />
      {/* Background — mismo sistema que el Hero, gradientes reposicionados */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Base gradient — más oscuro, origen lateral izquierdo */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(110% 110% at 20% 80%, #0a0a0d 50%, #1e0a3c 100%)" }}
        />
        {/* Blob único, sutil, esquina inferior derecha */}
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-[0.12]"
          style={{ background: "#6C63FF" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      <div className="container-edge relative py-[clamp(5rem,10vw,9rem)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Número + copy — columna izquierda */}
          <div className="md:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-bronze" />
                <span className="eyebrow !text-cream/60 !tracking-[0.25em]">
                  El dato que lo cambia todo
                </span>
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[0.85] tracking-[-0.05em]"
              style={{ fontSize: "clamp(5.5rem, 14vw, 12rem)" }}
            >
              <span className="text-bronze">
                <Counter to={78} />%
              </span>
            </motion.div>

            <Reveal delay={0.2}>
              <p className="mt-6 text-[18px] md:text-[22px] leading-snug text-cream/85 max-w-[30ch] font-display font-medium tracking-[-0.01em]">
                de los compradores le compra al{" "}
                <em className="not-italic text-bronze">primero que responde.</em>
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-cream/55 max-w-[48ch]">
                Pero responder primero solo te gana la conversación. Lo que
                gana la venta es tener algo que decir: una marca con discurso,
                un guion que convierte, una historia que justifica el precio.
                Velocidad sin discurso es mediocridad entregada más rápido.
              </p>
            </Reveal>
          </div>

          {/* Chat demo — columna derecha */}
          <div className="md:col-span-6 flex justify-center">
            <IPhoneFrame>
              <ChatDemo bare />
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
