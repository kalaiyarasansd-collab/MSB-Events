import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

export const AvailabilityCalendar: React.FC = () => {
  const {
    todayDateString,
    getDateState,
    selectedCalendarDate,
    setSelectedCalendarDate,
    openBookingModal
  } = useBooking();

  // Reference base month: dynamically initialized to current month
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(() => today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => today.getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleJumpToCurrent = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };

  // Build calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Format date helper
  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const handleDateClick = (dateStr: string) => {
    const { state } = getDateState(dateStr);
    const isPassed = state === 'PASSED' || dateStr < todayDateString;
    if (state === 'BOOKED' || state === 'BLOCKED' || isPassed) {
      // Booked or passed dates MUST NOT be selectable
      return;
    }
    setSelectedCalendarDate(dateStr);
  };

  const selectedDateState = selectedCalendarDate ? getDateState(selectedCalendarDate) : null;

  const formatDisplayDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="availability" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#EDE6DA] relative">
      <div id="calendar" className="absolute -top-20 invisible pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Check Event Availability
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Reserve Your Celebration Date
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Our live availability calendar lets you verify whether your prospective wedding, reception, or party date is open before submitting your enquiry.
          </p>
        </div>

        {/* CALENDAR CONTAINER & SELECTION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* CALENDAR MAIN WRAPPER */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EDE6DA] shadow-md p-6 sm:p-8">
            
            {/* MONTH CONTROLS BAR (Previous Month, Current Month, Next Month) */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-[#F0EAE0] gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#956C36]">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1F23]">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <span className="text-xs text-[#8C6D2B] font-medium">
                    Peak Wedding & Auspicious Muhurtham Season
                  </span>
                </div>
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center space-x-2">
                <button
                  id="calendar-prev-month-btn"
                  onClick={handlePrevMonth}
                  className="px-3 py-2 text-xs font-semibold text-[#4A4F55] hover:text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#F3EDE2] border border-[#E5DAC7] rounded-lg transition-all flex items-center space-x-1"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  id="calendar-current-month-btn"
                  onClick={handleJumpToCurrent}
                  className="px-3 py-2 text-xs font-semibold text-[#1C1F23] bg-[#F5EEDB] hover:bg-[#EBDCB2] border border-[#DEC388] rounded-lg transition-all"
                  title="Jump to Current Month"
                >
                  Current
                </button>

                <button
                  id="calendar-next-month-btn"
                  onClick={handleNextMonth}
                  className="px-3 py-2 text-xs font-semibold text-[#4A4F55] hover:text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#F3EDE2] border border-[#E5DAC7] rounded-lg transition-all flex items-center space-x-1"
                  title="Next Month"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DAY OF WEEK LABELS */}
            <div className="grid grid-cols-7 gap-2 text-center mb-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div
                  key={day}
                  className={`text-xs font-bold uppercase tracking-wider py-1.5 ${
                    idx === 0 ? 'text-red-700' : 'text-[#5A6068]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR DAYS GRID */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty leading cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 sm:h-16 rounded-xl bg-transparent" />
              ))}

              {/* Month Day Cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = formatDateString(currentYear, currentMonth, dayNum);
                const { state, booking } = getDateState(dateStr);
                const isSelected = selectedCalendarDate === dateStr;
                const isPassed = state === 'PASSED' || dateStr < todayDateString;
                const isBooked = state === 'BOOKED' || state === 'BLOCKED';
                const isPending = state === 'PENDING' && !isPassed;
                const isToday = dateStr === todayDateString;

                return (
                  <button
                    key={dateStr}
                    id={`calendar-cell-${dateStr}`}
                    disabled={isBooked || isPassed}
                    onClick={() => handleDateClick(dateStr)}
                    className={`relative h-14 sm:h-16 rounded-xl p-1.5 sm:p-2 text-left transition-all duration-200 flex flex-col justify-between border ${
                      isPassed
                        ? 'bg-stone-100/90 border-stone-200/90 text-stone-400 cursor-not-allowed opacity-75'
                        : isBooked
                        ? 'bg-rose-50/50 border-rose-200 text-gray-400 cursor-not-allowed opacity-85'
                        : isSelected
                        ? 'bg-[#C5A059] border-[#B38845] text-[#1C1F23] shadow-md ring-2 ring-[#C5A059]/30 -translate-y-0.5'
                        : isPending
                        ? 'bg-amber-50/70 border-amber-300 text-[#2B2D2F] hover:bg-amber-100/70 cursor-pointer'
                        : 'bg-white border-[#EDE6DA] text-[#2B2D2F] hover:bg-[#FAF8F5] hover:border-[#C5A059] cursor-pointer shadow-2xs'
                    }`}
                    title={
                      isPassed
                        ? 'Date Passed: Day has passed and cannot be booked'
                        : isBooked
                        ? `Date Booked: ${booking?.eventType || 'Reserved'}`
                        : isPending
                        ? 'Pending Enquiry'
                        : 'Available for booking'
                    }
                  >
                    {/* Day number & Today tag */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          isSelected
                            ? 'text-[#1C1F23] font-bold'
                            : isPassed
                            ? 'text-stone-400 line-through decoration-stone-300'
                            : isBooked
                            ? 'text-rose-400'
                            : 'text-[#2B2D2F]'
                        }`}
                      >
                        {dayNum}
                      </span>
                      {isToday && !isSelected && (
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#8C6D2B] bg-[#F5EEDB] px-1 py-0.2 rounded border border-[#DEC388]/60">
                          Today
                        </span>
                      )}
                    </div>

                    {/* STATUS INDICATOR BADGES */}
                    <div className="flex items-center justify-between mt-auto">
                      {isPassed && (
                        <span className="inline-flex items-center space-x-1 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-200/80 px-1 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                          <span className="hidden sm:inline">Passed</span>
                        </span>
                      )}

                      {isBooked && (
                        <span className="inline-flex items-center space-x-1 text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span className="hidden sm:inline">Booked</span>
                        </span>
                      )}

                      {isPending && !isSelected && (
                        <span className="inline-flex items-center space-x-1 text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="hidden sm:inline">Pending</span>
                        </span>
                      )}

                      {isSelected && (
                        <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider text-[#1C1F23] bg-white/70 px-1.5 py-0.5 rounded">
                          Selected
                        </span>
                      )}

                      {!isPassed && !isBooked && !isPending && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LEGEND UNDERNEATH (Available, Booked, Pending, Passed/Not Available, Selected) */}
            <div className="pt-6 mt-6 border-t border-[#F0EAE0] flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-[#5A6068]">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-white border border-emerald-500 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>Available (Clickable)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-600" />
                <span className="text-rose-800">Booked (Disabled)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-amber-800">Pending Enquiry</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-stone-300 border border-stone-400 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                </span>
                <span className="text-stone-600 font-semibold">Passed (Not Available)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#C5A059]" />
                <span className="text-[#8C6D2B] font-semibold">Selected Date</span>
              </div>
            </div>

          </div>

          {/* SIDE CARD: DATE SELECTION FEEDBACK */}
          <div className="lg:col-span-4 space-y-6">
            
            {selectedCalendarDate ? (
              <div className="bg-white rounded-2xl border-2 border-[#C5A059] shadow-lg p-6 sm:p-7 animate-in fade-in">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Date Selected</span>
                </div>

                <h4 className="font-serif text-2xl font-bold text-[#1C1F23] mb-4">
                  {formatDisplayDate(selectedCalendarDate)}
                </h4>

                {selectedCalendarDate < todayDateString || selectedDateState?.state === 'PASSED' ? (
                  <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 mb-6">
                    <div className="flex items-start space-x-2.5">
                      <AlertCircle className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-stone-900">
                          This date has already passed
                        </p>
                        <p className="text-xs text-stone-600 mt-1">
                          Booking enquiries cannot be placed for past dates. Please pick today or an upcoming celebration date on the calendar.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedDateState?.state === 'AVAILABLE' ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-6">
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          Great! This date is currently available.
                        </p>
                        <p className="text-xs text-emerald-700 mt-1">
                          No conflicting celebrations are scheduled for this date. We can lock stage production and team slots for your event.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedDateState?.state === 'PENDING' ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
                    <div className="flex items-start space-x-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-amber-900">
                          Pending Enquiry on this Date
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Another enquiry is awaiting final deposit. You can submit your requirements as a priority backup enquiry.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* PRIMARY CTA: CONTINUE TO BOOKING */}
                <button
                  id="calendar-continue-to-booking-btn"
                  disabled={selectedCalendarDate < todayDateString || selectedDateState?.state === 'PASSED'}
                  onClick={() => openBookingModal(selectedCalendarDate)}
                  className={`w-full py-4 px-5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 ${
                    selectedCalendarDate < todayDateString || selectedDateState?.state === 'PASSED'
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                      : 'text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white cursor-pointer'
                  }`}
                >
                  <span>CONTINUE TO BOOKING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-3">
                  Quick 2-minute enquiry • Instant WhatsApp confirmation
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#EDE6DA] shadow-xs p-6 sm:p-7 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#956C36] mx-auto mb-4">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-[#1C1F23] mb-2">
                  Select a Celebration Date
                </h4>
                <p className="text-xs text-[#5A6068] leading-relaxed mb-6">
                  Click on any open date on the calendar above to verify real-time availability and proceed directly to your custom package inquiry.
                </p>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC7] text-left">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C6D2B] mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Live Booking Synchronization</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Confirmed client bookings immediately mark dates as booked to prevent double-booking.
                  </p>
                </div>
              </div>
            )}

            {/* TRUST & PROMPT NOTE */}
            <div className="p-5 rounded-2xl bg-[#F5F0E8] border border-[#E5DAC7]">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#956C36] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1C1F23] uppercase tracking-wider mb-1">
                    Single Event Guarantee
                  </h5>
                  <p className="text-xs text-[#555] leading-relaxed">
                    To maintain pristine quality, our principal floral artisans and senior directors accept only a curated number of signature events per date.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
