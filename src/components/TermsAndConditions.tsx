import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Scale, CheckCircle, Calendar, AlertCircle, MapPin, PhoneCall, Mail } from 'lucide-react';
import { BUSINESS_PHONE, BUSINESS_PHONE_TEL, BUSINESS_EMAIL, BUSINESS_ADDRESS } from '../data/mockData';

export const TermsAndConditions: React.FC = () => {
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
            <Scale className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1F23] mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600">
            Effective Date: September 2026 • MSB Event Management Client Agreement
          </p>
        </div>

        {/* Terms Body */}
        <div className="space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website of <strong>MSB Event Management</strong>, submitting an event booking enquiry, or confirming an event contract, you agree to comply with and be bound by the following terms, conditions, and operational policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              2. Booking Inquiries & Calendar Reservation
            </h2>
            <p>
              Submission of an enquiry through our online booking tool initiates a provisional hold on our availability calendar. Official date locking and reservation are formalized upon receipt of the agreed initial booking advance token and signed work order.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Inquiries remain in provisional status until verified by our coordinator.</li>
              <li>A reserved date prevents any competing inquiries from booking the same calendar slot.</li>
              <li>Event packages may be customized with add-on services up to 14 days before the event date.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              3. Cancellation & Date Release Policy
            </h2>
            <p>
              We understand plans can evolve. In the event of cancellation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Customer Portal Cancellation:</strong> You may cancel provisional inquiries directly via the "My Bookings" portal, which immediately frees the date for other celebrants.</li>
              <li><strong>Confirmed Bookings:</strong> Cancellations made more than 30 days prior to the event are eligible for date transfer or partial refund as outlined in the work order.</li>
              <li><strong>Short Notice Cancellations:</strong> Cancellations made within 14 days of the scheduled date may forfeit advance deposits due to pre-purchased perishable flowers and custom structural fabrication.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              4. Venue Permissions & Site Access
            </h2>
            <p>
              The client is responsible for securing necessary venue permissions, basic electrical power points, and clearance for stage setup at least 6 to 10 hours prior to the event start time. MSB Event Management will provide all technical specifications and power requirement sheets in advance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              5. Payment Schedules & Settlement
            </h2>
            <p>
              Unless otherwise mutually documented:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>Booking Advance:</strong> 30% upon confirmation to lock date and begin stage procurement.</li>
              <li><strong>Interim Payment:</strong> 50% one week prior to event commencement.</li>
              <li><strong>Final Balance:</strong> 20% settlement upon completion of stage handover at the event venue.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              6. Force Majeure
            </h2>
            <p>
              Neither party shall be held liable for failure or delay in executing services due to events beyond reasonable control, including natural calamities, extreme acts of weather, strikes, government lockdown regulations, or power grid failures. In such cases, MSB will work cooperatively with the client to reschedule the celebration date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1C1F23]">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the courts in Puducherry / Tamil Nadu.
            </p>
          </section>

          {/* Contact Details Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs mt-10 space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1C1F23]">
              MSB Event Management Business Office
            </h3>
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
