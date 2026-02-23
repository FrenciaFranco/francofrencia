"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ArrowUpRight,
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-gradient-to-br from-background to-muted/30">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-4 py-10 px-4"
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
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  >
                    Numbers by day,{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
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
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
                    alt="Modern workspace with technology"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Highlights */}
        <section id="experience" className="w-full py-12 md:py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/20"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
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
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
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
              className="mx-auto grid max-w-5xl items-center gap-4 py-12 md:grid-cols-2 lg:grid-cols-3"
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

        {/* Projects Bento Grid */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
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
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-7xl gap-4 py-12 md:grid-cols-4 md:grid-rows-2 lg:gap-4"
            >
              {/* Bento Grid Items */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 h-[400px] md:h-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop"
                  alt="AI Experimentation"
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-bold">AI Experiments</h3>
                  <p className="text-sm">Exploring LLMs, chatbots, and generative AI use cases</p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-3xl bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                    >
                      View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl h-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="Data Dashboards"
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-bold">Data Dashboards</h3>
                  <p className="text-sm">Power BI reports and data visualizations</p>
                </div>
              </motion.div>
              <motion.div
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl h-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                  alt="Web Development"
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-bold">Web Apps</h3>
                  <p className="text-sm">Full-stack projects with React & Next.js</p>
                </div>
              </motion.div>
              <motion.div
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl h-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
                  alt="Automation Scripts"
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-bold">Automation</h3>
                  <p className="text-sm">Scripts and tools to streamline workflows</p>
                </div>
              </motion.div>
              <motion.div
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl md:col-span-2 h-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=400&fit=crop"
                  alt="Financial Analytics"
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-bold">Financial Analytics</h3>
                  <p className="text-sm">Applying AI to accounting and financial analysis</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
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
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop"
                    alt="Working on laptop"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
            <div className="mt-16 px-6 pb-10">
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 border border-muted rounded-3xl bg-muted/20"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
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
              className="mx-auto max-w-3xl py-12"
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
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
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
                    <p className="text-sm text-muted-foreground">Connect with me on LinkedIn</p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8 flex space-x-3">
                {[
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/frencia/" },
                  { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/frenciafranco" },
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
              <h3 className="text-xl font-bold">Send Me a Message</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and I&apos;ll get back to you shortly.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="first-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      First name
                    </label>
                    <Input id="first-name" placeholder="Your first name" className="rounded-3xl" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="last-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Last name
                    </label>
                    <Input id="last-name" placeholder="Your last name" className="rounded-3xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" className="rounded-3xl" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" className="min-h-[120px] rounded-3xl" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full rounded-3xl">
                    Send Message
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
          className="container mx-auto px-4 py-10 md:px-6"
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
