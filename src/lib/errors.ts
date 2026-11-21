import { isAxiosError } from "axios";

export const NETWORK_ERROR_MESSAGE =
  "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";

/** Extrai a mensagem de erro enviada pelo backend (`{ message }`) ou usa um fallback. */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    if (!error.response) return NETWORK_ERROR_MESSAGE;

    const message = (error.response.data as { message?: unknown } | undefined)?.message;
    if (typeof message === "string" && message.trim()) return message;
  }

  return fallback;
}

export function getApiErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}
