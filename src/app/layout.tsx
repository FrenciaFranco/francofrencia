import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CookieBanner from "@/components/cookie-banner";

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
