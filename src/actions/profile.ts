"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { getApiErrorMessage } from "@/lib/errors";
import { type FormState, formDataToObject, validationErrorState } from "@/lib/form-state";
import { updateNameSchema, updatePhotoSchema } from "@/schemas/profile";
import * as userService from "@/services/user.service";

export async function updateNameAction(
  _prev: FormState<"nome">,
  formData: FormData,
): Promise<FormState<"nome">> {
  const values = formDataToObject(formData);
  const parsed = updateNameSchema.safeParse(values);
  if (!parsed.success) return validationErrorState(parsed.error, values);

  try {
    await userService.updateName(parsed.data);
  } catch (error) {
    unstable_rethrow(error);
    return {
      status: "error",
      message: getApiErrorMessage(error, "Não foi possível alterar o nome."),
      values,
    };
  }

  // O nome aparece no layout (sidebar), então revalidamos o layout inteiro.
  revalidatePath("/", "layout");
  return { status: "success", message: "Nome atualizado!" };
}

export async function updatePhotoAction(
  _prev: FormState<"linkPhoto">,
  formData: FormData,
): Promise<FormState<"linkPhoto">> {
  const values = formDataToObject(formData);
  const parsed = updatePhotoSchema.safeParse(values);
  if (!parsed.success) return validationErrorState(parsed.error, values);

  try {
    await userService.updatePhoto(parsed.data);
  } catch (error) {
    unstable_rethrow(error);
    return {
      status: "error",
      message: getApiErrorMessage(error, "Não foi possível alterar a foto."),
      values,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Foto atualizada!" };
}
