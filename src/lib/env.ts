import "server-only";
import { z } from "zod";

/**
 * Variáveis de ambiente do servidor, validadas na inicialização.
 * Nunca exponha a URL/segredos do backend com o prefixo NEXT_PUBLIC_:
 * todas as chamadas à API acontecem no servidor do Next.
 */
const envSchema = z.object({
  API_URL: z.url({ error: "API_URL deve ser uma URL válida (veja .env.example)" }),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
