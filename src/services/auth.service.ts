import "server-only";
import { createApi } from "@/lib/api";
import type { LoginInput, RegisterInput } from "@/schemas/auth";

/** POST /login → { token } */
export async function login({ email, senha }: LoginInput): Promise<string> {
  const { data } = await createApi().post<{ token: string }>("/login", { email, senha });
  return data.token;
}

/** POST /user → 201 */
export async function register({ nome, email, senha }: RegisterInput): Promise<void> {
  await createApi().post("/user", { nome, email, senha });
}
