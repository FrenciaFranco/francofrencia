/**
 * Storage utility that respects GDPR/LOPDGDD consent requirements.
 * Only allows reading/writing non-essential localStorage after user has given consent.
 */

export type StorageKey = "language" | "currency" | "bubble-corner";

const CONSENT_KEY = "unaifly_cookie_consent";

/**
 * Check if user has given consent for non-essential storage
 */
function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent === "accepted";
  } catch {
    return false;
  }
}

/**
 * Read non-essential storage ONLY after consent is given.
 * Returns null if consent is not given (GDPR compliant).
 */
export function getStorageItem(key: StorageKey): string | null {
  if (typeof window === "undefined") return null;

  // Don't read non-essential storage until consent is given
  if (!hasConsent()) {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Write to non-essential storage ONLY after consent is given.
 * Silently skips if consent is not given.
 */
export function setStorageItem(key: StorageKey, value: string): void {
  if (typeof window === "undefined") return;

  if (!hasConsent()) {
    // Don't write non-essential storage until consent is given
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore quota errors
  }
}

/**
 * Listen for consent updates and call callback when consent changes.
 * Returns unsubscribe function.
 */
export function onConsentChange(
  callback: (hasConsent: boolean) => void
): () => void {
  const handleConsentUpdate = () => {
    callback(hasConsent());
  };

  if (typeof window !== "undefined") {
    window.addEventListener("unaifly-cookie-consent-updated", handleConsentUpdate);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "unaifly-cookie-consent-updated",
        handleConsentUpdate
      );
    }
  };
}
