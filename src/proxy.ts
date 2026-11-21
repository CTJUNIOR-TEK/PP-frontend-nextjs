import { type NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "@/lib/jwt";
import { DEFAULT_PRIVATE_ROUTE, PUBLIC_ROUTES, SESSION_COOKIE } from "@/lib/session-config";

/**
 * Proxy (antigo "middleware"): roda antes de cada rota.
 * - Sem sessão válida em rota privada → /login
 * - Com sessão válida em /login ou /cadastro → /entrada
 *
 * É uma checagem otimista (não verifica a assinatura do JWT). A autorização
 * real acontece no backend a cada requisição.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const hasValidSession = Boolean(token) && !isTokenExpired(token!);
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute && hasValidSession) {
    return NextResponse.redirect(new URL(DEFAULT_PRIVATE_ROUTE, request.url));
  }

  if (!isPublicRoute && !hasValidSession) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (token) response.cookies.delete(SESSION_COOKIE); // token expirado
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Não roda para arquivos estáticos, imagens otimizadas, ícones e para /logout.
  matcher: ["/((?!_next/static|_next/image|logout|icon.png|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
