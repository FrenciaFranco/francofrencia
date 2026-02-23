"use client"

import { useState, useEffect, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Linkedin,
  Github,
  Sparkles,
  Zap,
  Calculator,
  Code,
  LineChart,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BackgroundPathsOverlay } from "@/components/ui/background-paths"
import { ProjectCard } from "@/components/ui/project-card"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function DesignAgency() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDarkMode(shouldUseDark)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      window.localStorage.setItem("theme", "dark")
      return
    }
    root.classList.remove("dark")
    window.localStorage.setItem("theme", "light")
  }, [isDarkMode])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const fullName = `${contactForm.firstName} ${contactForm.lastName}`.trim()
    const subject = encodeURIComponent(
      fullName ? `Website contact - ${fullName}` : "Website contact",
    )
    const body = encodeURIComponent(
      [
        `Name: ${fullName || "Not provided"}`,
        `Reply email: ${contactForm.email || "Not provided"}`,
        "",
        contactForm.message || "Hi Franco, I'd like to connect.",
      ].join("\n"),
    )

    window.location.href = `mailto:frencia92@gmail.com?subject=${subject}&body=${body}`
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <style>{`
        @keyframes float-dot {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-14px) translateX(8px); opacity: 0.7; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-primary/30 [animation:float-dot_5s_ease-in-out_infinite]" />
        <div className="absolute right-[15%] top-[34%] h-2 w-2 rounded-full bg-primary/20 [animation:float-dot_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] left-[18%] h-2 w-2 rounded-full bg-primary/25 [animation:float-dot_7s_ease-in-out_infinite]" />
      </div>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrollY > 50 ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-3xl bg-primary flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">Franco Frencia</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="#experience" className="text-sm font-medium transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-3xl"
              onClick={() => setIsDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" className="rounded-3xl" asChild>
              <Link href="https://www.linkedin.com/in/frencia/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button size="sm" className="rounded-3xl" asChild>
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-3xl bg-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Franco Frencia</span>
              </Link>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container mx-auto grid gap-3 px-4 pb-8 pt-6"
          >
            {["About", "Skills", "Projects", "Experience", "Contact"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-between rounded-3xl px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
              <Button
                variant="outline"
                className="w-full rounded-3xl"
                onClick={() => setIsDarkMode((prev) => !prev)}
              >
                {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {isDarkMode ? "Light mode" : "Dark mode"}
              </Button>
              <Button variant="outline" className="w-full rounded-3xl" asChild>
                <Link href="https://www.linkedin.com/in/frencia/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button className="w-full rounded-3xl" asChild>
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 lg:py-14 overflow-hidden">
          <div className="relative container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-gradient-to-br from-background to-muted/30">
            <BackgroundPathsOverlay />
            <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative z-10 flex flex-col justify-center space-y-4 py-6 px-4"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-3xl bg-muted px-3 py-1 text-sm"
                  >
                    <Calculator className="mr-1 h-3 w-3" />
                    Accountant · AI Enthusiast · Builder
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl xl:text-6xl"
                  >
                    Numbers by day,{" "}
                    <span className="inline-block pb-1 pr-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      AI experiments
                    </span>{" "}
                    by night
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                  >
                    I&apos;m Franco Frencia — a professional accountant at Bayer who enjoys applying AI as a hobby, building websites, apps, and exploring every use case I encounter along the way.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <Button size="lg" className="rounded-3xl group" asChild>
                    <Link href="#projects">
                      See My Projects
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-3xl" asChild>
                    <Link href="#about">Learn More About Me</Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex items-center justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[320px] aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-lg">
                  <Image
                    src="/foto.jpeg"
                    alt="Franco Frencia"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Highlights */}
        <section id="experience" className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/20"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
                >
                  Career
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Professional Experience
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  From Argentina to Spain — a journey in finance, accounting, and technology
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid grid-cols-1 items-center gap-4 py-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { company: "Bayer", role: "FA Closing & Reporting — Global Expert", period: "2022 – Present", location: "Barcelona, Spain" },
                { company: "GMG Asociados", role: "Accountant", period: "2020 – 2021", location: "Madrid, Spain" },
                { company: "Registro Automotor", role: "Deputy Manager", period: "2017 – 2019", location: "Argentina" },
                { company: "ATP", role: "Administrative", period: "2015 – 2017", location: "Argentina" },
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="rounded-3xl border p-6 bg-background/80 hover:shadow-md transition-all w-full">
                    <h3 className="font-bold text-lg">{exp.company}</h3>
                    <p className="text-sm text-primary mt-1">{exp.role}</p>
                    <p className="text-xs text-muted-foreground mt-2">{exp.period}</p>
                    <p className="text-xs text-muted-foreground">{exp.location}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
                >
                  Skills
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  What I Do
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  Combining financial expertise with a passion for technology and AI
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-4 py-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Calculator className="h-10 w-10 text-primary" />,
                  title: "Financial Closing & Reporting",
                  description:
                    "Expert in month-end and year-end closing processes, financial reporting, and compliance at a global scale with Bayer.",
                },
                {
                  icon: <Bot className="h-10 w-10 text-primary" />,
                  title: "AI & Automation",
                  description:
                    "Exploring AI use cases as a hobby — from building chatbots and automating workflows to experimenting with LLMs and generative AI.",
                },
                {
                  icon: <Code className="h-10 w-10 text-primary" />,
                  title: "Web & App Development",
                  description:
                    "Building websites and applications as side projects, learning modern frameworks like Next.js, React, and more.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-primary" />,
                  title: "Data & Analytics",
                  description: "Proficient in Power BI, Excel, and data analysis — turning raw numbers into actionable business insights.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Scrum & Agile",
                  description:
                    "Certified Professional Scrum Master (PSM I). Experienced in agile methodologies and team collaboration.",
                },
                {
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                  title: "ERP Systems",
                  description: "Hands-on experience with ERP systems including ContaSol and APLIFISA for accounting and financial management.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                  <div className="relative space-y-3">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
                >
                  Portfolio
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Side Projects & Experiments
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  Things I build and explore in my free time — from AI tools to web apps
                </motion.p>
              </div>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl py-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={itemFadeIn}>
                  <ProjectCard
                    title="Unaifly.com"
                    description="Landing and product experience focused on AI tools and practical workflows."
                    imgSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
                    link="https://unaifly.com"
                    linkText="Visit Site"
                  />
                </motion.div>
                <motion.div variants={itemFadeIn}>
                  <ProjectCard
                    title="El Oculto"
                    description="Creative web project deployed on Vercel with an immersive visual direction."
                    imgSrc="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&fit=crop"
                    link="https://eloculto.vercel.app/"
                    linkText="Open Project"
                  />
                </motion.div>
                <motion.div variants={itemFadeIn}>
                  <ProjectCard
                    title="Bots de Telegram"
                    description="Automation bots for alerts, utilities and conversational experiences."
                    imgSrc="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&h=800&fit=crop"
                    link="https://t.me/"
                    linkText="View Bots"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 p-6"
              >
                <div className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm">About Me</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Story</h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  I&apos;m a Contador Público (CPA) from Universidad Nacional del Nordeste in Argentina. After years of
                  building my career in accounting across Argentina and Spain, I joined Bayer in Barcelona where I
                  specialize in Financial Closing & Reporting at a global level.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Outside of work, I&apos;m deeply curious about artificial intelligence and technology. I spend my free
                  time building websites, developing apps, and exploring how AI can be applied to solve real-world
                  problems — from automating repetitive tasks to creating entirely new tools.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" size="lg" className="rounded-3xl" asChild>
                    <Link href="https://www.linkedin.com/in/frencia/" target="_blank" rel="noopener noreferrer">
                      View Full Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-3xl" asChild>
                    <Link href="https://www.scrum.org/user/603767" target="_blank" rel="noopener noreferrer">
                      PSM I Certification
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[300px] w-full md:h-[380px] lg:h-[430px] overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop"
                    alt="Working on laptop"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
            <div className="mt-10 px-6 pb-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold tracking-tighter sm:text-3xl"
              >
                Education & Certifications
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4"
              >
                {[
                  { title: "Contador Público", detail: "Universidad Nacional del Nordeste", period: "2011 – 2018" },
                  { title: "PSM I", detail: "Scrum.org — Professional Scrum Master", period: "Dec 2023" },
                  { title: "Power BI with Excel", detail: "LinkedIn Learning", period: "Oct 2022" },
                  { title: "47 Certifications", detail: "LinkedIn Learning & Others", period: "Ongoing" },
                ].map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-3xl border p-6 bg-background/80 hover:shadow-md transition-all"
                  >
                    <h4 className="font-bold">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{cert.detail}</p>
                    <p className="text-xs text-muted-foreground mt-2">{cert.period}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/20"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-background px-3 py-1 text-sm"
                >
                  Recommendation
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  What Others Say
                </motion.h2>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto max-w-3xl py-8"
            >
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -10 }}
                className="flex flex-col justify-between rounded-3xl border bg-background p-8 shadow-sm"
              >
                <div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg font-medium leading-relaxed">
                    &quot;He tenido la oportunidad de trabajar con Franco durante el último año y medio. De Franco
                    destacaría su compromiso, trabajo en equipo y su capacidad de aprendizaje. Su evolución profesional
                    en el tiempo que hemos trabajado juntos ha sido muy positiva. Sin duda gran profesional.&quot;
                  </blockquote>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">DM</div>
                  <div className="ml-4">
                    <p className="font-medium">Diego Martínez de Velasco</p>
                    <p className="text-sm text-muted-foreground">Executive Director — Franco&apos;s Mentor</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-8 md:py-10 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 border border-muted rounded-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 p-6"
            >
              <div className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm">Contact</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Let&apos;s Connect</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Interested in collaborating, have a question about AI, or just want to say hi? I&apos;d love to hear from you.
              </p>
              <div className="mt-8 space-y-4">
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                  <div className="rounded-3xl bg-muted p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">Barcelona, Catalonia, Spain</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                  <div className="rounded-3xl bg-muted p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <Link href="mailto:frencia92@gmail.com" className="text-sm text-muted-foreground hover:text-foreground">
                      Send me an email
                    </Link>
                  </div>
                </motion.div>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://t.me/franncccooo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-muted/40"
                >
                  <div className="rounded-3xl bg-muted p-2">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telegram</h3>
                    <p className="text-sm text-muted-foreground">Open chat</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://wa.me/34644583808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-muted/40"
                >
                  <div className="rounded-3xl bg-muted p-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Open chat</p>
                  </div>
                </motion.a>
              </div>
              <div className="mt-8 flex space-x-3">
                {[
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/frencia/" },
                  { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/frenciafranco" },
                  { icon: <Send className="h-5 w-5" />, label: "Telegram", href: "https://t.me/franncccooo" },
                  { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", href: "https://wa.me/34644583808" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-3xl border p-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                    >
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border bg-background p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold">Send Me an Email</h3>
              <p className="text-sm text-muted-foreground">
                Complete this form and your email app will open with the message ready for `frencia92@gmail.com`.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="first-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      First name
                    </label>
                    <Input
                      id="first-name"
                      placeholder="Your first name"
                      className="rounded-3xl"
                      value={contactForm.firstName}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="last-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Last name
                    </label>
                    <Input
                      id="last-name"
                      placeholder="Your last name"
                      className="rounded-3xl"
                      value={contactForm.lastName}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="rounded-3xl"
                    value={contactForm.email}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-[120px] rounded-3xl"
                    value={contactForm.message}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full rounded-3xl">
                    Open Email Draft
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-6 md:px-6"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-3xl bg-primary flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">Franco Frencia</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Accountant by profession, AI enthusiast by passion. Building things, one experiment at a time.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/frencia/" },
                { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/frenciafranco" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="border-t">
          <div className="container mx-auto flex flex-col items-center justify-between gap-3 py-6 md:h-16 md:flex-row md:py-0 px-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Franco Frencia. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">Based in Barcelona, Spain 🇪🇸</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
