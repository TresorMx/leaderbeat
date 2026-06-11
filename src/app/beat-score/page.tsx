import type { Metadata } from "next";
import { BeatScoreQuiz } from "@/components/beat-score/BeatScoreQuiz";

export const metadata: Metadata = {
  title: "BEAT Score™ — ¿Qué tan lista está tu operación comercial? | Leaderbeat",
  description:
    "Diagnóstico gratuito de 2 minutos para desarrolladoras y brokers inmobiliarios. Mide tu marca, proceso comercial, captación y automatización. Recibe tu score y tu punto más débil.",
  openGraph: {
    title: "BEAT Score™ — Diagnóstico comercial inmobiliario gratuito",
    description:
      "12 preguntas. 2 minutos. Descubre dónde se está fugando tu venta.",
  },
};

export default function BeatScorePage() {
  return <BeatScoreQuiz />;
}
