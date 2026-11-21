import "server-only";
import { cache } from "react";
import type { UpdateNameInput, UpdatePhotoInput } from "@/schemas/profile";
import type { UserDTO } from "@/types/user";
import { authedRequest } from "./http";
import { toUser } from "./mappers";

/**
 * GET /me. `cache` do React deduplica a chamada dentro da mesma renderização
 * (layout + página pedem o usuário, mas só uma requisição é feita).
 */
export const getCurrentUser = cache(async () => {
  const data = await authedRequest((api) => api.get<UserDTO>("/me").then((res) => res.data));
  return toUser(data);
});

/** PATCH /my-name */
export async function updateName({ nome }: UpdateNameInput): Promise<void> {
  await authedRequest((api) => api.patch("/my-name", { nome }));
}

/** PATCH /my-image */
export async function updatePhoto({ linkPhoto }: UpdatePhotoInput): Promise<void> {
  await authedRequest((api) => api.patch("/my-image", { linkPhoto }));
}
