import { AxiosError, AxiosHeaders } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialFormState } from "@/lib/form-state";

// Exemplo de como testar uma Server Action isolando rede, cookies e navegação.
const { loginMock, setTokenMock, redirectMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  setTokenMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock("@/services/auth.service", () => ({ login: loginMock, register: vi.fn() }));
vi.mock("@/lib/session", () => ({ setToken: setTokenMock, clearToken: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: redirectMock, unstable_rethrow: vi.fn() }));

const { loginAction } = await import("./auth");

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("loginAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("não chama a API quando o formulário é inválido", async () => {
    const state = await loginAction(initialFormState, form({ email: "invalido", senha: "1" }));

    expect(loginMock).not.toHaveBeenCalled();
    expect(state.fieldErrors?.email).toBeDefined();
    expect(state.values).not.toHaveProperty("senha");
  });

  it("salva o token e redireciona para a entrada", async () => {
    loginMock.mockResolvedValue("jwt-token");

    await loginAction(initialFormState, form({ email: "a@ct.com", senha: "123456" }));

    expect(setTokenMock).toHaveBeenCalledWith("jwt-token");
    expect(redirectMock).toHaveBeenCalledWith("/entrada");
  });

  it("mostra erro de credenciais quando o backend responde 400", async () => {
    const config = { headers: new AxiosHeaders() };
    loginMock.mockRejectedValue(
      new AxiosError("bad", "ERR", config, null, { status: 400, data: {}, statusText: "", headers: {}, config }),
    );

    const state = await loginAction(initialFormState, form({ email: "a@ct.com", senha: "123456" }));

    expect(state).toMatchObject({ status: "error", message: "E-mail ou senha inválidos." });
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
