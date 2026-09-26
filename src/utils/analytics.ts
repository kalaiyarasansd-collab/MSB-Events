/**
 * Lightweight, privacy-first Analytics Tracking Module for MSB Event Management
 */

export interface AnalyticsEvent {
  category: 'Booking' | 'Contact' | 'Engagement' | 'Navigation' | 'Admin';
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
}

const ANALYTICS_STORAGE_KEY = 'msb_cookie_consent';

export function isAnalyticsAllowed(): boolean {
  try {
    const consent = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!consent) return true; // Default opt-in until user sets preferences
    const parsed = JSON.parse(consent);
    return parsed.analytics !== false;
  } catch {
    return true;
  }
}

export function trackEvent(
  category: AnalyticsEvent['category'],
  action: string,
  label?: string,
  value?: number
): void {
  if (!isAnalyticsAllowed()) return;

  const eventData: AnalyticsEvent = {
    category,
    action,
    label,
    value,
    timestamp: new Date().toISOString(),
  };

  // 1. Google Analytics dataLayer support if present
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'msb_custom_event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
    });
  }

  // 2. Local debug telemetry
  if (process.env.NODE_ENV !== 'production') {
    // Helpful in development
    console.info(`[MSB Analytics] 📊 ${category} → ${action}`, label ? `(${label})` : '');
  }
}

export function trackPageView(pagePath: string): void {
  trackEvent('Navigation', 'page_view', pagePath);
}
