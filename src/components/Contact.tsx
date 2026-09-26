import React, { useState } from 'react';
import {
  BUSINESS_WHATSAPP,
  BUSINESS_WHATSAPP_DISPLAY,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_CONSULTATION_HOURS,
  BUSINESS_INSTAGRAM,
  BUSINESS_INSTAGRAM_URL,
  SERVICE_AREAS
} from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle2,
  Compass,
  Loader2,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    phone: string;
    eventDate: string;
    message: string;
    whatsappUrl: string;
    whatsappMessage: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required.';
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone.trim() || digitsOnly.length < 8) {
      errs.phone = 'Valid phone number is required (e.g. +91 98401 23456).';
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Please provide your event details or questions.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent('Contact', 'consultation_form_submit');

    const formattedDate = eventDate ? eventDate : 'Flexible / To be confirmed';
    const whatsappMessage = 
`✨ *NEW DIRECT CALLBACK & CONSULTATION REQUEST* ✨
*MSB Event Management*

👤 *Client Name:* ${name.trim()}
📞 *Phone Number:* ${phone.trim()}
📅 *Tentative Event Date:* ${formattedDate}

📝 *Event Details / Questions:*
"${message.trim()}"

━━━━━━━━━━━━━━━━━━━━━━━
📍 *Office Location:* ${BUSINESS_ADDRESS}
📱 *Target Coordinator WhatsApp:* ${BUSINESS_WHATSAPP_DISPLAY}
_Submitted via MSB Event Management Official Website (Direct Callback Form)_`;

    // Direct WhatsApp URL to +91 73391 95148 (clean numeric 917339195148)
    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodedText}`;

    setLastSubmission({
      name: name.trim(),
      phone: phone.trim(),
      eventDate: formattedDate,
      message: message.trim(),
      whatsappUrl,
      whatsappMessage
    });

    // Synchronously trigger WhatsApp dispatch so popup blockers on mobile/desktop do not suppress it
    try {
      const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (!opened) {
          window.location.href = whatsappUrl;
        }
      }
    } catch (err) {
      console.warn('Could not launch WhatsApp URL automatically:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setErrors({});
  };

  const handleCopyMessage = () => {
    if (!lastSubmission?.whatsappMessage) return;
    navigator.clipboard.writeText(lastSubmission.whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F0E8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Let&rsquo;s Create Something Unforgettable
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            Visit our consultation studio or connect with our lead planners to discuss mood boards, dates, and venue layout ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: CONTACT CARDS & DETAILS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* ADDRESS CARD */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs flex items-start space-x-4">
              <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#DEC388]/60 flex items-center justify-center text-[#956C36] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1C1F23] mb-1">
                  Office & Experience Studio
                </h4>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5A6068] hover:text-[#956C36] leading-relaxed block transition-colors"
                  title="Open MSB Office in Google Maps"
                >
                  {BUSINESS_ADDRESS}
                </a>
              </div>
            </div>

            {/* SERVICE REGIONS & AVAILABILITY */}
            <div className="bg-white p-5 rounded-2xl border border-[#EDE6DA] shadow-xs flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#DEC388]/60 text-[#956C36] flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] block">
                  Service Coverage Areas
                </span>
                <p className="text-xs font-semibold text-[#1C1F23] mt-0.5">
                  {SERVICE_AREAS}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Dedicated decor & production logistics deployed across South India
                </p>
              </div>
            </div>

            {/* PHONE & EMAIL CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              <div className="bg-white p-5 rounded-2xl border border-[#EDE6DA] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] text-[#956C36] flex items-center justify-center mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-sans">Phone no</span>
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="font-sans text-sm sm:text-base font-semibold text-[#1C1F23] hover:text-[#956C36] mt-0.5 block transition-colors tabular-nums tracking-normal"
                >
                  {BUSINESS_PHONE}
                </a>
                <span className="text-[10px] text-gray-500 font-sans">Sun - Sat: 6:00 AM - 10:00 PM</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EDE6DA] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] text-[#956C36] flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-sans">Email Enquiries</span>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="font-sans text-sm sm:text-base font-semibold text-[#1C1F23] hover:text-[#956C36] mt-0.5 block truncate transition-colors tracking-normal"
                >
                  {BUSINESS_EMAIL}
                </a>
                <span className="text-[10px] text-gray-500 font-sans">Quick response guaranteed</span>
              </div>
            </div>

            {/* WHATSAPP QUICK CONNECT */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1 font-sans">
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Messaging</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-white">
                  WhatsApp Quick Connect
                </h4>
                <p className="text-xs text-emerald-100/90 mt-1 max-w-xs font-sans">
                  Whatsapp no: <span className="font-semibold text-emerald-200 font-sans tabular-nums">{BUSINESS_WHATSAPP_DISPLAY}</span> for instant catalog PDFs & date checks.
                </p>
              </div>

              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20would%20like%20to%20consult%20regarding%20an%20event.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg shadow-sm shrink-0 transition-colors"
              >
                Chat Now
              </a>
            </div>

            {/* BUSINESS HOURS & SOCIAL LINKS */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] flex items-center space-x-1 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Business Consultation Hours</span>
                </span>
                <p className="text-xs text-[#2B2D2F] font-semibold">
                  {BUSINESS_CONSULTATION_HOURS}
                </p>
                <p className="text-[11px] text-gray-500">
                  On-site consultations & venue visits 7 days a week
                </p>
              </div>

              <div className="flex items-center space-x-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EAE0]">
                <a
                  href={BUSINESS_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DDD4C4] text-[#333] hover:text-[#956C36] hover:border-[#C5A059] flex items-center space-x-1.5 text-xs font-semibold transition-colors"
                  title="Official Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>{BUSINESS_INSTAGRAM}</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: QUICK CONTACT FORM */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl border border-[#EDE6DA] shadow-md transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#956C36]">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>DIRECT CALLBACK</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp: {BUSINESS_WHATSAPP_DISPLAY}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1F23] mb-2 leading-tight">
              Send a Quick Consultation Message
            </h3>
            <p className="text-xs sm:text-sm text-[#666B72] mb-6 leading-relaxed">
              Fill out this quick note and our senior planner will ring you back within 60 minutes with date estimates.
            </p>

            {submitted && lastSubmission ? (
              <div className="p-5 sm:p-7 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center animate-in fade-in space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    WhatsApp Message Prepared
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950">
                    Callback Request Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md mx-auto leading-relaxed">
                    Your consultation note was formatted and routed to our Senior Coordinator at{' '}
                    <strong className="font-mono text-emerald-950 font-bold">{BUSINESS_WHATSAPP_DISPLAY}</strong>.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-emerald-200/80 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Destination:</span>
                    <span className="font-bold text-emerald-800 font-mono flex items-center space-x-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                      <span>{BUSINESS_WHATSAPP_DISPLAY}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Client Name:</span>
                    <span className="font-semibold text-gray-800">{lastSubmission.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-mono text-gray-800">{lastSubmission.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Event Date:</span>
                    <span className="font-medium text-gray-800">{lastSubmission.eventDate}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-500 block mb-1">Requirements / Note:</span>
                    <p className="text-gray-700 italic bg-gray-50 p-2.5 rounded-lg text-xs leading-relaxed">
                      &ldquo;{lastSubmission.message}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Responsive Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <a
                    href={lastSubmission.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Open WhatsApp Chat ({BUSINESS_WHATSAPP_DISPLAY})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full sm:w-auto py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#956C36] shrink-0" />
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEventDate('');
                      setMessage('');
                    }}
                    className="w-full sm:w-auto py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-900 bg-[#FAF8F5] border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(errors).length > 0 && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Please fill in all required fields accurately.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#373A40] mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Meera Raman"
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-[#FAF8F5] border rounded-xl focus:outline-none focus:bg-white transition-all shadow-2xs ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#DDD4C4] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] sm:text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#373A40] mb-1.5">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="+91 98401 23456"
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-[#FAF8F5] border rounded-xl focus:outline-none focus:bg-white transition-all shadow-2xs ${
                        errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-[#DDD4C4] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] sm:text-xs text-rose-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#373A40] mb-1.5">
                    TENTATIVE EVENT DATE
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-xl focus:outline-none focus:border-[#C5A059] focus:bg-white transition-all shadow-2xs text-[#1C1F23]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#373A40] mb-1.5">
                    EVENT DETAILS OR QUESTIONS *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                    }}
                    placeholder="Tell us about your event type, location, expected guest count, and any particular stage or decor ideas you have..."
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-[#FAF8F5] border rounded-xl focus:outline-none focus:bg-white transition-all shadow-2xs resize-y min-h-[110px] ${
                      errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-[#DDD4C4] focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] sm:text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-callback-submit-btn"
                    className={`w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1C1F23] rounded-xl shadow-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed ${
                      isSubmitting
                        ? 'bg-[#DEC388] cursor-not-allowed'
                        : 'bg-[#C5A059] hover:bg-[#B38845] active:bg-[#9E7736]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#1C1F23]" />
                        <span>Opening WhatsApp ({BUSINESS_WHATSAPP_DISPLAY})...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#1C1F23] shrink-0" />
                        <span>REQUEST CALLBACK & AVAILABILITY CHECK</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[11px] sm:text-xs text-[#5A6068] mt-2.5 text-center">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      Direct callback message routes instantly to WhatsApp <strong className="text-[#1C1F23] font-mono">{BUSINESS_WHATSAPP_DISPLAY}</strong>
                    </span>
                  </div>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
