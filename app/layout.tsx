import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-geist-display" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "AarambhX Hub - Conclave 2K26",
  description: "India's elite founder hub where early-stage ideas connect directly with investors. A live investment platform.",
  keywords: ["startup", "pitch", "investment", "founders", "conclave", "AarambhX"],
  openGraph: {
    title: "AarambhX Hub - Conclave 2K26",
    description: "India's founder hub where ideas meet capital.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
