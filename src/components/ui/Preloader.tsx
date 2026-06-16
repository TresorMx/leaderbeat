"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const words = ["Hola", "Hello", "你好", "logo"];
const delays = [380, 380, 480, 620]; // ms each word stays visible

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setDim({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    const isLast = index === words.length - 1;
    const timer = setTimeout(
      () => {
        if (isLast) {
          setExiting(true);
          setTimeout(onComplete, 500);
        } else {
          setIndex((i) => i + 1);
        }
      },
      delays[index],
    );
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #2a0d52 0%, #0d0520 55%, #080810 100%)",
      }}
    >
      {/* Stars — static decorative dots */}
      {dim.w > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {Array.from({ length: 40 }, (_, i) => {
            const x = ((i * 137 + 31) % 97) / 97;
            const y = ((i * 79  + 13) % 89) / 89;
            const r = i % 3 === 0 ? 1.5 : 1;
            return (
              <circle
                key={i}
                cx={`${x * 100}%`}
                cy={`${y * 100}%`}
                r={r}
                fill="white"
                opacity={0.15 + (i % 5) * 0.06}
              />
            );
          })}
        </svg>
      )}

      {/* Word / Logo */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center justify-center select-none"
      >
        {words[index] === "logo" ? (
          <Image
            src="/leaderbeat.svg"
            alt="Leaderbeat"
            width={220}
            height={50}
            className="w-[50vw] md:w-[clamp(225px,30vw,275px)] h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        ) : (
          <p
            className="font-display font-bold tracking-[-0.03em] text-center text-[#E8E0D0]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 3.5rem)" }}
          >
            {words[index]}
          </p>
        )}
      </motion.div>

    </motion.div>
  );
}
