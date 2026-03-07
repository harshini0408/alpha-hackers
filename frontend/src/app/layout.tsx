import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LogisticsNow | AI-Powered National Logistics Intelligence Platform",
  description: "LogisticsNow is building the Digital Backbone of Logistics with LoRRI — AI-powered intelligence, freight benchmarking, and optimization for India's logistics networks.",
  keywords: "LogisticsNow, LoRRI, Logistics Intelligence, National Logistics Grid, Freight AI, Supply Chain Optimization, Freight Benchmarking",
  openGraph: {
    title: "LogisticsNow | AI-Powered National Logistics Intelligence Platform",
    description: "Building the Digital Backbone of Logistics with AI-powered intelligence and optimization.",
    type: "website",
    url: "https://logisticsnow.in",
    siteName: "LogisticsNow",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogisticsNow | National Logistics Intelligence Platform",
    description: "Building the Digital Backbone of Logistics with AI-powered intelligence and optimization.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
