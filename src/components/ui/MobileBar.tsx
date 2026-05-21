"use client";

import { MessageCircle, ArrowRight } from "lucide-react";

type Props = {
  phone: string;
};

export function MobileBar({ phone }: Props) {
  const waUrl = `https://wa.me/${phone}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      {/* Blur backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-ink/80 border-t border-line-dark/50" />

      <div className="relative flex items-center gap-3 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-line-dark/60 bg-white/5 text-cream text-[13px] font-semibold hover:bg-white/10 transition-colors"
        >
          <MessageCircle size={16} strokeWidth={2} className="text-green-400" />
          WhatsApp
        </a>

        {/* Diagnóstico */}
        <a
          href="#contacto"
          className="flex-[1.6] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bronze text-white text-[13px] font-bold shadow-[0_4px_20px_rgba(108,99,255,0.4)] hover:bg-bronze-soft transition-colors"
        >
          Solicitar diagnóstico
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
