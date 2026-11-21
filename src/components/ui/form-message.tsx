import type { FormState } from "@/lib/form-state";
import { cn } from "@/lib/cn";

/** Mensagem geral do formulário (sucesso ou erro vindo da Server Action). */
export function FormMessage({ state, tone = "light" }: { state: FormState; tone?: "light" | "dark" }) {
  if (state.status === "idle" || !state.message) return null;

  const isError = state.status === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-semibold",
        isError && tone === "light" && "bg-danger/10 text-danger",
        isError && tone === "dark" && "bg-danger/20 text-orange-200",
        !isError && "bg-success/10 text-success",
      )}
    >
      {state.message}
    </p>
  );
}
