import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BookingEnquiry,
  BookingStatus,
  BlockedDate,
  UserProfile,
  CalendarDateState,
  PackageItem,
  GalleryItem
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_BLOCKED_DATES,
  PACKAGES_DATA
} from '../data/mockData';
import { updatePageSEO } from '../utils/seo';
import { trackPageView } from '../utils/analytics';

export type AppView = 'website' | 'admin' | '404' | 'privacy' | 'terms' | 'thank-you';

interface BookingContextType {
  // Data
  bookings: BookingEnquiry[];
  blockedDates: BlockedDate[];
  currentUser: UserProfile | null;
  selectedCalendarDate: string | null;
  lastSubmittedBooking: BookingEnquiry | null;

  // View state
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Modals
  isAuthModalOpen: boolean;
  openAuthModal: (intendedAction?: () => void) => void;
  closeAuthModal: () => void;

  isBookingModalOpen: boolean;
  openBookingModal: (initialDate?: string, initialPackageId?: string) => void;
  closeBookingModal: () => void;

  isWhatsAppSuccessModalOpen: boolean;
  openWhatsAppSuccessModal: (booking: BookingEnquiry) => void;
  closeWhatsAppSuccessModal: () => void;

  isMyBookingsOpen: boolean;
  openMyBookings: () => void;
  closeMyBookings: () => void;

  selectedPackageForModal: PackageItem | null;
  openPackageDetail: (pkg: PackageItem) => void;
  closePackageDetail: () => void;

  selectedGalleryItem: GalleryItem | null;
  openGalleryLightbox: (item: GalleryItem) => void;
  closeGalleryLightbox: () => void;

  // Availability & Business Logic
  todayDateString: string;
  getDateState: (dateStr: string) => {
    state: CalendarDateState;
    booking?: BookingEnquiry;
    blocked?: BlockedDate;
  };
  setSelectedCalendarDate: (date: string | null) => void;

  // Actions
  submitBookingEnquiry: (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    eventType: BookingEnquiry['eventType'];
    eventDate: string;
    packageId?: string;
    venueName?: string;
    eventLocation: string;
    expectedGuests?: string;
    additionalServices: string[];
    additionalRequirements?: string;
  }) => BookingEnquiry;
  confirmBooking: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  toggleBlockDate: (dateStr: string, reason?: string) => void;

  // Auth mock
  login: (data: { email: string; fullName?: string; phoneNumber?: string }) => void;
  logout: () => void;
  resetDemoData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY_BOOKINGS = 'msb_event_bookings_real_v2';
const STORAGE_KEY_BLOCKED = 'msb_event_blocked_dates_real_v2';
const STORAGE_KEY_USER = 'msb_event_user_real_v2';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge any legacy sample mock bookings cached from earlier sessions
  try {
    localStorage.removeItem('msb_event_bookings_v1');
    localStorage.removeItem('msb_event_blocked_dates_v1');
  } catch {
    // ignore
  }

  // Load real-time state from LocalStorage or empty defaults
  const [bookings, setBookings] = useState<BookingEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOCKED);
      return saved ? JSON.parse(saved) : INITIAL_BLOCKED_DATES;
    } catch {
      return INITIAL_BLOCKED_DATES;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Calculate today's date formatted as YYYY-MM-DD
  const todayDateString = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  })();

  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [lastSubmittedBooking, setLastSubmittedBooking] = useState<BookingEnquiry | null>(null);

  // Initialize view from URL hash/path - Always default to home page on visit
  const getInitialView = (): AppView => {
    if (typeof window === 'undefined') return 'website';
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    if (hash === 'admin') return 'admin';
    // Clear any residual privacy/terms hash on initial site load so the user sees home page only
    if (hash === 'privacy' || hash === 'terms') {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        // ignore
      }
      return 'website';
    }
    if (hash === 'thank-you' || hash === 'thankyou') return 'thank-you';
    if (hash === '404') return '404';
    return 'website';
  };

  const [currentView, setCurrentView] = useState<AppView>(getInitialView);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic SEO & Meta Update on every page/view change
  useEffect(() => {
    updatePageSEO(currentView);
    trackPageView(currentView);
    // Scroll to top when switching full page views
    if (currentView !== 'website') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  // Listen for hash navigation changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      if (hash === 'admin') setCurrentView('admin');
      else if (hash === 'privacy') setCurrentView('privacy');
      else if (hash === 'terms') setCurrentView('terms');
      else if (hash === 'thank-you' || hash === 'thankyou') setCurrentView('thank-you');
      else if (hash === '404') setCurrentView('404');
      else setCurrentView('website');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntendedAction, setAuthIntendedAction] = useState<(() => void) | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [initialBookingDate, setInitialBookingDate] = useState<string | undefined>(undefined);
  const [initialBookingPackage, setInitialBookingPackage] = useState<string | undefined>(undefined);
  const [isWhatsAppSuccessModalOpen, setIsWhatsAppSuccessModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<PackageItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (err) {
      console.warn('Could not save bookings to localStorage', err);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BLOCKED, JSON.stringify(blockedDates));
    } catch (err) {
      console.warn('Could not save blocked dates to localStorage', err);
    }
  }, [blockedDates]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (err) {
      console.warn('Could not save user to localStorage', err);
    }
  }, [currentUser]);

  // Handle URL hash changes for #admin or /admin
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin') {
        setCurrentView('admin');
      } else if (hash === '#my-bookings') {
        setIsMyBookingsOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Determine state of any calendar date
  const getDateState = (dateStr: string): {
    state: CalendarDateState;
    booking?: BookingEnquiry;
    blocked?: BlockedDate;
  } => {
    // Check if date has already passed (e.g. yesterday, earlier dates)
    if (dateStr < todayDateString) {
      return { state: 'PASSED' };
    }

    // Check manual block
    const blocked = blockedDates.find(b => b.date === dateStr);
    if (blocked) {
      return { state: 'BLOCKED', blocked };
    }

    // Check confirmed booking (Rule 14: Only confirmed bookings permanently mark a date as BOOKED)
    const confirmedBooking = bookings.find(
      b => b.eventDate === dateStr && b.status === 'CONFIRMED'
    );
    if (confirmedBooking) {
      return { state: 'BOOKED', booking: confirmedBooking };
    }

    // Check pending booking
    const pendingBooking = bookings.find(
      b => b.eventDate === dateStr && b.status === 'PENDING'
    );
    if (pendingBooking) {
      return { state: 'PENDING', booking: pendingBooking };
    }

    return { state: 'AVAILABLE' };
  };

  const openAuthModal = (intendedAction?: () => void) => {
    if (intendedAction) setAuthIntendedAction(() => intendedAction);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthIntendedAction(null);
  };

  const openBookingModal = (initialDate?: string, initialPackageId?: string) => {
    // If not logged in, prompt login first, then proceed to booking
    if (!currentUser) {
      openAuthModal(() => {
        setInitialBookingDate(initialDate || selectedCalendarDate || undefined);
        setInitialBookingPackage(initialPackageId);
        setIsBookingModalOpen(true);
      });
      return;
    }
    setInitialBookingDate(initialDate || selectedCalendarDate || undefined);
    setInitialBookingPackage(initialPackageId);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openWhatsAppSuccessModal = (booking: BookingEnquiry) => {
    setLastSubmittedBooking(booking);
    setIsWhatsAppSuccessModalOpen(true);
  };

  const closeWhatsAppSuccessModal = () => {
    setIsWhatsAppSuccessModalOpen(false);
  };

  const openMyBookings = () => setIsMyBookingsOpen(true);
  const closeMyBookings = () => setIsMyBookingsOpen(false);

  const openPackageDetail = (pkg: PackageItem) => setSelectedPackageForModal(pkg);
  const closePackageDetail = () => setSelectedPackageForModal(null);

  const openGalleryLightbox = (item: GalleryItem) => setSelectedGalleryItem(item);
  const closeGalleryLightbox = () => setSelectedGalleryItem(null);

  // Business Actions
  const submitBookingEnquiry = (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    eventType: BookingEnquiry['eventType'];
    eventDate: string;
    packageId?: string;
    venueName?: string;
    eventLocation: string;
    expectedGuests?: string;
    additionalServices: string[];
    additionalRequirements?: string;
  }): BookingEnquiry => {
    const matchedPackage = PACKAGES_DATA.find(p => p.id === data.packageId);
    const refNum = `MSB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEnquiry: BookingEnquiry = {
      id: `enq-${Date.now()}`,
      referenceNumber: refNum,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      eventType: data.eventType,
      eventDate: data.eventDate,
      packageId: data.packageId,
      packageName: matchedPackage ? `${matchedPackage.name} Package` : 'Custom Package',
      venueName: data.venueName,
      eventLocation: data.eventLocation,
      expectedGuests: data.expectedGuests,
      additionalServices: data.additionalServices,
      additionalRequirements: data.additionalRequirements,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      adminNotes: 'New online enquiry received. Ready for coordinator review.'
    };

    setBookings(prev => [newEnquiry, ...prev]);
    setIsBookingModalOpen(false);
    openWhatsAppSuccessModal(newEnquiry);
    return newEnquiry;
  };

  const confirmBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'CONFIRMED', updatedAt: new Date().toISOString() } : b))
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'CANCELLED', updatedAt: new Date().toISOString() } : b))
    );
  };

  const toggleBlockDate = (dateStr: string, reason = 'Manually blocked by Admin') => {
    setBlockedDates(prev => {
      const exists = prev.some(b => b.date === dateStr);
      if (exists) {
        return prev.filter(b => b.date !== dateStr);
      } else {
        return [...prev, { date: dateStr, reason, blockedAt: new Date().toISOString() }];
      }
    });
  };

  const login = (data: { email: string; fullName?: string; phoneNumber?: string }) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName ? data.fullName.trim() : 'Registered Client',
      email: data.email.trim().toLowerCase(),
      phoneNumber: data.phoneNumber ? data.phoneNumber.trim() : '',
      isAdmin: data.email.toLowerCase().includes('admin')
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (authIntendedAction) {
      authIntendedAction();
      setAuthIntendedAction(null);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetDemoData = () => {
    setBookings([]);
    setBlockedDates([]);
    setSelectedCalendarDate(null);
    localStorage.removeItem(STORAGE_KEY_BOOKINGS);
    localStorage.removeItem(STORAGE_KEY_BLOCKED);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        blockedDates,
        currentUser,
        selectedCalendarDate,
        lastSubmittedBooking,
        currentView,
        setCurrentView,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        isWhatsAppSuccessModalOpen,
        openWhatsAppSuccessModal,
        closeWhatsAppSuccessModal,
        isMyBookingsOpen,
        openMyBookings,
        closeMyBookings,
        selectedPackageForModal,
        openPackageDetail,
        closePackageDetail,
        selectedGalleryItem,
        openGalleryLightbox,
        closeGalleryLightbox,
        todayDateString,
        getDateState,
        setSelectedCalendarDate,
        submitBookingEnquiry,
        confirmBooking,
        cancelBooking,
        toggleBlockDate,
        login,
        logout,
        resetDemoData
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
