import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para barberias en Barcelona",
  description:
    "Creamos paginas web para barberias en Barcelona con reservas online, promociones y visibilidad local en Google.",
  keywords: [
    "desarrollo web barberias barcelona",
    "pagina web barberia barcelona",
    "web barberia con reservas",
    "seo local barberia barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-barberias-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para barberias en Barcelona",
    description:
      "Web para barberias con reservas, servicios destacados y captacion local de clientes.",
    url: "/desarrollo-web-barberias-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebBarberiasBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para barberias en Barcelona",
    serviceType: "Paginas web para barberias",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-barberias-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para barberias en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Tu barberia necesita una web simple que convierta visitas en reservas.
        Mostramos tus servicios, precios y horarios con botones directos para reservar al instante.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Servicios por corte y barba con precios visibles.</li>
        <li>Integracion de reservas con agenda y recordatorios.</li>
        <li>Galeria de estilos y presencia de marca.</li>
        <li>Visibilidad local para atraer clientes cercanos (SEO local).</li>
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
