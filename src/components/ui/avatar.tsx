import { cn } from "@/lib/cn";

const sizes = { sm: "size-10 text-base", md: "size-14 text-xl", lg: "size-36 text-5xl sm:size-44" } as const;

/** Foto de perfil com fallback para a inicial do nome. */
export function Avatar({ name, src, size = "sm" }: { name: string; src: string | null; size?: keyof typeof sizes }) {
  const className = cn("shrink-0 rounded-full object-cover", sizes[size]);

  if (!src) {
    return (
      <span aria-label={`Avatar de ${name}`} role="img" className={cn(className, "flex items-center justify-center bg-ct-orange font-bold text-white")}>
        {name.trim().charAt(0).toUpperCase() || "?"}
      </span>
    );
  }

  // <img> em vez de next/image: a foto é um link externo qualquer (domínio desconhecido).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`Foto de ${name}`} className={className} />;
}
