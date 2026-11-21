import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth";
import { sendEmailSchema } from "./email";
import { updatePhotoSchema } from "./profile";

describe("loginSchema", () => {
  it("aceita credenciais válidas", () => {
    expect(loginSchema.safeParse({ email: "a@ct.com", senha: "123456" }).success).toBe(true);
  });

  it("recusa senha com menos de 6 caracteres", () => {
    const result = loginSchema.safeParse({ email: "a@ct.com", senha: "123" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["senha"]);
  });
});

describe("registerSchema", () => {
  const valid = { nome: "Fulano", email: "f@ct.com", senha: "123456", confirmarSenha: "123456" };

  it("aceita um cadastro válido", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("acusa erro em confirmarSenha quando as senhas diferem", () => {
    const result = registerSchema.safeParse({ ...valid, confirmarSenha: "outra-senha" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({ path: ["confirmarSenha"], message: "As senhas não coincidem" });
  });

  it("recusa nome só com espaços", () => {
    expect(registerSchema.safeParse({ ...valid, nome: "   " }).success).toBe(false);
  });
});

describe("sendEmailSchema", () => {
  it("exige destinatário, título e conteúdo", () => {
    const result = sendEmailSchema.safeParse({ emailDeDestinatario: "", title: "", content: "" });
    const fields = result.error?.issues.map((issue) => issue.path[0]);
    expect(fields).toEqual(["emailDeDestinatario", "title", "content"]);
  });
});

describe("updatePhotoSchema", () => {
  it("aceita apenas links http(s)", () => {
    expect(updatePhotoSchema.safeParse({ linkPhoto: "https://img.com/a.png" }).success).toBe(true);
    expect(updatePhotoSchema.safeParse({ linkPhoto: "javascript:alert(1)" }).success).toBe(false);
  });
});
