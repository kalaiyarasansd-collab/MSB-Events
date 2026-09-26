import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';
import { useBooking } from '../context/BookingContext';
import { Sparkles, ZoomIn, Eye, Calendar, X, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Weddings',
  'Receptions',
  'Birthdays',
  'Decorations',
  'Grand Entries',
  'Photography'
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { openGalleryLightbox, openBookingModal } = useBooking();

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Show 6 items initially, or all if showAllEvents is true
  const displayedItems = showAllEvents ? filteredItems : filteredItems.slice(0, 8);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F5F0E8]/50 border-b border-[#EDE6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Visual Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Moments Captured In Timeless Glory
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Witness the warmth, scale, and meticulous detailing across our recent weddings, royal stage designs, and grand entries.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`gallery-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAllEvents(false);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#1C1F23] text-white border-[#1C1F23] shadow-xs'
                    : 'bg-white text-[#4A4F55] hover:text-[#1C1F23] border-[#E8E0D2] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* GALLERY GRID (Masonry feel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => openGalleryLightbox(item)}
              className={`group relative rounded-xl overflow-hidden bg-gray-200 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 ${
                index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2 h-80 sm:h-auto min-h-[380px]' : 'h-64 sm:h-72'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              
              {/* SOFT LUXURY GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F23]/90 via-[#1C1F23]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5" />

              {/* TOP CHIP */}
              <div className="absolute top-3 left-3 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1F23] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* ZOOM ICON */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* BOTTOM CAPTION */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-xs text-[#E5B869] uppercase font-bold tracking-wider mb-1">
                  {item.eventDate || 'MSB Signature'}
                </p>
                <h4 className="font-serif text-lg font-bold text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#E8E0D2]/90 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE EVENTS BUTTON */}
        <div className="mt-14 text-center">
          <button
            id="gallery-view-more-btn"
            onClick={() => setShowAllEvents(!showAllEvents)}
            className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-white hover:bg-[#F3EDE2] border border-[#DDD4C4] rounded-md transition-all shadow-xs hover:shadow-md inline-flex items-center space-x-2"
          >
            <span>{showAllEvents ? 'SHOW LESS' : 'VIEW MORE EVENTS'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#956C36]" />
          </button>
        </div>

      </div>
    </section>
  );
};
