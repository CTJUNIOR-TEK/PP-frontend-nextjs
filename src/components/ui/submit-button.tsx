"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "./spinner";
import { Button, type ButtonProps } from "./button";

type SubmitButtonProps = Omit<ButtonProps, "type"> & { pendingLabel?: string };

/** Botão de submit que mostra carregamento enquanto a Server Action roda. */
export function SubmitButton({ children, pendingLabel, disabled, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <Spinner /> {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
