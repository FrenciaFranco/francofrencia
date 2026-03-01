"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const GA_ID = "G-96T6Q7Q7L1";
const COOKIE_KEY = "unaifly_cookie_consent";

type Consent = "accepted" | "rejected" | null;

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
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as Consent;
    if (stored === "accepted") {
      setConsent("accepted");
      loadGA();
    } else if (stored === "rejected") {
      setConsent("rejected");
    } else {
      setVisible(true);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    loadGA();
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
    removeGA();
  }, []);

  if (!visible || consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-300">
          Usamos cookies de analisis (Google Analytics) para mejorar tu experiencia.{" "}
          <Link href="/politica-de-privacidad" className="underline hover:text-white">
            Politica de privacidad
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={reject}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
