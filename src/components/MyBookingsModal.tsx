import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { BookingEnquiry, BookingStatus } from '../types';
import { BUSINESS_WHATSAPP } from '../data/mockData';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  Eye,
  MessageCircle,
  Sparkles,
  MapPin,
  Users,
  Building2,
  Trash2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const MyBookingsModal: React.FC = () => {
  const {
    isMyBookingsOpen,
    closeMyBookings,
    bookings,
    currentUser,
    cancelBooking,
    openBookingModal
  } = useBooking();

  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<BookingEnquiry | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<BookingEnquiry | null>(null);
  const [confirmCancelInDetails, setConfirmCancelInDetails] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (bookingToCancel) {
          setBookingToCancel(null);
        } else if (selectedBookingForDetails) {
          setSelectedBookingForDetails(null);
          setConfirmCancelInDetails(false);
        } else if (isMyBookingsOpen) {
          closeMyBookings();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingToCancel, selectedBookingForDetails, isMyBookingsOpen, closeMyBookings]);

  if (!isMyBookingsOpen) return null;

  // Filter for user or show demo sample cards
  const userBookings = currentUser
    ? bookings.filter(
        b =>
          b.email.toLowerCase() === currentUser.email.toLowerCase() ||
          b.phoneNumber === currentUser.phoneNumber
      )
    : bookings.slice(0, 3);

  // If user has no specific bookings, show all or top 3 for realistic demonstration
  const displayBookings = userBookings.length > 0 ? userBookings : bookings.slice(0, 3);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CONFIRMED</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>CANCELLED</span>
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>PENDING</span>
          </span>
        );
    }
  };

  const handleConfirmCancel = (target: BookingEnquiry) => {
    cancelBooking(target.id);
    if (selectedBookingForDetails && selectedBookingForDetails.id === target.id) {
      setSelectedBookingForDetails({
        ...selectedBookingForDetails,
        status: 'CANCELLED',
        updatedAt: new Date().toISOString()
      });
    }
    setBookingToCancel(null);
    setConfirmCancelInDetails(false);
    setCancelSuccessMsg(
      `Enquiry #${target.referenceNumber} (${target.eventType}) has been successfully cancelled. The date ${target.eventDate} has been released.`
    );
  };

  const handleCancelEnquiry = (target: BookingEnquiry | string) => {
    const item = typeof target === 'string' ? bookings.find(b => b.id === target) : target;
    if (item) {
      setBookingToCancel(item);
    }
  };

  return (
    <div
      id="my-bookings-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeMyBookings();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 max-h-[88vh] sm:max-h-[85vh] flex flex-col"
      >
        
        {/* CLOSE / QUIT BUTTON */}
        <button
          onClick={closeMyBookings}
          id="my-bookings-close-btn"
          aria-label="Quit and close My Bookings"
          title="Quit My Bookings"
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#444] hover:text-[#1C1F23] flex items-center space-x-1 border border-[#E5DAC7] transition-colors z-10 text-xs font-bold cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Quit</span>
        </button>

        {/* HEADER */}
        <div className="bg-[#FAF8F5] p-6 pb-5 border-b border-[#EDE6DA]">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-1">
            <Clock className="w-4 h-4 text-[#C5A059]" />
            <span>Customer Portal</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1F23]">
            MY BOOKINGS
          </h3>
          <p className="text-xs text-[#666B72] mt-1">
            Track real-time status of your event enquiries, reviews, and confirmed dates.
          </p>
        </div>

        {/* SUCCESS NOTIFICATION */}
        {cancelSuccessMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800 animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-medium">{cancelSuccessMsg}</span>
            </div>
            <button
              onClick={() => setCancelSuccessMsg(null)}
              className="text-rose-600 hover:text-rose-900 ml-2 font-bold cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* BOOKINGS LIST */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {displayBookings.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-serif text-lg font-semibold text-[#1C1F23]">No Bookings Found</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-6">
                You haven't submitted any event enquiries yet. Pick a date from our availability calendar to begin!
              </p>
              <button
                onClick={() => {
                  closeMyBookings();
                  openBookingModal();
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] rounded-md shadow-xs"
              >
                Plan An Event
              </button>
            </div>
          ) : (
            displayBookings.map((b) => (
              <div
                key={b.id}
                id={`my-booking-card-${b.id}`}
                className="bg-white rounded-xl p-5 border border-[#EDE6DA] shadow-xs hover:border-[#DEC388] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* LEFT INFO */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-serif text-xl font-bold text-[#1C1F23]">
                      {b.eventType}
                    </h4>
                    <span className="text-[11px] font-mono text-gray-500">
                      ({b.referenceNumber})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6068]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#956C36]" />
                      <strong className="text-[#2B2D2F]">{b.eventDate}</strong>
                    </span>
                    <span>•</span>
                    <span className="font-medium text-[#8C6D2B]">
                      {b.packageName || 'Custom Package'}
                    </span>
                    {b.venueName && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-[150px]">{b.venueName}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* RIGHT STATUS & ACTIONS */}
                <div className="flex items-center space-x-2 shrink-0">
                  {getStatusBadge(b.status)}

                  {b.status !== 'CANCELLED' && (
                    <button
                      id={`cancel-btn-${b.id}`}
                      onClick={() => setBookingToCancel(b)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                      title="Cancel Enquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  )}

                  <button
                    id={`view-details-btn-${b.id}`}
                    onClick={() => setSelectedBookingForDetails(b)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#1C1F23] bg-[#FAF8F5] hover:bg-[#F3EDE2] border border-[#DDD4C4] rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#956C36]" />
                    <span>VIEW DETAILS</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EDE6DA] flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            id="my-bookings-footer-quit-btn"
            onClick={closeMyBookings}
            className="px-3 py-1.5 rounded-lg border border-[#DDD4C4] bg-white text-gray-700 hover:text-black font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Quit / Close
          </button>
          <a
            href={`https://wa.me/${BUSINESS_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#956C36] font-semibold hover:underline flex items-center space-x-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>

      {/* DETAILS MODAL */}
      {selectedBookingForDetails && (
        <div
          id="booking-details-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedBookingForDetails(null);
              setConfirmCancelInDetails(false);
            }
          }}
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in"
        >
          <div
            id="booking-details-modal-card"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 my-auto"
          >
            {/* STICKY HEADER WITH QUIT BUTTON ALWAYS VISIBLE */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-[#EDE6DA] flex items-center justify-between bg-[#FAF8F5] sticky top-0 z-20">
              <div className="pr-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#956C36] block">
                  Enquiry Details • {selectedBookingForDetails.referenceNumber}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1F23] leading-tight">
                  {selectedBookingForDetails.eventType}
                </h4>
              </div>

              {/* PROMINENT QUIT BUTTON AT TOP-RIGHT */}
              <button
                type="button"
                id="booking-details-quit-top-btn"
                onClick={() => {
                  setSelectedBookingForDetails(null);
                  setConfirmCancelInDetails(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F2ECE1] active:bg-[#E5DAC7] text-gray-800 hover:text-black border border-[#DDD4C4] font-bold text-xs uppercase tracking-wider shadow-2xs transition-all cursor-pointer shrink-0"
                title="Quit and return to My Bookings"
                aria-label="Quit and close details"
              >
                <X className="w-4 h-4 text-[#1C1F23]" />
                <span>Quit</span>
              </button>
            </div>

            {/* SCROLLABLE CONTENT BODY */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs text-[#373A40]">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE6DA]">
                <span className="font-semibold uppercase text-[#555]">Status:</span>
                {getStatusBadge(selectedBookingForDetails.status)}
              </div>

              {/* CANCELLED STATUS NOTICE */}
              {selectedBookingForDetails.status === 'CANCELLED' && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Enquiry Cancelled</span>
                    <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      This booking enquiry has been cancelled. The event date <strong className="text-rose-900">{selectedBookingForDetails.eventDate}</strong> has been released and is now available on our calendar for new reservations.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EDE6DA]">
                  <span className="text-gray-500 block mb-0.5 text-[11px]">Event Date</span>
                  <span className="font-bold text-sm text-[#1C1F23]">{selectedBookingForDetails.eventDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EDE6DA]">
                  <span className="text-gray-500 block mb-0.5 text-[11px]">Package</span>
                  <span className="font-bold text-sm text-[#1C1F23]">{selectedBookingForDetails.packageName}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EDE6DA]">
                  <span className="text-gray-500 block mb-0.5 text-[11px]">Location</span>
                  <span className="font-semibold text-[#1C1F23]">{selectedBookingForDetails.eventLocation}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EDE6DA]">
                  <span className="text-gray-500 block mb-0.5 text-[11px]">Venue</span>
                  <span className="font-semibold text-[#1C1F23]">{selectedBookingForDetails.venueName || 'Not specified'}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block mb-1.5 font-medium">Selected Services:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBookingForDetails.additionalServices.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#DDD4C4] font-medium text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {selectedBookingForDetails.adminNotes && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                  <span className="font-bold block mb-0.5">MSB Operations Note:</span>
                  <p>{selectedBookingForDetails.adminNotes}</p>
                </div>
              )}

              {/* IN-BODY CANCELLATION CONFIRMATION */}
              {confirmCancelInDetails && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2.5 animate-in fade-in">
                  <div className="flex items-start space-x-2.5 text-xs text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-rose-900">Cancel this booking enquiry?</span>
                      <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                        Cancelling enquiry <span className="font-mono font-bold">#{selectedBookingForDetails.referenceNumber}</span> will immediately release your reserved date (<strong className="text-rose-900">{selectedBookingForDetails.eventDate}</strong>) on our calendar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-1 border-t border-rose-200/60">
                    <button
                      type="button"
                      id="cancel-details-abort-btn"
                      onClick={() => setConfirmCancelInDetails(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Keep Enquiry
                    </button>
                    <button
                      type="button"
                      id="cancel-details-confirm-btn"
                      onClick={() => {
                        handleConfirmCancel(selectedBookingForDetails);
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Yes, Cancel Enquiry</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STICKY FOOTER WITH QUIT/BACK AND ACTION BUTTONS */}
            <div className="shrink-0 p-3 sm:p-4 bg-[#FAF8F5] border-t border-[#EDE6DA] flex flex-wrap items-center justify-between gap-2.5 sticky bottom-0 z-10">
              <div className="flex items-center space-x-2">
                {selectedBookingForDetails.status !== 'CANCELLED' ? (
                  !confirmCancelInDetails && (
                    <button
                      id="details-cancel-enquiry-btn"
                      type="button"
                      onClick={() => setConfirmCancelInDetails(true)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Enquiry</span>
                    </button>
                  )
                ) : (
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Enquiry Cancelled</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-auto">
                <button
                  type="button"
                  id="booking-details-quit-footer-btn"
                  onClick={() => {
                    setSelectedBookingForDetails(null);
                    setConfirmCancelInDetails(false);
                  }}
                  className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-[#1C1F23] bg-white hover:bg-[#F2ECE1] active:bg-[#E5DAC7] border border-[#DDD4C4] rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 shadow-2xs"
                  title="Quit details view"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quit</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB,%20checking%20status%20for%20enquiry%20${selectedBookingForDetails.referenceNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg flex items-center space-x-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP CANCELLATION CONFIRMATION MODAL */}
      {bookingToCancel && (
        <div
          id="cancel-confirmation-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBookingToCancel(null);
            }
          }}
          className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 space-y-4"
          >
            <button
              type="button"
              id="cancel-confirmation-close-btn"
              onClick={() => setBookingToCancel(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              title="Quit dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start space-x-3.5 pr-6">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-[#1C1F23] font-serif">
                  Cancel Booking Enquiry?
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Are you sure you want to cancel your enquiry for{' '}
                  <strong className="text-[#1C1F23]">{bookingToCancel.eventType}</strong> on{' '}
                  <strong className="text-[#1C1F23]">{bookingToCancel.eventDate}</strong>?
                </p>
                <div className="mt-2.5 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Cancelling enquiry <span className="font-mono font-bold">#{bookingToCancel.referenceNumber}</span> will immediately release your reserved date on our calendar.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2.5 border-t border-gray-100">
              <button
                type="button"
                id="cancel-dialog-dismiss-btn"
                onClick={() => setBookingToCancel(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Keep Enquiry
              </button>
              <button
                type="button"
                id="cancel-dialog-confirm-btn"
                onClick={() => handleConfirmCancel(bookingToCancel)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Cancel Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
