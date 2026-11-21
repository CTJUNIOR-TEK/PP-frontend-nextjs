import type { Metadata } from "next";
import Link from "next/link";
import { PiTray } from "react-icons/pi";
import { EmailList } from "@/components/emails/email-list";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getReceivedEmails } from "@/services/email.service";

export const metadata: Metadata = { title: "Entrada" };

/** Server Component: busca os dados direto no servidor, sem useEffect. */
export default async function InboxPage() {
  const emails = await getReceivedEmails();
  const unread = emails.filter((email) => !email.seen).length;

  return (
    <>
      <PageHeader
        title="Entrada"
        description={unread > 0 ? `${unread} não lido${unread > 1 ? "s" : ""}` : "Tudo lido por aqui"}
      />
      {emails.length === 0 ? (
        <EmptyState
          icon={<PiTray />}
          title="Nenhum e-mail recebido"
          description="Quando alguém te enviar um e-mail, ele aparece aqui."
          action={<Link href="/enviar" className="font-semibold text-ct-orange underline underline-offset-4">Enviar um e-mail</Link>}
        />
      ) : (
        <EmailList emails={emails} counterpartLabel="De" seenLabel={(seen) => (seen ? "Lido" : "Novo")} />
      )}
    </>
  );
}
