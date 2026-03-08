import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Syne } from "next/font/google";
import { Space_Grotesk } from "next/font/google";


// const syne = Syne({
//   subsets: ["latin"],
//   variable: "--font-syne",
//   weight: ["400", "500", "600", "700", "800"],
// });

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SUPUN | Full-Stack Developer",
  description:
    "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce, POS systems, and UI design with AI integration. Building immersive web & mobile experiences.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "React Native",
    "Devops",
    "Docker",
    "AWS",
    "n8n",
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
    url: "https://supun.vercel.app",
    title: "SUPUN | Full-Stack Developer",
    description:
      "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce,  and UI design with AI integration.",
    siteName: "SUPUN Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUPUN | Full-Stack Developer",
    description:
      "Full-stack software developer specializing in Next.js, React, Laravel, Android apps, e-commerce, and UI design with AI integration.",
    creator: "@Supun-Sanjana",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        className={`${space.className} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
