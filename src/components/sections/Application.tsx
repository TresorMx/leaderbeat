"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  submitLead,
  type LeadFormData,
  type LeadStatus,
  type LeadBudget,
} from "@/app/actions";

const statusOptions: { value: LeadStatus; label: string; sub: string }[] = [
  { value: "lanzando", label: "Lanzando", sub: "Proyecto nuevo o preventa." },
  { value: "optimizando", label: "Optimizando", sub: "Operación existente que quiero mejorar." },
  { value: "explorando", label: "Explorando", sub: "Aún no sé qué necesito exactamente." },
];

const budgetOptions: { value: LeadBudget; label: string }[] = [
  { value: "<3k", label: "Menos de USD 3k" },
  { value: "3-10k", label: "USD 3k — 10k" },
  { value: "10-30k", label: "USD 10k — 30k" },
  { value: "30k+", label: "Más de USD 30k" },
];

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; error: string; field?: keyof LeadFormData };

export function Application() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [data, setData] = useState<Partial<LeadFormData>>({});

  const update = <K extends keyof LeadFormData>(k: K, v: LeadFormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (state.kind === "error") setState({ kind: "idle" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ kind: "loading" });

    const result = await submitLead({
      name: data.name ?? "",
      email: data.email ?? "",
      whatsapp: data.whatsapp ?? "",
      status: data.status as LeadStatus,
      budget: data.budget as LeadBudget,
      context: data.context,
    });

    if (result.ok) {
      setState({ kind: "success", message: result.message });
    } else {
      setState({ kind: "error", error: result.error, field: result.field });
    }
  };

  const errFor = (k: keyof LeadFormData) =>
    state.kind === "error" && state.field === k ? state.error : null;

  return (
    <section id="contacto" className="section-y bg-cream text-graphite">
      <div className="container-edge">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-bronze" />
              <span className="eyebrow !tracking-[0.25em]">07 — Aplicación</span>
            </div>
            <h2 className="display-lg max-w-[20ch]">
              Solicita tu{" "}
              <em className="not-italic text-bronze font-normal">diagnóstico.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-mute text-[16px] leading-relaxed max-w-md">
              30 minutos. Sin costo. Te devolvemos un diagnóstico real de tu operación
              comercial y cómo BEAT te ayudaría a cerrar más.
            </p>
            <p className="mt-4 text-mute text-[13px] italic">
              Solo trabajamos con un número limitado de proyectos por trimestre.
              El form califica nuestra agenda.
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            {state.kind === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-ink text-cream rounded-lg p-10 md:p-16 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-bronze text-ink mx-auto flex items-center justify-center mb-8">
                  <Check size={24} strokeWidth={2} />
                </div>
                <h3 className="display-md text-cream max-w-[18ch] mx-auto">
                  Recibido.
                </h3>
                <p className="mt-6 text-cream/70 max-w-md mx-auto text-[16px]">
                  {state.message}
                </p>
                <p className="mt-8 text-cream/40 text-[13px]">
                  ¿Prefieres adelantarlo?{" "}
                  <a
                    href="https://wa.me/"
                    className="text-bronze hover:text-cream transition-colors"
                  >
                    Escríbenos por WhatsApp →
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-x-8 gap-y-10 max-w-5xl"
                noValidate
              >
                {/* Nombre */}
                <Field
                  label="Nombre"
                  number="01"
                  error={errFor("name")}
                >
                  <input
                    type="text"
                    required
                    value={data.name ?? ""}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Tu nombre completo"
                    className="form-input"
                  />
                </Field>

                {/* Email */}
                <Field label="Email corporativo" number="02" error={errFor("email")}>
                  <input
                    type="email"
                    required
                    value={data.email ?? ""}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="tu@empresa.com"
                    className="form-input"
                  />
                </Field>

                {/* WhatsApp */}
                <Field
                  label="WhatsApp"
                  number="03"
                  hint="Incluye código de país"
                  error={errFor("whatsapp")}
                >
                  <input
                    type="tel"
                    required
                    value={data.whatsapp ?? ""}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="form-input"
                  />
                </Field>

                {/* Contexto opcional */}
                <Field
                  label="Brevemente"
                  number="04"
                  hint="Opcional · ¿Qué te trae aquí?"
                >
                  <input
                    type="text"
                    value={data.context ?? ""}
                    onChange={(e) => update("context", e.target.value)}
                    placeholder="Nombre del proyecto o necesidad"
                    className="form-input"
                  />
                </Field>

                {/* Status — full width */}
                <Field
                  label="¿En qué momento estás?"
                  number="05"
                  full
                  error={errFor("status")}
                >
                  <div className="grid sm:grid-cols-3 gap-3 mt-3">
                    {statusOptions.map((opt) => {
                      const selected = data.status === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => update("status", opt.value)}
                          className={`text-left p-5 rounded-md border transition-all duration-300 ${
                            selected
                              ? "border-ink bg-ink text-cream"
                              : "border-line/70 bg-cream-deep hover:border-bronze"
                          }`}
                        >
                          <div className="font-medium text-[15px] mb-1">{opt.label}</div>
                          <div
                            className={`text-[12px] ${
                              selected ? "text-cream/60" : "text-mute"
                            }`}
                          >
                            {opt.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Budget — full width */}
                <Field
                  label="Inversión mensual aproximada en marketing y comercial"
                  number="06"
                  full
                  error={errFor("budget")}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    {budgetOptions.map((opt) => {
                      const selected = data.budget === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => update("budget", opt.value)}
                          className={`px-4 py-4 rounded-md border text-[14px] font-medium transition-all duration-300 ${
                            selected
                              ? "border-ink bg-ink text-cream"
                              : "border-line/70 bg-cream-deep hover:border-bronze"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Submit */}
                <div className="md:col-span-2 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <button
                    type="submit"
                    disabled={state.kind === "loading"}
                    className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full font-medium text-[15px] hover:bg-bronze hover:text-ink transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {state.kind === "loading" ? "Enviando..." : "Enviar aplicación"}
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <p className="text-mute text-[12px] max-w-xs">
                    Al enviar aceptas nuestra política de privacidad. No spam — solo te
                    contactamos para coordinar la llamada.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--color-line);
          padding: 0.7rem 0;
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 16px;
          color: var(--color-ink);
          outline: none;
          transition: border-color 0.3s var(--ease-soft);
        }
        :global(.form-input::placeholder) {
          color: var(--color-mute);
          opacity: 0.6;
        }
        :global(.form-input:focus) {
          border-color: var(--color-bronze);
        }
      `}</style>
    </section>
  );
}

// -------------- Field wrapper --------------

type FieldProps = {
  label: string;
  number: string;
  hint?: string;
  error?: string | null;
  full?: boolean;
  children: React.ReactNode;
};

function Field({ label, number, hint, error, full, children }: FieldProps) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-display italic text-bronze text-sm">{number}</span>
        <label className="eyebrow !tracking-[0.18em] !text-ink">{label}</label>
      </div>
      {children}
      <div className="mt-2 flex items-center justify-between min-h-[1rem]">
        {error ? (
          <span className="text-[12px] text-red-700">{error}</span>
        ) : hint ? (
          <span className="text-[12px] text-mute italic">{hint}</span>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
