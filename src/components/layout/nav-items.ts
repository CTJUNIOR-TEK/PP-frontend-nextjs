import type { IconType } from "react-icons";
import { PiEnvelopeSimple, PiPaperPlaneTilt, PiTray, PiUserCircle } from "react-icons/pi";

export type NavItem = { href: string; label: string; icon: IconType };

/** Itens do menu. Para criar uma tela nova, adicione a rota aqui. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/entrada", label: "Entrada", icon: PiTray },
  { href: "/enviados", label: "Enviados", icon: PiPaperPlaneTilt },
  { href: "/enviar", label: "Enviar e-mail", icon: PiEnvelopeSimple },
  { href: "/perfil", label: "Meu perfil", icon: PiUserCircle },
];

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
