import type { Metadata } from "next";
import { UpdateNameForm, UpdatePhotoForm } from "@/components/profile/profile-forms";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { getCurrentUser } from "@/services/user.service";

export const metadata: Metadata = { title: "Meu perfil" };

export default async function ProfilePage() {
  // Mesma chamada do layout: o `cache` do React evita uma segunda requisição.
  const user = await getCurrentUser();

  return (
    <>
      <PageHeader title="Meu perfil" />
      <section className="mb-10 flex flex-col items-center gap-3 text-center">
        <Avatar name={user.name} src={user.avatarUrl} size="lg" />
        <div>
          <p className="text-2xl font-extrabold">{user.name}</p>
          <p className="text-ct-black/60">{user.email}</p>
        </div>
      </section>
      <div className="grid gap-10 md:grid-cols-2">
        <UpdatePhotoForm />
        <UpdateNameForm currentName={user.name} />
      </div>
    </>
  );
}
