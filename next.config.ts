import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `cacheComponents` fica desligado de propósito: neste template toda página
  // autenticada lê o cookie de sessão e é renderizada por requisição (modelo
  // dinâmico clássico do App Router). Ligue apenas depois de ler
  // node_modules/next/dist/docs/01-app/02-guides/authentication-with-cache-components.md
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
