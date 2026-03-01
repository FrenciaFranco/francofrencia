import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digitalizacion de empresas en Barcelona",
  description:
    "Digitalizacion y transformacion digital de empresas en Barcelona. Automatizacion de procesos, CRM, ERP y herramientas digitales para pymes.",
  keywords: [
    "digitalizacion de empresas barcelona",
    "digitalizacion de pymes",
    "transformacion digital empresas barcelona",
    "automatizacion de procesos pymes",
    "CRM para pymes barcelona",
    "ERP para pymes",
    "modernizacion de procesos empresariales",
    "herramientas digitales para empresas",
  ],
  alternates: {
    canonical: "/digitalizacion-empresas-barcelona",
  },
  openGraph: {
    title: "Digitalizacion de empresas en Barcelona",
    description:
      "Transformacion digital y automatizacion de procesos para pymes en Barcelona. CRM, ERP y soluciones digitales a medida.",
    url: "/digitalizacion-empresas-barcelona",
    type: "article",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalizacion de empresas en Barcelona",
    description:
      "Moderniza procesos y gana control comercial con sistemas digitales conectados.",
  },
};

export default function DigitalizacionEmpresasBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digitalizacion de empresas en Barcelona",
    serviceType: "Digitalizacion y automatizacion de procesos para pymes",
    areaServed: {
      "@type": "City",
      name: "Barcelona",
    },
    provider: {
      "@type": "Organization",
      name: "UNAiFLY",
      url: "https://unaifly.com",
    },
    url: "https://unaifly.com/digitalizacion-empresas-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Digitalizacion de empresas en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Modernizamos negocios y pymes de Barcelona con sistemas digitales conectados: web, formularios,
        gestion de clientes (CRM), automatizaciones y seguimiento comercial. El objetivo es claro: menos tareas manuales,
        mas control y mas ventas.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Soluciones de digitalizacion</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Organizacion de contactos y seguimiento comercial en una sola vista (CRM).</li>
        <li>Automatizacion de comunicaciones por WhatsApp y email.</li>
        <li>Integracion de reservas, pagos y seguimiento post-venta.</li>
        <li>Paneles simples para ver consultas, ventas y tareas pendientes.</li>
      </ul>

      <p className="mt-8 text-white/80">
        Trabajamos con una estrategia de mejora continua para que cada etapa de digitalizacion genere
        impacto real en resultados y productividad.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/desarrollo-web-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver desarrollo web
        </Link>
        <Link href="/inteligencia-artificial-empresas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver inteligencia artificial
        </Link>
      </div>
    </main>
  );
}
