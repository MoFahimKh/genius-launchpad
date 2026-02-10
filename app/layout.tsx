import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/providers";

const macan = localFont({
  src: [
    {
      path: "../fonts/MacanPanWeb-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MacanPanWeb-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/MacanPanWeb-Semibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-macan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Genius Launchpad",
  description: "Launchpad UI scaffold"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${macan.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
