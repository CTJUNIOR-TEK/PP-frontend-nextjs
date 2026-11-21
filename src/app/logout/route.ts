import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-config";

/**
 * GET /logout — usado quando o backend recusa o token durante a renderização
 * de uma página (Server Components não podem alterar cookies).
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
