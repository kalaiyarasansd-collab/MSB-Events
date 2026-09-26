import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CONSENT_KEY = 'msb_cookie_consent_v2';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Clear any previous silent consent key to ensure the banner is presented to visitors
    try {
      localStorage.removeItem('msb_cookie_consent');
    } catch {
      // ignore
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      // Display smoothly to visitors
      timer = setTimeout(() => setIsOpen(true), 600);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        setIsOpen(true);
      }
    }

    // Global listener for "Open Cookie Settings" from footer
    const handleReopen = () => {
      setIsOpen(true);
      setShowPreferences(true);
    };
    window.addEventListener('openCookieSettings', handleReopen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('openCookieSettings', handleReopen);
    };
  }, []);

  const saveAndClose = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsOpen(false);
    setShowPreferences(false);
    trackEvent('Engagement', 'cookie_consent_saved', prefs.analytics ? 'analytics_allowed' : 'analytics_declined');
  };

  const handleAcceptAll = () => {
    saveAndClose({ essential: true, analytics: true, marketing: true });
  };

  const handleDecline = () => {
    saveAndClose({ essential: true, analytics: false, marketing: false });
  };

  if (!isOpen) return null;

  return (
    <div
      id="msb-cookie-banner"
      className="fixed bottom-20 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#DDD4C4] shadow-2xl p-5 text-[#1C1F23]">
        <div className="flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#DDD4C4] text-[#8C6D2B] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold font-serif text-[#1C1F23]">
              Cookie & Privacy Preferences
            </h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              We use necessary cookies to ensure seamless calendar booking, remember your preferences, and improve our celebration services.
            </p>

            {showPreferences && (
              <div className="mt-3.5 pt-3.5 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold block text-gray-900">Essential Cookies</span>
                    <span className="text-[11px] text-gray-500">Required for date locking and bookings.</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Always Active
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="font-semibold block text-gray-900">Analytics & Insights</span>
                    <span className="text-[11px] text-gray-500">Helps us refine our event packages.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="cookie-accept-all-btn"
                onClick={handleAcceptAll}
                className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1C1F23] hover:bg-[#343A40] rounded-lg transition-colors cursor-pointer"
              >
                Accept All
              </button>

              <button
                type="button"
                id="cookie-decline-btn"
                onClick={handleDecline}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Decline
              </button>

              <button
                type="button"
                id="cookie-settings-btn"
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-xs font-semibold text-[#8C6D2B] hover:underline ml-auto cursor-pointer"
              >
                {showPreferences ? 'Save Custom' : 'Customize'}
              </button>
            </div>
          </div>

          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
