import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AlgoRhythm - Where Algorithms Find Their Flow",
  description:
    "Explore, understand, and visualize every algorithm — from fundamentals to advanced concepts — all in one rhythmic, interactive platform. Master algorithms through real-time visualizations, step-by-step animations, and clean explanations.",
  keywords: [
    "algorithms",
    "data structures",
    "visualization",
    "learning",
    "computer science",
    "sorting algorithms",
    "searching algorithms",
    "graph algorithms",
    "tree algorithms",
    "algorithm visualization",
    "interactive learning",
    "coding education",
    "programming tutorials",
    "algorithm patterns",
    "BFS",
    "DFS",
    "dynamic programming",
    "AlgoRhythm",
  ],
  authors: [
    {
      name: "Rajat Saraswat",
      url: "https://github.com/StealthSilver",
    },
  ],
  creator: "Rajat Saraswat",
  publisher: "AlgoRhythm",
  metadataBase: new URL("https://algorhythm.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://algorhythm.vercel.app",
    title: "AlgoRhythm - Where Algorithms Find Their Flow",
    description:
      "Master algorithms through interactive visualizations and step-by-step animations. From fundamentals to advanced concepts, all in one rhythmic platform.",
    siteName: "AlgoRhythm",
    images: [
      {
        url: "/algo.svg",
        width: 1200,
        height: 630,
        alt: "AlgoRhythm - Algorithm Visualization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlgoRhythm - Where Algorithms Find Their Flow",
    description:
      "Master algorithms through interactive visualizations and step-by-step animations. Explore data structures, sorting, searching, and more.",
    creator: "@silver_srs",
    images: ["/algo.svg"],
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
  icons: {
    icon: [
      {
        url: "/algo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/algo.svg",
    apple: "/algo.svg",
  },
  manifest: "/site.webmanifest",
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
