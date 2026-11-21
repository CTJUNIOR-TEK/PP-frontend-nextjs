import { describe, expect, it } from "vitest";
import { toEmailDetail, toReceivedEmail, toSentEmail, toUser } from "./mappers";

describe("mappers", () => {
  it("converte o usuário da API", () => {
    expect(toUser({ id: "1", nome: "Ana", email: "ana@ct.com", fotoDePerfil: "" })).toEqual({
      id: "1",
      name: "Ana",
      email: "ana@ct.com",
      avatarUrl: null,
    });
  });

  it("converte e-mails recebidos e enviados para o mesmo formato", () => {
    expect(toReceivedEmail({ email_id: "e1", titulo: "Oi", enviado_por: "Ana", jaVisto: false })).toEqual({
      id: "e1",
      title: "Oi",
      counterpart: "Ana",
      seen: false,
    });
    expect(toSentEmail({ email_id: "e2", titulo: "Olá", enviado_para: "Bia", jaVisto: true })).toEqual({
      id: "e2",
      title: "Olá",
      counterpart: "Bia",
      seen: true,
    });
  });

  it("converte o detalhe do e-mail", () => {
    expect(toEmailDetail("e1", { titulo: "T", content: "C", enviado_por: "a@ct.com" })).toEqual({
      id: "e1",
      title: "T",
      content: "C",
      from: "a@ct.com",
    });
  });
});
