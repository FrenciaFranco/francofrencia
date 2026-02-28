import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digitalizacion de empresas en Barcelona",
  description:
    "Ayudamos a digitalizar empresas en Barcelona con procesos automatizados, CRM, reservas y sistemas de captacion.",
  alternates: {
    canonical: "/digitalizacion-empresas-barcelona",
  },
};

export default function DigitalizacionEmpresasBarcelonaPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Digitalizacion de empresas en Barcelona</h1>
      <p className="mt-4 text-white/80">
        Modernizamos negocios y pymes de Barcelona con sistemas digitales conectados: web, formularios,
        CRM, automatizaciones y seguimiento comercial. El objetivo es claro: menos tareas manuales,
        mas control y mas ventas.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Soluciones de digitalizacion</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
        <li>Implementacion de CRM y gestion de leads.</li>
        <li>Automatizacion de comunicaciones por WhatsApp y email.</li>
        <li>Integracion de reservas, pagos y seguimiento post-venta.</li>
        <li>Paneles de metricas para decisiones de negocio.</li>
      </ul>

      <p className="mt-8 text-white/80">
        Trabajamos con una estrategia de mejora continua para que cada etapa de digitalizacion genere
        impacto real en resultados y productividad.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/desarrollo-web-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver desarrollo web
        </Link>
        <Link href="/inteligencia-artificial-empresas-barcelona" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Ver inteligencia artificial
        </Link>
      </div>
    </main>
  );
}
