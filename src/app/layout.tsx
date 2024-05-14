import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/provider/Provider";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/global/header/Header";

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
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background antialiased`}
      >
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
