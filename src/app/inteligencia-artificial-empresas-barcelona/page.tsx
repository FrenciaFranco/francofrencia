import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inteligencia artificial para empresas en Barcelona",
  description:
    "Aplicamos inteligencia artificial en empresas de Barcelona para automatizar procesos, mejorar atencion y escalar operaciones.",
  alternates: {
    canonical: "/inteligencia-artificial-empresas-barcelona",
  },
};

export default function InteligenciaArtificialEmpresasBarcelonaPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Modernizacion de empresas con inteligencia artificial en Barcelona
      </h1>
      <p className="mt-4 text-white/80">
        Implementamos soluciones de IA para empresas que quieren operar mejor y crecer mas rapido.
        Desde asistentes para atencion hasta automatizaciones de flujo, la inteligencia artificial
        se integra con tu operativa real y con objetivos medibles.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Aplicaciones habituales de IA</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Asistentes de atencion para web y WhatsApp.</li>
        <li>Clasificacion de leads y priorizacion comercial.</li>
        <li>Automatizacion de tareas repetitivas entre herramientas.</li>
        <li>Generacion de contenido para marketing y ventas.</li>
      </ul>

      <p className="mt-8 text-white/80">
        Disenamos un plan por fases para evitar sobrecostes y asegurar que cada implementacion con IA
        tenga retorno en tiempo, calidad y facturacion.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/desarrollo-web-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver desarrollo web
        </Link>
        <Link href="/digitalizacion-empresas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver digitalizacion de empresas
        </Link>
      </div>
    </main>
  );
}
