"use client";

import dynamic from "next/dynamic";

const HeroFuturistic = dynamic(
  () => import("@/components/ui/hero-futuristic"),
  { ssr: false, loading: () => <div className="h-svh bg-black" /> }
);

const DigitalTransformation = dynamic(
  () => import("@/components/ui/digital-transformation"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <HeroFuturistic />
      <DigitalTransformation />
    </>
  );
}
