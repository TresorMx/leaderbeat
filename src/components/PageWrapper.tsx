"use client";

import { useState, useCallback } from "react";
import { Preloader } from "@/components/ui/Preloader";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <>
      {!done && <Preloader onComplete={handleComplete} />}
      {children}
    </>
  );
}
