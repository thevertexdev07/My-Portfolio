import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rahul Jangra | AI & Machine Learning Developer — RAHIBLADEX",
  description:
    "Portfolio of Rahul Jangra (RAHIBLADEX) — AI & Machine Learning Developer, BCA student specializing in Neural Networks, GNN-LSTM models, Python, and CI/CD automation. Based in Mangaluru / Chennai, India.",
  keywords: [
    "Rahul Jangra",
    "RAHIBLADEX",
    "AI Developer",
    "Machine Learning",
    "Portfolio",
    "Neural Networks",
    "GNN-LSTM",
    "Python",
    "BCA",
    "St Agnes College",
  ],
  authors: [{ name: "Rahul Jangra" }],
  openGraph: {
    type: "website",
    title: "Rahul Jangra | AI & Machine Learning Developer — RAHIBLADEX",
    description:
      "AI & ML Developer building intelligent systems — Neural Networks, GNN-LSTM traffic simulations, and automated CI/CD pipelines.",
    siteName: "RAHIBLADEX Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Jangra | AI & Machine Learning Developer",
    description:
      "AI & ML Developer building intelligent systems — Neural Networks, GNN-LSTM traffic simulations, and automated CI/CD pipelines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-dark-900 font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
