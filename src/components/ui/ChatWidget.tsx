"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

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
    "¡Hola! Soy EVA, asesora de Leaderbeat 👋\n\nPuedo orientarte sobre el sistema BEAT, nuestro proceso o ayudarte a evaluar si tu proyecto encaja. ¿Por dónde empezamos?",
};

// Avatar de EVA — reemplazar src con foto real cuando esté disponible
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

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mostrar greeting después de 2.5s
  useEffect(() => {
    const show = setTimeout(() => {
      setShowGreeting(true);
      setHasUnread(true);
    }, 2500);
    const hide = setTimeout(() => setShowGreeting(false), 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Scroll al fondo en cada nuevo mensaje
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setHasUnread(false);
  };

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
            "Hubo un problema técnico 😔 Escríbenos directamente a hola@leaderbeat.io y te respondemos en minutos.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const showQuickReplies = messages.length === 1 && !isTyping;

  return (
    <>
      {/* ── Panel de chat ──────────────────────────────────── */}
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
              style={{
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)",
              }}
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
            <div className="bg-[#f5f5fa] h-[320px] md:h-[340px] overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <EvaAvatar size="sm" />
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-white text-graphite rounded-tl-sm shadow-sm border border-black/[0.06]"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #6C63FF 0%, #5A52E0 100%)",
                          }
                        : {}
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick replies — solo al inicio */}
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
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

            {/* Input */}
            <div className="bg-white border-t border-black/[0.06] px-3 py-3 flex gap-2 items-center">
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
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-[#f5f5fa] rounded-xl px-3.5 py-2.5 text-[13.5px] text-graphite placeholder:text-mute outline-none transition-all"
                style={{
                  boxShadow: "none",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 2px rgba(108,99,255,0.3)")
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
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-black/[0.04] py-1.5 text-center">
              <span className="text-[10px] text-mute/60 tracking-[0.1em] uppercase">
                Asistida por{" "}
              </span>
              <span className="text-[10px] text-[#6C63FF]/70 font-semibold tracking-[0.1em] uppercase">
                Leaderbeat.io
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Burbuja de bienvenida ──────────────────────────── */}
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
              className="text-white text-[13px] rounded-2xl rounded-br-sm px-4 py-3 leading-snug max-w-[210px] relative"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-semibold">¡Bienvenido a Leaderbeat!</span>
              <br />
              <span className="text-white/60 text-[12px]">
                ¿Puedo ayudarte con algo? 👋
              </span>
              {/* Flecha */}
              <span
                className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
                style={{ background: "#0f0f23" }}
                aria-hidden
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Botón flotante ─────────────────────────────────── */}
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
