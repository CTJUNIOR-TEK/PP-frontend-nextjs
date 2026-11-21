import { z } from "zod";

export const updateNameSchema = z.object({
  nome: z.string().trim().min(1, { error: "O nome não pode ficar vazio" }),
});

export type UpdateNameInput = z.infer<typeof updateNameSchema>;

export const updatePhotoSchema = z.object({
  linkPhoto: z.url({
    protocol: /^https?$/,
    error: "Informe um link http(s) válido para a imagem",
  }),
});

export type UpdatePhotoInput = z.infer<typeof updatePhotoSchema>;
