import { describe, expect, it } from "vitest";
import { getTokenExpiration, isTokenExpired } from "./jwt";

function fakeJwt(payload: object) {
  const encode = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${encode({ alg: "HS256" })}.${encode(payload)}.assinatura`;
}

describe("jwt", () => {
  const now = Date.UTC(2026, 0, 1);
  const nowInSeconds = now / 1000;

  it("lê o exp do payload", () => {
    expect(getTokenExpiration(fakeJwt({ exp: 123 }))).toBe(123);
  });

  it("considera válido um token que ainda não expirou", () => {
    expect(isTokenExpired(fakeJwt({ exp: nowInSeconds + 60 }), now)).toBe(false);
  });

  it("considera expirado um token vencido", () => {
    expect(isTokenExpired(fakeJwt({ exp: nowInSeconds - 1 }), now)).toBe(true);
  });

  it("trata tokens malformados como expirados", () => {
    expect(isTokenExpired("isso-nao-e-um-jwt", now)).toBe(true);
    expect(isTokenExpired(fakeJwt({ sub: "sem-exp" }), now)).toBe(true);
  });
});
