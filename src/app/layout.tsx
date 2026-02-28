import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
    default: "Unaifly | Desarrollo de paginas web en Barcelona con IA",
    template: "%s | Unaifly",
  },
  description:
    "Desarrollo de paginas web en Barcelona, digitalizacion de empresas y modernizacion con inteligencia artificial para pymes y negocios locales.",
  keywords: [
    "desarrollo de paginas web en barcelona",
    "paginas web barcelona",
    "digitalizacion de empresas",
    "modernizacion de empresas",
    "inteligencia artificial para empresas",
    "ia para pymes en barcelona",
    "automatizacion de procesos",
    "seo local barcelona",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Unaifly",
    title: "Unaifly | Desarrollo web y digitalizacion de empresas en Barcelona",
    description:
      "Construimos paginas web, sistemas digitales y soluciones con IA para modernizar empresas en Barcelona.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unaifly | Desarrollo web en Barcelona con IA",
    description:
      "Paginas web, digitalizacion y modernizacion empresarial con inteligencia artificial.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
