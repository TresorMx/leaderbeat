"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "inverse";

type Props = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/**
 * Single CTA primitive used across the site.
 * Variants:
 *  - primary: dark on cream (default in light sections)
 *  - inverse: cream on dark (used in hero/closing)
 *  - ghost: underline link with arrow
 */
export function CTAButton({
  href,
  variant = "primary",
  className,
  children,
}: Props) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const baseClasses =
    "group relative inline-flex items-center gap-3 font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const variantClasses: Record<Variant, string> = {
    primary:
      "px-7 py-3.5 bg-bronze text-cream rounded-full text-[15px] hover:bg-bronze-soft hover:scale-[1.03] shadow-[0_4px_24px_rgba(108,99,255,0.35)] hover:shadow-[0_6px_32px_rgba(108,99,255,0.5)]",
    inverse:
      "px-7 py-3.5 bg-cream text-ink rounded-full text-[15px] hover:bg-cream-deep hover:scale-[1.03] shadow-[0_2px_16px_rgba(0,0,0,0.12)]",
    ghost:
      "text-[15px] text-bronze underline-offset-[6px] hover:underline decoration-bronze decoration-[1.5px]",
  };

  const content = (
    <>
      <span>{children}</span>
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0.5">
        <ArrowUpRight size={14} strokeWidth={2} />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(baseClasses, variantClasses[variant], className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {content}
    </Link>
  );
}
