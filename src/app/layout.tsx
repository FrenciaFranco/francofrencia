import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CookieBanner from "@/components/cookie-banner";

const GA_ID = "G-96T6Q7Q7L1";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://unaifly.com"),
  title: {
    default: "UNAiFLY | Desarrollo web en Barcelona para pymes",
    template: "%s | UNAiFLY",
  },
  description:
    "Agencia de desarrollo web en Barcelona. Creacion de paginas web a medida, digitalizacion de pymes, automatizacion de procesos, SEO y marketing digital para empresas.",
  keywords: [
    "desarrollo web barcelona",
    "creacion de paginas web barcelona",
    "diseno web profesional barcelona",
    "agencia digital barcelona",
    "digitalizacion de pymes",
    "transformacion digital empresas",
    "automatizacion de procesos pymes",
    "posicionamiento web SEO barcelona",
    "marketing digital para pymes",
    "experiencia de usuario UX",
    "diseno web responsive",
    "CRM para pymes",
    "inteligencia artificial para empresas",
    "presencia digital empresas barcelona",
    "paginas web a medida barcelona",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "UNAiFLY",
    title: "UNAiFLY | Agencia de desarrollo web en Barcelona",
    description:
      "Creacion de paginas web, digitalizacion y transformacion digital de pymes en Barcelona. Automatizacion, SEO y marketing digital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNAiFLY | Desarrollo web en Barcelona con IA",
    description:
      "Creacion web, digitalizacion de pymes, automatizacion de procesos y posicionamiento SEO en Barcelona.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* ── GA4 + Consent Mode v2: Standard Google snippet ── */}
        {/* Step 1: Define gtag function + consent defaults BEFORE anything loads */}
        <Script
          id="gtag-consent-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted',
                wait_for_update: 500
              });

              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        {/* Step 2: Load gtag.js asynchronously */}
        <Script
          id="gtag-js"
          strategy="beforeInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
