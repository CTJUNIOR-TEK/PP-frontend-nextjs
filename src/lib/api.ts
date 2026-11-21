import "server-only";
import axios from "axios";
import { env } from "./env";

/**
 * Instância do Axios usada pelos services. Roda apenas no servidor:
 * o token fica no cookie httpOnly e nunca chega ao JavaScript do navegador
 * (e o backend não precisa de CORS).
 */
export function createApi(token?: string) {
  return axios.create({
    baseURL: env.API_URL,
    timeout: 10_000,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
