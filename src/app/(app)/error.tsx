"use client";

import { PiWarningCircle } from "react-icons/pi";
import { Button } from "@/components/ui/button";

/** Error boundary das rotas autenticadas (ex.: backend fora do ar). */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
      <PiWarningCircle aria-hidden className="text-6xl text-danger" />
      <h2 className="text-xl font-bold">Algo deu errado</h2>
      <p className="max-w-md text-ct-black/60">
        {process.env.NODE_ENV === "development" ? error.message : "Não foi possível carregar esta página."}
      </p>
      <Button onClick={() => retry()}>Tentar novamente</Button>
    </div>
  );
}
