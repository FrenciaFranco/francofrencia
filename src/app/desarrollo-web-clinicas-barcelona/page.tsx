import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web para clinicas en Barcelona",
  description:
    "Creamos paginas web para clinicas en Barcelona con captacion de pacientes, agenda de citas y confianza de marca.",
  keywords: [
    "desarrollo web clinicas barcelona",
    "pagina web clinica barcelona",
    "web para captar pacientes",
    "seo local clinicas barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-clinicas-barcelona",
  },
  openGraph: {
    title: "Desarrollo web para clinicas en Barcelona",
    description:
      "Web para clinicas con agenda online, fichas de servicios y enfoque en conversion de pacientes.",
    url: "/desarrollo-web-clinicas-barcelona",
    type: "article",
    locale: "es_ES",
  },
};

export default function DesarrolloWebClinicasBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web para clinicas en Barcelona",
    serviceType: "Paginas web para clinicas y centros medicos",
    areaServed: { "@type": "City", name: "Barcelona" },
    provider: { "@type": "Organization", name: "UNAiFLY", url: "https://unaifly.com" },
    url: "https://unaifly.com/desarrollo-web-clinicas-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo web para clinicas en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Tu web debe generar confianza en segundos y facilitar la reserva de citas.
        Creamos paginas para clinicas con informacion clara, especialidades y proceso de contacto simple.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Pagina de servicios medicos por especialidad.</li>
        <li>Reserva de cita con formulario o WhatsApp.</li>
        <li>Bloques de confianza: equipo, testimonios y preguntas frecuentes.</li>
        <li>Visibilidad local para captar pacientes cercanos (SEO local).</li>
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
