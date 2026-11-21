// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { SESSION_COOKIE } from "@/lib/session-config";
import { proxy } from "./proxy";

function jwtExpiringIn(seconds: number) {
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds }));
  return `header.${payload}.assinatura`;
}

function request(path: string, token?: string) {
  const req = new NextRequest(new URL(path, "http://localhost:3000"));
  if (token) req.cookies.set(SESSION_COOKIE, token);
  return req;
}

describe("proxy", () => {
  it("manda visitantes sem sessão para /login", () => {
    const res = proxy(request("/entrada"));
    expect(res.headers.get("location")).toBe("http://localhost:3000/login");
  });

  it("deixa visitantes acessarem /login e /cadastro", () => {
    expect(proxy(request("/login")).headers.get("location")).toBeNull();
    expect(proxy(request("/cadastro")).headers.get("location")).toBeNull();
  });

  it("manda usuários logados de /login para /entrada", () => {
    const res = proxy(request("/login", jwtExpiringIn(3600)));
    expect(res.headers.get("location")).toBe("http://localhost:3000/entrada");
  });

  it("libera rotas privadas para quem tem sessão válida", () => {
    expect(proxy(request("/perfil", jwtExpiringIn(3600))).headers.get("location")).toBeNull();
  });

  it("remove o cookie de um token expirado", () => {
    const res = proxy(request("/entrada", jwtExpiringIn(-10)));
    expect(res.headers.get("location")).toBe("http://localhost:3000/login");
    expect(res.headers.get("set-cookie")).toContain(`${SESSION_COOKIE}=;`);
  });
});
