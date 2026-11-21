import { describe, expect, it } from "vitest";
import { registerSchema } from "@/schemas/auth";
import { formDataToObject, validationErrorState } from "./form-state";

describe("form-state", () => {
  it("converte FormData em objeto", () => {
    const formData = new FormData();
    formData.set("email", "a@ct.com");
    expect(formDataToObject(formData)).toEqual({ email: "a@ct.com" });
  });

  it("agrupa erros por campo e nunca devolve senhas", () => {
    const values = { nome: "", email: "x", senha: "1", confirmarSenha: "2" };
    const parsed = registerSchema.safeParse(values);
    if (parsed.success) throw new Error("deveria falhar");

    const state = validationErrorState(parsed.error, values, ["senha", "confirmarSenha"]);

    expect(state.status).toBe("error");
    expect(Object.keys(state.fieldErrors ?? {})).toEqual(expect.arrayContaining(["nome", "email", "senha"]));
    expect(state.values).toEqual({ nome: "", email: "x" });
  });
});
