"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";

const links = [
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-ink/80 border-b border-line-dark/40"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-edge flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-medium text-[13px] tracking-[0.18em] uppercase text-ink hover:text-bronze transition-colors"
        >
          Leaderbeat<span className="text-bronze">.io</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-graphite hover:text-bronze transition-colors duration-300"
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
          className="md:hidden text-ink p-2 -mr-2"
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-line-dark/40 bg-ink overflow-hidden"
          >
            <div className="container-edge py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-ink"
                >
                  {link.label}
                </a>
              ))}
              <CTAButton href="#contacto" variant="primary" className="mt-2 self-start">
                Solicita tu diagnóstico
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
