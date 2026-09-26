import React from 'react';
import { PACKAGES_DATA } from '../data/mockData';
import { PackageItem } from '../types';
import { useBooking } from '../context/BookingContext';
import { Check, Sparkles, ArrowRight, Star, ShieldCheck, HelpCircle } from 'lucide-react';

export const Packages: React.FC = () => {
  const { openBookingModal, openPackageDetail } = useBooking();

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Curated Packages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Thoughtfully Structured For Every Milestone
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Choose from our 4 signature collections or build a 100% bespoke package tailored to your venue dimensions and celebration scale.
          </p>
        </div>

        {/* 4 PACKAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`relative rounded-2xl bg-white transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'border-2 border-[#C5A059] shadow-xl md:-translate-y-2 ring-4 ring-[#C5A059]/10'
                    : 'border border-[#EDE6DA] shadow-xs hover:shadow-lg'
                }`}
              >
                {/* MOST POPULAR BADGE */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-[#1C1F23] text-[#E5B869] text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#C5A059] shadow-md flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-[#E5B869]" />
                      <span>{pkg.tag}</span>
                    </span>
                  </div>
                )}

                {/* CARD TOP */}
                <div className="p-6 sm:p-7 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#956C36]">
                      {pkg.id === 'pkg-custom' ? 'Bespoke Curation' : pkg.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1F23] mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-[#5A6068] leading-relaxed min-h-[48px] mb-5">
                    {pkg.description}
                  </p>

                  {/* PRICE DISPLAY */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE6DA] mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-sans text-xl font-bold text-[#1C1F23] tabular-nums">
                        {pkg.startingPrice}
                      </span>
                      <span className="text-[10px] text-[#956C36] font-semibold bg-[#F5EEDB] px-2 py-0.5 rounded border border-[#DEC388]/50">
                        Tailored
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C6D2B] mt-1 italic">
                      Customized to venue & guest requirements
                    </p>
                  </div>

                  {/* INCLUSIONS CHECKLIST */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1C1F23]">
                      What's Included:
                    </p>
                    {pkg.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-[#373A40]">
                        <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center shrink-0 mt-0.5 text-[#956C36]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD FOOTER & BUTTON */}
                <div className="p-6 sm:p-7 pt-0 mt-auto">
                  <div className="flex flex-col space-y-2.5">
                    <button
                      id={`view-package-btn-${pkg.id}`}
                      onClick={() => openPackageDetail(pkg)}
                      className={`w-full py-3 px-3 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        isPopular
                          ? 'bg-[#C5A059] hover:bg-[#B38845] text-[#1C1F23] hover:text-white shadow-md'
                          : 'bg-[#1C1F23] hover:bg-[#33383F] text-white shadow-xs'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>VIEW PACKAGE</span>
                    </button>

                    <button
                      id={`book-package-btn-${pkg.id}`}
                      onClick={() => openBookingModal(undefined, pkg.id)}
                      className="w-full py-2 px-3 text-xs font-semibold text-[#4A4F55] hover:text-[#1C1F23] hover:bg-[#FAF8F5] rounded-md transition-colors"
                    >
                      Select & Enquire
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* IMPORTANT NOTICE BOX (From Prompt Section 8) */}
        <div className="mt-14 max-w-3xl mx-auto p-6 rounded-2xl bg-white border border-[#DEC388]/60 shadow-xs text-center">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Custom Architecture & Bespoke Flexibility</span>
          </div>
          <p className="text-sm text-[#4A4F55] leading-relaxed mb-4">
            &ldquo;Packages can be customized based on your event, venue and requirements.&rdquo;
          </p>
          <p className="text-xs text-[#666B72]">
            Need to combine specific live food counters with an imported flower mandap and 360-video booth? We tailor custom line items to your exact venue floor plan.
          </p>
          <div className="mt-5">
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#F5EEDB] hover:bg-[#C5A059] hover:text-white rounded-md border border-[#DEC388] transition-colors"
            >
              Request Custom Package Architecture
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
