import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web en Barcelona para pymes",
  description:
    "Creacion de paginas web profesionales en Barcelona. Diseno responsive, SEO local, experiencia de usuario y presencia digital para pymes.",
  keywords: [
    "desarrollo web barcelona",
    "creacion de paginas web barcelona",
    "diseno web profesional barcelona",
    "paginas web a medida para pymes",
    "diseno web responsive barcelona",
    "experiencia de usuario web",
    "posicionamiento web SEO barcelona",
    "agencia desarrollo web barcelona",
  ],
  alternates: {
    canonical: "/desarrollo-web-barcelona",
  },
  openGraph: {
    title: "Desarrollo web en Barcelona para pymes",
    description:
      "Paginas web a medida en Barcelona con diseno responsive, SEO y orientacion a conversion para pymes.",
    url: "/desarrollo-web-barcelona",
    type: "article",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo web en Barcelona para pymes",
    description:
      "Creamos paginas web para negocios de Barcelona que quieren mas clientes.",
  },
};

export default function DesarrolloWebBarcelonaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo web en Barcelona",
    serviceType: "Desarrollo de paginas web para pymes",
    areaServed: {
      "@type": "City",
      name: "Barcelona",
    },
    provider: {
      "@type": "Organization",
      name: "UNAiFLY",
      url: "https://unaifly.com",
    },
    url: "https://unaifly.com/desarrollo-web-barcelona",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo de paginas web en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Disenamos y desarrollamos paginas web para negocios de Barcelona que quieren ganar visibilidad
        en Google y convertir mas visitas en oportunidades reales. Creamos una web clara, rapida y
        pensada para que el cliente entienda lo que ofreces y te contacte sin vueltas.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye nuestro servicio</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Web corporativa o landing page enfocada en conseguir consultas reales.</li>
        <li>Configuracion para que aparezcas mejor en Google Maps y busquedas de tu zona (SEO local).</li>
        <li>Web rapida y comoda en movil y escritorio (Core Web Vitals).</li>
        <li>Textos y estructura claros para que el cliente entienda rapido que haces.</li>
      </ul>

      <p className="mt-8 text-white/80">
        Si ademas quieres digitalizar procesos o integrar IA, podemos construir una hoja de ruta de
        modernizacion por fases para que avances sin friccion.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Paginas web por sector en Barcelona</h2>
      <p className="mt-3 text-white/80">
        Tambien trabajamos landings y webs especificas por tipo de negocio para mejorar conversion y posicionamiento local.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link href="/desarrollo-web-restaurantes-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para restaurantes
        </Link>
        <Link href="/desarrollo-web-cafes-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para cafes
        </Link>
        <Link href="/desarrollo-web-clinicas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para clinicas
        </Link>
        <Link href="/desarrollo-web-bares-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para bares
        </Link>
        <Link href="/desarrollo-web-esteticas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para esteticas
        </Link>
        <Link href="/desarrollo-web-barberias-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Web para barberias
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/digitalizacion-empresas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver digitalizacion de empresas
        </Link>
        <Link href="/inteligencia-artificial-empresas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver modernizacion con IA
        </Link>
      </div>
    </main>
  );
}
