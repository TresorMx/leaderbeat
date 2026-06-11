/**
 * BEAT Score™ — datos del quiz y lógica de scoring.
 *
 * 12 preguntas, 3 por módulo (B/E/A/T). Cada opción suma 0–3 puntos.
 * Score total = (puntos / 36) * 100, redondeado.
 */

export type Segment = "desarrolladora" | "broker";

export type ModuleKey = "B" | "E" | "A" | "T";

export type Option = {
  label: string;
  points: 0 | 1 | 2 | 3;
};

export type Question = {
  id: string;
  module: ModuleKey;
  text: string;
  /** Variante opcional del texto para brokers */
  brokerText?: string;
  options: Option[];
};

export const MODULES: Record<
  ModuleKey,
  { name: string; tagline: string }
> = {
  B: { name: "Brand", tagline: "Marca y posicionamiento" },
  E: { name: "Engine", tagline: "CRM y proceso comercial" },
  A: { name: "Attract", tagline: "Captación y pauta" },
  T: { name: "Transform", tagline: "Automatización y agentes" },
};

export const QUESTIONS: Question[] = [
  // ---------- B — Brand ----------
  {
    id: "b1",
    module: "B",
    text: "¿Cómo te encuentra un comprador que todavía no te conoce?",
    options: [
      { label: "Solo por portales o referidos", points: 0 },
      { label: "Redes activas, pero sin estrategia clara", points: 1 },
      { label: "Marca con identidad consistente en varios canales", points: 2 },
      { label: "Marca reconocida que genera demanda directa", points: 3 },
    ],
  },
  {
    id: "b2",
    module: "B",
    text: "Si le quitas el logo a tu material comercial, ¿se distingue del de tu competencia?",
    options: [
      { label: "No — parece el mismo brochure que el de al lado", points: 0 },
      { label: "Un poco, en algunas piezas", points: 1 },
      { label: "Sí, tiene un estilo propio", points: 2 },
      { label: "Totalmente — es reconocible al instante", points: 3 },
    ],
  },
  {
    id: "b3",
    module: "B",
    text: "¿Tienes definido a quién le vendes y por qué te eligen a ti?",
    options: [
      { label: "Le vendemos a quien llegue", points: 0 },
      { label: "Tenemos una idea general", points: 1 },
      { label: "Perfiles de comprador documentados", points: 2 },
      { label: "Posicionamiento documentado y aplicado en todo", points: 3 },
    ],
  },

  // ---------- E — Engine ----------
  {
    id: "e1",
    module: "E",
    text: "¿Dónde viven tus leads hoy?",
    options: [
      { label: "En el WhatsApp personal de cada vendedor", points: 0 },
      { label: "En un Excel compartido", points: 1 },
      { label: "En un CRM, pero a medias", points: 2 },
      { label: "CRM con pipeline limpio y al día", points: 3 },
    ],
  },
  {
    id: "e2",
    module: "E",
    text: "¿Cuánto tarda en recibir respuesta un lead nuevo?",
    options: [
      { label: "Horas… o días", points: 0 },
      { label: "Menos de una hora, en horario laboral", points: 1 },
      { label: "Menos de 15 minutos", points: 2 },
      { label: "Menos de 5 minutos, 24/7", points: 3 },
    ],
  },
  {
    id: "e3",
    module: "E",
    text: "¿Existe un proceso de seguimiento documentado?",
    brokerText: "¿Sigues un proceso de seguimiento definido, o improvisas cada vez?",
    options: [
      { label: "Cada quien improvisa", points: 0 },
      { label: "Hay costumbres, pero nada escrito", points: 1 },
      { label: "Scripts y cadencias definidas", points: 2 },
      { label: "Documentado, entrenado y medido", points: 3 },
    ],
  },

  // ---------- A — Attract ----------
  {
    id: "a1",
    module: "A",
    text: "¿Inviertes en pauta digital?",
    options: [
      { label: "No invierto en pauta", points: 0 },
      { label: "Boosts esporádicos cuando me acuerdo", points: 1 },
      { label: "Campañas constantes en al menos un canal", points: 2 },
      { label: "Full-funnel con presupuesto mensual fijo", points: 3 },
    ],
  },
  {
    id: "a2",
    module: "A",
    text: "¿Sabes cuánto te cuesta un lead calificado — no un lead cualquiera?",
    options: [
      { label: "No mido nada", points: 0 },
      { label: "Sé el costo por lead bruto", points: 1 },
      { label: "Distingo leads calificados de curiosos", points: 2 },
      { label: "Sé el costo por visita y por venta cerrada", points: 3 },
    ],
  },
  {
    id: "a3",
    module: "A",
    text: "¿Tus creativos y landings se prueban y optimizan?",
    options: [
      { label: "El mismo arte lleva meses corriendo", points: 0 },
      { label: "Cambio cosas cuando me acuerdo", points: 1 },
      { label: "Refresco creativo mensual", points: 2 },
      { label: "Testing A/B continuo con datos", points: 3 },
    ],
  },

  // ---------- T — Transform ----------
  {
    id: "t1",
    module: "T",
    text: "Cuando entra un lead a medianoche, ¿qué pasa?",
    options: [
      { label: "Espera hasta mañana (con suerte)", points: 0 },
      { label: "Recibe un mensaje automático genérico", points: 1 },
      { label: "Un bot le responde algo básico", points: 2 },
      { label: "Un agente lo califica y le agenda visita solo", points: 3 },
    ],
  },
  {
    id: "t2",
    module: "T",
    text: "¿Tus herramientas están conectadas entre sí?",
    options: [
      { label: "Nada está conectado", points: 0 },
      { label: "Paso datos a mano entre sistemas", points: 1 },
      { label: "Algunas automatizaciones sueltas", points: 2 },
      { label: "Flujo integrado: pauta → CRM → WhatsApp → calendario", points: 3 },
    ],
  },
  {
    id: "t3",
    module: "T",
    text: "¿Cuánto trabajo repetitivo hace tu equipo a mano?",
    brokerText: "¿Cuánto trabajo repetitivo haces a mano cada día?",
    options: [
      { label: "Casi todo es manual", points: 0 },
      { label: "Bastante más de lo que quisiera", points: 1 },
      { label: "Poco — lo grueso está automatizado", points: 2 },
      { label: "Solo lo que requiere criterio humano", points: 3 },
    ],
  },
];

export const MAX_POINTS = QUESTIONS.length * 3; // 36

export type Tier = {
  min: number;
  name: string;
  headline: string;
  body: string;
};

export const TIERS: Tier[] = [
  {
    min: 0,
    name: "Modo supervivencia",
    headline: "Estás dejando ventas en la mesa todos los días.",
    body: "Tu operación comercial depende de la memoria y la buena voluntad de las personas. Cada lead que entra está compitiendo contra tu propio desorden antes que contra tu competencia.",
  },
  {
    min: 40,
    name: "Sistema incompleto",
    headline: "Tienes piezas. Te falta la máquina.",
    body: "Hay inversión y hay intención, pero los módulos no se hablan entre sí. El dinero de pauta se evapora en el hueco que existe entre el clic y el seguimiento.",
  },
  {
    min: 70,
    name: "Listo para escalar",
    headline: "Tu base es sólida. Ahora toca multiplicar.",
    body: "Tienes proceso y disciplina. El siguiente salto no es trabajar más: es automatizar lo repetitivo y afinar el módulo más débil para que el sistema opere solo.",
  },
];

export function getTier(score: number): Tier {
  return [...TIERS].reverse().find((t) => score >= t.min) ?? TIERS[0];
}

export type ModuleScore = {
  module: ModuleKey;
  points: number;
  max: number;
  pct: number;
};

export function computeScores(answers: Record<string, number>): {
  total: number;
  modules: ModuleScore[];
  weakest: ModuleKey;
} {
  const byModule: Record<ModuleKey, { points: number; max: number }> = {
    B: { points: 0, max: 0 },
    E: { points: 0, max: 0 },
    A: { points: 0, max: 0 },
    T: { points: 0, max: 0 },
  };

  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    byModule[q.module].max += 3;
    if (idx !== undefined) {
      byModule[q.module].points += q.options[idx].points;
    }
  }

  const modules: ModuleScore[] = (Object.keys(byModule) as ModuleKey[]).map(
    (m) => ({
      module: m,
      points: byModule[m].points,
      max: byModule[m].max,
      pct: Math.round((byModule[m].points / byModule[m].max) * 100),
    })
  );

  const totalPoints = modules.reduce((s, m) => s + m.points, 0);
  const total = Math.round((totalPoints / MAX_POINTS) * 100);
  const weakest = [...modules].sort((a, b) => a.pct - b.pct)[0].module;

  return { total, modules, weakest };
}
