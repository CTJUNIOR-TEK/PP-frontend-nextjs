"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiList, PiSignOut, PiX } from "react-icons/pi";
import { logoutAction } from "@/actions/auth";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { User } from "@/types/user";
import { NAV_ITEMS, isActivePath } from "./nav-items";

/**
 * Navegação principal. Em telas grandes é uma barra lateral fixa;
 * no celular vira um cabeçalho com menu em gaveta.
 */
export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Cabeçalho mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
        <Link href="/entrada" aria-label="Ir para a entrada">
          <Image src="/logo-ct-dark.svg" alt="CT Junior" width={120} height={40} className="h-9 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="menu-principal"
          className="rounded-lg p-2 text-3xl hover:bg-black/5"
        >
          <PiList />
        </button>
      </header>

      {/* Fundo escuro do menu mobile */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn("fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
      />

      <aside
        id="menu-principal"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white px-5 py-8 shadow-xl transition-transform",
          "lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <Image src="/logo-ct-dark.svg" alt="CT Junior" width={160} height={56} className="h-12 w-auto" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu" className="rounded-lg p-2 text-2xl hover:bg-black/5 lg:hidden">
            <PiX />
          </button>
        </div>

        <nav aria-label="Principal" className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-semibold transition",
                  active ? "bg-ct-orange-soft text-ct-orange" : "text-ct-black/80 hover:bg-black/5",
                )}
              >
                <Icon aria-hidden className="text-2xl" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-6">
          <Avatar name={user.name} src={user.avatarUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{user.name}</p>
            <p className="truncate text-sm text-ct-black/60">{user.email}</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" aria-label="Sair" title="Sair" className="rounded-lg p-2 text-2xl text-ct-black/70 hover:bg-danger/10 hover:text-danger">
              <PiSignOut />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
