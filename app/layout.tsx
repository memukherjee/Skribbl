import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skribbl-1.0",
  description: "A simple drawing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
