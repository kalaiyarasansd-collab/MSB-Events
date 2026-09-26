import React from 'react';
import { useBooking } from '../context/BookingContext';
import { PhoneCall, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_PHONE_TEL, BUSINESS_PHONE, BUSINESS_WHATSAPP } from '../data/mockData';
import { trackEvent } from '../utils/analytics';

export const StickyMobileCTA: React.FC = () => {
  const { openBookingModal, currentView, isMobileMenuOpen } = useBooking();

  // Hide in admin dashboard or if mobile menu drawer is open
  if (currentView === 'admin' || isMobileMenuOpen) return null;

  return (
    <div
      id="sticky-mobile-cta"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#EDE6DA] px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Quick Call */}
        <a
          id="sticky-mobile-call-btn"
          href={`tel:${BUSINESS_PHONE_TEL}`}
          onClick={() => trackEvent('Contact', 'sticky_call_click')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF8F5] border border-[#DDD4C4] text-[#1C1F23] hover:bg-[#F3EDE2] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          aria-label="Call MSB Event Management"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#8C6D2B]" />
          <span>Call Us</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          id="sticky-mobile-whatsapp-btn"
          href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20would%20like%20to%20check%20availability%20for%20an%20event.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('Contact', 'sticky_whatsapp_click')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          aria-label="WhatsApp MSB Coordinator"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Book Event CTA */}
        <button
          id="sticky-mobile-book-btn"
          type="button"
          onClick={() => {
            trackEvent('Booking', 'sticky_book_click');
            openBookingModal();
          }}
          className="flex-1.2 py-2.5 px-3 rounded-xl bg-[#C5A059] hover:bg-[#D4B26F] active:bg-[#B38845] text-[#1C1F23] text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1C1F23]" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
