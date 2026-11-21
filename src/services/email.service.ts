import "server-only";
import type { SendEmailInput } from "@/schemas/email";
import type {
  EmailDetail,
  EmailDetailDTO,
  EmailSummary,
  ReceivedEmailDTO,
  SentEmailDTO,
} from "@/types/email";
import { authedRequest } from "./http";
import { toEmailDetail, toReceivedEmail, toSentEmail } from "./mappers";

/** GET /my-emails — já vem ordenado do mais recente para o mais antigo. */
export async function getReceivedEmails(): Promise<EmailSummary[]> {
  const data = await authedRequest((api) =>
    api.get<{ emails: ReceivedEmailDTO[] }>("/my-emails").then((res) => res.data),
  );
  return data.emails.map(toReceivedEmail);
}

/** GET /sent-emails */
export async function getSentEmails(): Promise<EmailSummary[]> {
  const data = await authedRequest((api) =>
    api.get<{ emails: SentEmailDTO[] }>("/sent-emails").then((res) => res.data),
  );
  return data.emails.map(toSentEmail);
}

/**
 * GET /email/:id — ao ser aberto pelo destinatário, o backend marca `jaVisto`.
 * Atenção: o backend responde **400** em caso de sucesso, por isso o
 * `validateStatus` aceita 400 quando o corpo tem o e-mail.
 */
export async function getEmail(id: string): Promise<EmailDetail> {
  const data = await authedRequest(
    (api) =>
      api
        .get<EmailDetailDTO | { message?: string }>(`/email/${id}`, {
          validateStatus: (status) => status === 200 || status === 400,
        })
        .then((res) => res.data),
    { redirectOnUnauthorized: false },
  );

  // Um 400 "de verdade" (ex.: id inválido) não traz o campo `titulo`.
  if (!("titulo" in data)) {
    throw new Error(data.message ?? "Não foi possível abrir o e-mail");
  }

  return toEmailDetail(id, data);
}

/** POST /email */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  await authedRequest((api) => api.post("/email", input));
}

/** DELETE /email/:id — só o remetente pode apagar, e só se ainda não foi visto. */
export async function deleteEmail(id: string): Promise<void> {
  await authedRequest((api) => api.delete(`/email/${id}`), { redirectOnUnauthorized: false });
}
