import { redirect } from "next/navigation";
import { DEFAULT_PRIVATE_ROUTE } from "@/lib/session-config";

/** "/" não tem tela própria; o proxy já mandou quem não está logado para /login. */
export default function Home() {
  redirect(DEFAULT_PRIVATE_ROUTE);
}
