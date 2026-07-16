import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yayasan Silih Asah Silih Asih Silih Asuh - Menabur Kebaikan, Menumbuhkan Harapan",
  description: "Yayasan sosial non-komersial yang berdedikasi membimbing pendidikan (Silih Asah), menyalurkan bantuan kemanusiaan (Silih Asih), dan mendampingi kesehatan (Silih Asuh) masyarakat prasejahtera di Indonesia.",
  keywords: ["yayasan sosial", "silih asah", "silih asih", "silih asuh", "donasi", "relawan", "non-profit", "pendidikan", "kesehatan"],
  authors: [{ name: "Yayasan Silih Asah Silih Asih Silih Asuh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
