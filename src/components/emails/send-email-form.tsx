"use client";

import { useActionState } from "react";
import { PiEnvelopeSimple, PiPaperPlaneTilt, PiTextT } from "react-icons/pi";
import { sendEmailAction } from "@/actions/emails";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialFormState } from "@/lib/form-state";

export function SendEmailForm() {
  const [state, formAction] = useActionState(sendEmailAction, initialFormState);

  return (
    // Após um envio com sucesso, `resetKey` muda e o React recria o formulário vazio.
    <form key={state.resetKey ?? "form"} action={formAction} noValidate className="flex flex-col gap-6">
      <FormMessage state={state} />

      <Field
        label="Destinatário"
        name="emailDeDestinatario"
        type="email"
        autoComplete="email"
        placeholder="email@ctjunior.com.br"
        icon={<PiEnvelopeSimple />}
        defaultValue={state.values?.emailDeDestinatario}
        errors={state.fieldErrors?.emailDeDestinatario}
      />
      <Field
        label="Título"
        name="title"
        placeholder="Assunto do e-mail"
        icon={<PiTextT />}
        defaultValue={state.values?.title}
        errors={state.fieldErrors?.title}
      />
      <Field
        multiline
        label="Conteúdo"
        name="content"
        placeholder="Escreva sua mensagem..."
        defaultValue={state.values?.content}
        errors={state.fieldErrors?.content}
      />

      <SubmitButton size="lg" pendingLabel="Enviando..." className="self-end">
        <PiPaperPlaneTilt aria-hidden /> Enviar
      </SubmitButton>
    </form>
  );
}
