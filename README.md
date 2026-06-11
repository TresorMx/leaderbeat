# LEADERBEAT.IO — Landing

Sitio web de LEADERBEAT.IO. Next.js 16 + Tailwind v4 + Motion + shadcn-ready.

## Arrancar en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — design tokens en `src/app/globals.css`
- **Motion** (`motion/react`) — animaciones
- **Lucide React** — iconografía
- **Fuentes (Google Fonts via `next/font`)**: Space Grotesk (display), Inter (sans), JetBrains Mono (mono)

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fuentes, metadata, body
│   ├── page.tsx            # Composición de la home
│   └── globals.css         # Design tokens + utilidades base
├── components/
│   ├── Nav.tsx             # Navegación sticky con scroll-blur
│   ├── Footer.tsx          # Footer
│   ├── ui/
│   │   ├── CTAButton.tsx   # CTA primaria reutilizable (3 variantes)
│   │   └── Reveal.tsx      # Wrapper de motion para reveals on-scroll
│   └── sections/
│       ├── Hero.tsx        # Hero con manifiesto + CTA
│       ├── Problem.tsx     # 4 puntos de dolor + cierre
│       └── BeatSystem.tsx  # Sistema BEAT interactivo (showpiece)
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

## Design system

### Paleta

> Nota: los nombres de los tokens (`bronze`, `cream`) se conservan por
> compatibilidad histórica, pero los valores actuales son violeta/blanco.

| Token | Valor | Uso |
|-------|-------|-----|
| `ink` | `#0A0A0F` | Near-black — fondos hero y closing |
| `ink-soft` | `#16161E` | Dark elevado — cards sobre ink |
| `cream` | `#FFFFFF` | Blanco — fondo principal |
| `cream-deep` | `#F4F4F8` | Gris claro — cards y secciones |
| `bronze` | `#6C63FF` | Violeta — acento, CTAs, destacados |
| `bronze-soft` | `#9B95FF` | Violeta claro — hovers |
| `graphite` | `#0F0F14` | Texto principal sobre blanco |
| `mute` | `#6B6B7B` | Texto secundario |
| `line` | `#E4E4EF` | Hairlines sobre blanco |
| `line-dark` | `#1E1E2E` | Hairlines sobre dark |

### Tipografía

- **Display:** Space Grotesk (titulares grandes, bold, tracking negativo)
- **Body:** Inter (sans-serif, para todo lo demás)
- **Mono:** JetBrains Mono (para detalles tipo "live indicator")

Clases utility para títulos: `.display-xl`, `.display-lg`, `.display-md` — usan `clamp()` para escalar entre breakpoints.

### Patrones repetibles

- `.container-edge` — wrapper centrado con padding fluido
- `.section-y` — padding vertical fluido para secciones
- `.eyebrow` — etiqueta tracked-caps pequeña arriba de cada sección
- `.rule-bronze` — línea fina de acento

## Estado actual

Construido (sesiones 1 + 2 + 3):
- [x] Scaffolding Next.js + Tailwind + Motion
- [x] Design system (tokens + tipografía)
- [x] Layout root + metadata SEO
- [x] Navegación con scroll-blur y menú mobile
- [x] Footer
- [x] **Hero** con manifiesto, motion staggered, gradient orbs, live indicator
- [x] **Problem** — 4 puntos de dolor con reveals
- [x] **BeatSystem** — interactivo: hover/click sobre cada letra cambia el contenido
- [x] **Process** — 4 fases con timeline vertical zigzag + barra de progreso animada al scroll
- [x] **Work** — 3 cards de caso (placeholder, listos para reemplazar con casos reales)
- [x] **Stack** — Tabla de herramientas por categoría + marquee infinito
- [x] **WhoFor** — Dos columnas (Es para ti / No es para ti) con check / x
- [x] **Application** — Form de 5 campos con validación, loading/success/error states, Server Action lista para conectar email/CRM
- [x] **CalendlyEmbed** — Iframe lazy-loaded (activa cuando agregues tu URL)
- [x] **Closing** — Sección final cinematográfica con parallax y manifiesto masivo
- [x] **WhatsAppButton** — Botón flotante con icono SVG, pulse animation

## Configurar antes de lanzar

Edita los valores en `src/app/page.tsx`:

```ts
const CALENDLY_URL = "https://calendly.com/tu-usuario/diagnostico";
const WHATSAPP_PHONE = "573000000000"; // Solo dígitos
```

Y en `src/app/actions.ts` agrega la integración real (Resend / HubSpot / Slack) donde está el comentario `// Por ahora solo loguea`.

## Roadmap (próximas sesiones)

### Sesión 4 — Pulido y deploy
- [ ] **Open Graph image** — Imagen social compartible (generada con `@vercel/og`)
- [ ] **Sitemap + robots.txt**
- [ ] **Analytics** (Vercel Analytics o Plausible)
- [ ] **Performance audit** — Lighthouse 95+
- [ ] **Deploy a Vercel** con dominio leaderbeat.io
- [ ] **i18n preparation** (estructura `app/[locale]/...`) para añadir EN después sin refactor

### Fase 2 — BEAT Score™ Quiz
- [ ] Ruta `/beat-score` con quiz interactivo
- [ ] Lógica de scoring + reporte personalizado
- [ ] Captura de email + envío del PDF
- [ ] Integración con CRM (HubSpot/Pipedrive)

## Deploy

Cuando estés listo:

```bash
# Conectar con Vercel
npx vercel

# Configurar dominio leaderbeat.io en el dashboard de Vercel
```

## Notas para iterar con Cursor / Claude Code

- Todas las secciones son componentes independientes en `src/components/sections/`. Agregar una sección nueva = crear el archivo + importar en `page.tsx`.
- El motion vive con `<Reveal>` para casos simples y `motion` directo de `motion/react` para animaciones a medida.
- Cualquier valor de color/spacing debe consumir tokens del `@theme inline` en `globals.css`. No hardcodear hex.
- El sitio está estructurado para que cada sección sea fácil de aislar y rehacer sin tocar las otras.
