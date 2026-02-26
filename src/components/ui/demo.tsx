import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { ProfessionalConnect } from "@/components/ui/get-in-touch"
import { ProjectCard } from "@/components/ui/project-card"

const DemoSerenity = () => {
  return <DigitalSerenity />
}

export function DemoBackgroundPaths() {
  return <BackgroundPaths title="Background Paths" />
}

export function DemoDottedSurface() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-3xl border">
      <DottedSurface className="absolute inset-0 opacity-40" />
      <div className="relative z-10 flex min-h-[500px] items-center justify-center">
        <h2 className="text-3xl font-semibold">Dotted Surface</h2>
      </div>
    </div>
  )
}

export function ProjectCardDemo() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        title="Aero Landing Page"
        description="A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page."
        imgSrc="https://framerusercontent.com/images/hynA7mpUiyBRDcssvVKCDBT14IM.jpg"
        link="#"
      />
      <ProjectCard
        title="Dreamland App Concept"
        description="A dreamy mobile app prototype designed for mindfulness and relaxation, featuring calming animations and a serene user interface."
        imgSrc="https://framerusercontent.com/images/D4M3JTkvSAJaqyRe9AzUnHvL8Ao.jpg"
        link="#"
        linkText="Explore Concept"
      />
      <ProjectCard
        title="Quantum Analytics Dashboard"
        description="A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis."
        imgSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        link="#"
      />
    </div>
  )
}

export default function DemoOne() {
  return <ProfessionalConnect />
}

export { DemoSerenity }
