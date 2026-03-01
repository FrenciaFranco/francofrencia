"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const GA_ID = "G-96T6Q7Q7L1";
const COOKIE_KEY = "unaifly_cookie_consent";

type Consent = "accepted" | "rejected" | null;

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

function loadGA() {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_ID);
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
  }
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(getStoredConsent);

  useEffect(() => {
    if (consent === "accepted") {
      loadGA();
    } else if (consent === "rejected") {
      removeGA();
    }
  }, [consent]);

  const accept = useCallback(() => {
    setStoredConsent("accepted");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    setStoredConsent("rejected");
    setConsent("rejected");
  }, []);

  if (consent) return null;

  return (
    <div className="pointer-events-auto fixed bottom-3 left-3 right-auto z-[9999] w-[52vw] max-w-[220px] sm:left-4 sm:w-[380px]">
      <div className="rounded-xl border border-white/15 bg-[#0b1020]/92 p-3 shadow-[0_14px_40px_-18px_rgba(56,189,248,0.45)] backdrop-blur-xl">
        <p className="text-xs leading-relaxed text-slate-300">
          Usamos cookies de analisis para mejorar la web.{" "}
          <Link href="/politica-de-privacidad" className="underline hover:text-white">
            Politica de privacidad
          </Link>
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={reject}
            className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
          >
            Rechazar
          </button>
          <button
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
