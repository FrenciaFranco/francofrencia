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
}

function loadGA() {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const gtag = getGtag();
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

function removeGA() {
  const script = document.getElementById("ga-script");
  if (script) script.remove();

  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
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
    initializeConsentModeDefaults();
  }, []);

  // Apply consent side-effects whenever consent changes
  useEffect(() => {
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
