import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo de paginas web en Barcelona",
  description:
    "Creamos paginas web en Barcelona enfocadas en SEO local, conversion y rendimiento para pymes y empresas.",
  alternates: {
    canonical: "/desarrollo-web-barcelona",
  },
};

export default function DesarrolloWebBarcelonaPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Desarrollo de paginas web en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Disenamos y desarrollamos paginas web para negocios de Barcelona que quieren ganar visibilidad
        en Google y convertir mas visitas en oportunidades reales. Trabajamos con arquitectura SEO,
        optimizacion tecnica y contenido orientado a busquedas locales.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Que incluye nuestro servicio</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Web corporativa o landing page enfocada a conversion.</li>
        <li>SEO local para posicionar terminos como paginas web Barcelona.</li>
        <li>Core Web Vitals optimizados para escritorio y movil.</li>
        <li>Estructura de contenidos y enlazado interno para escalar posicionamiento.</li>
      </ul>

      <p className="mt-8 text-white/80">
        Si ademas quieres digitalizar procesos o integrar IA, podemos construir una hoja de ruta de
        modernizacion por fases para que avances sin friccion.
      </p>

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
