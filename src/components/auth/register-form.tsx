"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PiEnvelopeSimple, PiKey, PiSealCheck, PiUser } from "react-icons/pi";
import { registerAction } from "@/actions/auth";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialFormState } from "@/lib/form-state";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialFormState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <FormMessage state={state} tone="dark" />

      <Field
        tone="dark"
        label="Nome de usuário"
        name="nome"
        autoComplete="username"
        placeholder="Seu nome"
        icon={<PiUser />}
        defaultValue={state.values?.nome}
        errors={state.fieldErrors?.nome}
      />
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
        autoComplete="new-password"
        placeholder="Mínimo de 6 caracteres"
        icon={<PiKey />}
        errors={state.fieldErrors?.senha}
      />
      <Field
        tone="dark"
        label="Confirmar senha"
        name="confirmarSenha"
        type="password"
        autoComplete="new-password"
        placeholder="Repita a senha"
        icon={<PiSealCheck />}
        errors={state.fieldErrors?.confirmarSenha}
      />

      <SubmitButton size="lg" pendingLabel="Cadastrando..." className="mx-auto mt-2 w-full sm:w-48">
        Cadastrar
      </SubmitButton>

      <p className="text-center text-white/80">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-ct-orange underline underline-offset-4">
          Voltar ao login
        </Link>
      </p>
    </form>
  );
}
