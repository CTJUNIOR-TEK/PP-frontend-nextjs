import { Sidebar } from "@/components/layout/sidebar";
import { getCurrentUser } from "@/services/user.service";

/** Layout das rotas autenticadas. O proxy garante que só chega aqui quem tem sessão. */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <Sidebar user={user} />
      <main className="p-4 sm:p-8 lg:ml-72">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow-sm sm:p-8">{children}</div>
      </main>
    </div>
  );
}
