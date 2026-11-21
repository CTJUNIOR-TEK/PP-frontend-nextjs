/**
 * Lê o `exp` de um JWT SEM verificar a assinatura.
 * Serve apenas para a experiência do usuário (redirecionar antes de uma
 * requisição falhar). Quem garante a segurança é o backend, que valida o token.
 */
export function getTokenExpiration(token: string): number | null {
  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(base64)) as { exp?: unknown };
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, now: number = Date.now()): boolean {
  const exp = getTokenExpiration(token);
  if (exp === null) return true;
  return exp * 1000 <= now;
}
