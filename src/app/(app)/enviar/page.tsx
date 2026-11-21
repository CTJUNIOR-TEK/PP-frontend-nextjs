import type { Metadata } from "next";
import { SendEmailForm } from "@/components/emails/send-email-form";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Enviar e-mail" };

export default function SendEmailPage() {
  return (
    <>
      <PageHeader title="Enviar e-mail" description="Você também pode enviar um e-mail para si mesmo." />
      <SendEmailForm />
    </>
  );
}
