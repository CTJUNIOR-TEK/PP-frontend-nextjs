import Image from "next/image";

/** Layout das rotas públicas: o grupo (auth) não aparece na URL. */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ct-orange px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-ct-black px-6 py-10 shadow-2xl sm:px-12 sm:py-14">
        <Image
          src="/logo-ct-white.svg"
          alt="CT Junior"
          width={320}
          height={120}
          priority
          className="mx-auto mb-10 h-24 w-auto sm:h-28"
        />
        {children}
      </div>
    </main>
  );
}
