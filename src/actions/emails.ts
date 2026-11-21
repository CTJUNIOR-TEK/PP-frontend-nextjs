"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/errors";
import { type FormState, formDataToObject, validationErrorState } from "@/lib/form-state";
import { emailIdSchema, sendEmailSchema } from "@/schemas/email";
import * as emailService from "@/services/email.service";

type SendEmailField = "emailDeDestinatario" | "title" | "content";

export async function sendEmailAction(
  _prev: FormState<SendEmailField>,
  formData: FormData,
): Promise<FormState<SendEmailField>> {
  const values = formDataToObject(formData);
  const parsed = sendEmailSchema.safeParse(values);
  if (!parsed.success) return validationErrorState(parsed.error, values);

  try {
    await emailService.sendEmail(parsed.data);
  } catch (error) {
    unstable_rethrow(error);
    const notFound = getApiErrorStatus(error) === 404;
    return {
      status: "error",
      message: notFound
        ? "Destinatário não encontrado."
        : getApiErrorMessage(error, "Não foi possível enviar o e-mail."),
      fieldErrors: notFound ? { emailDeDestinatario: ["Nenhum usuário com este e-mail"] } : undefined,
      values,
    };
  }

  revalidatePath("/enviados");
  revalidatePath("/entrada"); // é possível enviar e-mail para si mesmo
  return { status: "success", message: "E-mail enviado com sucesso!", resetKey: Date.now() };
}

export type DeleteEmailResult = { ok: true } | { ok: false; message: string };

export async function deleteEmailAction(id: string): Promise<DeleteEmailResult> {
  const parsedId = emailIdSchema.safeParse(id);
  if (!parsedId.success) return { ok: false, message: "E-mail inválido." };

  try {
    await emailService.deleteEmail(parsedId.data);
  } catch (error) {
    unstable_rethrow(error);
    return {
      ok: false,
      message: getApiErrorMessage(error, "Não foi possível apagar o e-mail."),
    };
  }

  revalidatePath("/enviados");
  return { ok: true };
}
