import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Sparkles, Calendar, ArrowRight, Shield, Award, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBookingModal } = useBooking();

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 overflow-hidden bg-[#FAF8F5]"
    >
      {/* BACKGROUND IMAGE WITH LUXURY LIGHT/WARM OVERLAYS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury wedding reception stage decor by MSB Event Management"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft elegant warm veil overlay ensuring crisp WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F23]/85 via-[#1C1F23]/70 to-[#1C1F23]/80" />
        <div className="absolute inset-0 bg-[#3B2C1A]/25 mix-blend-multiply" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        {/* BRAND BADGE */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8 animate-in fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-[#E5B869] animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#F3EDE2] whitespace-nowrap">
            MSB EVENT MANAGEMENT
          </span>
        </div>

        {/* MAIN HEADLINE */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.15] text-[#FAF8F5] max-w-4xl mx-auto mb-6 tracking-tight drop-shadow-xs">
          Turning Your Celebrations Into{' '}
          <span className="italic font-normal text-[#E5B869] block sm:inline">
            Unforgettable Memories
          </span>
        </h1>

        {/* SUPPORTING TEXT */}
        <p className="text-base sm:text-lg md:text-xl text-[#E8E0D2] font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          From elegant weddings to unforgettable celebrations, we bring your vision to life with thoughtful planning, beautiful décor and memorable experiences.
        </p>

        {/* PRIMARY & SECONDARY ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16">
          <button
            id="hero-book-event-cta"
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#D4B26F] active:bg-[#B38845] rounded-md transition-all shadow-lg hover:shadow-[#C5A059]/25 hover:-translate-y-0.5 flex items-center justify-center space-x-2.5 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#1C1F23]" />
            <span>Book Your Event</span>
            <ArrowRight className="w-4 h-4 text-[#1C1F23] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-explore-services-cta"
            onClick={() => handleScrollTo('services')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#FAF8F5] bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/25 rounded-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <span>Explore Services</span>
          </button>
        </div>

        {/* TRUST LINE (Weddings • Receptions • Birthdays • Corporate Events) */}
        <div className="pt-6 sm:pt-8 border-t border-white/15">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#E5B869] mb-4">
            Weddings • Receptions • Birthdays • Corporate Events
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white block">500+</span>
              <span className="text-xs text-[#E8E0D2]/80">Celebrations Curated</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white block">100%</span>
              <span className="text-xs text-[#E8E0D2]/80">Bespoke Custom Themes</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white block">24/7</span>
              <span className="text-xs text-[#E8E0D2]/80">Dedicated Coordination</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white block">Coverage</span>
              <span className="text-xs text-[#E8E0D2]/80">TN, Puducherry, KL, KA</span>
            </div>
          </div>
        </div>

      </div>

      {/* SUBTLE SCROLL PROMPT */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-[#FAF8F5] mb-1">Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#C5A059] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
