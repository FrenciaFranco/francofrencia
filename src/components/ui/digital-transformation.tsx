"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check, ChevronDown, ArrowRight, MessageCircle, Globe,
  Bot, Layers, TrendingUp, Calendar, Zap, Megaphone,
  Paintbrush, Wrench, Rocket, Store, Building2, Users, LockOpen, Phone, Pointer, Languages,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipCard } from "@/components/ui/flip-card";
import { GlowCard } from "@/components/ui/spotlight-card";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- TYPES ---
type Language = "en" | "es" | "ca" | "it";

const languageOptions: Array<{ code: Language; label: string; name: string }> = [
  { code: "es", label: "ES", name: "Castellano" },
  { code: "en", label: "EN", name: "English" },
  { code: "ca", label: "CA", name: "Català" },
  { code: "it", label: "IT", name: "Italiano" },
];

const WHATSAPP_NUMBER = "34644583808";
const packageCtaLabels = [
  "Quiero comenzar!",
  "Quiero crecer!",
  "Quiero digitalizarme!",
  "Quiero expander!",
];

function getPackageWhatsAppUrl(packageName: string, ctaLabel: string) {
  const message = `Hola Franco, ${ctaLabel} Me interesa el paquete "${packageName}" que vi en tu web. ¿Lo vemos?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// --- ICON ARRAYS (index-matched to translation arrays) ---
const serviceCategoryIcons = [Globe, Calendar, MessageCircle, Zap, Megaphone, Paintbrush, Wrench, Bot];
const serviceCategoryIconStyles = [
  { icon: "text-sky-400", bg: "bg-sky-500/15", bgSoft: "bg-sky-500/10", title: "text-sky-300" },
  { icon: "text-emerald-400", bg: "bg-emerald-500/15", bgSoft: "bg-emerald-500/10", title: "text-emerald-300" },
  { icon: "text-green-400", bg: "bg-green-500/15", bgSoft: "bg-green-500/10", title: "text-green-300" },
  { icon: "text-amber-400", bg: "bg-amber-500/15", bgSoft: "bg-amber-500/10", title: "text-amber-300" },
  { icon: "text-rose-400", bg: "bg-rose-500/15", bgSoft: "bg-rose-500/10", title: "text-rose-300" },
  { icon: "text-violet-400", bg: "bg-violet-500/15", bgSoft: "bg-violet-500/10", title: "text-violet-300" },
  { icon: "text-orange-400", bg: "bg-orange-500/15", bgSoft: "bg-orange-500/10", title: "text-orange-300" },
  { icon: "text-cyan-400", bg: "bg-cyan-500/15", bgSoft: "bg-cyan-500/10", title: "text-cyan-300" },
];
const whyDiffIcons = [Bot, Layers, TrendingUp, LockOpen];
const whyDiffIconStyles = [
  { icon: "text-cyan-400", bg: "bg-cyan-500/15", glow: "blue" as const },
  { icon: "text-fuchsia-400", bg: "bg-fuchsia-500/15", glow: "purple" as const },
  { icon: "text-lime-400", bg: "bg-lime-500/15", glow: "green" as const },
  { icon: "text-orange-400", bg: "bg-orange-500/15", glow: "orange" as const },
];
const sizeIcons = [Rocket, Store, Building2, Users];
const sizeIconStyles = [
  { icon: "text-indigo-400", bg: "bg-indigo-500/15", glow: "purple" as const },
  { icon: "text-emerald-400", bg: "bg-emerald-500/15", glow: "green" as const },
  { icon: "text-amber-400", bg: "bg-amber-500/15", glow: "orange" as const },
  { icon: "text-rose-400", bg: "bg-rose-500/15", glow: "red" as const },
];

// --- TRANSLATIONS ---
const t = {
  en: {
    backHome: "Back to Home",
    viewProfile: "View profile",
    teamTitle: "The team",
    headerBadge: "Digital Services",
    headerTitle: "Transform your business with",
    headerAccent: "AI-powered systems",
    headerDesc: "Custom digital solutions built with artificial intelligence. No internet templates, no generic tools. Everything designed from scratch for your specific business.",
    whyDiffBadge: "Why different?",
    whyDiffTitle: "Built with AI. Not templates.",
    whyDiffSubtitle: "We write real code using AI. Every website is unique, created from scratch for your business — not a WordPress theme or a page builder.",
    whyDiffCards: [
      { title: "AI, not templates", desc: "No WordPress themes or generic builders. Every site is custom code generated with AI, unique to your brand." },
      { title: "100% customizable", desc: "Every color, section, text and button adapts to your image. Nothing is fixed, everything can change whenever you want." },
      { title: "Grows with you", desc: "Start with what you need today (from €200) and add solutions as your business demands them." },
      { title: "No client lock-in", desc: "No lock-in. If one day you want to continue by yourself or with another agency, you can take everything we built. What is yours is truly yours." },
    ],
    servCatBadge: "Services",
    servCatTitle: "Everything we can build together",
    servCatDesc: "Each service solves a real problem in your business. Pick what you need, combine as you grow.",
    serviceFrontTeasers: [
      "Take your website to the next level.",
      "Manage bookings like a pro.",
      "Make your communication more efficient.",
      "Keep your leads organized and actionable.",
      "Attract better clients with smarter campaigns.",
      "Create content that looks and converts better.",
      "Keep improving every month without friction.",
      "Apply AI with a clear and practical plan.",
    ],
    serviceCategories: [
      { name: "Web & digital presence", items: [
        "Professional website / landing page for client acquisition",
        "Conversion-focused web: clear buttons (WhatsApp, call, book), forms, testimonials, FAQ, map, hours",
        "Local SEO basics + AI keyword/content suggestions: Google Maps, Google Business Profile, reviews, local keywords",
        "Performance optimization: speed, core web vitals and mobile-first UX improvements",
      ]},
      { name: "Bookings & appointments", items: [
        "Booking system adapted to your business (Booksy/Fresha or Calendar/Calendly), integrated into your website",
        "Complete flow: services, prices, hours, staff/agenda, pre-consultation forms, confirmations and rescheduling",
        "Fewer no-shows with AI-assisted reminders and optional deposits/payments",
        "Automatic booking confirmations by WhatsApp/email with clear client instructions",
      ]},
      { name: "WhatsApp & communication", items: [
        "Professional WhatsApp button with pre-filled message and click tracking",
        "AI assistant for FAQs and after-hours + simple menu (Bookings, Prices, Location)",
        "Automatic follow-up: reminder, booking link and review request",
        "Conversation flow design to qualify leads before your team steps in",
      ]},
      { name: "CRM & lead management", items: [
        "Lead integration → Sheets / Notion / simple CRM",
        "Basic analytics + AI lead prioritization: measure clicks to WhatsApp, forms, bookings — simple monthly report",
        "Pipeline stages and task reminders so no lead is left unattended",
      ]},
      { name: "Marketing & advertising", items: [
        "Digital advertising with AI-assisted creatives: Meta/Instagram campaigns, Google Ads (local search), basic retargeting",
        "Social media management: content calendar, publishing, stories, message replies",
        "Basic email marketing: promotions, reminders, newsletter",
        "A/B testing of hooks, creatives and audiences to improve ROI",
      ]},
      { name: "Design & content", items: [
        "Graphic design: logo, basic branding, post/story templates, flyers, cards, menus",
        "Business photo/video: editing, simple reels, product/service photos",
        "AI-assisted copywriting: web texts, service descriptions, ads, WhatsApp messages, emails",
        "Editorial guidelines to keep visual and verbal consistency across channels",
      ]},
      { name: "Maintenance & growth", items: [
        "Monthly web maintenance: content updates, new sections, security/updates, support",
        "Continuous optimization with AI insights: conversion improvements, new service landing pages, campaign adjustments",
        "Monthly growth roadmap with priority actions based on real performance data",
      ]},
      { name: "AI advisory", items: [
        "Workflow audit to detect repetitive tasks and automation opportunities",
        "Practical recommendation of AI tools based on your sector and budget",
        "Phased implementation plan + team guidance so AI is truly adopted",
        "Prompt library and best-practice playbooks tailored to your daily operations",
      ]},
    ],
    priceCatBadge: "Price catalog",
    priceCatTitle: "Transparent pricing per service",
    priceCatDesc: "No surprises. You know what you pay before we start. All prices are starting points — free quote for your exact project.",
    priceCatalog: [
      { category: "Web & digital presence", tagline: "Website, landing page & local visibility on Google Maps", items: [
        { name: "Basic website (1 page)", from: "€200" },
        { name: "Conversion landing page", from: "€450" },
        { name: "Multi-page website (up to 5 pages)", from: "€800" },
        { name: "Local SEO (GMB + keywords)", from: "€150" },
      ]},
      { category: "Bookings & appointments", tagline: "Booksy, Calendly & automated reminders to cut no-shows", items: [
        { name: "Full Booksy / Fresha setup", from: "€200" },
        { name: "Calendly-style agenda + forms", from: "€150" },
        { name: "Automated reminders", from: "€100" },
        { name: "Deposits / payment setup", from: "€120" },
      ]},
      { category: "WhatsApp", tagline: "Automate replies, filter leads & convert clients 24/7", items: [
        { name: "Professional WhatsApp button", from: "€80" },
        { name: "Basic automation (menus, after hours)", from: "€200" },
        { name: "WhatsApp Secretary (conversational bot)", from: "€350" },
        { name: "Automated lead follow-up", from: "€150" },
        { name: "Post-service automation", from: "€120" },
      ]},
      { category: "CRM & analytics", tagline: "Track every lead & measure clicks, forms and bookings", items: [
        { name: "Lead integration → CRM / Sheets / Notion", from: "€150" },
        { name: "Analytics setup + monthly report", from: "€100" },
      ]},
      { category: "Marketing & design", tagline: "Ads, social media management & brand identity", items: [
        { name: "Meta / Google Ads campaign setup", from: "€200" },
        { name: "Social media management (monthly)", from: "€200/mo" },
        { name: "Logo + basic branding", from: "€250" },
        { name: "Website copywriting", from: "€150" },
        { name: "Email marketing setup", from: "€150" },
      ]},
      { category: "Maintenance", tagline: "Keep your site fast, secure & always up to date", items: [
        { name: "Basic monthly maintenance", from: "€59/mo" },
        { name: "Support + monthly optimization", from: "€99/mo" },
      ]},
    ],
    sizeBadge: "Plans by size",
    sizeTitle: "We grow together with your business",
    sizeDesc: "Start where you are. We add solutions when your business needs them.",
    growTogether: "A €200 website today can become a full system with bookings, automated WhatsApp and advertising tomorrow — without throwing anything away. We build on top of what we've already made together.",
    sinceLabel: "from",
    mostPopular: "Most popular",
    sizes: [
      { label: "Starting out", examples: "Freelancer, new business, personal brand", price: "200 – 450€", badge: "To get started", services: ["Basic website or lead capture landing", "Professional WhatsApp button", "Google Business Profile setup", "Design and copy included"], popular: false },
      { label: "Small business", examples: "Hair salon, bar, clinic, aesthetician, local shop", price: "450 – 900€", badge: "Most popular", services: ["Conversion website (form, map, hours, WhatsApp)", "Full booking setup (Booksy / Fresha / Calendly)", "Basic local SEO + Google Maps", "Automated appointment reminders", "Tracked WhatsApp button"], popular: true },
      { label: "Established business", examples: "Clinic, consultancy, academy, staffed restaurant", price: "900 – 1,800€", badge: "Full system", services: ["Multi-page website with custom sections", "WhatsApp automation (menus + auto-replies)", "Simple CRM + lead tracking", "Full analytics (GA4 + pixels)", "Branding + social media templates"], popular: false },
      { label: "Scaling up", examples: "Growing team, multiple services, active advertising", price: "1,800€+", badge: "Maximum impact", services: ["Everything above", "Meta / Google Ads + retargeting", "WhatsApp Secretary (conversational bot)", "Email marketing + advanced automations", "30-day post-launch support"], popular: false },
    ],
    processBadge: "Process",
    processTitle: "How it works",
    processSteps: [
      { title: "Audit & Goals", desc: "Map current bottlenecks and define clear objectives." },
      { title: "Build & Integrate", desc: "Design assets and connect systems seamlessly." },
      { title: "Launch & Optimize", desc: "Go live, track performance, and refine conversions." },
    ],
    ctaTitle: "Ready to scale your business?",
    ctaDesc: "Stop losing hours to manual tasks. Let's build a system that works for you 24/7.",
    ctaWhatsApp: "Let's talk on WhatsApp",
    ctaBook: "Book a call",
    ctaFooter: "Fast turnaround • Clear communication • Practical results",
    lastPlanNote: "Custom plan for your next stage",
    caseNoticeTitle: "Let's talk about your case",
    caseNoticeDesc: "You can call us anytime.",
    callNow: "Call now",
    faqBadge: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "What do you need from me to get started?", a: "I'll need your branding assets (logo, colors), any existing copy or photos, and access to your current domain/hosting if you have them. We'll cover all of this in our kickoff chat." },
      { q: "How is this different from a template website?", a: "We write real code using AI tools. Nothing is drag-and-drop or based on a theme. This means faster load times, better SEO, and 100% freedom to customize — now and in the future." },
      { q: "Can I start small and add more later?", a: "Absolutely. Many clients start with a simple €200 website and add automations, bookings, and ad campaigns over time. We build things so they can always be expanded." },
      { q: "What are your payment terms?", a: "Typically 50% upfront to secure your spot in my calendar, and 50% upon project completion and launch. For larger projects, we can discuss milestone-based payments." },
      { q: "Do you provide hosting and domain registration?", a: "Yes — I can handle everything for you end-to-end: domain registration (.com or any extension), secure hosting setup, SSL, email/domain connection and launch. You can stay hands-off while I deliver it ready to run." },
    ],
  },
  es: {
    backHome: "Volver al inicio",
    viewProfile: "Ver su perfil",
    teamTitle: "El equipo",
    headerBadge: "Servicios Digitales",
    headerTitle: "Transforma tu negocio con",
    headerAccent: "sistemas digitales con IA",
    headerDesc: "Soluciones digitales a medida construidas con inteligencia artificial. Sin plantillas de internet, sin herramientas genéricas. Todo diseñado desde cero para tu negocio concreto.",
    whyDiffBadge: "¿Por qué diferente?",
    whyDiffTitle: "Webs construidas con IA. Sin plantillas.",
    whyDiffSubtitle: "Escribimos código real usando inteligencia artificial. Cada web es única, creada desde cero para tu negocio — no un tema de WordPress ni un constructor de páginas.",
    whyDiffCards: [
      { title: "IA, no plantillas", desc: "Sin temas de WordPress ni constructores genéricos. Cada web es código a medida generado con IA, única para tu marca." },
      { title: "100% personalizable", desc: "Cada color, sección, texto y botón se adapta a tu imagen. Nada es fijo, todo se puede cambiar cuando quieras." },
      { title: "Crece contigo", desc: "Empiezas con lo que necesitas hoy (desde 200€) y añades soluciones a medida que tu negocio las pide." },
      { title: "Sin lock-in", desc: "No hacemos lock al cliente. Si un día quieres seguir por tu cuenta o con otra agencia, te llevas todo lo que construimos. Lo tuyo es tuyo de verdad." },
    ],
    servCatBadge: "Servicios",
    servCatTitle: "Todo lo que podemos construir juntos",
    servCatDesc: "Cada servicio resuelve un problema real de tu negocio. Elige lo que necesitas, combina a medida que creces.",
    serviceFrontTeasers: [
      "Llevemos tu web a otro nivel.",
      "Maneja tus reservas como un profesional.",
      "Haz tu comunicacion mas eficiente.",
      "Organiza tus leads y no pierdas oportunidades.",
      "Atrae mejores clientes con campanas mas inteligentes.",
      "Crea contenido que se vea y convierta mejor.",
      "Mejora mes a mes sin complicaciones.",
      "Aplica IA en tu negocio con un plan claro.",
    ],
    serviceCategories: [
      { name: "Web y presencia digital", items: [
        "Página web / landing profesional de captación de clientes",
        "Web de conversión: botones claros (WhatsApp, llamar, reservar), formularios, testimonios, FAQ, mapa, horarios",
        "SEO local básico + sugerencias IA de keywords/contenido: Google Maps, ficha Google Business, reseñas, palabras clave locales",
        "Optimización de rendimiento: velocidad, core web vitals y experiencia mobile-first",
      ]},
      { name: "Reservas y citas", items: [
        "Sistema de reservas adaptado a tu negocio (Booksy/Fresha o Calendar/Calendly), integrado en la web",
        "Flujo completo: servicios, precios, horarios, staff/agenda, formularios previos, confirmaciones y reprogramación",
        "Menos no-shows con recordatorios asistidos por IA y depósitos/pagos cuando aplica",
        "Confirmaciones automáticas por WhatsApp/email con instrucciones claras para el cliente",
      ]},
      { name: "WhatsApp y comunicación", items: [
        "Botón de WhatsApp con mensaje prellenado y tracking de clics",
        "Asistente IA para FAQs y fuera de horario + menú simple (Reservas, Precios, Ubicación)",
        "Seguimiento automático: recordatorio, enlace para reservar y solicitud de reseña",
        "Diseño de flujo conversacional para filtrar leads antes de que entre tu equipo",
      ]},
      { name: "CRM y gestión de leads", items: [
        "Integración leads → Sheets / Notion / CRM simple",
        "Analítica básica + priorización IA de leads: medir clics a WhatsApp, formularios, reservas — reporte mensual simple",
        "Etapas de pipeline y recordatorios de tareas para no dejar leads sin respuesta",
      ]},
      { name: "Marketing y publicidad", items: [
        "Publicidad digital con creatividades asistidas por IA: campañas en Meta/Instagram, Google Ads (búsqueda local), retargeting básico",
        "Gestión de redes sociales: calendario de contenidos, publicación, stories, respuesta a mensajes",
        "Email marketing básico: promociones, recordatorios, newsletter",
        "Tests A/B de hooks, creatividades y audiencias para mejorar el ROI",
      ]},
      { name: "Diseño y contenido", items: [
        "Diseño gráfico: logo, branding básico, plantillas posts/stories, flyers, tarjetas, menús",
        "Foto/video para negocio: edición, reels simples, fotos de producto/servicio",
        "Copywriting asistido por IA: textos web, descripciones de servicios, anuncios, mensajes WhatsApp, emails",
        "Guía editorial para mantener coherencia visual y verbal en todos tus canales",
      ]},
      { name: "Mantenimiento y crecimiento", items: [
        "Mantenimiento web mensual: cambios de contenido, nuevas secciones, seguridad/actualizaciones, soporte",
        "Optimización continua con insights de IA: mejoras de conversión, nuevos landings por servicio, ajuste de campañas",
        "Roadmap mensual de crecimiento con prioridades basadas en datos reales",
      ]},
      { name: "Asesoramiento IA", items: [
        "Auditoría de procesos para detectar tareas repetitivas y oportunidades de automatización",
        "Recomendación práctica de herramientas IA según tu sector y presupuesto",
        "Plan de implementación por fases + acompañamiento al equipo para que la IA se use de verdad",
        "Biblioteca de prompts y playbooks adaptados a la operativa diaria de tu empresa",
      ]},
    ],
    priceCatBadge: "Catálogo de precios",
    priceCatTitle: "Precios transparentes por servicio",
    priceCatDesc: "Sin sorpresas. Sabes lo que pagas antes de empezar. Precios orientativos — presupuesto gratuito sin compromiso.",
    priceCatalog: [
      { category: "Web y presencia digital", tagline: "Web, landing y visibilidad en Google Maps y buscadores", items: [
        { name: "Web básica (1 pág)", from: "200€" },
        { name: "Landing de conversión", from: "450€" },
        { name: "Web multipágina (hasta 5 págs)", from: "800€" },
        { name: "SEO local (GMB + palabras clave)", from: "150€" },
      ]},
      { category: "Reservas y citas", tagline: "Booksy, Calendly y recordatorios automáticos para reducir no-shows", items: [
        { name: "Setup completo Booksy / Fresha", from: "200€" },
        { name: "Agenda tipo Calendly + formularios", from: "150€" },
        { name: "Recordatorios automáticos", from: "100€" },
        { name: "Depósitos / pagos para citas", from: "120€" },
      ]},
      { category: "WhatsApp", tagline: "Automatiza respuestas, filtra leads y capta clientes 24/7", items: [
        { name: "Botón WhatsApp profesional", from: "80€" },
        { name: "Automatización básica (menús, fuera de horario)", from: "200€" },
        { name: "Secretario de WhatsApp (bot conversacional)", from: "350€" },
        { name: "Seguimiento automático de leads", from: "150€" },
        { name: "Automatización post-servicio", from: "120€" },
      ]},
      { category: "CRM y analítica", tagline: "Rastrea cada lead y mide clics, formularios y reservas", items: [
        { name: "Leads → CRM / Sheets / Notion", from: "150€" },
        { name: "Analítica + reporte mensual", from: "100€" },
      ]},
      { category: "Marketing y diseño", tagline: "Anuncios, gestión de redes sociales e identidad de marca", items: [
        { name: "Setup campañas Meta / Google Ads", from: "200€" },
        { name: "Gestión RRSS (mensual)", from: "200€/mes" },
        { name: "Logo + branding básico", from: "250€" },
        { name: "Copywriting web completo", from: "150€" },
        { name: "Email marketing setup", from: "150€" },
      ]},
      { category: "Mantenimiento", tagline: "Tu web rápida, segura y siempre actualizada con soporte", items: [
        { name: "Mantenimiento mensual básico", from: "59€/mes" },
        { name: "Soporte + optimización mensual", from: "99€/mes" },
      ]},
    ],
    sizeBadge: "Por tamaño",
    sizeTitle: "Crecemos juntos con tu negocio",
    sizeDesc: "Empezamos donde estás. Añadimos soluciones cuando tu negocio las necesita.",
    growTogether: "Una web de 200€ hoy puede convertirse en un sistema completo con reservas, WhatsApp automatizado y publicidad mañana — sin tirar nada. Construimos sobre lo que ya hemos hecho juntos.",
    sinceLabel: "desde",
    mostPopular: "Más solicitado",
    sizes: [
      { label: "Empezando", examples: "Autónomo, freelance, negocio nuevo, marca personal", price: "200 – 450€", badge: "Para arrancar", services: ["Web básica o landing de captación", "Botón WhatsApp profesional", "Ficha de Google Business", "Diseño y textos incluidos"], popular: false },
      { label: "Pequeño negocio", examples: "Peluquería, bar, clínica, esteticista, tienda local", price: "450 – 900€", badge: "Más solicitado", services: ["Web de conversión (formulario, mapa, horarios, WhatsApp)", "Setup reservas completo (Booksy / Fresha / Calendly)", "SEO local básico + Google Maps", "Recordatorios automáticos para citas", "Botón WhatsApp con tracking"], popular: true },
      { label: "Negocio consolidado", examples: "Clínica, consultoría, academia, restaurante con equipo", price: "900 – 1.800€", badge: "Sistema completo", services: ["Web multipágina con secciones personalizadas", "Automatización WhatsApp (menús + respuestas automáticas)", "CRM simple + seguimiento de leads", "Analítica completa (GA4 + píxeles)", "Branding + plantillas redes sociales"], popular: false },
      { label: "En expansión", examples: "Equipo creciente, varios servicios, publicidad activa", price: "1.800€+", badge: "Máximo impacto", services: ["Todo lo anterior", "Campañas Meta / Google Ads + retargeting", "Secretario de WhatsApp (bot conversacional)", "Email marketing + automatizaciones avanzadas", "30 días soporte post-lanzamiento"], popular: false },
    ],
    processBadge: "Proceso",
    processTitle: "Cómo funciona",
    processSteps: [
      { title: "Auditoría y objetivos", desc: "Identificamos los cuellos de botella y definimos objetivos claros." },
      { title: "Construcción e integración", desc: "Diseñamos activos y conectamos sistemas sin fricciones." },
      { title: "Lanzamiento y optimización", desc: "Salimos en vivo, medimos el rendimiento y refinamos las conversiones." },
    ],
    ctaTitle: "¿Listo para escalar tu negocio?",
    ctaDesc: "Deja de perder horas en tareas manuales. Construyamos un sistema que trabaje por ti 24/7.",
    ctaWhatsApp: "Hablemos por WhatsApp",
    ctaBook: "Reserva una llamada",
    ctaFooter: "Entregas rápidas • Comunicación clara • Resultados prácticos",
    lastPlanNote: "Plan a medida para tu siguiente etapa",
    caseNoticeTitle: "Hablemos de tu caso",
    caseNoticeDesc: "Puedes llamarnos en cualquier momento.",
    callNow: "Llamar ahora",
    faqBadge: "FAQ",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Qué necesitas de mí para empezar?", a: "Necesitaré tus activos de marca (logo, colores), textos o fotos existentes, y acceso a tu dominio/hosting actual si lo tienes. Lo repasamos todo en nuestra llamada inicial." },
      { q: "¿Cómo es diferente a una web con plantilla?", a: "Escribimos código real usando herramientas de IA. Nada es de arrastrar y soltar ni está basado en un tema. Eso significa cargas más rápidas, mejor SEO y 100% de libertad para personalizar — ahora y en el futuro." },
      { q: "¿Puedo empezar pequeño y añadir más después?", a: "Completamente. Muchos clientes empiezan con una web sencilla de 200€ y van añadiendo automatizaciones, reservas y campañas de publicidad con el tiempo. Construimos las cosas para que siempre se puedan expandir." },
      { q: "¿Cuáles son tus condiciones de pago?", a: "Normalmente 50% por adelantado para reservar tu hueco en mi agenda, y 50% al completar y lanzar el proyecto. Para proyectos grandes podemos hablar de pagos por hitos." },
      { q: "¿Proporcionas hosting y registro de dominio?", a: "Sí: me encargo de todo de punta a punta. Registro tu dominio (.com o la extensión que quieras), configuro hosting seguro, SSL, conexión de correo/dominio y lo dejo todo publicado y funcionando. Tú no te complicas con la parte técnica." },
    ],
  },
  ca: {
    backHome: "Tornar a l'inici",
    viewProfile: "Veure el seu perfil",
    teamTitle: "L'equip",
    headerBadge: "Serveis Digitals",
    headerTitle: "Transforma el teu negoci amb",
    headerAccent: "sistemes digitals amb IA",
    headerDesc: "Solucions digitals a mida construïdes amb intel·ligència artificial. Sense plantilles d'internet, sense eines genèriques. Tot dissenyat des de zero per al teu negoci concret.",
    whyDiffBadge: "Per què diferent?",
    whyDiffTitle: "Webs construïdes amb IA. Sense plantilles.",
    whyDiffSubtitle: "Escrivim codi real usant intel·ligència artificial. Cada web és única, creada des de zero per al teu negoci — no un tema de WordPress ni un constructor de pàgines.",
    whyDiffCards: [
      { title: "IA, no plantilles", desc: "Sense temes de WordPress ni constructors genèrics. Cada web és codi a mida generat amb IA, única per a la teva marca." },
      { title: "100% personalitzable", desc: "Cada color, secció, text i botó s'adapta a la teva imatge. Res és fix, tot es pot canviar quan vulguis." },
      { title: "Creix amb tu", desc: "Comences amb el que necessites avui (des de 200€) i afegeixes solucions a mesura que el teu negoci les demana." },
      { title: "Sense lock-in", desc: "No fem lock al client. Si algun dia vols continuar pel teu compte o amb una altra agència, t'endús tot el que hem construït. El que és teu és teu de veritat." },
    ],
    servCatBadge: "Serveis",
    servCatTitle: "Tot el que podem construir junts",
    servCatDesc: "Cada servei resol un problema real del teu negoci. Tria el que necessites, combina a mesura que creixes.",
    serviceFrontTeasers: [
      "Portem la teva web a un altre nivell.",
      "Gestiona les reserves com un professional.",
      "Fes la comunicacio mes eficient.",
      "Organitza els leads i no perdis oportunitats.",
      "Atrau millors clients amb campanyes mes intel.ligents.",
      "Crea contingut que llueixi i converteixi millor.",
      "Millora cada mes sense complicacions.",
      "Aplica IA al negoci amb un pla clar.",
    ],
    serviceCategories: [
      { name: "Web i presència digital", items: [
        "Pàgina web / landing professional de captació de clients",
        "Web de conversió: botons clars (WhatsApp, trucar, reservar), formularis, testimonis, FAQ, mapa, horaris",
        "SEO local bàsic + suggeriments IA de paraules clau/contingut: Google Maps, fitxa Google Business, ressenyes, paraules clau locals",
        "Optimització de rendiment: velocitat, core web vitals i experiència mobile-first",
      ]},
      { name: "Reserves i cites", items: [
        "Sistema de reserves adaptat al teu negoci (Booksy/Fresha o Calendar/Calendly), integrat a la web",
        "Flux complet: serveis, preus, horaris, staff/agenda, formularis previs, confirmacions i reprogramació",
        "Menys no-shows amb recordatoris assistits per IA i dipòsits/pagaments quan cal",
        "Confirmacions automàtiques per WhatsApp/email amb instruccions clares per al client",
      ]},
      { name: "WhatsApp i comunicació", items: [
        "Botó de WhatsApp amb missatge preomplert i tracking de clics",
        "Assistent IA per a FAQs i fora d'horari + menú simple (Reserves, Preus, Ubicació)",
        "Seguiment automàtic: recordatori, enllaç per reservar i sol·licitud de ressenya",
        "Disseny del flux conversacional per filtrar leads abans que entri l'equip",
      ]},
      { name: "CRM i gestió de leads", items: [
        "Integració leads → Sheets / Notion / CRM simple",
        "Analítica bàsica + priorització IA de leads: mesurar clics a WhatsApp, formularis, reserves — informe mensual simple",
        "Etapes de pipeline i recordatoris de tasques per no deixar leads sense resposta",
      ]},
      { name: "Màrqueting i publicitat", items: [
        "Publicitat digital amb creativitats assistides per IA: campanyes a Meta/Instagram, Google Ads (cerca local), retargeting bàsic",
        "Gestió de xarxes socials: calendari de continguts, publicació, stories, resposta a missatges",
        "Email màrqueting bàsic: promocions, recordatoris, newsletter",
        "Tests A/B d'angles, creativitats i audiències per millorar el ROI",
      ]},
      { name: "Disseny i contingut", items: [
        "Disseny gràfic: logo, branding bàsic, plantilles posts/stories, flyers, targetes, menús",
        "Foto/vídeo per a negoci: edició, reels simples, fotos de producte/servei",
        "Copywriting assistit per IA: textos web, descripcions de serveis, anuncis, missatges WhatsApp, emails",
        "Guia editorial per mantenir coherència visual i verbal a tots els canals",
      ]},
      { name: "Manteniment i creixement", items: [
        "Manteniment web mensual: canvis de contingut, noves seccions, seguretat/actualitzacions, suport",
        "Optimització contínua amb insights d'IA: millores de conversió, nous landings per servei, ajust de campanyes",
        "Roadmap mensual de creixement amb prioritats basades en dades reals",
      ]},
      { name: "Assessorament IA", items: [
        "Auditoria de processos per detectar tasques repetitives i oportunitats d'automatització",
        "Recomanació pràctica d'eines d'IA segons el teu sector i pressupost",
        "Pla d'implementació per fases + acompanyament a l'equip perquè la IA s'adopti de debò",
        "Biblioteca de prompts i playbooks adaptats a l'operativa diària de l'empresa",
      ]},
    ],
    priceCatBadge: "Catàleg de preus",
    priceCatTitle: "Preus transparents per servei",
    priceCatDesc: "Sense sorpreses. Saps el que pagues abans de començar. Pressupost gratuït sense compromís.",
    priceCatalog: [
      { category: "Web i presència digital", tagline: "Web, landing i visibilitat a Google Maps i cercadors", items: [
        { name: "Web bàsica (1 pàg)", from: "200€" },
        { name: "Landing de conversió", from: "450€" },
        { name: "Web multipàgina (fins a 5 pàgs)", from: "800€" },
        { name: "SEO local (GMB + paraules clau)", from: "150€" },
      ]},
      { category: "Reserves i cites", tagline: "Booksy, Calendly i recordatoris automàtics per reduir no-shows", items: [
        { name: "Setup complet Booksy / Fresha", from: "200€" },
        { name: "Agenda tipus Calendly + formularis", from: "150€" },
        { name: "Recordatoris automàtics", from: "100€" },
        { name: "Dipòsits / pagaments per a cites", from: "120€" },
      ]},
      { category: "WhatsApp", tagline: "Automatitza respostes, filtra leads i capta clients 24/7", items: [
        { name: "Botó WhatsApp professional", from: "80€" },
        { name: "Automatització bàsica (menús, fora d'horari)", from: "200€" },
        { name: "Secretari de WhatsApp (bot conversacional)", from: "350€" },
        { name: "Seguiment automàtic de leads", from: "150€" },
        { name: "Automatització post-servei", from: "120€" },
      ]},
      { category: "CRM i analítica", tagline: "Rastreja cada lead i mesura clics, formularis i reserves", items: [
        { name: "Leads → CRM / Sheets / Notion", from: "150€" },
        { name: "Analítica + informe mensual", from: "100€" },
      ]},
      { category: "Màrqueting i disseny", tagline: "Anuncis, gestió de xarxes socials i identitat de marca", items: [
        { name: "Setup campanyes Meta / Google Ads", from: "200€" },
        { name: "Gestió RRSS (mensual)", from: "200€/mes" },
        { name: "Logo + branding bàsic", from: "250€" },
        { name: "Copywriting web complet", from: "150€" },
        { name: "Email màrqueting setup", from: "150€" },
      ]},
      { category: "Manteniment", tagline: "La teva web ràpida, segura i sempre actualitzada amb suport", items: [
        { name: "Manteniment mensual bàsic", from: "59€/mes" },
        { name: "Suport + optimització mensual", from: "99€/mes" },
      ]},
    ],
    sizeBadge: "Per mida",
    sizeTitle: "Creixem junts amb el teu negoci",
    sizeDesc: "Comencem on ets. Afegim solucions quan el teu negoci les necessita.",
    growTogether: "Una web de 200€ avui pot convertir-se en un sistema complet amb reserves, WhatsApp automatitzat i publicitat demà — sense tirar res. Construïm sobre el que ja hem fet junts.",
    sinceLabel: "des de",
    mostPopular: "Més sol·licitat",
    sizes: [
      { label: "Començant", examples: "Autònom, freelance, negoci nou, marca personal", price: "200 – 450€", badge: "Per arrencar", services: ["Web bàsica o landing de captació", "Botó WhatsApp professional", "Fitxa de Google Business", "Disseny i textos inclosos"], popular: false },
      { label: "Petit negoci", examples: "Perruqueria, bar, clínica, esteticista, botiga local", price: "450 – 900€", badge: "Més sol·licitat", services: ["Web de conversió (formulari, mapa, horaris, WhatsApp)", "Setup reserves complet (Booksy / Fresha / Calendly)", "SEO local bàsic + Google Maps", "Recordatoris automàtics per a cites", "Botó WhatsApp amb tracking"], popular: true },
      { label: "Negoci consolidat", examples: "Clínica, consultoria, acadèmia, restaurant amb equip", price: "900 – 1.800€", badge: "Sistema complet", services: ["Web multipàgina amb seccions personalitzades", "Automatització WhatsApp (menús + respostes automàtiques)", "CRM simple + seguiment de leads", "Analítica completa (GA4 + píxels)", "Branding + plantilles xarxes socials"], popular: false },
      { label: "En expansió", examples: "Equip creixent, diversos serveis, publicitat activa", price: "1.800€+", badge: "Màxim impacte", services: ["Tot l'anterior", "Campanyes Meta / Google Ads + retargeting", "Secretari de WhatsApp (bot conversacional)", "Email màrqueting + automatitzacions avançades", "30 dies suport post-llançament"], popular: false },
    ],
    processBadge: "Procés",
    processTitle: "Com funciona",
    processSteps: [
      { title: "Auditoria i objectius", desc: "Identifiquem els colls d'ampolla i definim objectius clars." },
      { title: "Construcció i integració", desc: "Dissenyem actius i connectem sistemes sense friccions." },
      { title: "Llançament i optimització", desc: "Sortim en viu, mesurem el rendiment i refinem les conversions." },
    ],
    ctaTitle: "Llest per escalar el teu negoci?",
    ctaDesc: "Deixa de perdre hores en tasques manuals. Construïm un sistema que treballi per tu 24/7.",
    ctaWhatsApp: "Parlem per WhatsApp",
    ctaBook: "Reserva una trucada",
    ctaFooter: "Entregues ràpides • Comunicació clara • Resultats pràctics",
    lastPlanNote: "Pla a mida per a la teva etapa següent",
    caseNoticeTitle: "Parlem del teu cas",
    caseNoticeDesc: "Ens pots trucar en qualsevol moment.",
    callNow: "Trucar ara",
    faqBadge: "FAQ",
    faqTitle: "Preguntes freqüents",
    faqs: [
      { q: "Què necessites de mi per començar?", a: "Necessitaré els teus actius de marca (logo, colors), textos o fotos existents, i accés al teu domini/hosting actual si en tens. Ho repassem tot a la nostra trucada inicial." },
      { q: "Com és diferent d'una web amb plantilla?", a: "Escrivim codi real usant eines d'IA. Res és d'arrossegar i soltar ni basat en un tema. Això significa càrregues més ràpides, millor SEO i 100% de llibertat per personalitzar — ara i en el futur." },
      { q: "Puc començar petit i afegir més endavant?", a: "Completament. Molts clients comencen amb una web senzilla de 200€ i van afegint automatitzacions, reserves i campanyes de publicitat amb el temps. Construïm les coses per poder-les expandir sempre." },
      { q: "Quines són les teves condicions de pagament?", a: "Normalment 50% per avançat per reservar el teu lloc a la meva agenda, i 50% en completar i llançar el projecte. Per a projectes grans podem parlar de pagaments per fites." },
      { q: "Proporciones hosting i registre de domini?", a: "Sí: m'encarrego de tot de punta a punta. Registro el teu domini (.com o l'extensió que vulguis), configuro un hosting segur, SSL, connexió de correu/domini i ho deixo tot publicat i funcionant." },
    ],
  },
  it: {
    backHome: "Torna alla home",
    viewProfile: "Vedi il suo profilo",
    teamTitle: "Il team",
    headerBadge: "Servizi Digitali",
    headerTitle: "Trasforma il tuo business con",
    headerAccent: "sistemi digitali con IA",
    headerDesc: "Soluzioni digitali su misura costruite con intelligenza artificiale. Nessun template da internet, nessuno strumento generico. Tutto progettato da zero per il tuo business specifico.",
    whyDiffBadge: "Perché diverso?",
    whyDiffTitle: "Siti costruiti con IA. Non template.",
    whyDiffSubtitle: "Scriviamo codice vero usando l'intelligenza artificiale. Ogni sito è unico, creato da zero per il tuo business — non un tema WordPress né un page builder.",
    whyDiffCards: [
      { title: "IA, non template", desc: "Nessun tema WordPress né costruttore generico. Ogni sito è codice personalizzato generato con IA, unico per il tuo brand." },
      { title: "100% personalizzabile", desc: "Ogni colore, sezione, testo e pulsante si adatta alla tua immagine. Niente è fisso, tutto può cambiare quando vuoi." },
      { title: "Cresce con te", desc: "Inizi con ciò che ti serve oggi (da 200€) e aggiungi soluzioni man mano che il tuo business le richiede." },
      { title: "Nessun lock-in", desc: "Non facciamo lock-in al cliente. Se un giorno vuoi continuare da solo o con un'altra agenzia, puoi portare via tutto ciò che abbiamo costruito. Ciò che è tuo è davvero tuo." },
    ],
    servCatBadge: "Servizi",
    servCatTitle: "Tutto quello che possiamo costruire insieme",
    servCatDesc: "Ogni servizio risolve un problema reale del tuo business. Scegli ciò che ti serve, combina man mano che cresci.",
    serviceFrontTeasers: [
      "Portiamo il tuo sito a un altro livello.",
      "Gestisci le prenotazioni come un professionista.",
      "Rendi la comunicazione piu efficiente.",
      "Organizza i lead e non perdere opportunita.",
      "Attira clienti migliori con campagne piu intelligenti.",
      "Crea contenuti che colpiscono e convertono meglio.",
      "Migliora ogni mese senza complicazioni.",
      "Applica l'IA al business con un piano chiaro.",
    ],
    serviceCategories: [
      { name: "Web e presenza digitale", items: [
        "Sito web / landing professionale per acquisizione clienti",
        "Web di conversione: bottoni chiari (WhatsApp, chiamare, prenotare), moduli, testimonianze, FAQ, mappa, orari",
        "SEO locale base + suggerimenti IA per keyword/contenuti: Google Maps, scheda Google Business, recensioni, parole chiave locali",
        "Ottimizzazione performance: velocità, core web vitals ed esperienza mobile-first",
      ]},
      { name: "Prenotazioni e appuntamenti", items: [
        "Sistema di prenotazione adatto al tuo business (Booksy/Fresha o Calendar/Calendly), integrato nel sito",
        "Flusso completo: servizi, prezzi, orari, staff/agenda, moduli preliminari, conferme e riprogrammazione",
        "Meno no-show con promemoria assistiti da IA e depositi/pagamenti quando necessario",
        "Conferme automatiche via WhatsApp/email con istruzioni chiare per il cliente",
      ]},
      { name: "WhatsApp e comunicazione", items: [
        "Pulsante WhatsApp con messaggio precompilato e tracking dei clic",
        "Assistente IA per FAQ e fuori orario + menu semplice (Prenotazioni, Prezzi, Posizione)",
        "Follow-up automatico: promemoria, link prenotazione e richiesta recensione",
        "Design del flusso conversazionale per qualificare i lead prima del team",
      ]},
      { name: "CRM e gestione lead", items: [
        "Integrazione lead → Sheets / Notion / CRM semplice",
        "Analytics base + prioritizzazione IA dei lead: misurare clic a WhatsApp, moduli, prenotazioni — report mensile semplice",
        "Stadi pipeline e promemoria attività per non lasciare lead senza risposta",
      ]},
      { name: "Marketing e pubblicità", items: [
        "Pubblicità digitale con creatività assistite da IA: campagne Meta/Instagram, Google Ads (ricerca locale), retargeting base",
        "Gestione social media: calendario contenuti, pubblicazione, stories, risposta messaggi",
        "Email marketing base: promozioni, promemoria, newsletter",
        "Test A/B su angoli, creatività e audience per migliorare il ROI",
      ]},
      { name: "Design e contenuto", items: [
        "Grafica: logo, branding base, template post/stories, volantini, biglietti, menù",
        "Foto/video per business: editing, reel semplici, foto prodotti/servizi",
        "Copywriting assistito da IA: testi web, descrizioni servizi, annunci, messaggi WhatsApp, email",
        "Linee guida editoriali per mantenere coerenza visiva e verbale su tutti i canali",
      ]},
      { name: "Manutenzione e crescita", items: [
        "Manutenzione web mensile: modifiche contenuto, nuove sezioni, sicurezza/aggiornamenti, supporto",
        "Ottimizzazione continua con insight IA: miglioramenti conversione, nuove landing, aggiustamento campagne",
        "Roadmap mensile di crescita con priorità basate su dati reali",
      ]},
      { name: "Consulenza IA", items: [
        "Audit dei processi per individuare attività ripetitive e opportunità di automazione",
        "Raccomandazione pratica di strumenti IA in base a settore e budget",
        "Piano di implementazione a fasi + affiancamento al team per un'adozione reale",
        "Libreria di prompt e playbook su misura per l'operatività quotidiana",
      ]},
    ],
    priceCatBadge: "Listino prezzi",
    priceCatTitle: "Prezzi trasparenti per servizio",
    priceCatDesc: "Nessuna sorpresa. Sai cosa paghi prima di iniziare. Preventivo gratuito senza impegno.",
    priceCatalog: [
      { category: "Web e presenza digitale", tagline: "Sito, landing e visibilità su Google Maps e nei motori di ricerca", items: [
        { name: "Sito base (1 pag)", from: "200€" },
        { name: "Landing di conversione", from: "450€" },
        { name: "Sito multipagina (fino a 5 pag)", from: "800€" },
        { name: "SEO locale (GMB + parole chiave)", from: "150€" },
      ]},
      { category: "Prenotazioni e appuntamenti", tagline: "Booksy, Calendly e promemoria automatici per ridurre i no-show", items: [
        { name: "Setup completo Booksy / Fresha", from: "200€" },
        { name: "Agenda tipo Calendly + moduli", from: "150€" },
        { name: "Promemoria automatici", from: "100€" },
        { name: "Depositi / pagamenti per appuntamenti", from: "120€" },
      ]},
      { category: "WhatsApp", tagline: "Automatizza risposte, filtra lead e acquisisci clienti 24/7", items: [
        { name: "Pulsante WhatsApp professionale", from: "80€" },
        { name: "Automazione base (menu, fuori orario)", from: "200€" },
        { name: "Segretario WhatsApp (bot conversazionale)", from: "350€" },
        { name: "Follow-up automatico lead", from: "150€" },
        { name: "Automazione post-servizio", from: "120€" },
      ]},
      { category: "CRM e analytics", tagline: "Traccia ogni lead e misura clic, moduli e prenotazioni", items: [
        { name: "Lead → CRM / Sheets / Notion", from: "150€" },
        { name: "Analytics + report mensile", from: "100€" },
      ]},
      { category: "Marketing e design", tagline: "Annunci, gestione social media e identità di brand", items: [
        { name: "Setup campagne Meta / Google Ads", from: "200€" },
        { name: "Gestione social (mensile)", from: "200€/mese" },
        { name: "Logo + branding base", from: "250€" },
        { name: "Copywriting web completo", from: "150€" },
        { name: "Email marketing setup", from: "150€" },
      ]},
      { category: "Manutenzione", tagline: "Il tuo sito veloce, sicuro e sempre aggiornato con supporto", items: [
        { name: "Manutenzione mensile base", from: "59€/mese" },
        { name: "Supporto + ottimizzazione mensile", from: "99€/mese" },
      ]},
    ],
    sizeBadge: "Per dimensione",
    sizeTitle: "Cresciamo insieme con il tuo business",
    sizeDesc: "Partiamo da dove sei. Aggiungiamo soluzioni quando il tuo business ne ha bisogno.",
    growTogether: "Un sito da 200€ oggi può diventare un sistema completo con prenotazioni, WhatsApp automatizzato e pubblicità domani — senza buttare via niente. Costruiamo sopra quello che abbiamo già fatto insieme.",
    sinceLabel: "da",
    mostPopular: "Più richiesto",
    sizes: [
      { label: "Iniziando", examples: "Freelancer, libero professionista, nuovo business, personal brand", price: "200 – 450€", badge: "Per partire", services: ["Sito base o landing di acquisizione", "Pulsante WhatsApp professionale", "Scheda Google Business", "Design e testi inclusi"], popular: false },
      { label: "Piccola impresa", examples: "Parrucchiere, bar, clinica, estetista, negozio locale", price: "450 – 900€", badge: "Più richiesto", services: ["Web di conversione (modulo, mappa, orari, WhatsApp)", "Setup prenotazioni completo (Booksy / Fresha / Calendly)", "SEO locale base + Google Maps", "Promemoria automatici per appuntamenti", "Pulsante WhatsApp con tracking"], popular: true },
      { label: "Business consolidato", examples: "Clinica, consulenza, accademia, ristorante con staff", price: "900 – 1.800€", badge: "Sistema completo", services: ["Sito multipagina con sezioni personalizzate", "Automazione WhatsApp (menu + risposte automatiche)", "CRM semplice + tracciamento lead", "Analytics completa (GA4 + pixel)", "Branding + template social media"], popular: false },
      { label: "In espansione", examples: "Team in crescita, più servizi, pubblicità attiva", price: "1.800€+", badge: "Massimo impatto", services: ["Tutto il precedente", "Campagne Meta / Google Ads + retargeting", "Segretario WhatsApp (bot conversazionale)", "Email marketing + automazioni avanzate", "30 giorni supporto post-lancio"], popular: false },
    ],
    processBadge: "Processo",
    processTitle: "Come funziona",
    processSteps: [
      { title: "Audit e obiettivi", desc: "Mappiamo i colli di bottiglia e definiamo obiettivi chiari." },
      { title: "Costruzione e integrazione", desc: "Progettiamo asset e colleghiamo i sistemi senza attriti." },
      { title: "Lancio e ottimizzazione", desc: "Andiamo live, monitoriamo le performance e raffiniamo le conversioni." },
    ],
    ctaTitle: "Pronto a scalare il tuo business?",
    ctaDesc: "Smetti di perdere ore in attività manuali. Costruiamo un sistema che lavora per te 24/7.",
    ctaWhatsApp: "Parliamo su WhatsApp",
    ctaBook: "Prenota una chiamata",
    ctaFooter: "Tempi rapidi • Comunicazione chiara • Risultati pratici",
    lastPlanNote: "Piano su misura per la tua prossima fase",
    caseNoticeTitle: "Parliamo del tuo caso",
    caseNoticeDesc: "Puoi chiamarci in qualsiasi momento.",
    callNow: "Chiama ora",
    faqBadge: "FAQ",
    faqTitle: "Domande frequenti",
    faqs: [
      { q: "Di cosa hai bisogno da me per iniziare?", a: "Avrò bisogno dei tuoi asset di brand (logo, colori), testi o foto esistenti, e accesso al tuo dominio/hosting attuale se li hai. Copriamo tutto nella nostra chiamata iniziale." },
      { q: "Come è diverso da un sito con template?", a: "Scriviamo codice vero usando strumenti di IA. Niente è drag-and-drop né basato su un tema. Questo significa caricamenti più veloci, SEO migliore e 100% di libertà per personalizzare — ora e in futuro." },
      { q: "Posso iniziare in piccolo e aggiungere dopo?", a: "Assolutamente. Molti clienti iniziano con un sito semplice da 200€ e aggiungono automazioni, prenotazioni e campagne pubblicitarie nel tempo. Costruiamo le cose in modo che possano sempre essere espanse." },
      { q: "Quali sono le tue condizioni di pagamento?", a: "Di solito 50% in anticipo per prenotare il tuo posto in agenda, e 50% al completamento e lancio del progetto. Per progetti più grandi possiamo discutere pagamenti per milestone." },
      { q: "Fornisci hosting e registrazione dominio?", a: "Sì: posso gestire tutto end-to-end. Registro il tuo dominio (.com o qualsiasi estensione), configuro hosting sicuro, SSL, collegamento email/dominio e metto online il sito pronto all'uso, senza stress tecnico per te." },
    ],
  },
};

// --- FAQ ITEM ---
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed">{answer}</div>
      </motion.div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function DigitalTransformation() {
  const [language, setLanguage] = useState<Language>("es");
  const [langBubbleOpen, setLangBubbleOpen] = useState(false);
  const languageReadyRef = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("language") as Language | null;
    if (saved && saved in t) setLanguage(saved);
    languageReadyRef.current = true;
  }, []);

  useEffect(() => {
    if (!languageReadyRef.current) return;
    window.localStorage.setItem("language", language);
  }, [language]);

  const lang = t[language];
  const serviceCardHeight = Math.min(
    360,
    Math.max(290, Math.max(...lang.serviceCategories.map((cat) => cat.items.length)) * 48 + 115),
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <AuroraBackground />
      <BackgroundBeams />
      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          position: relative;
          overflow: hidden;
          transition: transform 280ms cubic-bezier(0.22,1,0.36,1), border-color 280ms ease, box-shadow 280ms ease, background-color 280ms ease;
        }
        .glass-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 10px 28px rgba(0,0,0,0.14);
        }
        .glass-card.overflow-visible {
          overflow: visible;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          border-bottom: 1px dotted rgba(255,255,255,0.07);
          gap: 8px;
        }
        .price-row:last-child { border-bottom: none; }
      `}</style>

      <main className="relative z-10 flex-1 py-8 px-3 sm:px-4 lg:px-6">

        {/* ── HEADER ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.headerBadge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                {lang.headerTitle}{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {lang.headerAccent}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed"
              >
                {lang.headerDesc}
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* ── WHY DIFFERENT ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary font-medium"
              >
                {lang.whyDiffBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.whyDiffTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground md:text-lg/relaxed"
              >
                {lang.whyDiffSubtitle}
              </motion.p>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {lang.whyDiffCards.map((card, idx) => {
                const Icon = whyDiffIcons[idx];
                const iconStyle = whyDiffIconStyles[idx] ?? whyDiffIconStyles[0];
                return (
                  <motion.div key={idx} variants={itemFadeIn}>
                    <GlowCard
                      customSize
                      glowColor={iconStyle.glow}
                      className="w-full h-full p-6 rounded-3xl"
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-11 h-11 rounded-2xl ${iconStyle.bg} flex items-center justify-center mb-4`}>
                          <Icon className={`w-5 h-5 ${iconStyle.icon}`} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* ── SERVICES BY CATEGORY ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.servCatBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.servCatTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground"
              >
                {lang.servCatDesc}
              </motion.p>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {lang.serviceCategories.map((cat, idx) => {
                const Icon = serviceCategoryIcons[idx] ?? Globe;
                const iconStyle = serviceCategoryIconStyles[idx] ?? serviceCategoryIconStyles[0];
                const frontSummary = cat.items[0];
                const frontTeaser = lang.serviceFrontTeasers?.[idx] ?? frontSummary;
                const compactBackCardIndexes = new Set([0, 1, 4, 7]);
                const backItems = compactBackCardIndexes.has(idx) ? cat.items.slice(0, 3) : cat.items;
                return (
                  <motion.div key={idx} variants={itemFadeIn}>
                    <FlipCard
                      height={serviceCardHeight}
                      front={
                        <div className="glass-card rounded-3xl p-5 w-full h-full flex flex-col items-center text-center relative">
                          <div className="flex flex-col items-center gap-3">
                            <div className={`w-14 h-14 rounded-2xl ${iconStyle.bg} flex items-center justify-center`}>
                              <Icon className={`w-7 h-7 ${iconStyle.icon}`} />
                            </div>
                            <h3 className="text-sm font-bold leading-tight">{cat.name}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{frontTeaser}</p>
                          </div>
                          <div className="pointer-events-none absolute bottom-3 right-3 hidden h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-background/70 text-base leading-none text-muted-foreground/95 backdrop-blur-sm md:flex">
                            <Pointer className="h-4 w-4" />
                          </div>
                        </div>
                      }
                      back={
                        <div className="glass-card rounded-3xl p-5 w-full h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-7 h-7 rounded-xl ${iconStyle.bgSoft} flex items-center justify-center shrink-0`}>
                              <Icon className={`w-3.5 h-3.5 ${iconStyle.icon}`} />
                            </div>
                            <h3 className={`text-xs font-bold uppercase tracking-wider ${iconStyle.title}`}>{cat.name}</h3>
                          </div>
                          <ul className="space-y-1.5 overflow-hidden">
                            {backItems.map((item, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                                <Check className={`w-3 h-3 mt-0.5 shrink-0 ${iconStyle.icon}`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* ── TRANSPARENT PRICE CATALOG ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.priceCatBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.priceCatTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground"
              >
                {lang.priceCatDesc}
              </motion.p>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {lang.priceCatalog.map((cat, idx) => (
                <motion.div key={idx} variants={itemFadeIn}>
                  <FlipCard
                    height={270}
                    front={
                      <div className="glass-card rounded-3xl p-6 w-full h-full flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-black leading-tight mb-2">{cat.category}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{cat.tagline}</p>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-muted-foreground">{lang.sinceLabel}:</span>
                          <span className="bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-lg font-black text-transparent">{cat.items[0]?.from}</span>
                        </div>
                      </div>
                    }
                    back={
                      <div className="glass-card rounded-3xl p-5 w-full h-full flex flex-col">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{cat.category}</h4>
                        <div className="overflow-y-auto flex-1">
                          {cat.items.map((item, iIdx) => (
                            <div key={iIdx} className="price-row">
                              <span className="text-xs text-muted-foreground">{item.name}</span>
                              <span className="bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-xs font-bold tabular-nums shrink-0 text-transparent">{item.from}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
            <p className="text-center text-xs text-muted-foreground/60 mt-6">
              * Precios orientativos desde. Presupuesto personalizado gratuito sin compromiso.
            </p>
          </motion.div>
        </section>

        {/* ── PRICING BY COMPANY SIZE ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.sizeBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.sizeTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground"
              >
                {lang.sizeDesc}
              </motion.p>
            </div>
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {lang.sizes.map((size, idx) => {
                const Icon = sizeIcons[idx];
                const iconStyle = sizeIconStyles[idx] ?? sizeIconStyles[0];
                return (
                  <motion.div key={idx} variants={itemFadeIn} className="relative h-full">
                    {size.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {lang.mostPopular}
                      </span>
                    )}
                    <GlowCard
                      customSize
                      glowColor={iconStyle.glow}
                      className={`w-full h-full flex flex-col p-6 rounded-3xl ${size.popular ? "ring-1 ring-primary" : ""}`}
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconStyle.bg}`}>
                            <Icon className={`w-4 h-4 ${iconStyle.icon}`} />
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">{size.badge}</span>
                            <h3 className="text-base font-bold leading-tight">{size.label}</h3>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{size.examples}</p>
                        <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                          {size.price}
                        </div>
                        <ul className="space-y-2 flex-1">
                          {size.services.map((svc, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${iconStyle.icon}`} />
                              {svc}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 space-y-3">
                          <Button size="sm" className="w-full rounded-2xl bg-green-600 text-white hover:bg-green-700" asChild>
                            <a href={getPackageWhatsAppUrl(size.label, packageCtaLabels[idx] ?? "Quiero comenzar!")} target="_blank" rel="noreferrer">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {packageCtaLabels[idx] ?? "Quiero comenzar!"}
                            </a>
                          </Button>
                          <div className="h-5 border-t border-white/10 pt-3 flex items-center gap-1 text-xs text-muted-foreground/50">
                            {idx < lang.sizes.length - 1 ? (
                              <>
                                <ArrowRight className="w-3 h-3 shrink-0" />
                                <span>+ {lang.sizes[idx + 1].label}</span>
                              </>
                            ) : (
                              <span>{lang.lastPlanNote}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <GlowCard customSize glowColor="blue" className="w-full p-6 rounded-3xl text-center">
                <div className="relative z-10">
                  <p className="text-base font-semibold text-foreground">{lang.caseNoticeTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{lang.caseNoticeDesc}</p>
                  <Button size="sm" className="mt-4 rounded-2xl" asChild>
                    <a href="tel:+34644583808">
                      <Phone className="mr-2 h-4 w-4" />
                      {lang.callNow} · 644 583808
                    </a>
                  </Button>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.processBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.processTitle}
              </motion.h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-muted">
                <motion.div
                  className="h-full bg-primary/50 origin-left"
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              {lang.processSteps.map((step, idx) => (
                <motion.div
                  key={idx} variants={itemFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="flex flex-col items-center text-center mb-10 md:mb-0 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-4 relative z-10 shadow-sm">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── TEAM ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{lang.teamTitle}</h2>
            </div>
            <div className="mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/" className="glass-card group block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src="/foto.jpeg" alt="Franco" fill className="object-cover object-top" />
                </div>
                <p className="mt-4 text-2xl font-semibold">Franco</p>
                <p className="mt-1 text-sm text-muted-foreground">Developer & AI Specialist</p>
                <div className="mt-2 inline-flex items-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {lang.viewProfile}
                </div>
              </Link>
              <div className="glass-card block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src="/ines.jfif" alt="Ines" fill className="object-cover object-top" />
                </div>
                <p className="mt-4 text-2xl font-semibold">Ines</p>
                <p className="mt-1 text-sm text-muted-foreground">Diseñadora UX/UI</p>
              </div>
              <div className="glass-card block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src="/marco.png" alt="Marco" fill className="object-cover object-top" />
                </div>
                <p className="mt-4 text-2xl font-semibold">Marco</p>
                <p className="mt-1 text-sm text-muted-foreground">Project Manager</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-primary/30 rounded-3xl bg-gradient-to-br from-primary/10 to-muted/30 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6"
              >
                {lang.ctaTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {lang.ctaDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" className="rounded-3xl bg-green-600 hover:bg-green-700 text-white" asChild>
                  <a href="https://wa.me/34644583808" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />{lang.ctaWhatsApp}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-3xl" asChild>
                  <a href="https://calendly.com/frencia92" target="_blank" rel="noreferrer">
                    {lang.ctaBook}<ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
              <p className="mt-6 text-sm text-muted-foreground font-medium">{lang.ctaFooter}</p>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
              >
                {lang.faqBadge}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                {lang.faqTitle}
              </motion.h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {lang.faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── FLOATING LANGUAGE BUBBLE ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {langBubbleOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex flex-col gap-1 rounded-2xl border bg-background/90 backdrop-blur-md p-2 shadow-lg"
          >
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition-colors ${language === option.code ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"}`}
                onClick={() => { setLanguage(option.code); setLangBubbleOpen(false); }}
              >
                <span className="font-mono font-bold w-6">{option.label}</span>
                <span className="text-[11px] opacity-75">{option.name}</span>
              </button>
            ))}
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLangBubbleOpen(!langBubbleOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border bg-background/90 backdrop-blur-md shadow-lg transition-colors hover:bg-muted"
        >
          <Languages className="h-5 w-5 text-primary" />
        </motion.button>
      </div>
    </div>
  );
}
