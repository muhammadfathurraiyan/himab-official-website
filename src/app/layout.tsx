import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import Header from "@/components/global/clientLayout/header/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Himpunan Mahasiswa Aceh Besar",
  description: "Situs Web Resmi Himpunan Mahasiswa Aceh Besar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning={true}>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background text-foreground antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
