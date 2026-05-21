import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { BeatSystem } from "@/components/sections/BeatSystem";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { WhoFor } from "@/components/sections/WhoFor";
import { Application } from "@/components/sections/Application";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";
import { Closing } from "@/components/sections/Closing";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Reemplazar con datos reales cuando estén listos
const CALENDLY_URL = ""; // Ej: "https://calendly.com/leaderbeat/diagnostico"
const WHATSAPP_PHONE = "573000000000"; // Solo dígitos con código de país

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <BeatSystem />
        <Process />
        <Work />
        <Stack />
        <WhoFor />
        <Application />
        <CalendlyEmbed calendlyUrl={CALENDLY_URL} />
        <Closing />
      </main>
      <Footer />
      <WhatsAppButton phone={WHATSAPP_PHONE} />
    </>
  );
}
