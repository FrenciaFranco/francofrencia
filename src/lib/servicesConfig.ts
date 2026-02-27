// --- TYPES ---
export type Language = "en" | "es" | "ca" | "it";
export type BillingType = "one_time" | "monthly";
export type ServiceTag = "popular" | "recommended" | "new";

export interface ServiceItem {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  billingType: BillingType;
  price: number;
  tags?: ServiceTag[];
}

export interface ServiceCategory {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  items: ServiceItem[];
  colorKey: string;
}

// --- CATEGORIES & ITEMS ---
export const serviceCategories: ServiceCategory[] = [
  {
    id: "web",
    colorKey: "sky",
    name: {
      en: "Web & Digital Presence",
      es: "Web y presencia digital",
      ca: "Web i presència digital",
      it: "Web e presenza digitale",
    },
    description: {
      en: "Website, landing page, local SEO & eCommerce",
      es: "Web, landing page, SEO local y tienda online",
      ca: "Web, landing page, SEO local i botiga online",
      it: "Sito, landing page, SEO locale e negozio online",
    },
    items: [
      {
        id: "web-basic",
        billingType: "one_time",
        price: 250,
        tags: ["recommended"],
        name: {
          en: "Basic website (1 page)",
          es: "Web básica (1 pág)",
          ca: "Web bàsica (1 pàg)",
          it: "Sito base (1 pag)",
        },
        description: {
          en: "Professional single-page website for client acquisition",
          es: "Página web profesional de una página para captación de clientes",
          ca: "Pàgina web professional d'una pàgina per a captació de clients",
          it: "Sito web professionale di una pagina per acquisizione clienti",
        },
      },
      {
        id: "web-landing",
        billingType: "one_time",
        price: 450,
        tags: ["popular"],
        name: {
          en: "Conversion landing page",
          es: "Landing de conversión",
          ca: "Landing de conversió",
          it: "Landing di conversione",
        },
        description: {
          en: "Optimized page with clear CTAs, forms, testimonials & FAQ",
          es: "Página optimizada con CTAs claros, formularios, testimonios y FAQ",
          ca: "Pàgina optimitzada amb CTAs clars, formularis, testimonis i FAQ",
          it: "Pagina ottimizzata con CTA chiari, moduli, testimonianze e FAQ",
        },
      },
      {
        id: "web-multi",
        billingType: "one_time",
        price: 900,
        name: {
          en: "Multi-page website (up to 5 pages)",
          es: "Web multipágina (hasta 5 págs)",
          ca: "Web multipàgina (fins a 5 pàgs)",
          it: "Sito multipagina (fino a 5 pag)",
        },
        description: {
          en: "Full website with custom sections, SEO & mobile-first UX",
          es: "Web completa con secciones personalizadas, SEO y UX mobile-first",
          ca: "Web completa amb seccions personalitzades, SEO i UX mobile-first",
          it: "Sito completo con sezioni personalizzate, SEO e UX mobile-first",
        },
      },
      {
        id: "web-ecommerce",
        billingType: "one_time",
        price: 1200,
        name: {
          en: "Online store / eCommerce",
          es: "Tienda online / eCommerce",
          ca: "Botiga online / eCommerce",
          it: "Negozio online / eCommerce",
        },
        description: {
          en: "Full eCommerce setup with products, payments & shipping",
          es: "Setup completo de eCommerce con productos, pagos y envíos",
          ca: "Setup complet d'eCommerce amb productes, pagaments i enviaments",
          it: "Setup completo eCommerce con prodotti, pagamenti e spedizioni",
        },
      },
    ],
  },
  {
    id: "bookings",
    colorKey: "emerald",
    name: {
      en: "Bookings & Appointments",
      es: "Reservas y citas",
      ca: "Reserves i cites",
      it: "Prenotazioni e appuntamenti",
    },
    description: {
      en: "Booking systems & automated reminders to cut no-shows",
      es: "Sistemas de reservas y recordatorios para reducir no-shows",
      ca: "Sistemes de reserves i recordatoris per reduir no-shows",
      it: "Sistemi di prenotazione e promemoria per ridurre i no-show",
    },
    items: [
      {
        id: "booking-setup",
        billingType: "one_time",
        price: 200,
        tags: ["popular"],
        name: {
          en: "Full Booksy / Fresha setup",
          es: "Setup completo Booksy / Fresha",
          ca: "Setup complet Booksy / Fresha",
          it: "Setup completo Booksy / Fresha",
        },
        description: {
          en: "Complete booking system adapted to your business",
          es: "Sistema de reservas completo adaptado a tu negocio",
          ca: "Sistema de reserves complet adaptat al teu negoci",
          it: "Sistema di prenotazione completo adattato al tuo business",
        },
      },
      {
        id: "booking-calendly",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Calendly-style agenda + forms",
          es: "Agenda tipo Calendly + formularios",
          ca: "Agenda tipus Calendly + formularis",
          it: "Agenda tipo Calendly + moduli",
        },
        description: {
          en: "Services, prices, hours, staff, pre-consultation forms",
          es: "Servicios, precios, horarios, staff, formularios previos",
          ca: "Serveis, preus, horaris, staff, formularis previs",
          it: "Servizi, prezzi, orari, staff, moduli preliminari",
        },
      },
      {
        id: "booking-reminders",
        billingType: "one_time",
        price: 130,
        name: {
          en: "Automated reminders (SMS / WhatsApp / email)",
          es: "Recordatorios automáticos (SMS / WhatsApp / email)",
          ca: "Recordatoris automàtics (SMS / WhatsApp / email)",
          it: "Promemoria automatici (SMS / WhatsApp / email)",
        },
        description: {
          en: "AI-assisted reminders to reduce no-shows",
          es: "Recordatorios asistidos por IA para reducir no-shows",
          ca: "Recordatoris assistits per IA per reduir no-shows",
          it: "Promemoria assistiti da IA per ridurre i no-show",
        },
      },
      {
        id: "booking-deposits",
        billingType: "one_time",
        price: 120,
        name: {
          en: "Deposits / payment setup",
          es: "Depósitos / pagos para citas",
          ca: "Dipòsits / pagaments per a cites",
          it: "Depositi / pagamenti per appuntamenti",
        },
        description: {
          en: "Secure deposit and payment collection for appointments",
          es: "Depósitos y cobros seguros para citas",
          ca: "Dipòsits i cobraments segurs per a cites",
          it: "Depositi e pagamenti sicuri per appuntamenti",
        },
      },
    ],
  },
  {
    id: "whatsapp",
    colorKey: "green",
    name: {
      en: "WhatsApp & Communication",
      es: "WhatsApp y comunicación",
      ca: "WhatsApp i comunicació",
      it: "WhatsApp e comunicazione",
    },
    description: {
      en: "Automate replies, filter leads & convert clients 24/7",
      es: "Automatiza respuestas, filtra leads y capta clientes 24/7",
      ca: "Automatitza respostes, filtra leads i capta clients 24/7",
      it: "Automatizza risposte, filtra lead e acquisisci clienti 24/7",
    },
    items: [
      {
        id: "wa-button",
        billingType: "one_time",
        price: 100,
        tags: ["recommended"],
        name: {
          en: "WhatsApp on your site (button + click tracking)",
          es: "WhatsApp en tu web (botón + tracking de clics)",
          ca: "WhatsApp a la teva web (botó + tracking de clics)",
          it: "WhatsApp sul tuo sito (pulsante + tracking clic)",
        },
        description: {
          en: "Professional WhatsApp button with pre-filled message",
          es: "Botón de WhatsApp profesional con mensaje prellenado",
          ca: "Botó de WhatsApp professional amb missatge preomplert",
          it: "Pulsante WhatsApp professionale con messaggio precompilato",
        },
      },
      {
        id: "wa-basic-auto",
        billingType: "one_time",
        price: 200,
        name: {
          en: "Basic automation (menus, after hours)",
          es: "Automatización básica (menús, fuera de horario)",
          ca: "Automatització bàsica (menús, fora d'horari)",
          it: "Automazione base (menu, fuori orario)",
        },
        description: {
          en: "AI assistant for FAQs and after-hours with simple menu",
          es: "Asistente IA para FAQs y fuera de horario con menú simple",
          ca: "Assistent IA per a FAQs i fora d'horari amb menú simple",
          it: "Assistente IA per FAQ e fuori orario con menu semplice",
        },
      },
      {
        id: "wa-secretary",
        billingType: "one_time",
        price: 450,
        tags: ["popular"],
        name: {
          en: "WhatsApp Secretary (AI conversational bot)",
          es: "Secretario de WhatsApp (bot conversacional con IA)",
          ca: "Secretari de WhatsApp (bot conversacional amb IA)",
          it: "Segretario WhatsApp (bot conversazionale con IA)",
        },
        description: {
          en: "Full conversational AI bot for lead qualification",
          es: "Bot conversacional completo con IA para filtrar leads",
          ca: "Bot conversacional complet amb IA per filtrar leads",
          it: "Bot conversazionale completo con IA per qualificare lead",
        },
      },
      {
        id: "wa-followup",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Automated lead follow-up",
          es: "Seguimiento automático de leads",
          ca: "Seguiment automàtic de leads",
          it: "Follow-up automatico lead",
        },
        description: {
          en: "Automatic reminder, booking link and review request",
          es: "Recordatorio automático, enlace de reserva y solicitud de reseña",
          ca: "Recordatori automàtic, enllaç de reserva i sol·licitud de ressenya",
          it: "Promemoria automatico, link prenotazione e richiesta recensione",
        },
      },
    ],
  },
  {
    id: "crm",
    colorKey: "amber",
    name: {
      en: "CRM & Lead Management",
      es: "CRM y gestión de leads",
      ca: "CRM i gestió de leads",
      it: "CRM e gestione lead",
    },
    description: {
      en: "Track every lead & measure clicks, forms and bookings",
      es: "Rastrea cada lead y mide clics, formularios y reservas",
      ca: "Rastreja cada lead i mesura clics, formularis i reserves",
      it: "Traccia ogni lead e misura clic, moduli e prenotazioni",
    },
    items: [
      {
        id: "crm-integration",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Lead integration → CRM / Sheets / Notion",
          es: "Leads → CRM / Sheets / Notion",
          ca: "Leads → CRM / Sheets / Notion",
          it: "Lead → CRM / Sheets / Notion",
        },
        description: {
          en: "Connect leads from all channels into one organized system",
          es: "Conecta leads de todos los canales en un sistema organizado",
          ca: "Connecta leads de tots els canals en un sistema organitzat",
          it: "Collega i lead da tutti i canali in un sistema organizzato",
        },
      },
      {
        id: "crm-analytics",
        billingType: "monthly",
        price: 89,
        name: {
          en: "Analytics dashboard + monthly report",
          es: "Dashboard de analítica + reporte mensual",
          ca: "Dashboard d'analítica + informe mensual",
          it: "Dashboard analytics + report mensile",
        },
        description: {
          en: "Measure clicks, forms, bookings with AI lead prioritization",
          es: "Mide clics, formularios, reservas con priorización IA de leads",
          ca: "Mesura clics, formularis, reserves amb priorització IA de leads",
          it: "Misura clic, moduli, prenotazioni con prioritizzazione IA dei lead",
        },
      },
    ],
  },
  {
    id: "marketing",
    colorKey: "rose",
    name: {
      en: "Marketing & Advertising",
      es: "Marketing y publicidad",
      ca: "Màrqueting i publicitat",
      it: "Marketing e pubblicità",
    },
    description: {
      en: "Ads, social media management & online reputation",
      es: "Anuncios, redes sociales y reputación online",
      ca: "Anuncis, xarxes socials i reputació online",
      it: "Annunci, social media e reputazione online",
    },
    items: [
      {
        id: "mkt-ads",
        billingType: "one_time",
        price: 300,
        name: {
          en: "Meta / Google Ads campaign setup",
          es: "Setup campañas Meta / Google Ads",
          ca: "Setup campanyes Meta / Google Ads",
          it: "Setup campagne Meta / Google Ads",
        },
        description: {
          en: "AI-assisted ad creatives for Meta, Instagram & Google Ads",
          es: "Creatividades publicitarias asistidas por IA para Meta, Instagram y Google Ads",
          ca: "Creativitats publicitàries assistides per IA per a Meta, Instagram i Google Ads",
          it: "Creatività pubblicitarie assistite da IA per Meta, Instagram e Google Ads",
        },
      },
      {
        id: "mkt-social",
        billingType: "monthly",
        price: 200,
        tags: ["popular"],
        name: {
          en: "Social media management (monthly)",
          es: "Gestión RRSS (mensual)",
          ca: "Gestió RRSS (mensual)",
          it: "Gestione social (mensile)",
        },
        description: {
          en: "Content calendar, publishing, stories, message replies",
          es: "Calendario de contenidos, publicación, stories, respuesta a mensajes",
          ca: "Calendari de continguts, publicació, stories, resposta a missatges",
          it: "Calendario contenuti, pubblicazione, stories, risposta messaggi",
        },
      },
      {
        id: "mkt-reputation",
        billingType: "monthly",
        price: 89,
        name: {
          en: "Online reputation (Google reviews)",
          es: "Reputación online (reseñas Google)",
          ca: "Reputació online (ressenyes Google)",
          it: "Reputazione online (recensioni Google)",
        },
        description: {
          en: "Manage and grow your Google review presence",
          es: "Gestiona y haz crecer tu presencia en reseñas de Google",
          ca: "Gestiona i fes créixer la teva presència en ressenyes de Google",
          it: "Gestisci e fai crescere la tua presenza nelle recensioni Google",
        },
      },
      {
        id: "mkt-newsletter",
        billingType: "monthly",
        price: 119,
        name: {
          en: "Monthly newsletter",
          es: "Newsletter mensual",
          ca: "Newsletter mensual",
          it: "Newsletter mensile",
        },
        description: {
          en: "Email marketing with promotions, reminders & updates",
          es: "Email marketing con promociones, recordatorios y novedades",
          ca: "Email màrqueting amb promocions, recordatoris i novetats",
          it: "Email marketing con promozioni, promemoria e aggiornamenti",
        },
      },
    ],
  },
  {
    id: "design",
    colorKey: "violet",
    name: {
      en: "Design & Content",
      es: "Diseño y contenido",
      ca: "Disseny i contingut",
      it: "Design e contenuto",
    },
    description: {
      en: "Brand identity, copywriting & email marketing",
      es: "Identidad de marca, copywriting y email marketing",
      ca: "Identitat de marca, copywriting i email màrqueting",
      it: "Identità di brand, copywriting ed email marketing",
    },
    items: [
      {
        id: "design-branding",
        billingType: "one_time",
        price: 250,
        name: {
          en: "Logo + basic branding",
          es: "Logo + branding básico",
          ca: "Logo + branding bàsic",
          it: "Logo + branding base",
        },
        description: {
          en: "Logo, color palette, typography & brand guidelines",
          es: "Logo, paleta de colores, tipografía y guía de marca",
          ca: "Logo, paleta de colors, tipografia i guia de marca",
          it: "Logo, palette colori, tipografia e linee guida brand",
        },
      },
      {
        id: "design-copywriting",
        billingType: "one_time",
        price: 200,
        name: {
          en: "Website copywriting",
          es: "Copywriting web completo",
          ca: "Copywriting web complet",
          it: "Copywriting web completo",
        },
        description: {
          en: "AI-assisted web texts, service descriptions & ad copy",
          es: "Textos web asistidos por IA, descripciones de servicios y anuncios",
          ca: "Textos web assistits per IA, descripcions de serveis i anuncis",
          it: "Testi web assistiti da IA, descrizioni servizi e copy annunci",
        },
      },
      {
        id: "design-email",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Email marketing setup",
          es: "Email marketing setup",
          ca: "Email màrqueting setup",
          it: "Email marketing setup",
        },
        description: {
          en: "Email templates, automation flows & subscriber setup",
          es: "Plantillas de email, flujos de automatización y configuración de suscriptores",
          ca: "Plantilles d'email, fluxos d'automatització i configuració de subscriptors",
          it: "Template email, flussi di automazione e setup iscritti",
        },
      },
    ],
  },
  {
    id: "maintenance",
    colorKey: "orange",
    name: {
      en: "Maintenance & Growth",
      es: "Mantenimiento y crecimiento",
      ca: "Manteniment i creixement",
      it: "Manutenzione e crescita",
    },
    description: {
      en: "Keep your site fast, secure & always improving",
      es: "Tu web rápida, segura y mejorando cada mes",
      ca: "La teva web ràpida, segura i millorant cada mes",
      it: "Il tuo sito veloce, sicuro e in miglioramento ogni mese",
    },
    items: [
      {
        id: "maint-basic",
        billingType: "monthly",
        price: 59,
        tags: ["recommended"],
        name: {
          en: "Basic monthly maintenance",
          es: "Mantenimiento mensual básico",
          ca: "Manteniment mensual bàsic",
          it: "Manutenzione mensile base",
        },
        description: {
          en: "Content updates, new sections, security & support",
          es: "Cambios de contenido, nuevas secciones, seguridad y soporte",
          ca: "Canvis de contingut, noves seccions, seguretat i suport",
          it: "Modifiche contenuto, nuove sezioni, sicurezza e supporto",
        },
      },
      {
        id: "maint-support",
        billingType: "monthly",
        price: 99,
        tags: ["popular"],
        name: {
          en: "Support + monthly optimization",
          es: "Soporte + optimización mensual",
          ca: "Suport + optimització mensual",
          it: "Supporto + ottimizzazione mensile",
        },
        description: {
          en: "Conversion improvements, new landing pages & campaign adjustments",
          es: "Mejoras de conversión, nuevos landings y ajuste de campañas",
          ca: "Millores de conversió, nous landings i ajust de campanyes",
          it: "Miglioramenti conversione, nuove landing e aggiustamento campagne",
        },
      },
      {
        id: "maint-pro",
        billingType: "monthly",
        price: 179,
        name: {
          en: "PRO plan (advanced support + growth roadmap)",
          es: "Plan PRO (soporte avanzado + roadmap)",
          ca: "Pla PRO (suport avançat + roadmap)",
          it: "Piano PRO (supporto avanzato + roadmap crescita)",
        },
        description: {
          en: "Monthly growth roadmap with priority actions based on real data",
          es: "Roadmap mensual de crecimiento con prioridades basadas en datos reales",
          ca: "Roadmap mensual de creixement amb prioritats basades en dades reals",
          it: "Roadmap mensile di crescita con priorità basate su dati reali",
        },
      },
    ],
  },
  {
    id: "ai",
    colorKey: "cyan",
    name: {
      en: "AI & Automation",
      es: "Asesoramiento IA",
      ca: "Assessorament IA",
      it: "Consulenza IA",
    },
    description: {
      en: "AI chatbots, workflow automations & system integrations",
      es: "Chatbots, automatizaciones e integraciones de sistemas",
      ca: "Chatbots, automatitzacions i integracions de sistemes",
      it: "Chatbot, automazioni e integrazioni di sistemi",
    },
    items: [
      {
        id: "ai-chatbot-setup",
        billingType: "one_time",
        price: 500,
        tags: ["popular"],
        name: {
          en: "AI Chatbot (web + WhatsApp) — setup",
          es: "Chatbot con IA (web + WhatsApp) — setup",
          ca: "Chatbot amb IA (web + WhatsApp) — setup",
          it: "Chatbot con IA (web + WhatsApp) — setup",
        },
        description: {
          en: "Full AI chatbot implementation for web and WhatsApp",
          es: "Implementación completa de chatbot con IA para web y WhatsApp",
          ca: "Implementació completa de chatbot amb IA per a web i WhatsApp",
          it: "Implementazione completa chatbot IA per web e WhatsApp",
        },
      },
      {
        id: "ai-chatbot-monthly",
        billingType: "monthly",
        price: 49,
        name: {
          en: "AI Chatbot — monthly support",
          es: "Chatbot con IA — mantenimiento mensual",
          ca: "Chatbot amb IA — manteniment mensual",
          it: "Chatbot con IA — manutenzione mensile",
        },
        description: {
          en: "Ongoing chatbot maintenance, training & improvements",
          es: "Mantenimiento continuo del chatbot, entrenamiento y mejoras",
          ca: "Manteniment continu del chatbot, entrenament i millores",
          it: "Manutenzione continua del chatbot, training e miglioramenti",
        },
      },
      {
        id: "ai-automations",
        billingType: "one_time",
        price: 200,
        name: {
          en: "Process automations (n8n / Make / Zapier)",
          es: "Automatizaciones de procesos (n8n / Make / Zapier)",
          ca: "Automatitzacions de processos (n8n / Make / Zapier)",
          it: "Automazioni di processi (n8n / Make / Zapier)",
        },
        description: {
          en: "Detect repetitive tasks and automate workflows",
          es: "Detecta tareas repetitivas y automatiza flujos de trabajo",
          ca: "Detecta tasques repetitives i automatitza fluxos de treball",
          it: "Individua attività ripetitive e automatizza i flussi di lavoro",
        },
      },
      {
        id: "ai-audit",
        billingType: "one_time",
        price: 250,
        name: {
          en: "Digital business audit",
          es: "Auditoría digital del negocio",
          ca: "Auditoria digital del negoci",
          it: "Audit digitale del business",
        },
        description: {
          en: "Workflow audit with AI tool recommendations for your sector",
          es: "Auditoría de procesos con recomendaciones de herramientas IA para tu sector",
          ca: "Auditoria de processos amb recomanacions d'eines IA per al teu sector",
          it: "Audit dei processi con raccomandazioni strumenti IA per il tuo settore",
        },
      },
    ],
  },
];

// --- RECOMMENDED STARTER PACK (legacy, kept for compat) ---
export const RECOMMENDED_STARTER_IDS: string[] = [
  "web-basic",
  "wa-button",
  "design-branding",
  "maint-basic",
];

// --- PRESET PLANS (additive tiers) ---
export interface PresetPlan {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  itemIds: string[];
  colorKey: "green" | "blue" | "purple" | "gold";
}

export const presetPlans: PresetPlan[] = [
  {
    id: "esencial",
    colorKey: "green",
    name: {
      en: "Essential",
      es: "Esencial",
      ca: "Essencial",
      it: "Essenziale",
    },
    description: {
      en: "Freelancer, new business, personal brand",
      es: "Autónomo, negocio nuevo, marca personal",
      ca: "Autònom, negoci nou, marca personal",
      it: "Freelancer, nuovo business, brand personale",
    },
    itemIds: [
      "web-basic",
      "wa-button",
      "design-branding",
      "maint-basic",
    ],
  },
  {
    id: "crecimiento",
    colorKey: "blue",
    name: {
      en: "Growth",
      es: "Crecimiento",
      ca: "Creixement",
      it: "Crescita",
    },
    description: {
      en: "Salon, clinic, local shop, small team",
      es: "Peluquería, clínica, tienda local, equipo pequeño",
      ca: "Perruqueria, clínica, botiga local, equip petit",
      it: "Salone, clinica, negozio locale, piccolo team",
    },
    itemIds: [
      // Everything from Esencial...
      "web-landing",
      "wa-button",
      "design-branding",
      "maint-basic",
      // + bookings & reminders
      "booking-setup",
      "booking-reminders",
      // + design copy
      "design-copywriting",
    ],
  },
  {
    id: "profesional",
    colorKey: "purple",
    name: {
      en: "Professional",
      es: "Profesional",
      ca: "Professional",
      it: "Professionale",
    },
    description: {
      en: "Established business, consultancy, academy",
      es: "Negocio consolidado, consultoría, academia",
      ca: "Negoci consolidat, consultoria, acadèmia",
      it: "Business consolidato, consulenza, accademia",
    },
    itemIds: [
      // Everything from Crecimiento...
      "web-multi",
      "wa-button",
      "wa-basic-auto",
      "design-branding",
      "design-copywriting",
      "booking-setup",
      "booking-reminders",
      "booking-deposits",
      // + CRM
      "crm-integration",
      "crm-analytics",
      // + maintenance upgrade
      "maint-support",
      // + marketing
      "mkt-ads",
    ],
  },
  {
    id: "integral",
    colorKey: "gold",
    name: {
      en: "Complete",
      es: "Integral",
      ca: "Integral",
      it: "Integrale",
    },
    description: {
      en: "Growing team, multiple services, active advertising",
      es: "Equipo creciente, varios servicios, publicidad activa",
      ca: "Equip creixent, diversos serveis, publicitat activa",
      it: "Team in crescita, servizi multipli, pubblicità attiva",
    },
    itemIds: [
      // Everything from Profesional...
      "web-multi",
      "wa-button",
      "wa-secretary",
      "wa-followup",
      "design-branding",
      "design-copywriting",
      "design-email",
      "booking-setup",
      "booking-reminders",
      "booking-deposits",
      "crm-integration",
      "crm-analytics",
      "maint-pro",
      "mkt-ads",
      "mkt-social",
      "mkt-reputation",
      // + AI
      "ai-chatbot-setup",
      "ai-chatbot-monthly",
      "ai-automations",
    ],
  },
];

// --- COLOR STYLE MAP ---
export const categoryColorStyles: Record<
  string,
  { icon: string; bg: string; bgSoft: string; title: string; border: string }
> = {
  sky: { icon: "text-sky-400", bg: "bg-sky-500/15", bgSoft: "bg-sky-500/10", title: "text-sky-300", border: "border-sky-500/20" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/15", bgSoft: "bg-emerald-500/10", title: "text-emerald-300", border: "border-emerald-500/20" },
  green: { icon: "text-green-400", bg: "bg-green-500/15", bgSoft: "bg-green-500/10", title: "text-green-300", border: "border-green-500/20" },
  amber: { icon: "text-amber-400", bg: "bg-amber-500/15", bgSoft: "bg-amber-500/10", title: "text-amber-300", border: "border-amber-500/20" },
  rose: { icon: "text-rose-400", bg: "bg-rose-500/15", bgSoft: "bg-rose-500/10", title: "text-rose-300", border: "border-rose-500/20" },
  violet: { icon: "text-violet-400", bg: "bg-violet-500/15", bgSoft: "bg-violet-500/10", title: "text-violet-300", border: "border-violet-500/20" },
  orange: { icon: "text-orange-400", bg: "bg-orange-500/15", bgSoft: "bg-orange-500/10", title: "text-orange-300", border: "border-orange-500/20" },
  cyan: { icon: "text-cyan-400", bg: "bg-cyan-500/15", bgSoft: "bg-cyan-500/10", title: "text-cyan-300", border: "border-cyan-500/20" },
};

// --- ICON KEY MAP (used to look up lucide icons in the component) ---
export const categoryIconKeys: Record<string, string> = {
  web: "Globe",
  bookings: "Calendar",
  whatsapp: "MessageCircle",
  crm: "Zap",
  marketing: "Megaphone",
  design: "Paintbrush",
  maintenance: "Wrench",
  ai: "Bot",
};
