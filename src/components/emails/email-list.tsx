import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { EmailSummary } from "@/types/email";

type EmailListProps = {
  emails: EmailSummary[];
  /** Rótulo da pessoa do outro lado: "De" na entrada, "Para" nos enviados. */
  counterpartLabel: string;
  /** Texto do status de leitura (o significado muda entre entrada e enviados). */
  seenLabel: (seen: boolean) => string;
  /** Conteúdo extra à direita de cada linha (ex.: botão de apagar). */
  renderActions?: (email: EmailSummary) => ReactNode;
};

/** Lista de e-mails compartilhada entre Entrada e Enviados. */
export function EmailList({ emails, counterpartLabel, seenLabel, renderActions }: EmailListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {emails.map((email) => {
        const highlight = !email.seen;
        return (
          <li
            key={email.id}
            className={cn(
              "flex items-center gap-3 rounded-2xl border-2 p-2 pr-3 transition",
              highlight ? "border-ct-orange bg-ct-orange-soft" : "border-black/10 hover:border-ct-orange/40",
            )}
          >
            <Link href={`/email/${email.id}`} className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-xl px-3 py-2 sm:flex-row sm:items-center sm:gap-6">
              <span className="w-full shrink-0 truncate text-sm text-ct-black/60 sm:w-44">
                {counterpartLabel}: <span className="font-semibold text-ct-black">{email.counterpart}</span>
              </span>
              <span className={cn("min-w-0 flex-1 truncate", highlight && "font-bold")}>{email.title}</span>
              <span
                className={cn(
                  "w-fit shrink-0 rounded-full px-3 py-0.5 text-xs font-bold",
                  highlight ? "bg-ct-orange text-white" : "bg-black/5 text-ct-black/60",
                )}
              >
                {seenLabel(email.seen)}
              </span>
            </Link>
            {renderActions?.(email)}
          </li>
        );
      })}
    </ul>
  );
}
