/** Formato devolvido pelo backend em GET /me. */
export type UserDTO = {
  id: string;
  nome: string;
  email: string;
  fotoDePerfil: string | null;
};

/** Formato usado pela interface. */
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};
