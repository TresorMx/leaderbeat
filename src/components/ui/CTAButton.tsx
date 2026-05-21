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
    "group relative inline-flex items-center gap-3 font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const variantClasses: Record<Variant, string> = {
    primary:
      "px-7 py-4 bg-ink text-cream rounded-full text-[15px] hover:bg-bronze hover:text-ink",
    inverse:
      "px-7 py-4 bg-cream text-ink rounded-full text-[15px] hover:bg-bronze hover:text-ink",
    ghost:
      "text-[15px] text-ink underline-offset-[6px] hover:underline decoration-bronze decoration-[1.5px]",
  };

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        size={18}
        strokeWidth={1.5}
        className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
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
