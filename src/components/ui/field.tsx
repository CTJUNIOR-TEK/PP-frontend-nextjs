import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  icon?: ReactNode;
  errors?: string[];
  /** "dark" para os formulários sobre fundo preto (login/cadastro). */
  tone?: "light" | "dark";
};

type InputFieldProps = BaseProps & ComponentProps<"input"> & { multiline?: false };
type TextareaFieldProps = BaseProps & ComponentProps<"textarea"> & { multiline: true };

/** Campo com label acessível, ícone opcional e mensagens de erro do Zod. */
export function Field(props: InputFieldProps | TextareaFieldProps) {
  const { label, icon, errors, tone = "light", className, multiline, ...rest } = props;
  const generatedId = useId();
  const id = rest.id ?? generatedId;
  const errorId = `${id}-error`;
  const hasError = Boolean(errors?.length);

  const control = cn(
    "w-full bg-transparent outline-none placeholder:opacity-60",
    tone === "dark" ? "text-white" : "text-ct-black",
  );

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <label htmlFor={id} className={cn("text-sm font-semibold", tone === "dark" ? "text-white/80" : "text-ct-black/70")}>
        {label}
      </label>
      <div
        className={cn(
          "flex items-start gap-3 transition focus-within:border-ct-orange",
          multiline ? "rounded-2xl border-2 bg-white p-4" : "border-b-2 pb-2",
          hasError ? "border-danger" : tone === "dark" ? "border-ct-orange/70" : "border-ct-orange/50",
        )}
      >
        {icon && (
          <span aria-hidden className={cn("mt-0.5 text-2xl", tone === "dark" ? "text-white" : "text-ct-black/60")}>
            {icon}
          </span>
        )}
        {multiline ? (
          <textarea
            id={id}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(control, "min-h-48 resize-y")}
            {...(rest as ComponentProps<"textarea">)}
          />
        ) : (
          <input
            id={id}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(control, "text-lg")}
            {...(rest as ComponentProps<"input">)}
          />
        )}
      </div>
      {hasError && (
        <p id={errorId} className={cn("text-sm", tone === "dark" ? "text-orange-300" : "text-danger")}>
          {errors![0]}
        </p>
      )}
    </div>
  );
}
