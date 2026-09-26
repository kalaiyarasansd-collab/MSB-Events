import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Shield, Lock, Eye, Server, PhoneCall, Mail, MapPin } from 'lucide-react';
import { BUSINESS_PHONE, BUSINESS_PHONE_TEL, BUSINESS_EMAIL, BUSINESS_ADDRESS } from '../data/mockData';

export const PrivacyPolicy: React.FC = () => {
  const { setCurrentView } = useBooking();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => {
            window.location.hash = '';
            setCurrentView('website');
          }}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8C6D2B] hover:text-[#5F4A1E] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Title Header */}
        <div className="border-b border-[#EDE6DA] pb-8 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E5DAC7]/50 text-[#8C6D2B] text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparency & Trust</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1F23] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600">
            Last Updated: September 2026 • MSB Event Management (Puducherry & Tamil Nadu)
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              1. Introduction & Overview
            </h2>
            <p>
              At <strong>MSB Event Management</strong>, we respect the privacy of our clients, couples, and celebration hosts. This Privacy Policy outlines our transparent practices regarding the collection, handling, and protection of personal data when you interact with our website, inquire about event packages, or book dates for your weddings, receptions, and celebrations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              2. Information We Collect
            </h2>
            <p>To provide high-quality event planning and ensure flawless execution, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Contact Information:</strong> Full name, phone number, WhatsApp contact number, and email address.</li>
              <li><strong>Celebration Details:</strong> Event category (wedding, reception, birthday, etc.), planned date, venue location, estimated guest count, and décor preferences.</li>
              <li><strong>Service Requests:</strong> Selected stage themes, sound/lighting, catering live counters, grand entry special effects, and cinematic photography.</li>
              <li><strong>Technical & Usage Data:</strong> Browser type, approximate location, and site interactions (via privacy-friendly analytics cookies when enabled).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              3. Purpose of Processing
            </h2>
            <p>We utilize the collected information strictly for legitimate operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Checking calendar date availability and reserving your celebratory slot.</li>
              <li>Drafting customized quotation sheets and decorative stage concepts.</li>
              <li>Communicating via phone and WhatsApp regarding scheduling and site inspection.</li>
              <li>Coordinating dedicated vendor teams (lighting, catering, photography, pyrotechnics).</li>
              <li>Fulfilling statutory and accounting records under Indian law.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              4. Zero Sale of Personal Data
            </h2>
            <p>
              <strong>We never sell, rent, or lease your personal contact details to third-party telemarketers or external advertisers.</strong> Information is only shared with verified operational coordinators, delivery personnel, and technicians strictly on a need-to-know basis to execute your event.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              5. Cookies and Analytics
            </h2>
            <p>
              We use functional cookies to remember your session preferences and consent choices. Optional analytics cookies help us understand which event styles and package guides are most helpful to our clients. You can customize your cookie preferences at any time using our on-site cookie settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              6. Data Security & Storage
            </h2>
            <p>
              All customer booking records and inquiry submissions are encrypted in transit using standard Transport Layer Security (TLS/HTTPS). We apply industry-standard operational safeguards to protect your records from unauthorized alteration or access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              7. Your Rights
            </h2>
            <p>
              You have the right to request access to the information we hold about your inquiry, ask for corrections, or request deletion of your inquiry record once your event concludes. Contact us directly to exercise these rights.
            </p>
          </section>

          {/* Contact Details Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs mt-10 space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1C1F23]">
              Privacy Officer & Contact Details
            </h3>
            <p className="text-xs text-gray-600">
              For any questions regarding our privacy practices or data handling:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 font-sans">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#8C6D2B] shrink-0 mt-0.5" />
                <span>{BUSINESS_ADDRESS}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#8C6D2B] shrink-0" />
                <a href={`tel:${BUSINESS_PHONE_TEL}`} className="font-sans tabular-nums font-semibold text-gray-900 hover:underline">
                  {BUSINESS_PHONE}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#8C6D2B] shrink-0" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="font-sans font-semibold text-gray-900 hover:underline">
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="pt-10 mt-10 border-t border-[#EDE6DA] text-center">
          <button
            onClick={() => {
              window.location.hash = '';
              setCurrentView('website');
            }}
            className="px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1F23] hover:bg-[#343A40] rounded-lg transition-colors cursor-pointer"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};
