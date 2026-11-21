import { z } from "zod";

export const sendEmailSchema = z.object({
  emailDeDestinatario: z.email({ error: "Informe o e-mail do destinatário" }),
  title: z.string().trim().min(1, { error: "O título é obrigatório" }).max(120, {
    error: "O título deve ter no máximo 120 caracteres",
  }),
  content: z.string().trim().min(1, { error: "O conteúdo é obrigatório" }),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;

export const emailIdSchema = z.uuid({ error: "Identificador de e-mail inválido" });
