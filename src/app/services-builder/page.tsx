import type { Metadata } from "next";
import ServiceBuilder from "@/components/ui/service-builder";

export const metadata: Metadata = {
  title: "Planificador de servicios digitales",
  description: "Elige los servicios que tu negocio necesita y calcula precios en tiempo real.",
  alternates: {
    canonical: "/services-builder",
  },
};

export default function ServicesBuilderPage() {
  return <ServiceBuilder />;
}
