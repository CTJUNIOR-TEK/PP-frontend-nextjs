"use server";

import { redirect, unstable_rethrow } from "next/navigation";
import { DEFAULT_PRIVATE_ROUTE } from "@/lib/session-config";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/errors";
import { type FormState, formDataToObject, validationErrorState } from "@/lib/form-state";
import { clearToken, setToken } from "@/lib/session";
import { loginSchema, registerSchema } from "@/schemas/auth";
import * as authService from "@/services/auth.service";

type LoginField = "email" | "senha";
type RegisterField = "nome" | "email" | "senha" | "confirmarSenha";

export async function loginAction(
  _prev: FormState<LoginField>,
  formData: FormData,
): Promise<FormState<LoginField>> {
  const values = formDataToObject(formData);
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) return validationErrorState(parsed.error, values, ["senha"]);

  try {
    const token = await authService.login(parsed.data);
    await setToken(token);
  } catch (error) {
    unstable_rethrow(error);
    return {
      status: "error",
      message:
        getApiErrorStatus(error) === 400
          ? "E-mail ou senha inválidos."
          : getApiErrorMessage(error, "Não foi possível entrar. Tente novamente."),
      values: { email: values.email },
    };
  }

  // redirect() fica FORA do try/catch: ele funciona lançando uma exceção.
  redirect(DEFAULT_PRIVATE_ROUTE);
}

export async function registerAction(
  _prev: FormState<RegisterField>,
  formData: FormData,
): Promise<FormState<RegisterField>> {
  const values = formDataToObject(formData);
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return validationErrorState(parsed.error, values, ["senha", "confirmarSenha"]);
  }

  try {
    await authService.register(parsed.data);
  } catch (error) {
    unstable_rethrow(error);
    const status = getApiErrorStatus(error);
    return {
      status: "error",
      message:
        status === 409
          ? "Já existe uma conta com este e-mail."
          : getApiErrorMessage(error, "Não foi possível criar a conta. Tente novamente."),
      fieldErrors: status === 409 ? { email: ["E-mail já cadastrado"] } : undefined,
      values: { nome: values.nome, email: values.email },
    };
  }

  redirect("/login?cadastro=ok");
}

export async function logoutAction() {
  await clearToken();
  redirect("/login");
}
