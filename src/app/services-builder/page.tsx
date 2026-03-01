import type { Metadata } from "next";
import ServiceBuilder from "@/components/ui/service-builder";

export const metadata: Metadata = {
  title: "Service Builder — UNAiFLY",
  description: "Build your custom digital services plan. Select exactly what your business needs and get instant pricing.",
};

export default function ServicesBuilderPage() {
  return <ServiceBuilder />;
}
