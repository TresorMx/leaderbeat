"use server";

export type LeadStatus = "lanzando" | "optimizando" | "explorando";
export type LeadBudget = "<3k" | "3-10k" | "10-30k" | "30k+";

export type LeadFormData = {
  name: string;
  email: string;
  whatsapp: string;
  status: LeadStatus;
  budget: LeadBudget;
  context?: string;
};

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; field?: keyof LeadFormData };

/**
 * Server Action — recibe el lead, valida, registra.
 *
 * Stub funcional. Para producción conectar:
 *   - Resend para email transaccional (notificación interna + autoresponder)
 *   - HubSpot / Pipedrive vía API REST
 *   - Slack webhook para notificación en canal #leads
 *
 * Variables de entorno necesarias después:
 *   RESEND_API_KEY, HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID, SLACK_WEBHOOK_URL
 */
// ---------------------------------------------------------------------------
// BEAT Score™
// ---------------------------------------------------------------------------

export type BeatScoreLead = {
  name: string;
  email: string;
  whatsapp: string;
  segment: "desarrolladora" | "broker";
  score: number;
  moduleScores: { module: string; pct: number }[];
  weakest: string;
};

/**
 * Server Action — recibe el resultado del BEAT Score + datos de contacto.
 * Mismo patrón que submitLead: stub funcional, conectar Resend/CRM/Slack
 * en producción. El segment permite enrutar: desarrolladora → diagnóstico,
 * broker → lista de espera BEAT One.
 */
export async function submitBeatScore(
  data: BeatScoreLead
): Promise<ActionResult> {
  if (!data.name || data.name.trim().length < 2) {
    return { ok: false, error: "El nombre es obligatorio.", field: "name" };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email inválido.", field: "email" };
  }
  if (!data.whatsapp || data.whatsapp.replace(/\D/g, "").length < 7) {
    return {
      ok: false,
      error: "WhatsApp inválido. Incluye código de país.",
      field: "whatsapp",
    };
  }

  // Por ahora solo loguea. En producción: Resend (PDF del reporte) + CRM + Slack.
  console.log("[LEADERBEAT] BEAT Score lead:", {
    ...data,
    receivedAt: new Date().toISOString(),
  });

  await new Promise((r) => setTimeout(r, 600));

  return {
    ok: true,
    message:
      data.segment === "desarrolladora"
        ? "Recibido. Tu reporte completo llega por email y te contactamos para el diagnóstico."
        : "Recibido. Tu reporte llega por email y estás en la lista prioritaria de BEAT One.",
  };
}

// ---------------------------------------------------------------------------
// BEAT One — waitlist
// ---------------------------------------------------------------------------

export type BeatOneWaitlistData = {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  /** ¿Cuántos leads maneja al mes? — para priorizar la waitlist */
  volume: "<20" | "20-50" | "50-150" | "150+";
};

export async function submitBeatOneWaitlist(
  data: BeatOneWaitlistData
): Promise<ActionResult> {
  if (!data.name || data.name.trim().length < 2) {
    return { ok: false, error: "El nombre es obligatorio.", field: "name" };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email inválido.", field: "email" };
  }
  if (!data.whatsapp || data.whatsapp.replace(/\D/g, "").length < 7) {
    return {
      ok: false,
      error: "WhatsApp inválido. Incluye código de país.",
      field: "whatsapp",
    };
  }

  // Por ahora solo loguea. En producción: Resend + CRM + Slack.
  console.log("[LEADERBEAT] BEAT One waitlist:", {
    ...data,
    receivedAt: new Date().toISOString(),
  });

  await new Promise((r) => setTimeout(r, 600));

  return {
    ok: true,
    message:
      "Estás dentro. Te avisamos primero y aseguras el precio fundador.",
  };
}

export async function submitLead(data: LeadFormData): Promise<ActionResult> {
  // -------- Validación server-side --------
  if (!data.name || data.name.trim().length < 2) {
    return { ok: false, error: "El nombre es obligatorio.", field: "name" };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email inválido.", field: "email" };
  }
  if (!data.whatsapp || data.whatsapp.replace(/\D/g, "").length < 7) {
    return {
      ok: false,
      error: "WhatsApp inválido. Incluye código de país.",
      field: "whatsapp",
    };
  }
  if (!data.status) {
    return { ok: false, error: "Selecciona tu momento.", field: "status" };
  }
  if (!data.budget) {
    return { ok: false, error: "Selecciona un rango de inversión.", field: "budget" };
  }

  // -------- Procesamiento --------
  // Por ahora solo loguea. En producción reemplazar con:
  // await sendEmailToTeam(data);
  // await createHubSpotContact(data);
  // await notifySlack(data);
  console.log("[LEADERBEAT] New lead:", {
    ...data,
    receivedAt: new Date().toISOString(),
  });

  // Simula latencia de red para UX realista
  await new Promise((r) => setTimeout(r, 600));

  return {
    ok: true,
    message: "Recibido. Te escribimos en menos de 24 horas hábiles.",
  };
}
