import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { BeatSystem } from "@/components/sections/BeatSystem";
import { ScoreCTA } from "@/components/sections/ScoreCTA";
import { StatBreak } from "@/components/sections/StatBreak";
import { BrokerBanner } from "@/components/sections/BrokerBanner";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { WhoFor } from "@/components/sections/WhoFor";
import { Application } from "@/components/sections/Application";
import { Closing } from "@/components/sections/Closing";
import { MobileBar } from "@/components/ui/MobileBar";
import { ChatWidget } from "@/components/ui/ChatWidget";

const WHATSAPP_PHONE = "573000000000"; // Solo dígitos con código de país

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <StatBreak />
        <BeatSystem />
        <ScoreCTA />
        <Process />
        <Work />
        <Stack />
        <WhoFor />
        <BrokerBanner />
        <Application />
        <Closing />
      </main>
      <Footer />
      <MobileBar phone={WHATSAPP_PHONE} />
      <ChatWidget whatsappPhone={WHATSAPP_PHONE} />
    </>
  );
}
