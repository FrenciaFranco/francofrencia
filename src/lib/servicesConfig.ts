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
      en: "Website, landing page, local SEO & online store",
      es: "Web, landing page, SEO local y tienda online",
      ca: "Web, landing page, SEO local i botiga online",
      it: "Sito, landing page, SEO locale e negozio online",
    },
    items: [
      {
        id: "web-basic",
        billingType: "one_time",
        price: 290,
        tags: ["recommended"],
        name: {
          en: "One-page website",
          es: "Web de una página",
          ca: "Web d'una pàgina",
          it: "Sito di una pagina",
        },
        description: {
          en: "Simple site to present your business and get contacted",
          es: "Web sencilla para presentar tu negocio y que te contacten",
          ca: "Web senzilla per presentar el teu negoci i que et contactin",
          it: "Sito semplice per presentare il tuo business e farti contattare",
        },
      },
      {
        id: "web-landing",
        billingType: "one_time",
        price: 490,
        tags: ["popular"],
        name: {
          en: "Conversion landing page",
          es: "Landing de conversión",
          ca: "Landing de conversió",
          it: "Landing di conversione",
        },
        description: {
          en: "Structured page with CTAs, testimonials, FAQ, tracking & basic SEO",
          es: "Página con estructura de venta, CTAs, testimonios, FAQ, tracking y SEO básico",
          ca: "Pàgina amb estructura de venda, CTAs, testimonis, FAQ, tracking i SEO bàsic",
          it: "Pagina con struttura di vendita, CTA, testimonianze, FAQ, tracking e SEO base",
        },
      },
      {
        id: "web-multi",
        billingType: "one_time",
        price: 990,
        name: {
          en: "Multi-page website (up to 5)",
          es: "Web multipágina (hasta 5)",
          ca: "Web multipàgina (fins a 5)",
          it: "Sito multipagina (fino a 5)",
        },
        description: {
          en: "Full site with custom sections, local SEO essentials & mobile-first UX",
          es: "Web completa con secciones a medida, SEO local esencial y UX mobile-first",
          ca: "Web completa amb seccions a mida, SEO local essencial i UX mobile-first",
          it: "Sito completo con sezioni su misura, SEO locale essenziale e UX mobile-first",
        },
      },
      {
        id: "web-ecommerce",
        billingType: "one_time",
        price: 1400,
        name: {
          en: "Simple online store",
          es: "Tienda online sencilla",
          ca: "Botiga online senzilla",
          it: "Negozio online semplice",
        },
        description: {
          en: "Shopify / WooCommerce store with small catalog, standard payments & shipping",
          es: "Tienda Shopify / WooCommerce con catálogo pequeño, pagos y envíos estándar",
          ca: "Botiga Shopify / WooCommerce amb catàleg petit, pagaments i enviaments estàndard",
          it: "Negozio Shopify / WooCommerce con catalogo piccolo, pagamenti e spedizioni standard",
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
          en: "Booking system adapted to your business, integrated into your site",
          es: "Sistema de reservas adaptado a tu negocio, integrado en tu web",
          ca: "Sistema de reserves adaptat al teu negoci, integrat a la teva web",
          it: "Sistema di prenotazione adattato al tuo business, integrato nel sito",
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
          en: "Services, prices, hours, staff & pre-consultation forms",
          es: "Servicios, precios, horarios, staff y formularios previos",
          ca: "Serveis, preus, horaris, staff i formularis previs",
          it: "Servizi, prezzi, orari, staff e moduli preliminari",
        },
      },
      {
        id: "booking-reminders",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Automated reminders (SMS / WhatsApp / email)",
          es: "Recordatorios automáticos (SMS / WhatsApp / email)",
          ca: "Recordatoris automàtics (SMS / WhatsApp / email)",
          it: "Promemoria automatici (SMS / WhatsApp / email)",
        },
        description: {
          en: "Automated reminders to reduce no-shows and keep your agenda full",
          es: "Recordatorios automáticos para reducir ausencias y llenar tu agenda",
          ca: "Recordatoris automàtics per reduir absències i omplir la teva agenda",
          it: "Promemoria automatici per ridurre le assenze e riempire la tua agenda",
        },
      },
      {
        id: "booking-deposits",
        billingType: "one_time",
        price: 130,
        name: {
          en: "Deposits / payment for appointments",
          es: "Depósitos / cobro por citas",
          ca: "Dipòsits / cobrament per cites",
          it: "Depositi / pagamento per appuntamenti",
        },
        description: {
          en: "Secure deposit collection so clients confirm with their wallet",
          es: "Cobro de señal para que el cliente confirme con su bolsillo",
          ca: "Cobrament de senyal perquè el client confirmi amb la butxaca",
          it: "Raccolta caparra per far confermare il cliente con il portafoglio",
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
      en: "Respond, filter enquiries & capture leads 24/7",
      es: "Responde, filtra consultas y capta leads 24/7",
      ca: "Respon, filtra consultes i capta leads 24/7",
      it: "Rispondi, filtra richieste e acquisisci lead 24/7",
    },
    items: [
      {
        id: "wa-button",
        billingType: "one_time",
        price: 120,
        tags: ["recommended"],
        name: {
          en: "WhatsApp on your site (button + tracking)",
          es: "WhatsApp en tu web (botón + tracking)",
          ca: "WhatsApp a la teva web (botó + tracking)",
          it: "WhatsApp sul tuo sito (pulsante + tracking)",
        },
        description: {
          en: "Professional button with pre-filled message and click tracking",
          es: "Botón profesional con mensaje prellenado y tracking de clics",
          ca: "Botó professional amb missatge preomplert i tracking de clics",
          it: "Pulsante professionale con messaggio precompilato e tracking clic",
        },
      },
      {
        id: "wa-basic-auto",
        billingType: "one_time",
        price: 200,
        name: {
          en: "Basic automation (menus + after hours)",
          es: "Automatización básica (menús + fuera de horario)",
          ca: "Automatització bàsica (menús + fora d'horari)",
          it: "Automazione base (menu + fuori orario)",
        },
        description: {
          en: "Auto-replies for FAQs, after-hours & simple menu (Book, Prices, Location)",
          es: "Respuestas automáticas a FAQs, fuera de horario y menú simple (Reservar, Precios, Ubicación)",
          ca: "Respostes automàtiques a FAQs, fora d'horari i menú simple (Reservar, Preus, Ubicació)",
          it: "Risposte automatiche a FAQ, fuori orario e menu semplice (Prenota, Prezzi, Posizione)",
        },
      },
      {
        id: "wa-secretary",
        billingType: "one_time",
        price: 550,
        tags: ["popular"],
        name: {
          en: "WhatsApp Secretary (AI bot)",
          es: "Secretario WhatsApp (bot con IA)",
          ca: "Secretari WhatsApp (bot amb IA)",
          it: "Segretario WhatsApp (bot con IA)",
        },
        description: {
          en: "Answers FAQs, filters enquiries & hands off to a human when needed",
          es: "Responde FAQs, filtra consultas y deriva a una persona cuando hace falta",
          ca: "Respon FAQs, filtra consultes i deriva a una persona quan cal",
          it: "Risponde alle FAQ, filtra le richieste e passa a un umano quando serve",
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
          en: "Automatic reminder, booking link & review request after the visit",
          es: "Recordatorio automático, enlace de reserva y solicitud de reseña tras la visita",
          ca: "Recordatori automàtic, enllaç de reserva i sol·licitud de ressenya després de la visita",
          it: "Promemoria automatico, link prenotazione e richiesta recensione dopo la visita",
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
      en: "Organize leads & track what works every month",
      es: "Organiza leads y mide qué funciona cada mes",
      ca: "Organitza leads i mesura què funciona cada mes",
      it: "Organizza i lead e misura cosa funziona ogni mese",
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
          en: "All your leads from every channel in one organized place",
          es: "Todos tus leads de cada canal en un solo sitio organizado",
          ca: "Tots els teus leads de cada canal en un sol lloc organitzat",
          it: "Tutti i tuoi lead da ogni canale in un unico posto organizzato",
        },
      },
      {
        id: "crm-report",
        billingType: "monthly",
        price: 79,
        name: {
          en: "Monthly report + lead tracking",
          es: "Informe mensual + seguimiento de leads",
          ca: "Informe mensual + seguiment de leads",
          it: "Report mensile + tracciamento lead",
        },
        description: {
          en: "Simple monthly report: where leads come from, what converts, what to improve",
          es: "Informe mensual simple: de dónde vienen los leads, qué convierte y qué mejorar",
          ca: "Informe mensual simple: d'on venen els leads, què converteix i què millorar",
          it: "Report mensile semplice: da dove arrivano i lead, cosa converte e cosa migliorare",
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
      en: "Ads, social media content & online reputation",
      es: "Anuncios, contenido para redes y reputación online",
      ca: "Anuncis, contingut per a xarxes i reputació online",
      it: "Annunci, contenuti social e reputazione online",
    },
    items: [
      {
        id: "mkt-ads",
        billingType: "one_time",
        price: 350,
        name: {
          en: "Meta / Google Ads campaign setup",
          es: "Setup campañas Meta / Google Ads",
          ca: "Setup campanyes Meta / Google Ads",
          it: "Setup campagne Meta / Google Ads",
        },
        description: {
          en: "First campaign ready to run: creatives, audiences, pixels & tracking",
          es: "Primera campaña lista para lanzar: creatividades, audiencias, píxeles y tracking",
          ca: "Primera campanya llesta per llançar: creativitats, audiències, píxels i tracking",
          it: "Prima campagna pronta al lancio: creatività, audience, pixel e tracking",
        },
      },
      {
        id: "mkt-social",
        billingType: "monthly",
        price: 250,
        tags: ["popular"],
        name: {
          en: "Social media content (12 posts/month)",
          es: "Contenido RRSS (12 posts/mes)",
          ca: "Contingut RRSS (12 posts/mes)",
          it: "Contenuti social (12 post/mese)",
        },
        description: {
          en: "12 designed posts per month with copy, hashtags & publishing calendar",
          es: "12 posts diseñados al mes con copy, hashtags y calendario de publicación",
          ca: "12 posts dissenyats al mes amb copy, hashtags i calendari de publicació",
          it: "12 post progettati al mese con copy, hashtag e calendario di pubblicazione",
        },
      },
      {
        id: "mkt-reputation",
        billingType: "one_time",
        price: 150,
        name: {
          en: "Google reviews setup (automated)",
          es: "Reseñas Google automatizadas (setup)",
          ca: "Ressenyes Google automatitzades (setup)",
          it: "Recensioni Google automatizzate (setup)",
        },
        description: {
          en: "Automated review request system after each visit or purchase",
          es: "Sistema automático de solicitud de reseñas tras cada visita o compra",
          ca: "Sistema automàtic de sol·licitud de ressenyes després de cada visita o compra",
          it: "Sistema automatico di richiesta recensioni dopo ogni visita o acquisto",
        },
      },
      {
        id: "mkt-newsletter",
        billingType: "monthly",
        price: 99,
        name: {
          en: "Monthly newsletter",
          es: "Newsletter mensual",
          ca: "Newsletter mensual",
          it: "Newsletter mensile",
        },
        description: {
          en: "1 designed email per month with promotions, news & reminders",
          es: "1 email diseñado al mes con promociones, novedades y recordatorios",
          ca: "1 email dissenyat al mes amb promocions, novetats i recordatoris",
          it: "1 email progettata al mese con promozioni, novità e promemoria",
        },
      },
      {
        id: "mkt-gbp",
        billingType: "one_time",
        price: 150,
        tags: ["new"],
        name: {
          en: "Google Business Profile setup",
          es: "Ficha Google Business optimizada",
          ca: "Fitxa Google Business optimitzada",
          it: "Scheda Google Business ottimizzata",
        },
        description: {
          en: "Optimized profile: photos, hours, services, categories & first posts",
          es: "Perfil optimizado: fotos, horarios, servicios, categorías y primeras publicaciones",
          ca: "Perfil optimitzat: fotos, horaris, serveis, categories i primeres publicacions",
          it: "Profilo ottimizzato: foto, orari, servizi, categorie e primi post",
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
        price: 300,
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
        price: 250,
        name: {
          en: "Website copywriting",
          es: "Copywriting web completo",
          ca: "Copywriting web complet",
          it: "Copywriting web completo",
        },
        description: {
          en: "All web texts: headlines, services, about, CTAs — written to convert",
          es: "Todos los textos de tu web: titulares, servicios, sobre ti, CTAs — escritos para convertir",
          ca: "Tots els textos de la teva web: titulars, serveis, sobre tu, CTAs — escrits per convertir",
          it: "Tutti i testi del sito: titoli, servizi, chi siamo, CTA — scritti per convertire",
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
      {
        id: "design-social-kit",
        billingType: "one_time",
        price: 200,
        tags: ["new"],
        name: {
          en: "Social media template kit",
          es: "Kit plantillas RRSS",
          ca: "Kit plantilles RRSS",
          it: "Kit template social",
        },
        description: {
          en: "Branded Canva templates for posts, stories & highlights",
          es: "Plantillas Canva con tu marca para posts, stories y destacados",
          ca: "Plantilles Canva amb la teva marca per a posts, stories i destacats",
          it: "Template Canva brandizzati per post, stories e highlight",
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
        price: 69,
        tags: ["recommended"],
        name: {
          en: "Basic monthly maintenance (~2 h)",
          es: "Mantenimiento mensual (~2 h de mejoras)",
          ca: "Manteniment mensual (~2 h de millores)",
          it: "Manutenzione mensile (~2 h di migliorie)",
        },
        description: {
          en: "Small content changes, security updates & support via WhatsApp",
          es: "Pequeños cambios de contenido, actualizaciones de seguridad y soporte por WhatsApp",
          ca: "Petits canvis de contingut, actualitzacions de seguretat i suport per WhatsApp",
          it: "Piccole modifiche contenuto, aggiornamenti sicurezza e supporto via WhatsApp",
        },
      },
      {
        id: "maint-support",
        billingType: "monthly",
        price: 119,
        tags: ["popular"],
        name: {
          en: "Support + optimization (~4 h)",
          es: "Soporte + optimización (~4 h de mejoras)",
          ca: "Suport + optimització (~4 h de millores)",
          it: "Supporto + ottimizzazione (~4 h di migliorie)",
        },
        description: {
          en: "Conversion improvements, new sections, campaign tweaks & priority support",
          es: "Mejoras de conversión, nuevas secciones, ajuste de campañas y soporte prioritario",
          ca: "Millores de conversió, noves seccions, ajust de campanyes i suport prioritari",
          it: "Miglioramenti conversione, nuove sezioni, aggiustamenti campagne e supporto prioritario",
        },
      },
      {
        id: "maint-pro",
        billingType: "monthly",
        price: 199,
        name: {
          en: "PRO plan (~6 h + quarterly review)",
          es: "Plan PRO (~6 h + revisión trimestral)",
          ca: "Pla PRO (~6 h + revisió trimestral)",
          it: "Piano PRO (~6 h + revisione trimestrale)",
        },
        description: {
          en: "Dedicated improvement hours, quarterly growth review & priority roadmap",
          es: "Horas dedicadas de mejora, revisión trimestral de crecimiento y roadmap prioritario",
          ca: "Hores dedicades de millora, revisió trimestral de creixement i roadmap prioritari",
          it: "Ore dedicate di miglioramento, revisione trimestrale crescita e roadmap prioritaria",
        },
      },
    ],
  },
  {
    id: "ai",
    colorKey: "cyan",
    name: {
      en: "AI & Automation",
      es: "IA y automatización",
      ca: "IA i automatització",
      it: "IA e automazione",
    },
    description: {
      en: "AI chatbots, workflow automations & smart integrations",
      es: "Chatbots con IA, automatizaciones y conexiones inteligentes",
      ca: "Chatbots amb IA, automatitzacions i connexions intel·ligents",
      it: "Chatbot con IA, automazioni e integrazioni intelligenti",
    },
    items: [
      {
        id: "ai-chatbot-setup",
        billingType: "one_time",
        price: 590,
        tags: ["popular"],
        name: {
          en: "AI Chatbot (web + WhatsApp) — setup",
          es: "Chatbot IA (web + WhatsApp) — setup",
          ca: "Chatbot IA (web + WhatsApp) — setup",
          it: "Chatbot IA (web + WhatsApp) — setup",
        },
        description: {
          en: "Answers FAQs, captures leads & hands off to a human. Web + WhatsApp",
          es: "Responde FAQs, captura leads y deriva a humano. Web + WhatsApp",
          ca: "Respon FAQs, captura leads i deriva a humà. Web + WhatsApp",
          it: "Risponde alle FAQ, cattura lead e passa a un umano. Web + WhatsApp",
        },
      },
      {
        id: "ai-chatbot-monthly",
        billingType: "monthly",
        price: 69,
        name: {
          en: "AI Chatbot — monthly tuning",
          es: "Chatbot IA — ajuste mensual",
          ca: "Chatbot IA — ajust mensual",
          it: "Chatbot IA — tuning mensile",
        },
        description: {
          en: "Monthly review: update answers, train on new FAQs & performance check",
          es: "Revisión mensual: actualizar respuestas, entrenar nuevas FAQs y verificar rendimiento",
          ca: "Revisió mensual: actualitzar respostes, entrenar noves FAQs i verificar rendiment",
          it: "Revisione mensile: aggiornare risposte, addestrare nuove FAQ e verifica performance",
        },
      },
      {
        id: "ai-automations",
        billingType: "one_time",
        price: 250,
        name: {
          en: "Workflow automation (1 main flow)",
          es: "Automatización de procesos (1 flujo principal)",
          ca: "Automatització de processos (1 flux principal)",
          it: "Automazione di processi (1 flusso principale)",
        },
        description: {
          en: "We identify 1 repetitive task and automate it with n8n / Make / Zapier",
          es: "Identificamos 1 tarea repetitiva y la automatizamos con n8n / Make / Zapier",
          ca: "Identifiquem 1 tasca repetitiva i l'automatitzem amb n8n / Make / Zapier",
          it: "Identifichiamo 1 attività ripetitiva e la automatizziamo con n8n / Make / Zapier",
        },
      },
      {
        id: "ai-audit",
        billingType: "one_time",
        price: 200,
        name: {
          en: "Digital business audit",
          es: "Auditoría digital del negocio",
          ca: "Auditoria digital del negoci",
          it: "Audit digitale del business",
        },
        description: {
          en: "We review your processes and recommend where AI and automation save you time",
          es: "Revisamos tus procesos y te decimos dónde la IA y la automatización te ahorran tiempo",
          ca: "Revisem els teus processos i et diem on la IA i l'automatització t'estalvien temps",
          it: "Analizziamo i tuoi processi e ti consigliamo dove IA e automazione ti fanno risparmiare tempo",
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
      "web-landing",
      "wa-button",
      "design-branding",
      "design-copywriting",
      "maint-basic",
      "booking-setup",
      "booking-reminders",
      "mkt-gbp",
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
      "web-multi",
      "wa-basic-auto",
      "design-branding",
      "design-copywriting",
      "booking-setup",
      "booking-reminders",
      "booking-deposits",
      "crm-integration",
      "crm-report",
      "maint-support",
      "mkt-ads",
      "mkt-gbp",
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
      "web-multi",
      "wa-secretary",
      "wa-followup",
      "design-branding",
      "design-copywriting",
      "design-email",
      "design-social-kit",
      "booking-setup",
      "booking-reminders",
      "booking-deposits",
      "crm-integration",
      "crm-report",
      "maint-pro",
      "mkt-ads",
      "mkt-social",
      "mkt-reputation",
      "mkt-gbp",
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
