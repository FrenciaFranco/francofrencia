import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidad",
  description: "Politica de privacidad de UNAiFLY.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Politica de privacidad</h1>
      <p className="mt-4 text-white/80">
        En UNAiFLY tratamos tus datos con confidencialidad y solo para responder consultas,
        preparar propuestas y mejorar la experiencia del sitio.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">Datos que podemos recopilar</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-white/80">
        <li>Datos de contacto enviados en formularios o mensajes.</li>
        <li>Informacion basica de navegacion para analitica y rendimiento del sitio.</li>
        <li>Datos compartidos durante reuniones comerciales para preparar propuestas.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">Uso de la informacion</h2>
      <p className="mt-3 text-white/80">
        Utilizamos la informacion para responderte, ofrecerte servicios adecuados y gestionar proyectos.
        No vendemos ni cedemos datos personales a terceros sin base legal o consentimiento.
      </p>
    </main>
  );
}
