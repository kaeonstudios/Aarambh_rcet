import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-display",
  weight: ["500", "600", "700"],
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aarambh.com"),
  title: "Aarambh Hub | Conclave 2K26 - India's Elite Founder Hub",
  description: "Join Aarambh Hub Conclave 2K26 in Thrissur, Kerala. India's premier startup platform where early-stage ideas connect with angel investors for live funding, mentoring, and scaling.",
  keywords: [
    "startup incubator Thrissur",
    "Kerala startup conclave 2K26",
    "seed funding India",
    "Aarambh",
    "investor pitch Kochi",
    "angel investors Kerala",
    "Royal College of Engineering and Technology",
    "startup platform",
    "business incubator Thrissur",
    "live funding conclave"
  ],
  authors: [{ name: "Kaeon Studios", url: "https://www.kaeonstudios.com" }],
  creator: "Kaeon Studios",
  publisher: "Aarambh",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aarambh Hub | Conclave 2K26 - India's Elite Founder Hub",
    description: "India's founder hub where early-stage ideas meet capital. Live investment panel, post-event accelerator, and top-tier mentors in Thrissur, Kerala.",
    url: "https://aarambh.com",
    siteName: "Aarambh Hub",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/images/pitch-poster.webp",
        width: 1000,
        height: 1333,
        alt: "Aarambh Hub Conclave 2K26 Pitch Poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarambh Hub | Conclave 2K26 - India's Elite Founder Hub",
    description: "Connect with angel investors and secure live funding for your startup in Thrissur, Kerala.",
    images: ["/assets/images/pitch-poster.webp"],
  },
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
