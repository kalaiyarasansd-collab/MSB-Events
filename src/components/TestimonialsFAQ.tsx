import React, { useState } from 'react';
import { TESTIMONIALS_DATA, FAQ_DATA } from '../data/mockData';
import { Star, ChevronDown, ChevronUp, Quote, HelpCircle } from 'lucide-react';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#EDE6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TESTIMONIALS HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Client Words & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Cherished by Families Across South India
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Real stories from couples and families who entrusted their most sacred milestones to MSB Event Management.
          </p>
        </div>

        {/* TESTIMONIALS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EDE6DA] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 STARS */}
                <div className="flex items-center space-x-1 text-[#C5A059] mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#DEC388]/50 mb-3" />

                <p className="text-sm text-[#373A40] leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE0] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1C1F23]">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#956C36] font-medium">
                    {t.event}
                  </p>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ SECTION */}
        <div id="faq" className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-2">
              <HelpCircle className="w-4 h-4 text-[#C5A059]" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#1C1F23]">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-[#5A6068] mt-2">
              Everything you need to know about date reservations, package customization, and payment stages.
            </p>
          </div>

          {/* ACCORDIONS */}
          <div className="space-y-3.5">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-[#EDE6DA] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-semibold text-[#1C1F23]">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF8F5] text-[#956C36] flex items-center justify-center shrink-0 border border-[#E5DAC7]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5A6068] leading-relaxed border-t border-[#F5F0E8] animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
