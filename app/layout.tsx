import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEDxSIST",
  description: "TEDxSIST, official website for TEDx event at SIST",
  openGraph: {
    type: "website",
    url: "https://tedxsist.com",
    title: "TEDxSIST 2025",
    description: "Explore TEDxSIST, featuring inspiring talks and interactive events.",
    images: [{ url: "https://tedxsist.com/logo.png", alt: "TEDxSIST Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for Google SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TEDxSIST",
              "url": "https://tedxsist.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tedxsist.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": [
                { "@type": "WebPage", "name": "About", "url": "https://tedxsist.com/about" },
                { "@type": "WebPage", "name": "Blogs", "url": "https://tedxsist.com/blogs" },
                { "@type": "WebPage", "name": "Register", "url": "https://tedxsist.com/register" },
                { "@type": "WebPage", "name": "Events", "url": "https://tedxsist.com/events" }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
