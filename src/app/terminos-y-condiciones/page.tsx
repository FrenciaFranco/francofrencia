import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y condiciones",
  description: "Terminos y condiciones de uso de UNAiFLY.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
};

export default function TerminosYCondicionesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Terminos y condiciones</h1>
      <p className="mt-4 text-white/80">
        Al navegar por este sitio aceptas el uso responsable de su contenido y servicios.
        Cualquier propuesta comercial, alcance y plazos se define por escrito antes de iniciar un proyecto.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">Uso del sitio</h2>
      <p className="mt-3 text-white/80">
        El contenido de UNAiFLY tiene caracter informativo y puede actualizarse sin previo aviso.
        No esta permitido copiar, distribuir o reutilizar contenido sin autorizacion expresa.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">Servicios y presupuestos</h2>
      <p className="mt-3 text-white/80">
        Los precios mostrados son orientativos. Cada proyecto recibe presupuesto personalizado,
        con entregables, tiempos y condiciones de pago definidas en propuesta y acuerdo comercial.
      </p>
    </main>
  );
}
