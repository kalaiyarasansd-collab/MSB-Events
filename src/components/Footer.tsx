import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  BUSINESS_WHATSAPP,
  BUSINESS_WHATSAPP_DISPLAY,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_INSTAGRAM,
  BUSINESS_INSTAGRAM_URL
} from '../data/mockData';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Heart,
  MessageCircle,
  ArrowUp,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { openBookingModal, setCurrentView } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#15171A] text-[#EDE6DA] border-t border-[#2B2F36]">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* COL 1 & 2: BRAND & TAGLINE */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs border border-[#C5A059]/50 shrink-0">
                <img
                  src="/msb-logo.svg"
                  alt="MSB Event Management"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif tracking-widest text-lg font-bold text-[#F5EEDB]">
                MSB EVENT MANAGEMENT
              </span>
            </div>

            <p className="font-serif text-sm italic text-[#C5A059]">
              &ldquo;Crafting Timeless Celebrations with Flawless Precision & Royal Elegance.&rdquo;
            </p>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              South India&rsquo;s premier event styling, stage architecture, luxury catering coordination, and 4K cinematography studio. We bring grandeur, peace of mind, and bespoke artistry to life.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C5A059] text-gray-300 hover:text-[#1C1F23] flex items-center justify-center transition-colors"
                title={`Instagram: ${BUSINESS_INSTAGRAM}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#25D366] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 3: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home Experience</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Our Story</a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">Event Specializations</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services Portfolio</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">Curated Packages</a>
              </li>
              <li>
                <a href="#availability" className="hover:text-white transition-colors">Check Availability</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Event Gallery</a>
              </li>
            </ul>
          </div>

          {/* COL 4: EVENT SERVICES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Signature Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Stage & Mandap Décor</li>
              <li>4K Cinematic Photography</li>
              <li>Cold Pyro & Fog SFX</li>
              <li>Grand Car & Chariot Entries</li>
              <li>Live Dessert & Food Counters</li>
              <li>Wedding DJs & Live Bands</li>
              <li>LED Wall & Live Streaming</li>
              <li>Cartoon Mascots & Stilt Walkers</li>
            </ul>
          </div>

          {/* COL 5: CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Direct Contact
            </h4>
            
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug hover:text-[#C5A059] transition-colors"
                  title="View on Google Maps"
                >
                  {BUSINESS_ADDRESS}
                </a>
              </div>
              <div className="flex items-center space-x-2 font-sans">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`tel:${BUSINESS_PHONE_TEL}`} className="font-sans tabular-nums hover:text-white transition-colors">
                  Phone: {BUSINESS_PHONE}
                </a>
              </div>
              <div className="flex items-center space-x-2 font-sans">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20would%20like%20to%20enquire%20about%20event%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans tabular-nums hover:text-white transition-colors"
                >
                  WhatsApp: {BUSINESS_WHATSAPP_DISPLAY}
                </a>
              </div>
              <div className="flex items-center space-x-2 font-sans">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="font-sans hover:text-white transition-colors truncate">
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-14 pt-8 border-t border-[#272B32] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} MSB EVENT MANAGEMENT. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
            <button
              type="button"
              id="footer-privacy-btn"
              onClick={() => {
                window.location.hash = 'privacy';
                setCurrentView('privacy');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-terms-btn"
              onClick={() => {
                window.location.hash = 'terms';
                setCurrentView('terms');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-cookies-btn"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openCookieSettings'));
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-white transition-colors text-xs cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
