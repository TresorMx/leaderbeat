import type { Metadata } from "next";
import { BeatOnePage } from "@/components/beat-one/BeatOnePage";

export const metadata: Metadata = {
  title:
    "BEAT One™ — El sistema comercial para brokers inmobiliarios | Leaderbeat",
  description:
    "Agente de WhatsApp que responde y agenda 24/7, pipeline pre-armado, scripts y dashboard. El sistema de las grandes desarrolladoras al precio de un broker. USD 149/mes precio fundador.",
  openGraph: {
    title: "BEAT One™ — Responde en segundos. Cierra más.",
    description:
      "El sistema comercial empaquetado para brokers inmobiliarios. Precio fundador, cupos limitados.",
  },
};

export default function Page() {
  return <BeatOnePage />;
}
