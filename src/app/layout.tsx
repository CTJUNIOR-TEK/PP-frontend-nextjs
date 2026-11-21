import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "E-mail da CT", template: "%s | E-mail da CT" },
  description: "Sistema de e-mails da CT Junior — template da Capacitação Continuada.",
};

export const viewport: Viewport = {
  themeColor: "#ff6a00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${nunitoSans.variable} h-full`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
