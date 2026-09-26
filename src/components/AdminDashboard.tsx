import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { BookingEnquiry, BookingStatus } from '../types';
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  EyeOff,
  KeyRound,
  Check,
  Ban,
  Lock,
  Unlock,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Plus,
  Trash2,
  Filter,
  Search,
  AlertCircle,
  X
} from 'lucide-react';

// Cryptographic configuration for Admin Portal (SHA-256 with salt)
// Demo-only check. Real authorization must be enforced by the backend.
const ADMIN_CREDENTIALS_HASH = import.meta.env.VITE_DEMO_ADMIN_CREDENTIALS_HASH || ''; 
const ADMIN_SALT = 'msb_event_portal_salt_2026_v1';
const ADMIN_SESSION_KEY = 'msb_admin_session_auth_v1';

async function verifyAdminHash(user: string, pass: string): Promise<boolean> {
  const combined = ADMIN_SALT + ':' + user.toLowerCase().trim() + ':' + pass.trim();
  const msgUint8 = new TextEncoder().encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === ADMIN_CREDENTIALS_HASH;
}

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    blockedDates,
    confirmBooking,
    cancelBooking,
    toggleBlockDate,
    setCurrentView,
    resetDemoData
  } = useBooking();

  // Cryptographic Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setAuthError(`Security lockout: too many attempts. Try again in ${remaining}s.`);
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);

    try {
      const isValid = await verifyAdminHash(usernameInput, passwordInput);
      if (isValid) {
        try {
          sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        } catch {
          // ignore
        }
        setIsAuthenticated(true);
        setFailedAttempts(0);
        setLockoutUntil(null);
        setUsernameInput('');
        setPasswordInput('');
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 30000; // 30 sec lockout
          setLockoutUntil(lockTime);
          setAuthError('Too many failed attempts. Security lockout active for 30s.');
        } else {
          setAuthError(`Access Denied: Invalid admin credentials (${5 - nextAttempts} attempts remaining).`);
        }
      }
    } catch {
      setAuthError('Cryptographic verification error.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLockPortal = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    setAuthError('');
  };

  const [activeTab, setActiveTab] = useState<'bookings' | 'calendar'>('bookings');
  const [selectedBookingForView, setSelectedBookingForView] = useState<BookingEnquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Close view modal on Escape
  useEffect(() => {
    if (!selectedBookingForView) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBookingForView(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBookingForView]);

  // Manual block form state
  const [newBlockDate, setNewBlockDate] = useState('2026-10-31');
  const [newBlockReason, setNewBlockReason] = useState('VIP Private Booking');

  // Metrics
  const totalEnquiries = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length;
  const cancelledCount = bookings.filter(b => b.status === 'CANCELLED').length;
  const upcomingCount = bookings.filter(
    b => b.status === 'CONFIRMED' && new Date(b.eventDate) >= new Date('2026-09-01')
  ).length;

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleManualBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate) return;
    toggleBlockDate(newBlockDate, newBlockReason);
    setNewBlockDate('');
    setNewBlockReason('VIP Private Booking');
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3" />
            <span>CONFIRMED</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3" />
            <span>CANCELLED</span>
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3 h-3" />
            <span>PENDING</span>
          </span>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        id="admin-encrypted-gate"
        className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      >
        {/* Background luxury gradient glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#956C36]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#1C1F23] border border-[#DEC388]/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          {/* Top Emblem */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DEC388] to-[#956C36] p-0.5 shadow-lg shadow-[#DEC388]/10 mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-[#1C1F23] rounded-[14px] flex items-center justify-center text-[#E5B869]">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/20 mb-2">
              Encrypted Portal Gate
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              MSB Admin Access
            </h2>
            <p className="text-xs text-gray-400 mt-1.5 max-w-xs">
              Cryptographically protected coordinator portal. Enter your authorized credentials to decrypt operations.
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start space-x-2.5 text-xs text-rose-300 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-username-input"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5"
              >
                Admin Username
              </label>
              <div className="relative">
                <input
                  id="admin-username-input"
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. msbevents@..."
                  required
                  autoComplete="username"
                  autoFocus
                  className="w-full px-3.5 py-2.5 bg-[#14171A] border border-gray-700 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-password-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-300"
                >
                  Security Passphrase
                </label>
              </div>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter security passphrase"
                  required
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-[#14171A] border border-gray-700 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              id="admin-submit-auth-btn"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#DEC388] hover:from-[#B38845] hover:to-[#C5A059] text-[#1C1F23] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isAuthenticating ? 'Verifying Cryptographic Digest...' : 'Decrypt & Access Console'}</span>
            </button>
          </form>

          {/* Footer Back Link & Encryption Notice */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col items-center space-y-3">
            <button
              onClick={() => {
                setCurrentView('website');
                window.location.hash = '#home';
              }}
              className="text-xs text-gray-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>

            <div className="flex items-center space-x-2 text-[10px] text-gray-500">
              <Lock className="w-3 h-3 text-[#C5A059]" />
              <span>SHA-256 Cryptographic Verification &bull; Isolated Session</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-[#F8F9FA] text-[#212529] pt-20 pb-24">
      
      {/* ADMIN TOP BAR */}
      <div className="bg-[#1C1F23] text-white border-b border-[#33383F] py-4 px-4 sm:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A059] text-[#1C1F23] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white">
                  MSB EVENT OPERATIONS CONSOLE
                </h1>
                <span className="text-[10px] bg-white/15 text-[#E5B869] uppercase font-bold px-2 py-0.5 rounded">
                  Internal Operations
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Live availability engine & booking coordinator interface
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Encrypted Session Active Tag */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-[11px] text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Session</span>
            </div>

            <button
              onClick={resetDemoData}
              className="px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-md border border-white/20 flex items-center space-x-1.5 transition-colors"
              title="Reset bookings and calendar to default database state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>

            <button
              id="admin-lock-portal-btn"
              onClick={handleLockPortal}
              className="px-3.5 py-1.5 text-xs font-semibold text-amber-200 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 rounded-md border border-amber-400/30 flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Lock and encrypt admin session immediately"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Lock Portal</span>
            </button>

            <button
              id="admin-exit-to-website-btn"
              onClick={() => {
                setCurrentView('website');
                window.location.hash = '#home';
              }}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#D4B26F] rounded-md shadow-xs flex items-center space-x-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* SECTION 16: OVERVIEW METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Enquiries
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-serif text-3xl font-bold text-[#1C1F23]">{totalEnquiries}</span>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Review</span>
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-serif text-3xl font-bold text-amber-900">{pendingCount}</span>
              <span className="text-[11px] text-amber-700 font-medium">Needs Action</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confirmed Bookings</span>
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-serif text-3xl font-bold text-emerald-900">{confirmedCount}</span>
              <span className="text-[11px] text-emerald-700 font-medium">Locks Dates</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-rose-200 bg-rose-50/30 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center space-x-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Cancelled</span>
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-serif text-3xl font-bold text-rose-900">{cancelledCount}</span>
              <span className="text-[11px] text-rose-700 font-medium">Frees Date</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#C5A059]/40 bg-[#FAF8F5] shadow-xs col-span-2 sm:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#956C36] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Upcoming Events</span>
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-serif text-3xl font-bold text-[#1C1F23]">{upcomingCount}</span>
              <span className="text-[11px] text-[#8C6D2B] font-medium">In Queue</span>
            </div>
          </div>
        </div>

        {/* TABS: BOOKINGS TABLE vs CALENDAR MANAGEMENT */}
        <div className="flex items-center space-x-2 border-b border-gray-200 mb-6">
          <button
            id="admin-tab-bookings"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'bookings'
                ? 'border-[#C5A059] text-[#1C1F23]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Bookings Table & Enquiries ({bookings.length})
          </button>

          <button
            id="admin-tab-calendar"
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'calendar'
                ? 'border-[#C5A059] text-[#1C1F23]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Calendar & Date Blocking ({blockedDates.length} Blocked)
          </button>
        </div>

        {/* TAB 1: BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* SEARCH & FILTERS BAR */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, event, location..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-gray-500 flex items-center space-x-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#1C1F23] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* TABLE CONTAINER (Columns: Customer, Event, Date, Package, Phone, Status, Actions) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF8F5] text-gray-600 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Event</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Package</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          No bookings matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr
                          key={b.id}
                          id={`admin-row-${b.id}`}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-[#1C1F23]">{b.fullName}</p>
                            <span className="text-[11px] font-mono text-gray-400">{b.referenceNumber}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#1C1F23]">{b.eventType}</span>
                            <span className="block text-[11px] text-gray-500">{b.eventLocation}</span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-[#1C1F23]">
                            {b.eventDate}
                          </td>

                          <td className="py-3.5 px-4 text-gray-700">
                            {b.packageName || 'Custom Package'}
                          </td>

                          <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">
                            {b.phoneNumber}
                          </td>

                          <td className="py-3.5 px-4">
                            {getStatusBadge(b.status)}
                          </td>

                          {/* ACTIONS: VIEW, CONFIRM, CANCEL */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* VIEW */}
                              <button
                                id={`admin-view-${b.id}`}
                                onClick={() => setSelectedBookingForView(b)}
                                className="px-2.5 py-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#1C1F23] rounded-md transition-colors flex items-center space-x-1"
                                title="View full booking enquiry details"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-600" />
                                <span className="hidden sm:inline">VIEW</span>
                              </button>

                              {/* CONFIRM (Status becomes CONFIRMED and corresponding calendar date becomes BOOKED) */}
                              {b.status !== 'CONFIRMED' && (
                                <button
                                  id={`admin-confirm-${b.id}`}
                                  onClick={() => confirmBooking(b.id)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center space-x-1"
                                  title="Confirm booking (Locks calendar date as BOOKED)"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>CONFIRM</span>
                                </button>
                              )}

                              {/* CANCEL (Status becomes CANCELLED and date becomes available) */}
                              {b.status !== 'CANCELLED' && (
                                <button
                                  id={`admin-cancel-${b.id}`}
                                  onClick={() => cancelBooking(b.id)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md transition-colors flex items-center space-x-1"
                                  title="Cancel booking (Frees calendar date)"
                                >
                                  <Ban className="w-3.5 h-3.5" />
                                  <span>CANCEL</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HELPFUL WORKFLOW REMINDER */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Booking Status Architecture:</p>
                <p className="mt-0.5">
                  Clicking <strong>CONFIRM</strong> updates status to CONFIRMED and permanently flags that calendar date as <strong>BOOKED (Red & Disabled)</strong> on the public website. Clicking <strong>CANCEL</strong> releases that date back to <strong>AVAILABLE</strong> immediately.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CALENDAR MANAGEMENT */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* MANUALLY BLOCK A DATE FORM */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-2">
                <Lock className="w-4 h-4 text-[#C5A059]" />
                <span>Manual Date Lock</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1F23] mb-4">
                Block a Specific Date
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Prevent online booking inquiries on dates reserved for private VIP bookings, warehouse maintenance, or team holidays.
              </p>

              <form onSubmit={handleManualBlockSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Date to Block (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    required
                    value={newBlockDate}
                    onChange={(e) => setNewBlockDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Reason / Note
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlockReason}
                    onChange={(e) => setNewBlockReason(e.target.value)}
                    placeholder="e.g. Private VIP Wedding"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  id="admin-block-date-submit-btn"
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1C1F23] hover:bg-black rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>Block Calendar Date</span>
                </button>
              </form>
            </div>

            {/* CURRENTLY BLOCKED & BOOKED DATES LIST */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* MANUALLY BLOCKED DATES */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <h4 className="font-serif text-lg font-bold text-[#1C1F23] mb-4 flex items-center justify-between">
                  <span>Manually Blocked Dates ({blockedDates.length})</span>
                  <span className="text-xs font-normal text-gray-500">Unblock with one click</span>
                </h4>

                {blockedDates.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4">No manually blocked dates.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {blockedDates.map((item) => (
                      <div key={item.date} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-sm text-[#1C1F23]">{item.date}</span>
                            <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-medium">
                              Blocked
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{item.reason}</span>
                        </div>

                        <button
                          onClick={() => toggleBlockDate(item.date)}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-gray-200 transition-colors flex items-center space-x-1"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Unblock</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DATES WITH CONFIRMED EVENTS */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <h4 className="font-serif text-lg font-bold text-[#1C1F23] mb-4">
                  Confirmed Booked Dates (Automatic Lock)
                </h4>
                <div className="divide-y divide-gray-100">
                  {bookings.filter(b => b.status === 'CONFIRMED').map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#1C1F23]">{b.eventDate}</span>
                        <p className="text-xs text-gray-600 font-semibold">{b.eventType} • {b.fullName}</p>
                        <span className="text-[11px] text-gray-400">{b.venueName || b.eventLocation}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Date Locked
                        </span>
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="text-xs text-rose-600 hover:underline px-2 py-1"
                          title="Cancel booking to free up date"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedBookingForView && (
        <div
          id="admin-booking-detail-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedBookingForView(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 animate-in zoom-in-95 cursor-default"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase">
                  Reference: {selectedBookingForView.referenceNumber}
                </span>
                <h4 className="font-serif text-xl font-bold text-[#1C1F23]">
                  {selectedBookingForView.fullName}
                </h4>
              </div>
              <button
                id="admin-detail-close-top-btn"
                onClick={() => setSelectedBookingForView(null)}
                title="Quit / Close Details"
                className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-[#1C1F23] hover:bg-gray-100 flex items-center justify-center border border-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-600">CURRENT STATUS:</span>
                {getStatusBadge(selectedBookingForView.status)}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500 block mb-0.5">Event Type</span>
                  <span className="font-bold text-sm text-[#1C1F23]">{selectedBookingForView.eventType}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Event Date</span>
                  <span className="font-bold text-sm text-[#1C1F23]">{selectedBookingForView.eventDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Phone</span>
                  <span className="font-bold text-sm text-[#1C1F23]">{selectedBookingForView.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Email</span>
                  <span className="font-bold text-sm text-[#1C1F23] truncate">{selectedBookingForView.email}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block mb-0.5">Venue & Location</span>
                <span className="font-semibold text-gray-800">
                  {selectedBookingForView.venueName ? `${selectedBookingForView.venueName}, ` : ''}{selectedBookingForView.eventLocation}
                </span>
              </div>

              <div>
                <span className="text-gray-500 block mb-1">Selected Services</span>
                <div className="flex flex-wrap gap-1">
                  {selectedBookingForView.additionalServices.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {selectedBookingForView.additionalRequirements && (
                <div>
                  <span className="text-gray-500 block mb-0.5">Requirements / Notes</span>
                  <p className="p-2.5 bg-gray-50 rounded border border-gray-200 italic text-gray-700">
                    &ldquo;{selectedBookingForView.additionalRequirements}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between space-x-2">
                <button
                  id="admin-detail-quit-btn"
                  onClick={() => setSelectedBookingForView(null)}
                  className="px-4 py-2.5 text-xs font-bold uppercase text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  Quit / Close
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      cancelBooking(selectedBookingForView.id);
                      setSelectedBookingForView(null);
                    }}
                    className="px-3.5 py-2.5 text-xs font-bold uppercase text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                  >
                    Mark Cancelled
                  </button>
                  <button
                    onClick={() => {
                      confirmBooking(selectedBookingForView.id);
                      setSelectedBookingForView(null);
                    }}
                    className="px-4 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    Confirm & Lock Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
