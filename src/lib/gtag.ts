// Lightweight GA4 helper to safely send events from the client
// Keeps the app safe when gtag is not available (SSR or blocked scripts)

export type GAEventPayload = Record<string, unknown> | undefined;

export function trackEvent(eventName: string, payload?: GAEventPayload): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  try {
    gtag('event', eventName, payload || {});
  } catch (_) {
    // no-op: never throw from analytics
  }
}


