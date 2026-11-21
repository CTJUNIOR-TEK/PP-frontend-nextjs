import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import { NETWORK_ERROR_MESSAGE, getApiErrorMessage, getApiErrorStatus } from "./errors";

function axiosErrorWith(status: number, data: unknown) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError("falhou", "ERR", config, null, { status, data, statusText: "", headers: {}, config });
}

describe("getApiErrorMessage", () => {
  it("usa a mensagem enviada pelo backend", () => {
    expect(getApiErrorMessage(axiosErrorWith(409, { message: "Usuario ja existe" }), "fallback")).toBe("Usuario ja existe");
  });

  it("usa o fallback quando não há mensagem", () => {
    expect(getApiErrorMessage(axiosErrorWith(500, {}), "fallback")).toBe("fallback");
    expect(getApiErrorMessage(new Error("qualquer"), "fallback")).toBe("fallback");
  });

  it("avisa quando o servidor não responde", () => {
    expect(getApiErrorMessage(new AxiosError("Network Error"), "fallback")).toBe(NETWORK_ERROR_MESSAGE);
  });
});

describe("getApiErrorStatus", () => {
  it("retorna o status HTTP do erro do Axios", () => {
    expect(getApiErrorStatus(axiosErrorWith(401, {}))).toBe(401);
    expect(getApiErrorStatus(new Error("x"))).toBeUndefined();
  });
});
