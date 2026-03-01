import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para restaurantes en Barcelona",
  description:
    "Creamos paginas web para restaurantes en Barcelona con carta, reservas y WhatsApp para captar mas mesas.",
  keywords: [
    "desarrollo web restaurantes barcelona",
    "pagina web restaurante barcelona",
    "web con reservas restaurante",
    "seo local restaurantes barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-restaurantes-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para restaurantes en Barcelona",
    description:
      "Web para restaurantes con reservas, carta online y visibilidad local en Google.",
    url: "/desarrollo-web-restaurantes-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebRestaurantesBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para restaurantes en Barcelona",
    serviceType: "Paginas web para restaurantes",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-restaurantes-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para restaurantes en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Disenamos webs para restaurantes que quieren llenar mas mesas y recibir reservas sin friccion.
        Tu cliente ve carta, horario, ubicacion y reserva en pocos clics.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Carta online clara con fotos y categorias.</li>
        <li>Reserva integrada con WhatsApp o sistema de citas.</li>
        <li>Mapa, horarios, telefono y botones de accion visibles.</li>
        <li>Visibilidad en Google en tu zona (SEO local).</li>
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
