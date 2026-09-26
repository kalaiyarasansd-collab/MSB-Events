import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, Sparkles, Compass, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { openBookingModal } = useBooking();

  const highlights = [
    {
      title: 'Complete Event Solutions',
      description: 'End-to-end production including decor, audiovisuals, live stalls, artists and guest hospitality.'
    },
    {
      title: 'Creative Event Concepts',
      description: 'Personalized theme architectures, contemporary lighting designs, and royal South Indian aesthetics.'
    },
    {
      title: 'Professional Coordination',
      description: 'Meticulous on-ground event directors ensuring flawlessly timed rituals, entries, and entertainment.'
    },
    {
      title: 'Custom Packages',
      description: 'Flexible packages curated to respect your aesthetic tastes, venue dimensions, and budget boundaries.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#EDE6DA]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER CHIP */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            About Our Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23]">
            Curating Unrivaled Celebrations
          </h2>
        </div>

        {/* TWO-COLUMN LAYOUT ON DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* COLUMN 1: PROFESSIONAL EVENT/WEDDING PHOTOGRAPH */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EDE6DA] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85"
                alt="MSB Event Management wedding coordination team"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F23]/80 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-[#1C1F23] shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-white font-bold font-serif text-lg shrink-0">
                    M
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-[#1C1F23]">Crafted with Precision</h4>
                    <p className="text-xs text-[#555]">Every detail rehearsed and perfected for peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent frame */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-40 h-40 border-2 border-[#C5A059]/40 rounded-2xl -z-10" />
            <div className="hidden sm:block absolute -top-5 -left-5 w-32 h-32 bg-[#F3EDE2] rounded-2xl -z-10" />
          </div>

          {/* COLUMN 2: COMPANY INTRODUCTION & HIGHLIGHTS */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1F23] font-medium leading-snug mb-5">
              At MSB Event Management, every celebration is designed around your story.
            </h3>

            <p className="text-base sm:text-lg text-[#4A4F55] leading-relaxed mb-8">
              From intimate gatherings to grand weddings, our team manages décor, entertainment, photography and event experiences to make every moment memorable.
            </p>

            {/* 4 SMALL HIGHLIGHTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-white border border-[#EDE6DA] shadow-xs hover:border-[#DEC388] transition-all duration-200"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#956C36] mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#956C36]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1C1F23] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#666B72] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION ROW */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                id="about-check-dates-btn"
                onClick={() => {
                  const el = document.getElementById('availability');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-md transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="about-custom-package-btn"
                onClick={() => openBookingModal(undefined, 'pkg-signature')}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4A4F55] hover:text-[#1C1F23] bg-white border border-[#DDD4C4] hover:bg-[#F3EDE2] rounded-md transition-all"
              >
                Request Custom Quotation
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
