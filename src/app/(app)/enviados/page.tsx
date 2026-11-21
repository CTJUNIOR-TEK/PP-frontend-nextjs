import type { Metadata } from "next";
import Link from "next/link";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { DeleteEmailButton } from "@/components/emails/delete-email-button";
import { EmailList } from "@/components/emails/email-list";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getSentEmails } from "@/services/email.service";

export const metadata: Metadata = { title: "Enviados" };

export default async function SentPage() {
  const emails = await getSentEmails();

  return (
    <>
      <PageHeader title="Enviados" description="E-mails ainda não vistos pelo destinatário podem ser apagados." />
      {emails.length === 0 ? (
        <EmptyState
          icon={<PiPaperPlaneTilt />}
          title="Você ainda não enviou e-mails"
          action={<Link href="/enviar" className="font-semibold text-ct-orange underline underline-offset-4">Escrever o primeiro</Link>}
        />
      ) : (
        <EmailList
          emails={emails}
          counterpartLabel="Para"
          seenLabel={(seen) => (seen ? "Visto" : "Não visto")}
          renderActions={(email) =>
            email.seen ? null : <DeleteEmailButton emailId={email.id} title={email.title} />
          }
        />
      )}
    </>
  );
}
