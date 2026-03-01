import HomeClientSections from "@/components/home-client-sections";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://unaifly.com/#organization",
        name: "UNAiFLY",
        url: "https://unaifly.com",
        logo: "https://unaifly.com/logo.png",
        areaServed: "Barcelona",
      },
      {
        "@type": "WebSite",
        "@id": "https://unaifly.com/#website",
        url: "https://unaifly.com",
        name: "UNAiFLY",
        inLanguage: "es",
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://unaifly.com/#localbusiness",
        name: "UNAiFLY",
        alternateName: "Unaifly",
        areaServed: "Barcelona",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Cataluna",
          addressCountry: "ES",
        },
        url: "https://unaifly.com",
        image: "https://unaifly.com/logo.png",
        parentOrganization: {
          "@id": "https://unaifly.com/#organization",
        },
        description:
          "Agencia de desarrollo web en Barcelona. Creacion de paginas web, digitalizacion de pymes, automatizacion de procesos, SEO y marketing digital.",
        knowsAbout: [
          "Desarrollo web",
          "Digitalizacion de empresas",
          "Transformacion digital",
          "Automatizacion de procesos",
          "SEO y posicionamiento web",
          "Marketing digital",
          "Inteligencia artificial para pymes",
          "CRM",
          "Diseno web responsive",
          "Experiencia de usuario",
        ],
      },
      {
        "@type": "Service",
        "@id": "https://unaifly.com/#servicio-desarrollo-web",
        serviceType: "Creacion de paginas web profesionales",
        areaServed: "Barcelona",
        url: "https://unaifly.com/desarrollo-web-barcelona",
        provider: {
          "@id": "https://unaifly.com/#organization",
        },
      },
      {
        "@type": "Service",
        "@id": "https://unaifly.com/#servicio-digitalizacion",
        serviceType: "Digitalizacion y transformacion digital de empresas",
        areaServed: "Barcelona",
        url: "https://unaifly.com/digitalizacion-empresas-barcelona",
        provider: {
          "@id": "https://unaifly.com/#organization",
        },
      },
      {
        "@type": "Service",
        "@id": "https://unaifly.com/#servicio-ia",
        serviceType: "Automatizacion e inteligencia artificial para pymes",
        areaServed: "Barcelona",
        url: "https://unaifly.com/inteligencia-artificial-empresas-barcelona",
        provider: {
          "@id": "https://unaifly.com/#organization",
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
      <HomeClientSections />
    </>
  );
}
