
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// Fix the Inter font import for use in Vite instead of Next.js
const inter = { className: "font-inter" };

export const metadata: Metadata = {
  title: "BankVerse - Your Banking Dashboard",
  description: "Manage your finances with BankVerse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TooltipProvider>
          <main>{children}</main>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
