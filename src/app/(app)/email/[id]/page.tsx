import type { Metadata } from "next";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import { PiArrowLeft, PiWarningCircle } from "react-icons/pi";
import { EmptyState } from "@/components/ui/empty-state";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/errors";
import { emailIdSchema } from "@/schemas/email";
import { getEmail } from "@/services/email.service";
import type { EmailDetail } from "@/types/email";

export const metadata: Metadata = { title: "E-mail" };

/** Rota dinâmica: `params` é uma Promise no App Router. */
export default async function EmailPage({ params }: PageProps<"/email/[id]">) {
  const { id } = await params;
  if (!emailIdSchema.safeParse(id).success) notFound();

  let email: EmailDetail;
  try {
    email = await getEmail(id);
  } catch (error) {
    unstable_rethrow(error);
    if (getApiErrorStatus(error) === 404) notFound();
    return (
      <EmptyState
        icon={<PiWarningCircle />}
        title="Não foi possível abrir este e-mail"
        description={getApiErrorMessage(error, "Tente novamente mais tarde.")}
        action={<BackLink />}
      />
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <BackLink />
      <header className="border-b border-black/10 pb-4">
        <h1 className="text-2xl font-extrabold break-words sm:text-3xl">{email.title}</h1>
        <p className="mt-2 text-ct-black/60">
          De: <span className="font-semibold text-ct-orange">{email.from}</span>
        </p>
      </header>
      <p className="leading-relaxed break-words whitespace-pre-wrap">{email.content}</p>
    </article>
  );
}

function BackLink() {
  return (
    <Link href="/entrada" className="inline-flex w-fit items-center gap-2 font-semibold text-ct-orange hover:underline">
      <PiArrowLeft aria-hidden /> Voltar
    </Link>
  );
}
