import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { EventTypes } from './components/EventTypes';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { AvailabilityCalendar } from './components/AvailabilityCalendar';
import { Gallery } from './components/Gallery';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { DetailModals } from './components/DetailModals';
import { NotFoundPage } from './components/NotFoundPage';
import { ThankYouPage } from './components/ThankYouPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { CookieBanner } from './components/CookieBanner';
import { StickyMobileCTA } from './components/StickyMobileCTA';

const MainContent: React.FC = () => {
  const { currentView } = useBooking();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminDashboard />;
      case 'thank-you':
        return (
          <main className="pb-16 md:pb-0">
            <ThankYouPage />
            <Footer />
          </main>
        );
      case 'privacy':
        return (
          <main className="pb-16 md:pb-0">
            <PrivacyPolicy />
            <Footer />
          </main>
        );
      case 'terms':
        return (
          <main className="pb-16 md:pb-0">
            <TermsAndConditions />
            <Footer />
          </main>
        );
      case '404':
        return (
          <main className="pb-16 md:pb-0">
            <NotFoundPage />
            <Footer />
          </main>
        );
      case 'website':
      default:
        return (
          <main className="pb-16 md:pb-0">
            <Hero />
            <About />
            <EventTypes />
            <Services />
            <Packages />
            <AvailabilityCalendar />
            <Gallery />
            <TestimonialsFAQ />
            <Contact />
            <Footer />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1F23] font-sans antialiased selection:bg-[#DEC388]/40 selection:text-[#1C1F23]">
      <Navbar />

      {renderCurrentView()}

      {/* STICKY MOBILE CTA (Quick Call / WhatsApp / Book Event) */}
      <StickyMobileCTA />

      {/* PRIVACY COOKIE CONSENT BANNER */}
      <CookieBanner />

      {/* GLOBAL MODALS */}
      <AuthModal />
      <BookingModal />
      <WhatsAppSuccessModal />
      <MyBookingsModal />
      <DetailModals />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <MainContent />
    </BookingProvider>
  );
}

