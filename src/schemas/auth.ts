import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido" }),
  senha: z.string().min(6, { error: "A senha deve ter no mínimo 6 caracteres" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    nome: z.string().trim().min(1, { error: "Informe seu nome de usuário" }),
    email: z.email({ error: "Informe um e-mail válido" }),
    senha: z.string().min(6, { error: "A senha deve ter no mínimo 6 caracteres" }),
    confirmarSenha: z.string().min(1, { error: "Confirme sua senha" }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    error: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
