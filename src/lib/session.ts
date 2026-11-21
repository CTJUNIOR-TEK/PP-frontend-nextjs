import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./session-config";

/** Lê o JWT salvo no cookie httpOnly. */
export async function getToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

/** Só pode ser chamada em Server Actions ou Route Handlers. */
export async function setToken(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true, // o JavaScript do navegador não consegue ler o token
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/** Só pode ser chamada em Server Actions ou Route Handlers. */
export async function clearToken() {
  (await cookies()).delete(SESSION_COOKIE);
}
