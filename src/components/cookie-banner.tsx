"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const GA_ID = "G-96T6Q7Q7L1";
const COOKIE_KEY = "unaifly_cookie_consent";

type Consent = "accepted" | "rejected" | null;
type ConsentModeValue = "granted" | "denied";

function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;

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

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(getStoredConsent);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    initializeConsentModeDefaults();
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      updateConsentMode("accepted");
      loadGA();
    } else if (consent === "rejected") {
      updateConsentMode("rejected");
      removeGA();
    }
  }, [consent]);

  const accept = useCallback(() => {
    setIsVisible(false);
    setStoredConsent("accepted");
    setConsent("accepted");
    notifyConsentUpdate();
  }, []);

  const reject = useCallback(() => {
    setIsVisible(false);
    setStoredConsent("rejected");
    setConsent("rejected");
    notifyConsentUpdate();
  }, []);

  if (consent || !isVisible) return null;

  return (
    <div className="pointer-events-auto fixed bottom-3 left-3 right-auto z-[2147483647] w-[52vw] max-w-[220px] sm:left-4 sm:w-[380px]">
      <div className="rounded-xl border border-white/15 bg-[#0b1020]/92 p-3 shadow-[0_14px_40px_-18px_rgba(56,189,248,0.45)] backdrop-blur-xl">
        <p className="text-xs leading-relaxed text-slate-300">
          Usamos cookies de analisis para mejorar la web.{" "}
          <Link href="/politica-de-privacidad" className="underline hover:text-white">
            Politica de privacidad
          </Link>
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-md bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-400"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
