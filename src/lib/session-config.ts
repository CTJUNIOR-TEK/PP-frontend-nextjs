/**
 * Constantes de sessão compartilhadas entre o proxy (src/proxy.ts) e o servidor.
 * Este arquivo não pode importar nada de `next/headers`.
 */
export const SESSION_COOKIE = "ct_token";

/** O backend assina o JWT com `expiresIn: 2h`. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 2;

export const PUBLIC_ROUTES = ["/login", "/cadastro"] as const;
export const DEFAULT_PRIVATE_ROUTE = "/entrada";
