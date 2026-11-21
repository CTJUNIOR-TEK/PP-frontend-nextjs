import type { ReactNode } from "react";

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ct-orange/30 px-6 py-16 text-center">
      <span aria-hidden className="text-5xl text-ct-orange">{icon}</span>
      <p className="text-lg font-bold">{title}</p>
      {description && <p className="max-w-sm text-ct-black/60">{description}</p>}
      {action}
    </div>
  );
}
