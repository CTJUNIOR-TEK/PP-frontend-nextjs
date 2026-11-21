import "server-only";
import type { AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import { createApi } from "@/lib/api";
import { getApiErrorStatus } from "@/lib/errors";
import { getToken } from "@/lib/session";

type AuthedRequestOptions = {
  /**
   * O backend responde 401 tanto para "token inválido" quanto para algumas
   * regras de negócio (ex.: apagar e-mail já visto). Desligue o redirect
   * nesses casos para tratar a mensagem na tela.
   */
  redirectOnUnauthorized?: boolean;
};

/**
 * Executa uma requisição autenticada. Sem token, ou com o token recusado,
 * o usuário vai para /logout, que limpa o cookie e manda para /login.
 */
export async function authedRequest<T>(
  request: (api: AxiosInstance) => Promise<T>,
  { redirectOnUnauthorized = true }: AuthedRequestOptions = {},
): Promise<T> {
  const token = await getToken();
  if (!token) redirect("/logout");

  try {
    return await request(createApi(token));
  } catch (error) {
    if (redirectOnUnauthorized && getApiErrorStatus(error) === 401) redirect("/logout");
    throw error;
  }
}
