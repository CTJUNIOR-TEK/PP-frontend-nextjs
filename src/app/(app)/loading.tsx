/** Mostrado automaticamente (Suspense) enquanto a página busca dados no servidor. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Carregando" className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded-lg bg-black/10" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-black/5" />
      ))}
    </div>
  );
}
