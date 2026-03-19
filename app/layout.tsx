import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { CursorProvider } from "@/lib/cursorContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crafteako | Photography & Videography",
  description:
    "Crafteako is a luxury photography and videography studio specializing in weddings, graduations, senior portraits, events, and music videos. Cinematic, timeless, and deeply personal.",
  openGraph: {
    title: "Crafteako | Photography & Videography",
    description:
      "Luxury photography and videography — weddings, graduations, portraits, events, music videos.",
    siteName: "Crafteako",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Crafteako Studio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <CursorProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            {children}
          </CursorProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
