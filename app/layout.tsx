import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SUPUN | Full-Stack Developer & Software Engineer",
  description:
    "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce, POS systems, and UI design with AI integration. Building immersive web & mobile experiences.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "Laravel",
    "Android",
    "E-commerce",
    "POS Systems",
    "UI/UX Design",
    "AI Integration",
  ],
  authors: [{ name: "SUPUN" }],
  creator: "SUPUN",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "SUPUN | Full-Stack Developer & Software Engineer",
    description:
      "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce, POS systems, and UI design with AI integration.",
    siteName: "SUPUN Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUPUN | Full-Stack Developer & Software Engineer",
    description:
      "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce, POS systems, and UI design with AI integration.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
