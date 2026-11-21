"use client";

import { useActionState } from "react";
import { PiImage, PiPencilSimple } from "react-icons/pi";
import { updateNameAction, updatePhotoAction } from "@/actions/profile";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialFormState } from "@/lib/form-state";

export function UpdatePhotoForm() {
  const [state, formAction] = useActionState(updatePhotoAction, initialFormState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <Field
        label="Link da foto de perfil"
        name="linkPhoto"
        type="url"
        placeholder="https://..."
        icon={<PiImage />}
        defaultValue={state.status === "error" ? state.values?.linkPhoto : undefined}
        errors={state.fieldErrors?.linkPhoto}
      />
      <FormMessage state={state} />
      <SubmitButton variant="secondary" pendingLabel="Salvando..." className="self-end">
        Alterar foto
      </SubmitButton>
    </form>
  );
}

export function UpdateNameForm({ currentName }: { currentName: string }) {
  const [state, formAction] = useActionState(updateNameAction, initialFormState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <Field
        label="Nome"
        name="nome"
        autoComplete="name"
        icon={<PiPencilSimple />}
        defaultValue={state.values?.nome ?? currentName}
        errors={state.fieldErrors?.nome}
      />
      <FormMessage state={state} />
      <SubmitButton variant="secondary" pendingLabel="Salvando..." className="self-end">
        Alterar nome
      </SubmitButton>
    </form>
  );
}
