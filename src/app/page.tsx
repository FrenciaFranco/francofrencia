<<<<<<< HEAD
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroFuturistic = dynamic(
  () => import("@/components/ui/hero-futuristic"),
  { ssr: false, loading: () => <div className="h-svh bg-black" /> }
);

const DigitalTransformation = dynamic(
  () => import("@/components/ui/digital-transformation"),
  { ssr: false }
);
=======
import Link from "next/link";
import HomeClientSections from "@/components/home-client-sections";
>>>>>>> b4f04f3 (feat: refactor language and currency initialization with localStorage support and create HomeClientSections component)

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Unaifly",
        areaServed: "Barcelona",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Cataluna",
          addressCountry: "ES",
        },
        url: "https://unaifly.com",
        sameAs: [],
        description:
          "Agencia de desarrollo de paginas web en Barcelona, digitalizacion de empresas y modernizacion con inteligencia artificial.",
      },
      {
        "@type": "Service",
        serviceType: "Desarrollo de paginas web en Barcelona",
        areaServed: "Barcelona",
        provider: {
          "@type": "Organization",
          name: "Unaifly",
        },
      },
      {
        "@type": "Service",
        serviceType: "Digitalizacion de empresas",
        areaServed: "Barcelona",
        provider: {
          "@type": "Organization",
          name: "Unaifly",
        },
      },
      {
        "@type": "Service",
        serviceType: "Modernizacion con inteligencia artificial",
        areaServed: "Barcelona",
        provider: {
          "@type": "Organization",
          name: "Unaifly",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Trabajais con empresas y pymes de Barcelona?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Si. Trabajamos con pymes y negocios locales para mejorar su presencia digital, automatizar procesos y captar mas clientes con una web orientada a conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Ofreceis modernizacion con inteligencia artificial?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Si. Implementamos soluciones practicas de inteligencia artificial y automatizacion para ahorrar tiempo, mejorar la atencion y aumentar resultados comerciales.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
<<<<<<< HEAD
      <HeroFuturistic />
      <DigitalTransformation />
=======
      <HomeClientSections />
>>>>>>> b4f04f3 (feat: refactor language and currency initialization with localStorage support and create HomeClientSections component)
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Desarrollo de paginas web en Barcelona para digitalizar y modernizar tu empresa
          </h2>
          <p className="mt-4 text-white/80">
            En Unaifly ayudamos a empresas en Barcelona a crecer con paginas web de alto rendimiento,
            digitalizacion de procesos y sistemas con inteligencia artificial. Nuestro enfoque combina SEO
            local, automatizacion y conversion para que tu web no solo se vea bien: genere clientes.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/desarrollo-web-barcelona"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Desarrollo web en Barcelona
            </Link>
            <Link
              href="/digitalizacion-empresas-barcelona"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Digitalizacion de empresas
            </Link>
            <Link
              href="/inteligencia-artificial-empresas-barcelona"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Modernizacion con IA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
