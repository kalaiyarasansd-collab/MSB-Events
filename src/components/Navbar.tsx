import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBooking, AppView } from '../context/BookingContext';
import {
  User,
  ShieldCheck,
  Sparkles,
  Clock,
  LogOut,
  MessageCircle,
  X,
  Phone,
  MapPin,
  FileText,
  Cookie,
  RotateCcw,
  Calendar,
  Info,
  ChevronRight,
  HelpCircle,
  Home,
  Layers,
  Image,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import {
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  BUSINESS_WHATSAPP,
  BUSINESS_WHATSAPP_DISPLAY,
  BUSINESS_ADDRESS
} from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    openBookingModal,
    openAuthModal,
    openMyBookings,
    currentUser,
    logout,
    resetDemoData,
    bookings,
    currentView,
    setCurrentView,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useBooking();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Filter bookings for current user
  const userBookings = currentUser
    ? bookings.filter(
        b =>
          b.email.toLowerCase() === currentUser.email.toLowerCase() ||
          b.phoneNumber === currentUser.phoneNumber
      )
    : bookings.slice(0, 2); // default demo count for UI visibility

  const navSections = [
    {
      name: 'Home',
      description: 'Back to main overview',
      href: '#home',
      icon: Home
    },
    {
      name: 'About Us',
      description: 'Our heritage, 15+ years experience & team',
      href: '#about',
      icon: Info
    },
    {
      name: 'Event Types',
      description: 'Weddings, Receptions, Corporate & Birthdays',
      href: '#event-types',
      icon: Award
    },
    {
      name: 'Our Services',
      description: 'Full-Service Decor, Stage, Catering & Audio',
      href: '#services',
      icon: Layers
    },
    {
      name: 'Packages & Pricing',
      description: 'Silver, Gold, Platinum & Royal Packages',
      href: '#packages',
      icon: Sparkles
    },
    {
      name: 'Availability Calendar',
      description: 'Live real-time dates & booking availability',
      href: '#availability',
      icon: Calendar
    },
    {
      name: 'Gallery',
      description: 'Real celebrations, stage decor & lighting',
      href: '#gallery',
      icon: Image
    },
    {
      name: 'Testimonials & FAQ',
      description: 'Client reviews & frequently asked questions',
      href: '#testimonials',
      icon: HelpCircle
    },
    {
      name: 'Contact & Location',
      description: 'Thirukkanur, Puducherry & consultation booking',
      href: '#contact',
      icon: MapPin
    },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'website') {
      setCurrentView('website');
      window.location.hash = href;
      setTimeout(() => {
        const selector = href === '#calendar' ? '#availability, #calendar' : href;
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.location.hash = href;
      const selector = href === '#calendar' ? '#availability, #calendar' : href;
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateToView = (view: AppView) => {
    setIsMobileMenuOpen(false);
    setCurrentView(view);
    window.location.hash = view === 'website' ? '#home' : `#${view}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCookies = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  const handleResetData = () => {
    if (window.confirm('Reset demo bookings and dates to default data?')) {
      resetDemoData();
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/98 backdrop-blur-md shadow-sm border-b border-[#E8E0D2] py-2.5 sm:py-3'
            : 'bg-[#FAF8F5]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#E8E0D2]/60 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* BRAND LOGO & TITLE */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              id="brand-logo-link"
              className="group flex items-center space-x-2 sm:space-x-3 text-left focus:outline-none min-w-0 pr-1 sm:pr-0"
            >
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm border border-[#DEC388] group-hover:border-[#C5A059] group-hover:scale-105 transition-all shrink-0">
                <img
                  src="/msb-logo.svg"
                  alt="MSB Event Management Official Logo"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-serif text-[11px] xs:text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#1C1F23] group-hover:text-[#956C36] transition-colors leading-tight truncate">
                  MSB EVENT MANAGEMENT
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#8C6D2B] font-medium tracking-wider uppercase hidden sm:block">
                  Puducherry &bull; Luxury Celebrations
                </span>
              </div>
            </a>

            {/* RIGHT ACTION CONTROLS */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              {/* GOLD PILL BOOK BUTTON */}
              <button
                id="navbar-quick-book-cta"
                onClick={() => openBookingModal()}
                className="px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-full transition-all shadow-xs whitespace-nowrap active:scale-95 cursor-pointer flex items-center justify-center min-w-[54px] sm:min-w-[64px]"
              >
                BOOK
              </button>

              {/* 3-LINE HAMBURGER MENU BUTTON */}
              <button
                id="navbar-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8.5 h-8.5 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#1C1F23] hover:text-[#956C36] hover:bg-[#F3EDE2] active:bg-[#EAE0D0] focus:outline-none transition-colors shrink-0 p-1.5 sm:p-2 cursor-pointer"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {/* Animated 3-line hamburger bar */}
                <div className="w-4.5 sm:w-5 h-3.5 sm:h-4 relative flex flex-col justify-between items-center pointer-events-none">
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-[6px] sm:translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all duration-200 ease-in-out ${
                      isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] sm:-translate-y-[7px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL COMPREHENSIVE NAVIGATION DRAWER RENDERED VIA PORTAL TO PREVENT CLIPPING */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            id="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99998] animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div
            id="mobile-menu-drawer"
            className="fixed inset-y-0 right-0 w-full sm:max-w-md z-[99999] bg-[#FAF8F5] flex flex-col shadow-2xl border-l border-[#E8E0D2] animate-in slide-in-from-right duration-250"
          >
            {/* 1. DRAWER TOP HEADER WITH LOGO & CLOSE BUTTON */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#E8E0D2] flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DEC388] p-0.5 shadow-xs flex items-center justify-center">
                  <img
                    src="/msb-logo.svg"
                    alt="MSB Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#1C1F23] text-sm sm:text-base leading-tight">
                    MSB EVENT MANAGEMENT
                  </h3>
                  <p className="text-[11px] text-[#956C36] font-medium tracking-wide">
                    Luxury Celebrations & Decor
                  </p>
                </div>
              </div>
              <button
                id="menu-drawer-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#EAE0D0] text-[#1C1F23] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. TOP PROMINENT BOOKING PROMPT STRIP */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#FBF8F0] to-[#F5EEDB] border-b border-[#E5DAC7] flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-[#C5A059] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1C1F23] block leading-tight">
                    Plan Your 2026 Celebration
                  </span>
                  <span className="text-[10px] text-[#7A562F]">
                    Check availability & lock your date
                  </span>
                </div>
              </div>
              <button
                id="mobile-drawer-top-book-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-full shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Quick Book
              </button>
            </div>

            {/* 3. SCROLLABLE NAVIGATION & UTILITIES CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 overscroll-contain text-left">
              
              {/* SECTION A: MAIN NAVIGATION & ABOUT */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] mb-2 px-1">
                  Explore & Services
                </p>
                <nav className="space-y-1">
                  {navSections.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="group p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#E8E0D2] transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] group-hover:bg-[#F3EDE2] text-[#956C36] flex items-center justify-center shrink-0 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-[#1C1F23] group-hover:text-[#956C36] transition-colors leading-snug">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#956C36] transition-colors shrink-0 ml-2" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* SECTION B: LOGIN OR CREATE UTILITIES */}
              <div className="pt-2 border-t border-[#E8E0D2]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] mb-2 px-1">
                  Account & Client Utilities
                </p>

                {currentUser ? (
                  <div className="p-3.5 bg-white rounded-xl border border-[#DEC388]/60 shadow-xs space-y-3 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[#1C1F23] text-[#E5B869] flex items-center justify-center font-bold text-sm">
                        {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#1C1F23] truncate">
                          {currentUser.fullName || 'Valued Client'}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                        {currentUser.phoneNumber && (
                          <p className="text-[10px] text-[#8C6D2B] font-mono">
                            {currentUser.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openMyBookings();
                        }}
                        className="py-2 px-3 bg-[#FAF8F5] hover:bg-[#F3EDE2] text-[#1C1F23] rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#956C36]" />
                        <span>My Bookings ({userBookings.length})</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <button
                      id="drawer-signin-btn"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal();
                      }}
                      className="w-full p-3 bg-white border border-[#E5DAC7] hover:bg-[#F3EDE2] hover:border-[#C5A059] rounded-xl flex items-center space-x-2.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#FAF8F5] text-[#956C36] flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-[#1C1F23] block">
                          Sign In / Register
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Access your profile
                        </span>
                      </div>
                    </button>

                    <button
                      id="drawer-track-bookings-btn"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openMyBookings();
                      }}
                      className="w-full p-3 bg-white border border-[#E5DAC7] hover:bg-[#F3EDE2] hover:border-[#C5A059] rounded-xl flex items-center space-x-2.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#FAF8F5] text-[#956C36] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-[#1C1F23] block">
                          Track Bookings
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Check enquiry status
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Additional Utilities: Check Availability & Demo Data Reset */}
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => {
                      handleNavClick('#availability');
                    }}
                    className="w-full p-2.5 text-left text-xs font-medium text-[#1C1F23] bg-white border border-[#E8E0D2] hover:bg-[#F3EDE2] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#956C36]" />
                      <span>Live Date Availability Checker</span>
                    </span>
                    <span className="text-[10px] text-[#956C36] font-bold uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E0D2]">
                      Calendar
                    </span>
                  </button>

                  <button
                    onClick={handleResetData}
                    className="w-full p-2.5 text-left text-xs font-medium text-gray-600 bg-white border border-[#E8E0D2] hover:bg-gray-50 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center space-x-2">
                      <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                      <span>Reset Demo Bookings & State</span>
                    </span>
                    <span className="text-[10px] text-gray-400">Utility</span>
                  </button>
                </div>
              </div>

              {/* SECTION C: ADMIN PORTAL */}
              <div className="pt-2 border-t border-[#E8E0D2]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] mb-2 px-1">
                  Management & Portals
                </p>
                <div className="p-3.5 bg-gradient-to-br from-white to-[#FBF8F0] rounded-xl border border-[#DEC388] shadow-xs">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1C1F23] text-[#E5B869] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1C1F23]">
                          MSB Admin Portal
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Manage bookings, lock dates & view analytics
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      id="drawer-admin-portal-action-btn"
                      onClick={() => {
                        const next = currentView === 'admin' ? 'website' : 'admin';
                        navigateToView(next);
                      }}
                      className="w-full py-2 px-3 text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#DEC388]/40 hover:bg-[#DEC388] border border-[#C5A059]/40 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>{currentView === 'admin' ? 'Return to Website' : 'Open Admin Portal'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION D: PRIVACY POLICY, TERMS & COOKIES */}
              <div className="pt-2 border-t border-[#E8E0D2]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] mb-2 px-1">
                  Policies & Legal
                </p>
                <div className="space-y-1">
                  <button
                    id="drawer-privacy-policy-btn"
                    onClick={() => navigateToView('privacy')}
                    className="w-full p-2.5 text-left text-xs font-semibold text-[#2B2D2F] bg-white border border-[#E8E0D2] hover:bg-[#F3EDE2] hover:text-[#956C36] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-[#956C36]" />
                      <span>Privacy Policy</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    id="drawer-terms-btn"
                    onClick={() => navigateToView('terms')}
                    className="w-full p-2.5 text-left text-xs font-semibold text-[#2B2D2F] bg-white border border-[#E8E0D2] hover:bg-[#F3EDE2] hover:text-[#956C36] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-[#956C36]" />
                      <span>Terms & Conditions</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    id="drawer-cookies-btn"
                    onClick={handleOpenCookies}
                    className="w-full p-2.5 text-left text-xs font-semibold text-[#2B2D2F] bg-white border border-[#E8E0D2] hover:bg-[#F3EDE2] hover:text-[#956C36] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center space-x-2.5">
                      <Cookie className="w-4 h-4 text-[#956C36]" />
                      <span>Cookie & Privacy Preferences</span>
                    </span>
                    <span className="text-[10px] text-[#8C6D2B] font-semibold bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E0D2]">
                      Configure
                    </span>
                  </button>
                </div>
              </div>

              {/* SECTION E: DIRECT COORDINATION & OFFICE INFO */}
              <div className="pt-2 border-t border-[#E8E0D2]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] mb-2 px-1">
                  Direct Support & Hours
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-[#E8E0D2] space-y-2.5 text-xs">
                  <div className="flex items-center space-x-2.5 text-gray-700">
                    <Phone className="w-4 h-4 text-[#956C36] shrink-0" />
                    <a href={`tel:${BUSINESS_PHONE_TEL}`} className="font-mono font-bold hover:text-[#956C36] transition-colors">
                      {BUSINESS_PHONE}
                    </a>
                  </div>

                  <div className="flex items-center space-x-2.5 text-gray-700">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <a
                      href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20would%20like%20to%20enquire%20about%20event%20planning.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold hover:text-emerald-700 transition-colors"
                    >
                      WhatsApp: {BUSINESS_WHATSAPP_DISPLAY}
                    </a>
                  </div>

                  <div className="flex items-start space-x-2.5 text-gray-600 pt-1 border-t border-gray-100">
                    <MapPin className="w-4 h-4 text-[#956C36] shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <span className="font-semibold text-gray-800">MSB Studio & Office:</span>
                      <p className="text-[11px] text-gray-500">
                        {BUSINESS_ADDRESS}
                      </p>
                      <p className="text-[10px] text-[#8C6D2B] font-medium mt-0.5">
                        Open Daily: 9:00 AM &ndash; 9:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 4. PINNED STICKY BOTTOM ACTION BAR */}
            <div
              id="mobile-drawer-sticky-bottom-bar"
              className="shrink-0 p-3.5 bg-white border-t border-[#EDE6DA] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center gap-2.5 z-20"
            >
              <a
                id="mobile-drawer-bottom-whatsapp-btn"
                href={`https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20MSB%20Events,%20I%20would%20like%20to%20enquire%20about%20event%20planning.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
                title="WhatsApp MSB Coordinator"
                aria-label="WhatsApp MSB Coordinator"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>

              <button
                id="mobile-drawer-bottom-book-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#B38845] active:bg-[#956C36] text-[#1C1F23] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="truncate">Book Your Event Now</span>
              </button>
            </div>
          </div>
        </>
        ,
        document.body
      )}
    </>
  );
};
