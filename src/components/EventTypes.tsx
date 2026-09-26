import React, { useState } from 'react';
import { EVENT_TYPES, EventTypeItem } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { ArrowRight, Sparkles, Calendar, Info, X } from 'lucide-react';

export const EventTypes: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventTypeItem | null>(null);

  const handleEnquireEvent = (eventItem: EventTypeItem) => {
    setSelectedEventForModal(null);
    openBookingModal();
  };

  return (
    <section id="event-types" className="py-20 sm:py-28 bg-[#F5F0E8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Events We Create
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Bespoke Celebrations for Life’s Greatest Milestones
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Every occasion demands a distinct soul and signature aesthetic. Explore our core event specializations meticulously styled by MSB Event Management.
          </p>
        </div>

        {/* 8 EVENT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {EVENT_TYPES.map((event) => (
            <div
              key={event.id}
              id={`event-card-${event.id}`}
              className="group bg-white rounded-xl overflow-hidden border border-[#E8E0D2] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F23]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Event Name Tag on Image */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1C1F23] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
                    {event.highlightTag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif text-xl font-semibold text-white tracking-tight drop-shadow-xs">
                    {event.name}
                  </h3>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <p className="text-xs sm:text-sm text-[#5A6068] leading-relaxed mb-5 line-clamp-3">
                  {event.shortDesc}
                </p>

                {/* EXPLORE BUTTON */}
                <div className="pt-3 border-t border-[#F0EAE0] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedEventForModal(event)}
                    id={`explore-btn-${event.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#956C36] group-hover:text-[#66462A] flex items-center space-x-1 transition-colors"
                  >
                    <span>Explore Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleEnquireEvent(event)}
                    id={`book-event-type-btn-${event.id}`}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#C5A059] hover:text-white px-2.5 py-1 rounded-md border border-[#E5DAC7] transition-all"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-14 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#1C1F23]">Planning a custom celebration or destination event?</h4>
            <p className="text-xs text-[#5A6068]">We coordinate private celebrations across resorts, farmhouses, and heritage palaces.</p>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-md shadow-xs transition-colors shrink-0"
          >
            Discuss Custom Event
          </button>
        </div>

      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95">
            <div className="relative h-60">
              <img
                src={selectedEventForModal.imageUrl}
                alt={selectedEventForModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F23] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  MSB Specialization
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {selectedEventForModal.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-[#4A4F55] leading-relaxed mb-6">
                {selectedEventForModal.fullDesc}
              </p>

              <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5DAC7] mb-6">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C6D2B] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Included in every MSB event</span>
                </div>
                <p className="text-xs text-[#555]">
                  Dedicated event director, vendor schedule synchronization, backup technical rigs, and end-to-end rehearsal.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedEventForModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#666] hover:text-[#1C1F23]"
                >
                  Close
                </button>
                <button
                  onClick={() => handleEnquireEvent(selectedEventForModal)}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-md shadow-xs transition-colors"
                >
                  Book for this Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
