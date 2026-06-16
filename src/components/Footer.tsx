import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink text-cream pt-24 pb-0">
      <div className="container-edge">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Image src="/leaderbeat.svg" alt="Leaderbeat" width={150} height={34} />
            <p className="mt-6 max-w-md text-cream/70 leading-relaxed text-[15px]">
              Agencia de marketing digital especializada en proyectos
              inmobiliarios. Construimos marca, proceso y tecnología discreta
              para que la venta ocurra sola.
            </p>
            <p className="mt-3 text-[12px] tracking-[0.12em] uppercase text-cream/30">
              Cancún, Quintana Roo · México · US Hispanic
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow !text-cream/50">Sistema</div>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><a href="#sistema" className="text-cream/85 hover:text-bronze transition-colors">El sistema BEAT</a></li>
              <li><a href="#proceso" className="text-cream/85 hover:text-bronze transition-colors">Cómo trabajamos</a></li>
              <li><a href="#trabajo" className="text-cream/85 hover:text-bronze transition-colors">Trabajo seleccionado</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow !text-cream/50">Contacto</div>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><a href="mailto:hola@leaderbeat.io" className="text-cream/85 hover:text-bronze transition-colors">hola@leaderbeat.io</a></li>
              <li><a href="#" className="text-cream/85 hover:text-bronze transition-colors">WhatsApp</a></li>
              <li><a href="#" className="text-cream/85 hover:text-bronze transition-colors">Agenda una llamada</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-cream/40 tracking-wider">
            © {new Date().getFullYear()} LEADERBEAT.IO — Sistema comercial para marcas inmobiliarias · Cancún, México
          </div>
          <div className="flex gap-6 text-xs text-cream/40">
            <Link href="/legal" className="hover:text-cream/80 transition-colors">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-cream/80 transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>

      {/* Logo watermark */}
      <div className="mt-12 overflow-hidden flex items-end" aria-hidden>
        <Image
          src="/leaderbeat.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto opacity-[0.06] select-none"
        />
      </div>
    </footer>
  );
}
