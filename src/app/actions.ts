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
