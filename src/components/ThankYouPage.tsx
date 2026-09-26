import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, MessageCircle, Calendar, PhoneCall, Home, FileText, ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';
import { BUSINESS_WHATSAPP, BUSINESS_PHONE, BUSINESS_PHONE_TEL, BUSINESS_EMAIL, BUSINESS_ADDRESS } from '../data/mockData';

export const ThankYouPage: React.FC = () => {
  const { lastSubmittedBooking, setCurrentView, openMyBookings } = useBooking();

  const booking = lastSubmittedBooking || {
    referenceNumber: 'MSB-2026-ENQ',
    fullName: 'Valued Guest',
    eventType: 'Grand Celebration',
    eventDate: '2026-10-15',
    eventLocation: 'Puducherry / Tamil Nadu',
    packageName: 'Royal Sovereign Package',
    additionalServices: ['Luxury Stage Decor', 'Grand Celebrity Entry', 'Cinematic 4K Photography'],
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[90vh] bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Top Congratulation Banner */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#E5DAC7]/40 text-[#8C6D2B] text-xs font-semibold uppercase tracking-widest">
            Enquiry Successfully Submitted
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1F23]">
            Thank You for Choosing MSB!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Your celebration enquiry has been safely received. Our chief event coordinator is reviewing your details to ensure an unforgettable experience.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl border border-[#EDE6DA] shadow-lg p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Enquiry Reference Number
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#1C1F23]">
                #{booking.referenceNumber}
              </span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold self-start sm:self-center">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Coordinator Review</span>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC7]/60">
              <span className="text-gray-500 block mb-1 text-xs">Event Type</span>
              <span className="font-bold text-[#1C1F23] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#8C6D2B]" />
                <span>{booking.eventType}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC7]/60">
              <span className="text-gray-500 block mb-1 text-xs">Requested Event Date</span>
              <span className="font-bold text-[#1C1F23] flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#8C6D2B]" />
                <span>{booking.eventDate}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC7]/60">
              <span className="text-gray-500 block mb-1 text-xs">Event Location</span>
              <span className="font-semibold text-[#1C1F23] flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#8C6D2B]" />
                <span>{booking.eventLocation}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC7]/60">
              <span className="text-gray-500 block mb-1 text-xs">Selected Package</span>
              <span className="font-semibold text-[#1C1F23]">
                {booking.packageName || 'Custom Tailored Package'}
              </span>
            </div>
          </div>

          {booking.additionalServices && booking.additionalServices.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                Requested Services:
              </span>
              <div className="flex flex-wrap gap-2">
                {booking.additionalServices.map((svc, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#DDD4C4] text-xs font-medium text-[#1C1F23]"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps Roadmap */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1F23] mb-3 font-serif">
              What Happens Next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-[#E5DAC7] text-[#1C1F23] font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-[#1C1F23] block">Coordinator Verification (Within 2 Hours)</strong>
                  <span className="text-gray-600">
                    Our lead planner verifies calendar slot availability and prepares your customized décor & production plan.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-[#E5DAC7] text-[#1C1F23] font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-[#1C1F23] block">Direct Consultation & Itemized Estimate</strong>
                  <span className="text-gray-600">
                    We connect via WhatsApp or phone call with a comprehensive proposal, 3D theme concepts, and budget estimate.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-[#E5DAC7] text-[#1C1F23] font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-[#1C1F23] block">Advance Token & Date Lock</strong>
                  <span className="text-gray-600">
                    Upon agreement, an advance token locks your event date on our official calendar, ensuring 100% exclusive execution.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Connect Options */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs">
          <div className="text-left">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Want Instant Priority Response?
            </span>
            <span className="text-sm font-bold text-[#1C1F23]">
              Send your reference number directly to our lead coordinator on WhatsApp.
            </span>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20just%20submitted%20booking%20enquiry%20${booking.referenceNumber}%20for%20${booking.eventType}%20on%20${booking.eventDate}.%20Please%20assist.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Navigation & Utilities */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              window.location.hash = '';
              setCurrentView('website');
            }}
            className="px-5 py-2.5 rounded-lg bg-[#1C1F23] hover:bg-[#343A40] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => openMyBookings()}
            className="px-5 py-2.5 rounded-lg bg-white border border-[#EDE6DA] hover:border-[#C5A059] text-[#1C1F23] text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#8C6D2B]" />
            <span>View in My Bookings</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-lg bg-white border border-[#EDE6DA] hover:border-gray-400 text-gray-700 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Registered Address Verification */}
        <div className="text-center text-xs text-gray-500 pt-6 border-t border-[#EDE6DA] font-sans">
          <span>MSB Event Management Headquarters: </span>
          <strong className="text-gray-700 font-medium">{BUSINESS_ADDRESS}</strong>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans">
            <span className="text-gray-500 font-medium">Direct Hotline:</span>
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              className="font-sans font-semibold text-[#8C6D2B] hover:text-[#1C1F23] hover:underline tabular-nums tracking-wide transition-colors"
            >
              {BUSINESS_PHONE}
            </a>
            <span className="text-[#C5A059]/60 font-normal select-none">|</span>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="font-sans font-semibold text-[#1C1F23] hover:text-[#8C6D2B] hover:underline transition-colors tracking-normal"
            >
              {BUSINESS_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
