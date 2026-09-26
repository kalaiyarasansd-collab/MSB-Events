import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Home, Calendar, PhoneCall, Sparkles, ArrowLeft, Search, Layers, Image as ImageIcon } from 'lucide-react';
import { BUSINESS_PHONE_TEL, BUSINESS_PHONE, BUSINESS_WHATSAPP } from '../data/mockData';

export const NotFoundPage: React.FC = () => {
  const { setCurrentView, openBookingModal } = useBooking();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#FAF8F5]">
      <div className="max-w-2xl w-full text-center">
        {/* Monogram Badge */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] border border-[#DDD4C4] shadow-sm flex items-center justify-center mb-6">
          <span className="font-serif font-bold text-2xl text-[#C5A059]">404</span>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6D2B] mb-2">
          Page Not Found
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1F23] mb-4">
          Looking for a Celebration?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
          The page or event link you are looking for may have been moved, updated, or is temporarily unavailable. Let's get you back on track to planning your dream event.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            id="not-found-home-btn"
            onClick={() => {
              window.location.hash = '';
              setCurrentView('website');
            }}
            className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#1C1F23] hover:bg-[#343A40] rounded-lg transition-all shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            id="not-found-book-btn"
            onClick={() => {
              setCurrentView('website');
              openBookingModal();
            }}
            className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#D4B26F] rounded-lg transition-all shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Your Date</span>
          </button>
        </div>

        {/* Quick Discovery Directory */}
        <div className="pt-8 border-t border-[#EDE6DA] text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-4 text-center">
            Or Explore Popular Destinations
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setCurrentView('website');
                setTimeout(() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3.5 rounded-xl bg-white border border-[#EDE6DA] hover:border-[#C5A059] hover:shadow-xs transition-all text-center group cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#8C6D2B] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#1C1F23] block">Services</span>
              <span className="text-[10px] text-gray-500">Decor & Stages</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('website');
                setTimeout(() => {
                  document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3.5 rounded-xl bg-white border border-[#EDE6DA] hover:border-[#C5A059] hover:shadow-xs transition-all text-center group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8C6D2B] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#1C1F23] block">Packages</span>
              <span className="text-[10px] text-gray-500">Pricing & Plans</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('website');
                setTimeout(() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3.5 rounded-xl bg-white border border-[#EDE6DA] hover:border-[#C5A059] hover:shadow-xs transition-all text-center group cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#8C6D2B] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#1C1F23] block">Calendar</span>
              <span className="text-[10px] text-gray-500">Check Dates</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('website');
                setTimeout(() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="p-3.5 rounded-xl bg-white border border-[#EDE6DA] hover:border-[#C5A059] hover:shadow-xs transition-all text-center group cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#8C6D2B] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#1C1F23] block">Gallery</span>
              <span className="text-[10px] text-gray-500">Real Celebrations</span>
            </button>
          </div>
        </div>

        {/* Immediate Support Hotline */}
        <div className="mt-8 text-xs text-gray-500 flex items-center justify-center space-x-2">
          <span>Need immediate assistance?</span>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            className="font-semibold text-[#8C6D2B] hover:underline"
          >
            Call {BUSINESS_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};
