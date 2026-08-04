import type { Metadata } from "next";
import Script from "next/script";
import GlobalSmoothScroll from "./components/GlobalSmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nearbase – Digitalagentur für lokale Unternehmen",
    template: "%s | Nearbase",
  },
  description:
    "Nearbase betreut lokale Unternehmen und Filialisten im DACH-Raum mit Webdesign, Local SEO und Google-Unternehmensprofilen für messbare regionale Sichtbarkeit.",
  keywords: [
    "Digitalagentur",
    "Local SEO",
    "Google Business Profile",
    "Webdesign für lokale Unternehmen",
    "Regionale Sichtbarkeit",
  ],
  authors: [{ name: "Nearbase" }],
  robots: "index, follow",
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