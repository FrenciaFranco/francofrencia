import * as React from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  description: string
  link: string
  linkText?: string
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] dark:before:bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
          className,
        )}
        {...props}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
          <p className="mt-3 flex-1 text-muted-foreground">{description}</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    )
  },
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
