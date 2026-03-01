import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para bares en Barcelona",
  description:
    "Creamos paginas web para bares en Barcelona con carta, eventos y botones de reserva o contacto directo.",
  keywords: [
    "desarrollo web bares barcelona",
    "pagina web bar barcelona",
    "web para bar con reservas",
    "seo local bares barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-bares-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para bares en Barcelona",
    description:
      "Web para bares con carta, eventos y captacion local de clientes.",
    url: "/desarrollo-web-bares-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebBaresBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para bares en Barcelona",
    serviceType: "Paginas web para bares",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-bares-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para bares en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Creamos webs para bares que quieren aumentar reservas, promocionar eventos y destacar en su zona.
        Todo pensado para que el cliente te encuentre y te escriba rapido.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Carta y promociones destacadas por temporada.</li>
        <li>Seccion de eventos y agenda semanal.</li>
        <li>Botones de WhatsApp, llamada y ubicacion visibles.</li>
        <li>Optimizada para aparecer en Google local (SEO local).</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/desarrollo-web-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver servicio general
        </Link>
        <Link href="/services-builder" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver planes y precios
        </Link>
      </div>
    </main>
  );
}
