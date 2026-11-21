"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PiEnvelopeSimple, PiKey } from "react-icons/pi";
import { loginAction } from "@/actions/auth";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialFormState } from "@/lib/form-state";

export function LoginForm({ justRegistered = false }: { justRegistered?: boolean }) {
  const [state, formAction] = useActionState(loginAction, initialFormState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-7">
      {justRegistered && state.status === "idle" && (
        <p role="status" className="rounded-xl bg-success/20 px-4 py-3 text-sm font-semibold text-green-300">
          Conta criada! Faça login para continuar.
        </p>
      )}
      <FormMessage state={state} tone="dark" />

      <Field
        tone="dark"
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="seu@ctjunior.com.br"
        icon={<PiEnvelopeSimple />}
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
      />
      <Field
        tone="dark"
        label="Senha"
        name="senha"
        type="password"
        autoComplete="current-password"
        placeholder="••••••"
        icon={<PiKey />}
        errors={state.fieldErrors?.senha}
      />

      <SubmitButton size="lg" pendingLabel="Entrando..." className="mx-auto mt-2 w-full sm:w-48">
        Entrar
      </SubmitButton>

      <p className="text-center text-white/80">
        Não possui conta?{" "}
        <Link href="/cadastro" className="font-semibold text-ct-orange underline underline-offset-4">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
