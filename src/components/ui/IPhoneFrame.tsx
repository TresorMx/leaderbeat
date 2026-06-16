"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "motion/react";

export function IPhoneFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="flex justify-center py-4" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 72, rotateX: 14, scale: 0.93 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
        style={{ transformOrigin: "50% 110%" }}
      >
        {/* Left buttons */}
        <div className="absolute -left-[3px] top-[88px]  w-[3px] h-7  bg-[#48484a] rounded-l-[2px]" />
        <div className="absolute -left-[3px] top-[132px] w-[3px] h-10 bg-[#48484a] rounded-l-[2px]" />
        <div className="absolute -left-[3px] top-[184px] w-[3px] h-10 bg-[#48484a] rounded-l-[2px]" />
        {/* Right button */}
        <div className="absolute -right-[3px] top-[152px] w-[3px] h-14 bg-[#48484a] rounded-r-[2px]" />

        {/* Phone body */}
        <div
          className="rounded-[46px] p-[10px] shadow-[0_0_0_0.5px_rgba(255,255,255,0.12)]"
          style={{ width: "284px", background: "#141414" }}
        >
          {/* Screen */}
          <div
            className="relative rounded-[38px] overflow-hidden flex flex-col bg-ink-soft"
            style={{ height: "560px" }}
          >
            {/* Status bar */}
            <div
              className="flex items-center justify-between px-5 shrink-0 border-b border-white/[0.06]"
              style={{ height: "44px" }}
            >
              <span className="text-[11px] font-semibold text-cream">9:41</span>
              <div className="flex items-center gap-[5px]">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-cream">
                  <rect x="0"    y="8" width="3" height="4"  rx="0.5" />
                  <rect x="4.5"  y="5" width="3" height="7"  rx="0.5" />
                  <rect x="9"    y="2" width="3" height="10" rx="0.5" opacity="0.4" />
                  <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.4" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 20 15" fill="none" stroke="currentColor" strokeLinecap="round" className="text-cream">
                  <circle cx="10" cy="13" r="1.8" fill="currentColor" stroke="none" />
                  <path d="M6 9.5 Q10 5.5 14 9.5" strokeWidth="2" />
                  <path d="M2.5 6 Q10 -0.5 17.5 6" strokeWidth="2" opacity="0.5" />
                </svg>
                <div className="flex items-center gap-[2px]">
                  <div className="w-[22px] h-[11px] rounded-[3px] border border-cream/70 p-[1.5px] flex items-center">
                    <div className="h-full rounded-[1.5px] bg-cream/80" style={{ width: "75%" }} />
                  </div>
                  <div className="w-[2px] h-[5px] rounded-r-[1px] bg-cream/40" />
                </div>
              </div>
            </div>

            {/* Content slot */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {children}
            </div>

            {/* Home indicator */}
            <div className="shrink-0 flex justify-center py-1.5 border-t border-white/[0.06]">
              <div className="rounded-full w-[90px] h-[4px] bg-white/[0.15]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
