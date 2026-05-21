"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  submitLead,
  type LeadFormData,
  type LeadStatus,
  type LeadBudget,
} from "@/app/actions";

const statusOptions: { value: LeadStatus; label: string; sub: string }[] = [
  { value: "lanzando", label: "Lanzando", sub: "Proyecto nuevo o preventa" },
  { value: "optimizando", label: "Optimizando", sub: "Quiero mejorar lo existente" },
  { value: "explorando", label: "Explorando", sub: "Aún no sé qué necesito" },
];

const budgetOptions: { value: LeadBudget; label: string }[] = [
  { value: "<3k", label: "< USD 3k" },
  { value: "3-10k", label: "USD 3–10k" },
  { value: "10-30k", label: "USD 10–30k" },
  { value: "30k+", label: "USD 30k+" },
];

const steps = ["Contacto", "Proyecto", "Confirmar"];

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; error: string; field?: keyof LeadFormData };

export function Application() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<LeadFormData>>({});
  const [formState, setFormState] = useState<FormState>({ kind: "idle" });

  const update = <K extends keyof LeadFormData>(k: K, v: LeadFormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (formState.kind === "error") setFormState({ kind: "idle" });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const canNext0 = !!data.name?.trim() && !!data.email?.trim() && !!data.whatsapp?.trim();
  const canNext1 = !!data.status && !!data.budget;

  const onSubmit = async () => {
    setFormState({ kind: "loading" });
    const result = await submitLead({
      name: data.name ?? "",
      email: data.email ?? "",
      whatsapp: data.whatsapp ?? "",
      status: data.status as LeadStatus,
      budget: data.budget as LeadBudget,
      context: data.context,
    });
    if (result.ok) {
      setFormState({ kind: "success", message: result.message });
    } else {
      setFormState({ kind: "error", error: result.error, field: result.field });
    }
  };

  if (formState.kind === "success") {
    return (
      <section id="contacto" className="section-y bg-ink text-cream">
        <div className="container-edge">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 rounded-full bg-bronze flex items-center justify-center mb-8"
          >
            <Check size={28} strokeWidth={2.5} className="text-ink" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="display-md text-cream"
          >
            Recibido.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-cream/60 text-[16px] leading-relaxed"
          >
            {formState.message}
          </motion.p>
        </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="section-y bg-ink text-cream">
      <div className="container-edge">
        {/* Header — centered */}
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-14">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-bronze" />
              <span className="eyebrow !text-cream/50 !tracking-[0.25em]">07 — Aplicación</span>
              <span className="w-8 h-px bg-bronze" />
            </div>
            <h2 className="display-lg">
              Solicita tu{" "}
              <em className="not-italic text-bronze">diagnóstico.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-cream/50 text-[15px] leading-relaxed">
              30 minutos. Sin costo. Te devolvemos un diagnóstico real y cómo BEAT te ayudaría a cerrar más.
            </p>
          </Reveal>
        </div>

        {/* Card — centered */}
        <Reveal delay={0.12}>
          <div className="max-w-2xl mx-auto rounded-2xl border border-line-dark/60 bg-ink-soft overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-line-dark/50">
              <motion.div
                className="h-full bg-bronze"
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Step indicator */}
            <div className="px-8 py-5 border-b border-line-dark/40 flex items-center gap-4">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-300 ${
                      i < step
                        ? "bg-bronze text-ink"
                        : i === step
                        ? "bg-bronze/20 text-bronze border border-bronze"
                        : "bg-cream/10 text-cream/30"
                    }`}
                  >
                    {i < step ? <Check size={11} strokeWidth={3} /> : i + 1}
                  </div>
                  <span
                    className={`text-[12px] tracking-wide transition-colors duration-300 ${
                      i === step ? "text-cream" : "text-cream/30"
                    }`}
                  >
                    {s}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="mx-1 text-cream/20 text-[10px]">›</span>
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-bold text-[20px] text-cream">¿Con quién hablamos?</h3>
                    <div className="space-y-5">
                      <InputField
                        label="Nombre completo"
                        value={data.name ?? ""}
                        onChange={(v) => update("name", v)}
                        placeholder="Tu nombre"
                        type="text"
                      />
                      <InputField
                        label="Email corporativo"
                        value={data.email ?? ""}
                        onChange={(v) => update("email", v)}
                        placeholder="tu@empresa.com"
                        type="email"
                      />
                      <InputField
                        label="WhatsApp (con código de país)"
                        value={data.whatsapp ?? ""}
                        onChange={(v) => update("whatsapp", v)}
                        placeholder="+57 300 000 0000"
                        type="tel"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-7"
                  >
                    <h3 className="font-display font-bold text-[20px] text-cream">Cuéntanos tu momento</h3>

                    {/* Status */}
                    <div>
                      <label className="eyebrow !text-cream/40 !tracking-[0.2em] mb-3 block">
                        ¿En qué estás?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {statusOptions.map((opt) => {
                          const sel = data.status === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => update("status", opt.value)}
                              className={`p-4 rounded-xl border text-left transition-all duration-250 ${
                                sel
                                  ? "border-bronze bg-bronze/15 text-cream"
                                  : "border-line-dark/60 hover:border-bronze/40 text-cream/60"
                              }`}
                            >
                              <div className="font-semibold text-[13px] mb-1">{opt.label}</div>
                              <div className="text-[11px] opacity-60 leading-snug">{opt.sub}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="eyebrow !text-cream/40 !tracking-[0.2em] mb-3 block">
                        Inversión mensual en marketing
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {budgetOptions.map((opt) => {
                          const sel = data.budget === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => update("budget", opt.value)}
                              className={`px-4 py-3 rounded-xl border text-[13px] font-semibold transition-all duration-250 ${
                                sel
                                  ? "border-bronze bg-bronze/15 text-cream"
                                  : "border-line-dark/60 hover:border-bronze/40 text-cream/60"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional context */}
                    <div>
                      <label className="eyebrow !text-cream/40 !tracking-[0.2em] mb-3 block">
                        Nombre del proyecto o contexto (opcional)
                      </label>
                      <input
                        type="text"
                        value={data.context ?? ""}
                        onChange={(e) => update("context", e.target.value)}
                        placeholder="Ej: Torre Vela, 120 aptos en Cali"
                        className="w-full bg-transparent border-b border-line-dark/60 focus:border-bronze pb-2 text-[15px] text-cream placeholder:text-cream/30 outline-none transition-colors duration-300"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-bold text-[20px] text-cream">Confirma tu solicitud</h3>

                    <div className="rounded-xl bg-cream/[0.05] border border-line-dark/40 divide-y divide-line-dark/40">
                      <SummaryRow label="Nombre" value={data.name} />
                      <SummaryRow label="Email" value={data.email} />
                      <SummaryRow label="WhatsApp" value={data.whatsapp} />
                      <SummaryRow label="Momento" value={statusOptions.find((s) => s.value === data.status)?.label} />
                      <SummaryRow label="Inversión" value={budgetOptions.find((b) => b.value === data.budget)?.label} />
                      {data.context && <SummaryRow label="Proyecto" value={data.context} />}
                    </div>

                    {formState.kind === "error" && (
                      <p className="text-red-400 text-[13px]">{formState.error}</p>
                    )}

                    <p className="text-cream/30 text-[12px]">
                      Al enviar aceptas nuestra política de privacidad. No spam — solo coordinamos la llamada.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className={`mt-8 flex items-center ${step > 0 ? "justify-between" : "justify-end"}`}>
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-[13px] text-cream/40 hover:text-cream transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Atrás
                  </button>
                )}

                {step < 2 ? (
                  <button
                    onClick={nextStep}
                    disabled={step === 0 ? !canNext0 : !canNext1}
                    className="flex items-center gap-2.5 bg-bronze text-ink px-6 py-3 rounded-full text-[14px] font-bold hover:bg-bronze-soft transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
                  >
                    Siguiente
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                ) : (
                  <button
                    onClick={onSubmit}
                    disabled={formState.kind === "loading"}
                    className="flex items-center gap-2.5 bg-bronze text-ink px-7 py-3 rounded-full text-[14px] font-bold hover:bg-bronze-soft transition-all duration-300 disabled:opacity-50 shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
                  >
                    {formState.kind === "loading" ? "Enviando..." : "Enviar solicitud"}
                    {formState.kind !== "loading" && <ArrowRight size={15} strokeWidth={2.5} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label className="eyebrow !text-cream/40 !tracking-[0.2em] mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-line-dark/60 focus:border-bronze pb-2.5 text-[16px] text-cream placeholder:text-cream/25 outline-none transition-colors duration-300"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <span className="text-[12px] tracking-wide text-cream/40 uppercase">{label}</span>
      <span className="text-[14px] text-cream font-medium text-right">{value}</span>
    </div>
  );
}
