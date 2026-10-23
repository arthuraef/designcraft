import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "DESIGNCRAFT /// ARQUIVO DE ARQUITETURA VISUAL & MODERNISMO",
  description: "Ensaios sobre tipografia internacional, racionalismo suíço, arquitetura de interfaces e sistemas visuais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#E9ECEF] text-[#111215] font-sans selection:bg-[#E63926] selection:text-white flex flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
