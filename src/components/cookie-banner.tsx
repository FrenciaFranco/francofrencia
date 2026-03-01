"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const GA_ID = "G-96T6Q7Q7L1";
const COOKIE_KEY = "unaifly_cookie_consent";

type Consent = "accepted" | "rejected" | null;
type ConsentModeValue = "granted" | "denied";

// Global type declarations
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    showCookieSettings?: () => void;
  }
}

/**
 * Read persisted consent from localStorage.
 * Only call on the client (inside useEffect) to avoid hydration mismatches.
 */
function getStoredConsent(): Consent {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
}

function setStoredConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(COOKIE_KEY, value);
  } catch {
    // Ignore storage errors and still apply in-memory consent.
  }
}

function notifyConsentUpdate() {
  window.dispatchEvent(new Event("unaifly-cookie-consent-updated"));
}

function getGtag() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }

  return window.gtag;
}

function initializeConsentModeDefaults() {
  const gtag = getGtag();
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  console.log("🔐 [GA-DEBUG] consent DEFAULT pushed", {
    analytics_storage: "denied",
    dataLayerLength: window.dataLayer?.length,
    timestamp: performance.now().toFixed(1) + "ms",
  });
}

function updateConsentMode(consent: Exclude<Consent, null>) {
  const gtag = getGtag();
  const analyticsValue: ConsentModeValue = consent === "accepted" ? "granted" : "denied";

  gtag("consent", "update", {
    analytics_storage: analyticsValue,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  console.log("🔄 [GA-DEBUG] consent UPDATE pushed", {
    analytics_storage: analyticsValue,
    dataLayerLength: window.dataLayer?.length,
    timestamp: performance.now().toFixed(1) + "ms",
  });
}

function loadGA() {
  if (document.getElementById("ga-script")) {
    console.log("⚠️ GA4 script already loaded, skipping");
    return;
  }

  console.log("📥 Loading GA4 script...");

  // ── CRITICAL: push js + config BEFORE the script loads ──
  // This mirrors the standard Google snippet where the inline <script>
  // pushes these commands *before* gtag.js executes its initial
  // dataLayer sweep.  Without them in the initial queue, gtag.js
  // never fully initialises the measurement pipeline.
  const gtag = getGtag();
  gtag("js", new Date());
  gtag("config", GA_ID, {
    send_page_view: true,   // explicit (default is true, but be clear)
  });

  console.log("📋 gtag('js') + gtag('config') queued in dataLayer BEFORE script load");
  console.log("📋 dataLayer length:", window.dataLayer?.length);

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;

  script.onload = () => {
    console.log("✅ GA4 script loaded & executed. ID:", GA_ID);
    console.log("📊 dataLayer length after load:", window.dataLayer?.length);
    console.log("🍪 document.cookie:", document.cookie || "(empty)");

    // Fire an explicit page_view so we can verify the collect hit
    const g = getGtag();
    g("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      debug_mode: true,
    });
    console.log("📤 Explicit page_view event fired");
  };

  script.onerror = () => {
    console.error("❌ Failed to load GA4 script — check CSP / ad-blocker");
  };

  document.head.appendChild(script);
}

function removeGA() {
  const script = document.getElementById("ga-script");
  if (script) script.remove();

  // Eliminar todas las cookies de GA
  const domain = window.location.hostname;
  const cookiesToDelete = document.cookie.split(";").map(c => c.split("=")[0].trim());
  
  cookiesToDelete.forEach((name) => {
    if (name.startsWith("_ga")) {
      // Eliminar para el dominio actual
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      // Eliminar para el dominio raíz
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    }
  });
  
  console.log("🗑️ GA4 cookies removed");
}

export default function CookieBanner() {
  // ── Hydration-safe state ──
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Client-only: read persisted preference after hydration
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) setConsent(stored);
    setMounted(true);
  }, []);

  // Consent-mode defaults (runs once on mount)
  useEffect(() => {
    console.log("⏱️ [GA-DEBUG] Effect: consent defaults firing", performance.now().toFixed(1) + "ms");
    initializeConsentModeDefaults();
  }, []);

  // Apply consent side-effects whenever consent changes
  useEffect(() => {
    console.log("⏱️ [GA-DEBUG] Effect: consent changed →", consent, "at", performance.now().toFixed(1) + "ms");
    if (consent === "accepted") {
      updateConsentMode("accepted");
      loadGA();
    } else if (consent === "rejected") {
      updateConsentMode("rejected");
      removeGA();
    }
  }, [consent]);

  // Expose function to reopen banner from footer or elsewhere
  useEffect(() => {
    window.showCookieSettings = () => {
      setShowBanner(true);
    };
  }, []);

  const accept = useCallback(() => {
    setStoredConsent("accepted");
    setConsent("accepted");
    notifyConsentUpdate();
    setShowBanner(false);
  }, []);

  const reject = useCallback(() => {
    setStoredConsent("rejected");
    setConsent("rejected");
    notifyConsentUpdate();
    setShowBanner(false);
  }, []);

  // Don't render until hydrated
  if (!mounted) return null;

  // Show banner if:
  // 1. No consent yet (first visit), OR
  // 2. User explicitly clicked "Configurar Cookies"
  const shouldShowBanner = !consent || showBanner;

  if (!shouldShowBanner) return null;

  return (
    <div className="pointer-events-auto fixed bottom-3 left-3 right-auto z-[2147483647] w-[52vw] max-w-[220px] sm:left-4 sm:w-[380px]">
      <div className="rounded-xl border border-white/15 bg-[#0b1020]/92 p-3 shadow-[0_14px_40px_-18px_rgba(56,189,248,0.45)] backdrop-blur-xl">
        <p className="text-xs leading-relaxed text-slate-300">
          Utilizamos cookies para mejorar tu experiencia (análisis de uso, preferencias). 
          Consulta nuestra{" "}
          <Link href="/politica-de-cookies" className="underline hover:text-white">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={reject}
            aria-label="Rechazar todas las cookies"
            className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={accept}
            aria-label="Aceptar todas las cookies"
            className="rounded-md bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-400"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
