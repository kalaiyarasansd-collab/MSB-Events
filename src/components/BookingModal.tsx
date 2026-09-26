import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { EventType } from '../types';
import { PACKAGES_DATA, SERVICES_DATA } from '../data/mockData';
import {
  X,
  Calendar as CalendarIcon,
  Sparkles,
  MapPin,
  Users,
  Building2,
  CheckSquare,
  AlertCircle,
  Clock,
  ShieldAlert,
  Loader2,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    openAuthModal,
    openBookingModal,
    currentUser,
    selectedCalendarDate,
    submitBookingEnquiry,
    todayDateString,
    getDateState
  } = useBooking();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [packageId, setPackageId] = useState<string>('pkg-custom');
  const [venueName, setVenueName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [expectedGuests, setExpectedGuests] = useState('250 Guests');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Stage Decoration',
    'Candid Photography'
  ]);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [understandingCheckbox, setUnderstandingCheckbox] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate logged in user and selected date automatically
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName);
      setPhoneNumber(currentUser.phoneNumber);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedCalendarDate) {
      setEventDate(selectedCalendarDate);
    } else if (!eventDate) {
      // Default to next month date
      setEventDate('2026-10-25');
    }
  }, [selectedCalendarDate]);

  // Close on Escape key
  useEffect(() => {
    if (!isBookingModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBookingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingModalOpen, closeBookingModal]);

  if (!isBookingModalOpen) return null;

  // Enforce client account requirement: Users MUST have an account or create account to book
  if (!currentUser) {
    return (
      <div
        id="booking-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeBookingModal();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in cursor-pointer"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 cursor-default"
        >
          <button
            onClick={closeBookingModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-gray-500 hover:text-gray-900 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center mx-auto mb-4 text-[#8C6D2B] shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-[#956C36] bg-[#F5EEDB] px-3 py-1 rounded-full inline-block mb-2 border border-[#DEC388]/60">
            Account Required to Book
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#1C1F23]">
            Verified Account Required
          </h3>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            To reserve a celebration date and ensure direct coordinator communication, you must have an active client account with original contact credentials.
          </p>

          <div className="mt-6 flex flex-col space-y-2.5">
            <button
              onClick={() => {
                closeBookingModal();
                openAuthModal(() => {
                  openBookingModal(selectedCalendarDate || undefined, packageId);
                });
              }}
              className="w-full py-3 px-4 bg-[#C5A059] hover:bg-[#B38845] text-[#1C1F23] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Sign In / Create Account to Book
            </button>
            <button
              onClick={closeBookingModal}
              className="w-full py-2.5 px-4 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Cancel & Return
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleToggleService = (serviceName: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!phoneNumber.trim()) errs.phoneNumber = 'Phone number is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required.';
    if (!eventDate) errs.eventDate = 'Event date is required.';
    if (!eventLocation.trim()) errs.eventLocation = 'Event city/location is required.';
    if (!understandingCheckbox) {
      errs.understanding = 'Please acknowledge that this is an enquiry subject to confirmation.';
    }

    // Check if selected date is passed, booked or blocked
    if (eventDate) {
      const { state } = getDateState(eventDate);
      if (state === 'PASSED' || eventDate < todayDateString) {
        errs.eventDate = 'This date has already passed. Please select today or a future date.';
      } else if (state === 'BOOKED' || state === 'BLOCKED') {
        errs.eventDate = 'This date is already booked or reserved. Please select another date.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate smooth processing transition for realism
    await new Promise(res => setTimeout(res, 600));

    submitBookingEnquiry({
      fullName,
      phoneNumber,
      email,
      eventType,
      eventDate,
      packageId,
      venueName,
      eventLocation,
      expectedGuests,
      additionalServices: selectedServices,
      additionalRequirements
    });
    setIsSubmitting(false);
  };

  // Curated popular services list for quick multi-select
  const highlightServices = [
    'Stage Decoration',
    'Candid Photography',
    'Cinematic Videography',
    'Drone Shoot',
    'Grand Entrance Décor',
    'BMW Car Entry',
    'Cold Pyro Entry',
    'Dry Ice / Fog',
    '360° Video Booth',
    'DJ & Sound System',
    'LED Wall / Live Streaming',
    'Chocolate Fountain',
    'Live Popcorn Counter',
    'Anchor / MC'
  ];

  return (
    <div
      id="booking-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeBookingModal();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in cursor-pointer"
    >
      <div className="relative bg-white rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 cursor-default">
        
        {/* CLOSE / QUIT BUTTON */}
        <button
          onClick={closeBookingModal}
          id="booking-modal-close-btn"
          title="Quit / Close Form"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#555] hover:text-[#1C1F23] hover:bg-[#F3EDE2] flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="bg-[#FAF8F5] p-6 pb-5 border-b border-[#EDE6DA]">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-1">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Step 2 of 2 • Event Planning</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1F23]">
            BOOK YOUR EVENT
          </h3>
          <p className="text-xs text-[#666B72] mt-1">
            Share your celebration vision. Our event management team will review availability and prepare a detailed quotation.
          </p>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* TOP ERROR BANNER IF FORM INVALID */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Please correct the highlighted fields before submitting:</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-rose-700">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* VERIFIED CLIENT BADGE */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950">
            <div className="flex items-center space-x-2.5 min-w-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold block truncate">
                  Booking as Verified Client: {currentUser.fullName}
                </span>
                <span className="text-[11px] text-emerald-700 block truncate">
                  {currentUser.email} &bull; {currentUser.phoneNumber}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-300 shrink-0 ml-2">
              Verified Account
            </span>
          </div>

          {/* PERSONAL CONTACT DETAILS ROW (Locked to original registered credentials) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Full Name (Verified)
              </label>
              <input
                type="text"
                readOnly
                id="booking-fullname-input"
                value={fullName}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-[#DDD4C4] rounded-lg text-gray-800 cursor-not-allowed select-none font-medium"
                title="Client name is locked to your verified registered account"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Phone Number (Verified)
              </label>
              <input
                type="tel"
                readOnly
                id="booking-phone-input"
                value={phoneNumber}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-[#DDD4C4] rounded-lg text-gray-800 cursor-not-allowed select-none font-mono font-medium"
                title="Contact phone is locked to your verified registered account"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Email Address (Verified)
              </label>
              <input
                type="email"
                readOnly
                id="booking-email-input"
                value={email}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-[#DDD4C4] rounded-lg text-gray-800 cursor-not-allowed select-none font-medium truncate"
                title="Email is locked to your verified registered account"
              />
            </div>
          </div>

          {/* EVENT TYPE & EVENT DATE ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Event Type *
              </label>
              <select
                id="booking-event-type-select"
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
              >
                <option value="Wedding">Wedding</option>
                <option value="Wedding Reception">Wedding Reception</option>
                <option value="Engagement">Engagement</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Private Celebration">Private Celebration / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Event Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  id="booking-event-date-input"
                  min={todayDateString}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none focus:bg-white ${
                    errors.eventDate ? 'border-rose-400' : 'border-[#DDD4C4] focus:border-[#C5A059]'
                  }`}
                />
              </div>
              {errors.eventDate ? (
                <p className="text-[10px] text-rose-600 mt-1">{errors.eventDate}</p>
              ) : (
                <p className="text-[10px] text-emerald-700 mt-1 flex items-center space-x-1">
                  <span>Selected from availability calendar or custom date</span>
                </p>
              )}
            </div>
          </div>

          {/* PACKAGE SELECTION */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1.5">
              Select Package Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PACKAGES_DATA.map((pkg) => (
                <button
                  type="button"
                  key={pkg.id}
                  id={`booking-select-pkg-${pkg.id}`}
                  onClick={() => setPackageId(pkg.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    packageId === pkg.id
                      ? 'bg-[#FBF8F0] border-[#C5A059] ring-2 ring-[#C5A059]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E8E0D2] hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-[#1C1F23]">{pkg.name}</p>
                  <p className="text-[11px] text-[#956C36] font-semibold">{pkg.startingPrice}</p>
                </button>
              ))}
            </div>
          </div>

          {/* VENUE & LOCATION & EXPECTED GUESTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Venue Name (Optional)
              </label>
              <input
                type="text"
                id="booking-venue-input"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. ITC Grand Chola / Leela"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Event Location / City *
              </label>
              <input
                type="text"
                required
                id="booking-location-input"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="e.g. Chennai, Coimbatore, Bangalore"
                className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none focus:bg-white ${
                  errors.eventLocation ? 'border-rose-400' : 'border-[#DDD4C4] focus:border-[#C5A059]'
                }`}
              />
              {errors.eventLocation && <p className="text-[10px] text-rose-600 mt-1">{errors.eventLocation}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                Expected Guests
              </label>
              <select
                id="booking-guests-select"
                value={expectedGuests}
                onChange={(e) => setExpectedGuests(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
              >
                <option value="50 Guests (Intimate)">50 Guests (Intimate)</option>
                <option value="100 to 200 Guests">100 to 200 Guests</option>
                <option value="250 to 500 Guests">250 to 500 Guests</option>
                <option value="500 to 1000 Guests">500 to 1000 Guests</option>
                <option value="1000+ Guests (Royal Grand)">1000+ Guests (Royal Grand)</option>
              </select>
            </div>
          </div>

          {/* ADDITIONAL SERVICES MULTI-SELECT CHIPS */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40]">
                Additional Services (Select Multiple)
              </label>
              <span className="text-[11px] text-[#8C6D2B]">
                {selectedServices.length} chosen
              </span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-[#FAF8F5] rounded-xl border border-[#EDE6DA]">
              {highlightServices.map((srv) => {
                const checked = selectedServices.includes(srv);
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => handleToggleService(srv)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      checked
                        ? 'bg-[#1C1F23] text-[#E5B869] border border-[#1C1F23]'
                        : 'bg-white text-[#4A4F55] border border-[#DDD4C4] hover:bg-gray-50'
                    }`}
                  >
                    {checked ? '✓ ' : '+ '}
                    {srv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ADDITIONAL REQUIREMENTS / MESSAGE */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
              Additional Requirements / Theme Notes
            </label>
            <textarea
              rows={2}
              id="booking-requirements-input"
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="e.g. Prefer pastel flower colors, special groom entry with fireworks, saxophone music during dining..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
            />
          </div>

          {/* MANDATORY CHECKBOX (Prompt requirement Section 12) */}
          <div className="p-3.5 rounded-xl bg-[#F5F0E8] border border-[#DEC388]/60">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                required
                id="booking-understanding-checkbox"
                checked={understandingCheckbox}
                onChange={(e) => setUnderstandingCheckbox(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#956C36] rounded border-gray-300 focus:ring-[#C5A059]"
              />
              <span className="text-xs text-[#373A40] leading-snug">
                &ldquo;I understand this is an enquiry and the booking will only be confirmed after confirmation from MSB Event Management.&rdquo;
              </span>
            </label>
            {errors.understanding && (
              <p className="text-[10px] text-rose-600 mt-1 pl-7">{errors.understanding}</p>
            )}
          </div>

          {/* SUBMIT BUTTON & QUIT BUTTON */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center gap-3">
            <button
              type="button"
              id="booking-modal-quit-btn"
              onClick={closeBookingModal}
              className="w-full sm:w-auto px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#5A6068] hover:text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#F3EDE2] rounded-xl border border-[#EDE6DA] transition-all cursor-pointer text-center active:scale-98"
            >
              Quit / Cancel
            </button>
            <button
              type="submit"
              id="booking-form-submit-btn"
              disabled={isSubmitting}
              className={`flex-1 w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1C1F23] rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 ${
                isSubmitting
                  ? 'bg-[#E5DAC7] cursor-not-allowed opacity-80'
                  : 'bg-[#C5A059] hover:bg-[#B38845] hover:text-white cursor-pointer active:scale-98'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#1C1F23]" />
                  <span>VERIFYING DATE & CREATING ENQUIRY...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>SEND BOOKING ENQUIRY</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500 mt-2">
            Next Step: Instantly preview and forward your formatted enquiry via WhatsApp
          </p>

        </form>

      </div>
    </div>
  );
};
