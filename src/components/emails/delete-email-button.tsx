"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PiTrash } from "react-icons/pi";
import { deleteEmailAction } from "@/actions/emails";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

/** Apagar em dois cliques: o primeiro pede confirmação. */
export function DeleteEmailButton({ emailId, title }: { emailId: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteEmailAction(emailId);
      if (!result.ok) {
        setError(result.message);
        setConfirming(false);
        return;
      }
      router.refresh();
    });
  }

  if (!confirming) {
    return (
      <div className="flex flex-col items-end gap-1">
        <Button variant="ghost" size="sm" onClick={() => { setError(null); setConfirming(true); }} aria-label={`Apagar "${title}"`} title="Apagar e-mail" className="text-xl text-danger hover:bg-danger/10">
          <PiTrash />
        </Button>
        {error && <span role="alert" className="max-w-40 text-right text-xs text-danger">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="danger" size="sm" onClick={handleDelete} disabled={pending}>
        {pending ? <Spinner /> : "Apagar"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(false)} disabled={pending}>
        Cancelar
      </Button>
    </div>
  );
}
