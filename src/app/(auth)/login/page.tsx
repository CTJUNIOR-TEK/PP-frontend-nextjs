import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { cadastro } = await searchParams;
  return <LoginForm justRegistered={cadastro === "ok"} />;
}
