import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { BUSINESS_WHATSAPP, BUSINESS_WHATSAPP_DISPLAY, BUSINESS_PHONE } from '../data/mockData';
import {
  CheckCircle2,
  X,
  MessageCircle,
  Copy,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const WhatsAppSuccessModal: React.FC = () => {
  const {
    isWhatsAppSuccessModalOpen,
    closeWhatsAppSuccessModal,
    lastSubmittedBooking,
    openMyBookings
  } = useBooking();

  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isWhatsAppSuccessModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeWhatsAppSuccessModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWhatsAppSuccessModalOpen, closeWhatsAppSuccessModal]);

  if (!isWhatsAppSuccessModalOpen || !lastSubmittedBooking) return null;

  const b = lastSubmittedBooking;

  // Format WhatsApp message strictly as requested in Section 13
  const rawWhatsAppText = `Hello MSB Event Management,

I would like to enquire about an event.

Name: ${b.fullName}
Phone: ${b.phoneNumber}
Event: ${b.eventType}
Date: ${b.eventDate}
Package: ${b.packageName || 'Custom Package'}
Venue: ${b.venueName || 'To be finalized'}
Location: ${b.eventLocation}
Expected Guests: ${b.expectedGuests || 'Not specified'}
Selected Services: ${b.additionalServices.length > 0 ? b.additionalServices.join(', ') : 'Standard package inclusions'}
Additional Requirements: ${b.additionalRequirements || 'None'}

Please confirm the availability and booking details.`;

  const encodedWhatsAppUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
    rawWhatsAppText
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleContinueWhatsApp = () => {
    window.open(encodedWhatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="whatsapp-success-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeWhatsAppSuccessModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 cursor-default"
      >
        
        {/* CLOSE / QUIT BUTTON */}
        <button
          onClick={closeWhatsAppSuccessModal}
          id="whatsapp-modal-close-btn"
          title="Quit / Close Dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F5] text-[#555] hover:text-[#1C1F23] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS ICON & HEADER (Strict wording: "Enquiry submitted", NOT "Booking confirmed") */}
        <div className="bg-[#FAF8F5] p-6 pb-5 border-b border-[#EDE6DA] text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Enquiry Submitted
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#1C1F23] mt-2">
            Enquiry Received by MSB Team!
          </h3>

          <p className="text-xs text-[#5A6068] mt-1 max-w-sm mx-auto">
            Reference No: <span className="font-mono font-bold text-[#1C1F23]">{b.referenceNumber}</span>. Your enquiry is currently <strong className="text-amber-700">PENDING</strong> verification by our senior coordinator.
          </p>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-7 space-y-4">
          
          {/* NOTICE: NOT CONFIRMED YET */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Please note: Submitting this form does not guarantee confirmed venue booking until our operations director verifies date clearances and deposit terms.
            </p>
          </div>

          {/* GENERATED FORMATTED WHATSAPP MESSAGE PREVIEW */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#373A40] flex items-center space-x-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Generated WhatsApp Enquiry Message</span>
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold text-[#956C36] hover:underline flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD4C4] font-mono text-xs text-[#2B2D2F] leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap select-all">
              {rawWhatsAppText}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-2.5 pt-2">
            
            {/* PRIMARY: CONTINUE ON WHATSAPP */}
            <button
              id="continue-on-whatsapp-btn"
              onClick={handleContinueWhatsApp}
              className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CONTINUE ON WHATSAPP</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
            </button>

            {/* SECONDARY BUTTONS ROW */}
            <div className="flex items-center space-x-2">
              <button
                id="whatsapp-success-quit-btn"
                onClick={closeWhatsAppSuccessModal}
                className="w-1/3 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#5A6068] hover:text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#F3EDE2] border border-[#DDD4C4] rounded-xl transition-all flex items-center justify-center cursor-pointer text-center"
              >
                Quit / Close
              </button>

              <button
                id="view-in-my-bookings-btn"
                onClick={() => {
                  closeWhatsAppSuccessModal();
                  openMyBookings();
                }}
                className="w-2/3 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#373A40] hover:text-[#1C1F23] bg-white hover:bg-[#FAF8F5] border border-[#DDD4C4] rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-[#956C36]" />
                <span>MY BOOKINGS</span>
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center text-gray-400">
            Whatsapp no: <span className="text-gray-600 font-semibold">{BUSINESS_WHATSAPP_DISPLAY}</span> &bull; Phone no: <span className="text-gray-600 font-semibold">{BUSINESS_PHONE}</span>
          </p>

        </div>

      </div>
    </div>
  );
};
