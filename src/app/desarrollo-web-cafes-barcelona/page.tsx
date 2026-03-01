import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para cafes en Barcelona",
  description:
    "Creamos paginas web para cafes en Barcelona para atraer clientes cercanos, mostrar carta y activar pedidos o reservas.",
  keywords: [
    "desarrollo web cafes barcelona",
    "pagina web cafeteria barcelona",
    "web para cafe con carta",
    "seo local cafeteria barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-cafes-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para cafes en Barcelona",
    description:
      "Web para cafes con carta digital, botones de accion y visibilidad local en Google.",
    url: "/desarrollo-web-cafes-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebCafesBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para cafes en Barcelona",
    serviceType: "Paginas web para cafes y cafeterias",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-cafes-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para cafes en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Si tienes una cafeteria, tu web debe convertir visitas en clientes del barrio.
        Mostramos tu propuesta, menu, ubicacion y promociones para aumentar el flujo diario.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Pagina visual con menu, fotos y ambiente del local.</li>
        <li>Botones directos a WhatsApp, llamada o como llegar.</li>
        <li>Promociones y ofertas destacadas por franja horaria.</li>
        <li>Posicionamiento local para busquedas en Barcelona (SEO local).</li>
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
