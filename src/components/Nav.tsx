"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";

const links = [
  { label: "BEAT Score", href: "/beat-score" },
  { label: "Sistema", href: "#sistema" },
  { label: "Proceso", href: "#proceso" },
  { label: "Trabajo", href: "#trabajo" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-md bg-[#0d0520]/90"
            : "bg-transparent"
        )}
      >
        <div className="container-edge flex items-center justify-between h-16 md:h-20">
          {/* Wordmark — oculto en móvil hasta hacer scroll */}
          <Link
            href="/"
            className={cn(
              "items-center hover:opacity-80 transition-all duration-500",
              scrolled ? "flex" : "hidden md:flex"
            )}
          >
            <Image src="/leaderbeat.svg" alt="Leaderbeat" width={140} height={32} priority />
          </Link>

          {/* Spacer en móvil cuando el logo no está visible */}
          {!scrolled && <div className="md:hidden" />}

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-[#9B8FFF] hover:text-bronze transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side: CTA */}
          <div className="hidden md:block">
            <CTAButton href="#contacto" variant="primary" className="!py-2.5 !px-5 !text-[13px]">
              Diagnóstico
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 -mr-2"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu — fuera del header para evitar conflicto con backdrop-filter */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[60] bg-[#0d0520] flex flex-col"
          >
            {/* Close button */}
            <div className="container-edge flex justify-end pt-5">
              <button
                onClick={() => setOpen(false)}
                className="text-white p-2 -mr-2"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="container-edge flex-1 flex flex-col justify-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl font-bold text-white hover:text-[#9B8FFF] transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.07, duration: 0.4 }}
                className="mt-4"
              >
                <CTAButton href="#contacto" variant="primary">
                  Solicita tu diagnóstico
                </CTAButton>
              </motion.div>
            </nav>

            {/* Bottom strip */}
            <div className="container-edge pb-10 text-[11px] tracking-[0.18em] uppercase text-white/30">
              Leaderbeat · Real Estate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
