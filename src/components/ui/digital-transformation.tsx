"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowRight, MessageCircle,
  Bot, Layers, TrendingUp, LockOpen, Languages, CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import inesImage from "../../../images/ines.png";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

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
type Currency = "EUR" | "USD" | "ARS" | "BTC";

const languageOptions: Array<{ code: Language; label: string; name: string }> = [
  { code: "es", label: "ES", name: "Castellano" },
  { code: "en", label: "EN", name: "English" },
  { code: "ca", label: "CA", name: "Català" },
  { code: "it", label: "IT", name: "Italiano" },
];

const currencyOptions: Array<{ code: Currency; label: string; name: string }> = [
  { code: "EUR", label: "EUR", name: "Euro" },
  { code: "USD", label: "USD", name: "US Dollar" },
  { code: "ARS", label: "ARS", name: "Peso Argentino" },
  { code: "BTC", label: "BTC", name: "Bitcoin" },
];

const fallbackCurrencyRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  ARS: 1170,
  BTC: 0.000011,
};

function formatRateAmount(value: number, currency: Currency) {
  if (!Number.isFinite(value)) return "";

  if (currency === "BTC") {
    return `BTC ${value.toLocaleString("es-ES", { minimumFractionDigits: 6, maximumFractionDigits: 8 })}`;
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getCrossCurrencyRate(from: Currency, to: Currency, currencyRates: Record<Currency, number>) {
  const fromRate = currencyRates[from] ?? fallbackCurrencyRates[from];
  const toRate = currencyRates[to] ?? fallbackCurrencyRates[to];
  if (!Number.isFinite(fromRate) || !Number.isFinite(toRate) || fromRate <= 0 || toRate <= 0) {
    return null;
  }
  return toRate / fromRate;
}

async function fetchLiveCurrencyRates(signal: AbortSignal): Promise<Partial<Record<Currency, number>>> {
  const [fiatResult, btcResult] = await Promise.allSettled([
    fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,ARS", { signal }),
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur", { signal }),
  ]);

  const nextRates: Partial<Record<Currency, number>> = {};

  if (fiatResult.status === "fulfilled" && fiatResult.value.ok) {
    const fiatData = await fiatResult.value.json() as { rates?: { USD?: number; ARS?: number } };
    if (typeof fiatData.rates?.USD === "number" && Number.isFinite(fiatData.rates.USD)) {
      nextRates.USD = fiatData.rates.USD;
    }
    if (typeof fiatData.rates?.ARS === "number" && Number.isFinite(fiatData.rates.ARS)) {
      nextRates.ARS = fiatData.rates.ARS;
    }
  }

  if (btcResult.status === "fulfilled" && btcResult.value.ok) {
    const btcData = await btcResult.value.json() as { bitcoin?: { eur?: number } };
    const btcInEur = btcData.bitcoin?.eur;
    if (typeof btcInEur === "number" && Number.isFinite(btcInEur) && btcInEur > 0) {
      nextRates.BTC = 1 / btcInEur;
    }
  }

  return nextRates;
}

function getCurrencyHint(optionCurrency: Currency, selectedCurrency: Currency, currencyRates: Record<Currency, number>) {
  if (optionCurrency === selectedCurrency) return "Base";
  const crossRate = getCrossCurrencyRate(selectedCurrency, optionCurrency, currencyRates);
  if (!crossRate) return "-";
  return `1 ${selectedCurrency} ~ ${formatRateAmount(crossRate, optionCurrency)}`;
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem("language") as Language | null;
  return saved && saved in t ? saved : "es";
}

function getInitialCurrency(): Currency {
  if (typeof window === "undefined") return "EUR";
  const saved = window.localStorage.getItem("currency") as Currency | null;
  return saved && currencyOptions.some((option) => option.code === saved) ? saved : "EUR";
}

// --- ICON ARRAYS (index-matched to translation arrays) ---
const whyDiffIcons = [Bot, Layers, TrendingUp, LockOpen];
const whyDiffIconStyles = [
  { icon: "text-cyan-400", bg: "bg-cyan-500/15", neon: { firstColor: "#00d4ff", secondColor: "#0066ff" } },
  { icon: "text-fuchsia-400", bg: "bg-fuchsia-500/15", neon: { firstColor: "#ff00aa", secondColor: "#8b5cf6" } },
  { icon: "text-lime-400", bg: "bg-lime-500/15", neon: { firstColor: "#00ff88", secondColor: "#22c55e" } },
  { icon: "text-orange-400", bg: "bg-orange-500/15", neon: { firstColor: "#ff6600", secondColor: "#f59e0b" } },
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
    builderCtaTitle: "Build your custom plan",
    builderCtaDesc: "Explore all our services, pick what your business needs, and get instant transparent pricing.",
    builderCtaButton: "Build your plan",
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
      { category: "Web & digital presence", tagline: "Website, landing page, local SEO & eCommerce", items: [
        { name: "Basic website (1 page)", from: "€250" },
        { name: "Conversion landing page", from: "€450" },
        { name: "Multi-page website (up to 5 pages)", from: "€900" },
        { name: "Online store / eCommerce", from: "€1,200" },
      ]},
      { category: "Bookings & appointments", tagline: "Booking systems & automated reminders to cut no-shows", items: [
        { name: "Full Booksy / Fresha setup", from: "€200" },
        { name: "Calendly-style agenda + forms", from: "€150" },
        { name: "Automated reminders (SMS / WhatsApp / email)", from: "€130" },
        { name: "Deposits / payment setup", from: "€120" },
      ]},
      { category: "WhatsApp & communication", tagline: "Automate replies, filter leads & convert clients 24/7", items: [
        { name: "WhatsApp on your site (button + click tracking)", from: "€100" },
        { name: "Basic automation (menus, after hours)", from: "€200" },
        { name: "WhatsApp Secretary (AI conversational bot)", from: "€450" },
        { name: "Automated lead follow-up", from: "€150" },
      ]},
      { category: "CRM & lead management", tagline: "Track every lead & measure clicks, forms and bookings", items: [
        { name: "Lead integration → CRM / Sheets / Notion", from: "€150" },
        { name: "Analytics dashboard + monthly report", from: "€89/mo" },
      ]},
      { category: "Marketing & advertising", tagline: "Ads, social media management & online reputation", items: [
        { name: "Meta / Google Ads campaign setup", from: "€300" },
        { name: "Social media management (monthly)", from: "€200/mo" },
        { name: "Online reputation (Google reviews)", from: "€89/mo" },
        { name: "Monthly newsletter", from: "€119/mo" },
      ]},
      { category: "Design & content", tagline: "Brand identity, copywriting & email marketing", items: [
        { name: "Logo + basic branding", from: "€250" },
        { name: "Website copywriting", from: "€200" },
        { name: "Email marketing setup", from: "€150" },
      ]},
      { category: "Maintenance & growth", tagline: "Keep your site fast, secure & always improving", items: [
        { name: "Basic monthly maintenance", from: "€59/mo" },
        { name: "Support + monthly optimization", from: "€99/mo" },
        { name: "PRO plan (advanced support + growth roadmap)", from: "€179/mo" },
      ]},
      { category: "AI advisory", tagline: "AI chatbots, workflow automations & system integrations", items: [
        { name: "AI Chatbot (web + WhatsApp) — setup", from: "€500" },
        { name: "AI Chatbot — monthly support", from: "€49/mo" },
        { name: "Process automations (n8n / Make / Zapier)", from: "€200" },
        { name: "Digital business audit", from: "€250" },
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
    packageCtaLabels: ["I want to start!", "I want to grow!", "I want to digitalize!", "I want to scale!"],
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
    contactSpain: "Spain · Franco",
    contactArg: "Argentina · Marco",
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
    builderCtaTitle: "Arma tu plan a medida",
    builderCtaDesc: "Explora todos nuestros servicios, elige lo que necesita tu negocio y obtén precios transparentes al instante.",
    builderCtaButton: "Ver servicios y armar plan",
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
      { category: "Web y presencia digital", tagline: "Web, landing page, SEO local y tienda online", items: [
        { name: "Web básica (1 pág)", from: "250€" },
        { name: "Landing de conversión", from: "450€" },
        { name: "Web multipágina (hasta 5 págs)", from: "900€" },
        { name: "Tienda online / eCommerce", from: "1.200€" },
      ]},
      { category: "Reservas y citas", tagline: "Sistemas de reservas y recordatorios para reducir no-shows", items: [
        { name: "Setup completo Booksy / Fresha", from: "200€" },
        { name: "Agenda tipo Calendly + formularios", from: "150€" },
        { name: "Recordatorios automáticos (SMS / WhatsApp / email)", from: "130€" },
        { name: "Depósitos / pagos para citas", from: "120€" },
      ]},
      { category: "WhatsApp y comunicación", tagline: "Automatiza respuestas, filtra leads y capta clientes 24/7", items: [
        { name: "WhatsApp en tu web (botón + tracking de clics)", from: "100€" },
        { name: "Automatización básica (menús, fuera de horario)", from: "200€" },
        { name: "Secretario de WhatsApp (bot conversacional con IA)", from: "450€" },
        { name: "Seguimiento automático de leads", from: "150€" },
      ]},
      { category: "CRM y gestión de leads", tagline: "Rastrea cada lead y mide clics, formularios y reservas", items: [
        { name: "Leads → CRM / Sheets / Notion", from: "150€" },
        { name: "Dashboard de analítica + reporte mensual", from: "89€/mes" },
      ]},
      { category: "Marketing y publicidad", tagline: "Anuncios, redes sociales y reputación online", items: [
        { name: "Setup campañas Meta / Google Ads", from: "300€" },
        { name: "Gestión RRSS (mensual)", from: "200€/mes" },
        { name: "Reputación online (reseñas Google)", from: "89€/mes" },
        { name: "Newsletter mensual", from: "119€/mes" },
      ]},
      { category: "Diseño y contenido", tagline: "Identidad de marca, copywriting y email marketing", items: [
        { name: "Logo + branding básico", from: "250€" },
        { name: "Copywriting web completo", from: "200€" },
        { name: "Email marketing setup", from: "150€" },
      ]},
      { category: "Mantenimiento y crecimiento", tagline: "Tu web rápida, segura y mejorando cada mes", items: [
        { name: "Mantenimiento mensual básico", from: "59€/mes" },
        { name: "Soporte + optimización mensual", from: "99€/mes" },
        { name: "Plan PRO (soporte avanzado + roadmap)", from: "179€/mes" },
      ]},
      { category: "Asesoramiento IA", tagline: "Chatbots, automatizaciones e integraciones de sistemas", items: [
        { name: "Chatbot con IA (web + WhatsApp) — setup", from: "500€" },
        { name: "Chatbot con IA — mantenimiento mensual", from: "49€/mes" },
        { name: "Automatizaciones de procesos (n8n / Make / Zapier)", from: "200€" },
        { name: "Auditoría digital del negocio", from: "250€" },
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
    packageCtaLabels: ["Quiero comenzar!", "Quiero crecer!", "Quiero digitalizarme!", "Quiero expandirme!"],
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
    contactSpain: "España · Franco",
    contactArg: "Argentina · Marco",
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
    builderCtaTitle: "Munta el teu pla a mida",
    builderCtaDesc: "Explora tots els nostres serveis, tria el que necessita el teu negoci i obtén preus transparents a l'instant.",
    builderCtaButton: "Veure serveis i muntar pla",
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
      { category: "Web i presència digital", tagline: "Web, landing page, SEO local i botiga online", items: [
        { name: "Web bàsica (1 pàg)", from: "250€" },
        { name: "Landing de conversió", from: "450€" },
        { name: "Web multipàgina (fins a 5 pàgs)", from: "900€" },
        { name: "Botiga online / eCommerce", from: "1.200€" },
      ]},
      { category: "Reserves i cites", tagline: "Sistemes de reserves i recordatoris per reduir no-shows", items: [
        { name: "Setup complet Booksy / Fresha", from: "200€" },
        { name: "Agenda tipus Calendly + formularis", from: "150€" },
        { name: "Recordatoris automàtics (SMS / WhatsApp / email)", from: "130€" },
        { name: "Dipòsits / pagaments per a cites", from: "120€" },
      ]},
      { category: "WhatsApp i comunicació", tagline: "Automatitza respostes, filtra leads i capta clients 24/7", items: [
        { name: "WhatsApp a la teva web (botó + tracking de clics)", from: "100€" },
        { name: "Automatització bàsica (menús, fora d'horari)", from: "200€" },
        { name: "Secretari de WhatsApp (bot conversacional amb IA)", from: "450€" },
        { name: "Seguiment automàtic de leads", from: "150€" },
      ]},
      { category: "CRM i gestió de leads", tagline: "Rastreja cada lead i mesura clics, formularis i reserves", items: [
        { name: "Leads → CRM / Sheets / Notion", from: "150€" },
        { name: "Dashboard d'analítica + informe mensual", from: "89€/mes" },
      ]},
      { category: "Màrqueting i publicitat", tagline: "Anuncis, xarxes socials i reputació online", items: [
        { name: "Setup campanyes Meta / Google Ads", from: "300€" },
        { name: "Gestió RRSS (mensual)", from: "200€/mes" },
        { name: "Reputació online (ressenyes Google)", from: "89€/mes" },
        { name: "Newsletter mensual", from: "119€/mes" },
      ]},
      { category: "Disseny i contingut", tagline: "Identitat de marca, copywriting i email màrqueting", items: [
        { name: "Logo + branding bàsic", from: "250€" },
        { name: "Copywriting web complet", from: "200€" },
        { name: "Email màrqueting setup", from: "150€" },
      ]},
      { category: "Manteniment i creixement", tagline: "La teva web ràpida, segura i millorant cada mes", items: [
        { name: "Manteniment mensual bàsic", from: "59€/mes" },
        { name: "Suport + optimització mensual", from: "99€/mes" },
        { name: "Pla PRO (suport avançat + roadmap)", from: "179€/mes" },
      ]},
      { category: "Assessorament IA", tagline: "Chatbots, automatitzacions i integracions de sistemes", items: [
        { name: "Chatbot amb IA (web + WhatsApp) — setup", from: "500€" },
        { name: "Chatbot amb IA — manteniment mensual", from: "49€/mes" },
        { name: "Automatitzacions de processos (n8n / Make / Zapier)", from: "200€" },
        { name: "Auditoria digital del negoci", from: "250€" },
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
    packageCtaLabels: ["Vull començar!", "Vull créixer!", "Vull digitalitzar-me!", "Vull expandir-me!"],
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
    contactSpain: "Espanya · Franco",
    contactArg: "Argentina · Marco",
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
    builderCtaTitle: "Costruisci il tuo piano su misura",
    builderCtaDesc: "Esplora tutti i nostri servizi, scegli ciò che il tuo business necessita e ottieni prezzi trasparenti all'istante.",
    builderCtaButton: "Vedi servizi e costruisci piano",
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
      { category: "Web e presenza digitale", tagline: "Sito, landing page, SEO locale e negozio online", items: [
        { name: "Sito base (1 pag)", from: "250€" },
        { name: "Landing di conversione", from: "450€" },
        { name: "Sito multipagina (fino a 5 pag)", from: "900€" },
        { name: "Negozio online / eCommerce", from: "1.200€" },
      ]},
      { category: "Prenotazioni e appuntamenti", tagline: "Sistemi di prenotazione e promemoria per ridurre i no-show", items: [
        { name: "Setup completo Booksy / Fresha", from: "200€" },
        { name: "Agenda tipo Calendly + moduli", from: "150€" },
        { name: "Promemoria automatici (SMS / WhatsApp / email)", from: "130€" },
        { name: "Depositi / pagamenti per appuntamenti", from: "120€" },
      ]},
      { category: "WhatsApp e comunicazione", tagline: "Automatizza risposte, filtra lead e acquisisci clienti 24/7", items: [
        { name: "WhatsApp sul tuo sito (pulsante + tracking clic)", from: "100€" },
        { name: "Automazione base (menu, fuori orario)", from: "200€" },
        { name: "Segretario WhatsApp (bot conversazionale con IA)", from: "450€" },
        { name: "Follow-up automatico lead", from: "150€" },
      ]},
      { category: "CRM e gestione lead", tagline: "Traccia ogni lead e misura clic, moduli e prenotazioni", items: [
        { name: "Lead → CRM / Sheets / Notion", from: "150€" },
        { name: "Dashboard analytics + report mensile", from: "89€/mese" },
      ]},
      { category: "Marketing e pubblicità", tagline: "Annunci, social media e reputazione online", items: [
        { name: "Setup campagne Meta / Google Ads", from: "300€" },
        { name: "Gestione social (mensile)", from: "200€/mese" },
        { name: "Reputazione online (recensioni Google)", from: "89€/mese" },
        { name: "Newsletter mensile", from: "119€/mese" },
      ]},
      { category: "Design e contenuto", tagline: "Identità di brand, copywriting ed email marketing", items: [
        { name: "Logo + branding base", from: "250€" },
        { name: "Copywriting web completo", from: "200€" },
        { name: "Email marketing setup", from: "150€" },
      ]},
      { category: "Manutenzione e crescita", tagline: "Il tuo sito veloce, sicuro e in miglioramento ogni mese", items: [
        { name: "Manutenzione mensile base", from: "59€/mese" },
        { name: "Supporto + ottimizzazione mensile", from: "99€/mese" },
        { name: "Piano PRO (supporto avanzato + roadmap)", from: "179€/mese" },
      ]},
      { category: "Consulenza IA", tagline: "Chatbot, automazioni e integrazioni di sistema", items: [
        { name: "Chatbot con IA (web + WhatsApp) — setup", from: "500€" },
        { name: "Chatbot con IA — manutenzione mensile", from: "49€/mese" },
        { name: "Automazioni di processo (n8n / Make / Zapier)", from: "200€" },
        { name: "Audit digitale del business", from: "250€" },
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
    packageCtaLabels: ["Voglio iniziare!", "Voglio crescere!", "Voglio digitalizzarmi!", "Voglio espandermi!"],
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
    contactSpain: "Spagna · Franco",
    contactArg: "Argentina · Marco",
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

function BlurText({ text, className, as: Tag = "span", delay = 0 }: { text: string; className?: string; as?: "h1" | "h2" | "h3" | "span"; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

// --- MAIN COMPONENT ---
export default function DigitalTransformation() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [currency, setCurrency] = useState<Currency>(getInitialCurrency);
  const [currencyRates, setCurrencyRates] = useState<Record<Currency, number>>(fallbackCurrencyRates);
  const [langBubbleOpen, setLangBubbleOpen] = useState(false);
  const [currencyBubbleOpen, setCurrencyBubbleOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    window.localStorage.setItem("currency", currency);
  }, [language, currency]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const refreshRates = async () => {
      try {
        const liveRates = await fetchLiveCurrencyRates(controller.signal);
        if (!isMounted || !Object.keys(liveRates).length) return;
        setCurrencyRates((prev) => ({ ...prev, ...liveRates }));
      } catch {
        // Keep fallback rates silently.
      }
    };

    void refreshRates();
    const intervalId = window.setInterval(() => {
      void refreshRates();
    }, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const lang = t[language];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <AmbientBackground />
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
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-32 w-[420px] sm:h-40 sm:w-[520px]"
              >
                <Image
                  src="/logoname.png"
                  alt="Unaifly"
                  fill
                  sizes="(max-width: 640px) 420px, 520px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <h1 className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <BlurText as="span" text={lang.headerTitle} delay={0.2} />
                <motion.span
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="ml-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block"
                >
                  {lang.headerAccent}
                </motion.span>
              </h1>
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
              <BlurText as="h2" text={lang.whyDiffTitle} delay={0.2} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl" />
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
                    <NeonGradientCard
                      neonColors={iconStyle.neon}
                      borderRadius={24}
                      className="w-full h-full"
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-11 h-11 rounded-2xl ${iconStyle.bg} flex items-center justify-center mb-4`}>
                          <Icon className={`w-5 h-5 ${iconStyle.icon}`} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                      </div>
                    </NeonGradientCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* ── BUILD YOUR PLAN CTA ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <BlurText as="h2" text={lang.builderCtaTitle} delay={0.2} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl" />
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground md:text-lg/relaxed"
              >
                {lang.builderCtaDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button size="lg" className="rounded-2xl mt-2 text-base font-bold px-8" asChild>
                  <Link href="/services-builder">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    {lang.builderCtaButton}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>


        {/* ── HOW IT WORKS ── */}
        <section className="w-full px-3 py-8 sm:px-4 md:py-10 lg:px-6 lg:py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mx-auto w-full max-w-[1280px] border border-muted rounded-3xl bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <BlurText as="h2" text={lang.processTitle} delay={0.2} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl" />
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
              <BlurText as="h2" text={lang.teamTitle} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl" />
            </div>
            <div className="mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/franco" className="glass-card group block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src="/foto.jpeg" alt="Franco" fill sizes="128px" className="object-cover object-top" />
                </div>
                <p className="mt-4 text-2xl font-semibold">Franco</p>
                <p className="mt-1 text-sm text-muted-foreground">Developer & AI Specialist</p>
                <div className="mt-2 inline-flex items-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {lang.viewProfile}
                </div>
              </Link>
              <div className="glass-card block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src={inesImage} alt="Ines" fill sizes="128px" className="object-cover object-top" />
                </div>
                <p className="mt-4 text-2xl font-semibold">Ines</p>
                <p className="mt-1 text-sm text-muted-foreground">Diseñadora UX/UI</p>
              </div>
              <div className="glass-card block rounded-3xl p-6 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-white/20">
                  <Image src="/marco.png" alt="Marco" fill sizes="128px" className="object-cover object-top" />
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
            className="mx-auto w-full max-w-[1280px] border border-primary/30 rounded-3xl bg-gradient-to-br from-primary/10 to-muted/30 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <BlurText as="h2" text={lang.ctaTitle} delay={0.2} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl mb-4 sm:mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto"
              >
                {lang.ctaDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
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
              <p className="mt-4 sm:mt-6 text-sm text-muted-foreground font-medium">{lang.ctaFooter}</p>
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
              <BlurText as="h2" text={lang.faqTitle} delay={0.2} className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl" />
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {lang.faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── FLOATING CURRENCY + LANGUAGE BUBBLES ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
        <div className="relative h-12 w-12">
          <AnimatePresence>
            {currencyBubbleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.9 }}
                className="absolute bottom-full right-0 mb-2 w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/15 bg-slate-950/82 p-2 text-slate-100 shadow-2xl shadow-black/45 backdrop-blur-xl"
              >
                {currencyOptions.map((option) => (
                  <button
                    key={option.code}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${currency === option.code ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/30" : "text-slate-200 hover:bg-white/10"}`}
                    onClick={() => { setCurrency(option.code); setCurrencyBubbleOpen(false); }}
                  >
                    <span className="font-mono font-extrabold w-9 shrink-0">{option.label}</span>
                    <span className="min-w-0 flex-1 truncate text-[12px]">{option.name} · {getCurrencyHint(option.code, currency, currencyRates)}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrencyBubbleOpen(!currencyBubbleOpen);
              setLangBubbleOpen(false);
            }}
            className="absolute inset-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/72 text-slate-100 shadow-xl shadow-black/35 backdrop-blur-md transition-colors hover:bg-slate-900/85"
            aria-label="Select currency"
          >
            <CircleDollarSign className="h-5 w-5 text-primary" />
          </motion.button>
        </div>

        <div className="relative h-12 w-12">
          <AnimatePresence>
            {langBubbleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.9 }}
                className="absolute bottom-full right-0 mb-2 w-[220px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/15 bg-slate-950/82 p-2 text-slate-100 shadow-2xl shadow-black/45 backdrop-blur-xl"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${language === option.code ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/30" : "text-slate-200 hover:bg-white/10"}`}
                    onClick={() => { setLanguage(option.code); setLangBubbleOpen(false); }}
                  >
                    <span className="font-mono font-extrabold w-6 shrink-0">{option.label}</span>
                    <span className="text-[12px]">{option.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setLangBubbleOpen(!langBubbleOpen);
              setCurrencyBubbleOpen(false);
            }}
            className="absolute inset-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/72 text-slate-100 shadow-xl shadow-black/35 backdrop-blur-md transition-colors hover:bg-slate-900/85"
            aria-label="Select language"
          >
            <Languages className="h-5 w-5 text-primary" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
