import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOOD MORNING NEWS /// SÍNTESE MATINAL DAS 07:00 AM",
  description: "Edição diária automatizada às 07:00 AM com as 2 notícias fundamentais sobre UX Design, Tecnologia, AI, Games, Board Games e Ciência. Sem ruído, sem clickbait.",
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
