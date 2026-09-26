import React, { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { X, Sparkles, Check, ArrowRight, Star, ZoomIn, Calendar, MapPin } from 'lucide-react';

export const DetailModals: React.FC = () => {
  const {
    selectedPackageForModal,
    closePackageDetail,
    openBookingModal,
    selectedGalleryItem,
    closeGalleryLightbox
  } = useBooking();

  const isPackageModalOpen = Boolean(selectedPackageForModal);
  const isGalleryLightboxOpen = Boolean(selectedGalleryItem);
  const activeLightboxItem = selectedGalleryItem;

  // Escape key closes open detail modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPackageModalOpen) closePackageDetail();
        if (isGalleryLightboxOpen) closeGalleryLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPackageModalOpen, isGalleryLightboxOpen, closePackageDetail, closeGalleryLightbox]);

  return (
    <>
      {/* 1. PACKAGE DETAIL MODAL */}
      {isPackageModalOpen && selectedPackageForModal && (
        <div
          id="package-detail-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePackageDetail();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 max-h-[90vh] flex flex-col cursor-default"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closePackageDetail}
              id="package-modal-close-btn"
              title="Quit / Close Details"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#555] hover:text-[#1C1F23] flex items-center justify-center transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* HEADER */}
            <div className="bg-[#FAF8F5] p-6 pb-5 border-b border-[#EDE6DA]">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-1">
                <span>{selectedPackageForModal.tag}</span>
                {selectedPackageForModal.popular && (
                  <span className="text-[10px] bg-[#1C1F23] text-[#E5B869] px-2 py-0.5 rounded-full font-bold">
                    MOST POPULAR
                  </span>
                )}
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1C1F23]">
                {selectedPackageForModal.name}
              </h3>
              <p className="text-xs text-[#666B72] mt-1">
                {selectedPackageForModal.description}
              </p>
            </div>

            {/* BODY */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              
              {/* PRICE BANNER */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DEC388]/60 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#666B72] block">Package Investment</span>
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1C1F23] tabular-nums">
                    {selectedPackageForModal.startingPrice}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C6D2B] italic">
                  Tailored to venue & requirements
                </span>
              </div>

              {/* INCLUSIONS LIST */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1F23] mb-3">
                  Comprehensive Inclusions Checklist:
                </h4>
                <div className="space-y-2.5">
                  {selectedPackageForModal.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#FAF8F5]">
                      <div className="w-5 h-5 rounded-full bg-[#1C1F23] text-[#E5B869] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-medium text-[#2B2D2F]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CUSTOMIZATION CALLOUT */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <strong className="block mb-1">Custom Architecture Notice:</strong>
                &ldquo;Packages can be customized based on your event, venue and requirements.&rdquo;
                We accommodate specific catering counters, custom floral color palettes, additional drone flights, and grand entries.
              </div>

            </div>

            {/* FOOTER BUTTONS */}
            <div className="p-5 bg-[#FAF8F5] border-t border-[#EDE6DA] flex items-center space-x-3">
              <button
                id="package-modal-quit-footer-btn"
                onClick={closePackageDetail}
                className="w-1/3 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-white border border-[#EDE6DA] hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-center"
              >
                Quit / Close
              </button>
              <button
                id="package-modal-book-footer-btn"
                onClick={() => {
                  closePackageDetail();
                  openBookingModal(undefined, selectedPackageForModal.id);
                }}
                className="w-2/3 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Select & Book Package</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. GALLERY LIGHTBOX MODAL */}
      {isGalleryLightboxOpen && activeLightboxItem && (
        <div
          id="gallery-lightbox-backdrop"
          onClick={closeGalleryLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#1C1F23] text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeGalleryLightbox}
              id="lightbox-close-btn"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* IMAGE WRAPPER */}
            <div className="relative w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            {/* CAPTION STRIP */}
            <div className="p-6 bg-[#1C1F23] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5B869] bg-white/10 px-2.5 py-0.5 rounded">
                    {activeLightboxItem.category}
                  </span>
                  {activeLightboxItem.eventDate && (
                    <span className="text-xs text-gray-400">
                      {activeLightboxItem.eventDate}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1 max-w-xl">
                  {activeLightboxItem.caption}
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  id="lightbox-quit-btn"
                  onClick={closeGalleryLightbox}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all cursor-pointer"
                >
                  Quit
                </button>
                <button
                  id="lightbox-enquire-btn"
                  onClick={() => {
                    closeGalleryLightbox();
                    openBookingModal();
                  }}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#D4B26F] rounded-lg shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  Enquire Similar Setup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
