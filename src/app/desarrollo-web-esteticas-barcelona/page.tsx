import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para esteticas en Barcelona",
  description:
    "Creamos paginas web para centros de estetica en Barcelona con reservas, servicios destacados y captacion local.",
  keywords: [
    "desarrollo web esteticas barcelona",
    "pagina web centro de estetica barcelona",
    "web para estetica con reservas",
    "seo local estetica barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-esteticas-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para esteticas en Barcelona",
    description:
      "Web para centros de estetica con reservas y contenido orientado a conversion.",
    url: "/desarrollo-web-esteticas-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebEsteticasBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para esteticas en Barcelona",
    serviceType: "Paginas web para centros de estetica",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-esteticas-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para esteticas en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Una web para estetica debe vender confianza y facilitar la reserva en segundos.
        Disenamos paginas visuales, ordenadas y pensadas para generar citas de calidad.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Servicios por tratamiento con precios orientativos.</li>
        <li>Galeria de resultados y testimonios reales.</li>
        <li>Reserva por WhatsApp o agenda integrada.</li>
        <li>Mejor posicionamiento en tu zona (SEO local).</li>
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
