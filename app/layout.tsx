import type { Metadata } from "next";
import Script from "next/script";
import GlobalSmoothScroll from "./components/GlobalSmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nearbase.de"),
  alternates: {
  canonical: "https://nearbase.de",
},
  title: {
    default: "Nearbase – Digitalagentur für lokale Unternehmen",
    template: "%s | Nearbase",
  },
  description:
    "Nearbase begleitet lokale Unternehmen und Filialisten im DACH-Raum dabei, online sichtbar zu werden und kontinuierlich neue Kunden zu gewinnen.",
  keywords: [
    "Digitalagentur",
    "Digitalagentur für lokale Unternehmen",
    "Local SEO",
    "Local Marketing",
    "Google Business Profile Optimierung",
    "Webdesign für lokale Unternehmen",
    "Digitale Sichtbarkeit",
    "Sichtbarkeit für Filialisten",
    "Online-Marketing für regionale Unternehmen",
    "Kundengewinnung lokal",
  ],
  authors: [{ name: "Nearbase" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Nearbase – Digitalagentur für lokale Unternehmen",
    description:
      "Wir sorgen dafür, dass lokale Unternehmen und Filialisten digital sichtbar werden und neue Kunden gewinnen.",
    url: "https://nearbase.de",
    siteName: "Nearbase",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nearbase – Digitalagentur für lokale Unternehmen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

  return (
    <html lang="de">
      <body>
        {cookiebotId && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={cookiebotId}
            data-blockingmode="auto"
            strategy="afterInteractive"
          />
        )}
        <GlobalSmoothScroll>{children}</GlobalSmoothScroll>
      </body>
    </html>
  );
}