"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageCircle } from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadData = {
  name: string;
  phone: string;
  email: string;
};

// ─── Constantes ───────────────────────────────────────────
const QUICK_QUESTIONS = [
  "¿Qué es el sistema BEAT?",
  "¿Cómo es el proceso de trabajo?",
  "¿Para qué tipo de proyectos trabajan?",
  "¿Qué herramientas y tecnología usan?",
  "Quiero solicitar un diagnóstico →",
];

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "¡Hola! Soy EVA, asesora virtual de Leaderbeat 👋\n\nEstoy aquí para ayudarte a descubrir si nuestro sistema puede transformar la operación comercial de tu proyecto inmobiliario.\n\nAntes de empezar, ¿me compartes tus datos para atenderte mejor?",
};

// ─── Sub-componentes ──────────────────────────────────────
function EvaAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-7 h-7 text-[11px]" : "w-10 h-10 text-[17px]";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-display font-bold text-white shrink-0`}
      style={{ background: "linear-gradient(135deg, #6C63FF 0%, #4A42CC 100%)" }}
    >
      E
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]/50 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────
interface ChatWidgetProps {
  whatsappPhone?: string;
}

export function ChatWidget({ whatsappPhone = "521234567890" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Estado del formulario de captación
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [formValues, setFormValues] = useState({ name: "", phone: "", email: "" });
  const [formErrors, setFormErrors] = useState({ name: false, phone: false, email: false });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Greeting automático a los 2.5s
  useEffect(() => {
    const show = setTimeout(() => {
      setShowGreeting(true);
      setHasUnread(true);
    }, 2500);
    const hide = setTimeout(() => setShowGreeting(false), 9000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  // Scroll al fondo en cada cambio de mensajes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, leadData]);

  // Focus al input al abrir (solo después de capturar datos)
  useEffect(() => {
    if (isOpen && leadData) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, leadData]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setHasUnread(false);
  };

  // ── Validación y envío del formulario ──────────────────
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async () => {
    const errors = {
      name: formValues.name.trim().length < 2,
      phone: formValues.phone.trim().length < 7,
      email: !validateEmail(formValues.email.trim()),
    };
    setFormErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setIsSubmittingForm(true);
    const name = formValues.name.trim().split(" ")[0]; // primer nombre

    // Pequeño delay para sensación de procesamiento
    await new Promise((r) => setTimeout(r, 600));

    const lead: LeadData = {
      name: formValues.name.trim(),
      phone: formValues.phone.trim(),
      email: formValues.email.trim(),
    };
    setLeadData(lead);

    // Respuesta personalizada de EVA
    const greeting: Message = {
      id: "post-form",
      role: "assistant",
      content: `¡Perfecto, ${name}! 🙌 Mucho gusto.\n\nAhora sí, cuéntame: ¿en qué puedo ayudarte hoy?`,
    };
    setMessages((prev) => [...prev, greeting]);
    setIsSubmittingForm(false);
  };

  // ── Envío de mensajes al chat ──────────────────────────
  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          leadName: leadData?.name ?? null,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Tuve un problema técnico 😔 Escríbenos directamente a hola@leaderbeat.io y te respondemos en minutos.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick replies aparecen solo justo después del form (2 mensajes: init + bienvenida)
  const showQuickReplies = leadData !== null && messages.length === 2 && !isTyping;

  const waLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Hola, me interesa saber más sobre Leaderbeat 🏢"
  )}`;

  return (
    <>
      {/* ── Panel de chat ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] inset-x-3 bottom-[9rem] md:inset-x-auto md:bottom-[5.5rem] md:right-6 md:w-[375px] rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(108,99,255,0.18)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3.5 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)" }}
            >
              <div className="relative">
                <EvaAvatar size="md" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0f0f23]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-white text-[15px] leading-none mb-0.5">
                  EVA
                </p>
                <p className="text-[11px] text-green-400 tracking-wide">
                  En línea · Asesora Leaderbeat
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Cerrar chat"
              >
                <X size={15} strokeWidth={2} className="text-white/70" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="bg-[#f5f5fa] h-[340px] md:h-[360px] overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.role === "assistant" && <EvaAvatar size="sm" />}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-white text-graphite rounded-tl-sm shadow-sm border border-black/[0.06]"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #6C63FF 0%, #5A52E0 100%)" }
                        : {}
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* ── Formulario de captación ─────────────── */}
              {!leadData && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="ml-9"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-black/[0.06] space-y-2.5">
                    {/* Nombre */}
                    <div>
                      <input
                        type="text"
                        placeholder="Nombre completo *"
                        value={formValues.name}
                        onChange={(e) => {
                          setFormValues((v) => ({ ...v, name: e.target.value }));
                          setFormErrors((e2) => ({ ...e2, name: false }));
                        }}
                        className={`w-full bg-[#f5f5fa] rounded-xl px-3 py-2.5 text-[13px] text-graphite placeholder:text-mute outline-none transition-all ${
                          formErrors.name ? "ring-2 ring-red-400/50" : ""
                        }`}
                        style={{ boxShadow: "none" }}
                        onFocus={(e) =>
                          (e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.25)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-400 mt-1 ml-1">
                          Ingresa tu nombre
                        </p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp *"
                        value={formValues.phone}
                        onChange={(e) => {
                          setFormValues((v) => ({ ...v, phone: e.target.value }));
                          setFormErrors((e2) => ({ ...e2, phone: false }));
                        }}
                        className={`w-full bg-[#f5f5fa] rounded-xl px-3 py-2.5 text-[13px] text-graphite placeholder:text-mute outline-none transition-all ${
                          formErrors.phone ? "ring-2 ring-red-400/50" : ""
                        }`}
                        style={{ boxShadow: "none" }}
                        onFocus={(e) =>
                          (e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.25)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-400 mt-1 ml-1">
                          Ingresa un teléfono válido
                        </p>
                      )}
                    </div>

                    {/* Correo */}
                    <div>
                      <input
                        type="email"
                        placeholder="Correo electrónico *"
                        value={formValues.email}
                        onChange={(e) => {
                          setFormValues((v) => ({ ...v, email: e.target.value }));
                          setFormErrors((e2) => ({ ...e2, email: false }));
                        }}
                        className={`w-full bg-[#f5f5fa] rounded-xl px-3 py-2.5 text-[13px] text-graphite placeholder:text-mute outline-none transition-all ${
                          formErrors.email ? "ring-2 ring-red-400/50" : ""
                        }`}
                        style={{ boxShadow: "none" }}
                        onFocus={(e) =>
                          (e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.25)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-400 mt-1 ml-1">
                          Ingresa un correo válido
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      onClick={handleFormSubmit}
                      disabled={isSubmittingForm}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all disabled:opacity-60"
                      style={{
                        background:
                          "linear-gradient(135deg, #6C63FF 0%, #5A52E0 100%)",
                      }}
                    >
                      {isSubmittingForm ? (
                        <span className="flex items-center justify-center gap-2">
                          <TypingDots />
                        </span>
                      ) : (
                        "Continuar →"
                      )}
                    </motion.button>

                    <p className="text-[10.5px] text-mute/60 text-center leading-snug">
                      Tus datos son confidenciales y solo se usan para atenderte.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Quick replies — después del form, antes del primer mensaje del usuario */}
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex flex-col gap-1.5 ml-9"
                >
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-[12.5px] font-medium text-[#6C63FF] bg-white border border-[#6C63FF]/20 hover:bg-[#6C63FF]/6 hover:border-[#6C63FF]/45 rounded-xl px-3.5 py-2 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5"
                  >
                    <EvaAvatar size="sm" />
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-black/[0.06]">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input — solo visible después de capturar datos */}
            <AnimatePresence>
              {leadData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white border-t border-black/[0.06] px-3 py-3 flex gap-2 items-center"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder={`Escribe tu pregunta, ${leadData.name.split(" ")[0]}…`}
                    className="flex-1 bg-[#f5f5fa] rounded-xl px-3.5 py-2.5 text-[13.5px] text-graphite placeholder:text-mute outline-none transition-all"
                    style={{ boxShadow: "none" }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.3)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    whileTap={{ scale: 0.92 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #6C63FF 0%, #5A52E0 100%)" }}
                    aria-label="Enviar mensaje"
                  >
                    <Send size={15} strokeWidth={2} className="text-white" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer — brand izquierda · WhatsApp derecha */}
            <div className="bg-white border-t border-black/[0.04] py-2 px-3 flex items-center justify-between">
              <span className="text-[9.5px] text-mute/50 tracking-[0.08em] uppercase">
                Asistida por{" "}
                <span className="text-[#6C63FF]/60 font-semibold">Leaderbeat</span>
              </span>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10.5px] font-semibold transition-opacity hover:opacity-80"
                style={{ color: "#25D366" }}
              >
                <MessageCircle size={12} strokeWidth={2} />
                Hablar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Burbuja de bienvenida ──────────────────────── */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleOpen}
            className="fixed z-[59] bottom-[9.5rem] right-4 md:bottom-[8rem] md:right-6 text-left"
            aria-label="Abrir chat"
          >
            <div
              className="text-white text-[13px] rounded-2xl rounded-br-sm px-4 py-3 leading-snug max-w-[220px] relative"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-semibold">¡Bienvenido a Leaderbeat!</span>
              <br />
              <span className="text-white/55 text-[12px]">
                Soy EVA, ¿puedo ayudarte? 👋
              </span>
              <span
                className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
                style={{ background: "#0f0f23" }}
                aria-hidden
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Botón flotante ─────────────────────────────── */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        className="fixed z-[60] bottom-[5.5rem] right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #6C63FF 0%, #4A42CC 100%)",
          boxShadow: "0 8px 28px rgba(108,99,255,0.50)",
        }}
        aria-label={isOpen ? "Cerrar chat" : "Chatear con EVA"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} strokeWidth={2} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="avatar"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="font-display font-bold text-white text-[22px] leading-none"
            >
              E
            </motion.span>
          )}
        </AnimatePresence>

        {/* Badge de notificación */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex h-5 w-5"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500 items-center justify-center text-[9px] font-bold text-white">
                1
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
