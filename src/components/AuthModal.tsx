import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { X, Lock, Mail, User, Phone, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface RegisteredAccount {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const STORAGE_KEY_REGISTERED = 'msb_registered_accounts_real_v2';

// Validation helpers to strictly reject sample / dummy / test credentials
const DUMMY_EMAIL_PATTERNS = [
  /^test@/i,
  /^sample@/i,
  /^demo@/i,
  /^fake@/i,
  /^dummy@/i,
  /^temp@/i,
  /^123@/i,
  /^abc@/i,
  /@test\./i,
  /@example\./i,
  /@sample\./i
];

const DUMMY_PHONE_PATTERNS = [
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
  '1234567890',
  '0123456789',
  '9876543210'
];

function isSampleOrDummyEmail(email: string): boolean {
  const clean = email.toLowerCase().trim();
  return DUMMY_EMAIL_PATTERNS.some(pattern => pattern.test(clean));
}

function isValidEmailFormat(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

function isValidPhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 13) return false;
  for (const dummy of DUMMY_PHONE_PATTERNS) {
    if (digitsOnly.includes(dummy)) return false;
  }
  if (/^(\d)\1+$/.test(digitsOnly)) return false;
  return true;
}

function isValidFullName(name: string): boolean {
  const clean = name.trim().toLowerCase();
  if (clean.length < 3) return false;
  const dummyNames = ['test', 'sample', 'demo', 'fake', 'user', 'guest', 'asdf', 'admin', 'qwerty'];
  if (dummyNames.includes(clean)) return false;
  return /[a-zA-Z]{2,}/.test(clean);
}

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useBooking();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const getRegisteredAccounts = (): RegisteredAccount[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_REGISTERED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();

    if (!isValidEmailFormat(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (isSampleOrDummyEmail(cleanEmail)) {
      setErrorMsg('Sample/dummy emails are not permitted. Please use your genuine email address.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!existing) {
      setErrorMsg('Account not found with this email. Please switch to "Create Account" tab to register your genuine details first.');
      return;
    }

    if (existing.password !== loginPassword) {
      setErrorMsg('Incorrect password. Please verify your credentials and try again.');
      return;
    }

    setErrorMsg('');
    login({
      email: existing.email,
      fullName: existing.fullName,
      phoneNumber: existing.phoneNumber
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = signupEmail.trim().toLowerCase();
    const cleanName = signupName.trim();
    const cleanPhone = signupPhone.trim();

    if (!isValidFullName(cleanName)) {
      setErrorMsg('Please enter your genuine full name (minimum 3 characters, no sample/test names).');
      return;
    }
    if (!isValidPhoneNumber(cleanPhone)) {
      setErrorMsg('Please enter a valid, original 10-digit mobile phone number (sample numbers like 1234567890 are not allowed).');
      return;
    }
    if (!isValidEmailFormat(cleanEmail) || isSampleOrDummyEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid, original email address (sample/test emails are not allowed).');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long for security.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      setErrorMsg('An account with this email is already registered. Please sign in via the LOGIN tab.');
      return;
    }

    const newAccount: RegisteredAccount = {
      fullName: cleanName,
      phoneNumber: cleanPhone,
      email: cleanEmail,
      password: signupPassword
    };

    try {
      localStorage.setItem(STORAGE_KEY_REGISTERED, JSON.stringify([...accounts, newAccount]));
    } catch (err) {
      console.warn('Could not store registered account', err);
    }

    setErrorMsg('');
    login({
      fullName: newAccount.fullName,
      phoneNumber: newAccount.phoneNumber,
      email: newAccount.email
    });
  };

  return (
    <div
      id="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#EDE6DA] animate-in zoom-in-95 cursor-default"
      >
        
        {/* CLOSE / QUIT BUTTON */}
        <button
          onClick={closeAuthModal}
          id="auth-modal-close-btn"
          title="Quit / Close Portal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#555] hover:text-[#1C1F23] hover:bg-[#F3EDE2] flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="bg-[#FAF8F5] p-6 pb-4 border-b border-[#EDE6DA] text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto mb-3 shadow-sm p-0.5">
            <img
              src="/msb-logo.svg"
              alt="MSB Event Management"
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1C1F23]">
            MSB Client Portal
          </h3>
          <p className="text-xs text-[#666B72] mt-1">
            Access your bookings, track enquiries, and communicate with your event director.
          </p>

          {/* TAB TOGGLE: LOGIN / CREATE ACCOUNT */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-[#E5DAC7] mt-5">
            <button
              id="auth-tab-login"
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-[#1C1F23] text-white shadow-xs'
                  : 'text-[#5A6068] hover:text-[#1C1F23]'
              }`}
            >
              LOGIN
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              onClick={() => {
                setTab('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-[#1C1F23] text-white shadow-xs'
                  : 'text-[#5A6068] hover:text-[#1C1F23]'
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="p-6 sm:p-7">
          
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          {tab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    id="login-email-input"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. priya.arun@example.com"
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    id="login-password-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gray-500">New to MSB Events?</span>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setTab('signup');
                  }}
                  className="text-[#956C36] font-semibold hover:underline"
                >
                  Create an Account
                </button>
              </div>

              <button
                type="submit"
                id="login-submit-btn"
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-lg shadow-sm transition-all"
              >
                Sign In & Continue
              </button>
            </form>
          ) : (
            /* CREATE ACCOUNT / SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    id="signup-name-input"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    id="signup-phone-input"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    id="signup-email-input"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="arun@example.com"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    id="signup-password-input"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#373A40] mb-1">
                    Confirm *
                  </label>
                  <input
                    type="password"
                    required
                    id="signup-confirm-input"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD4C4] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-gray-500">Already registered?</span>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setTab('login');
                  }}
                  className="text-[#956C36] font-semibold hover:underline"
                >
                  Sign In to Account
                </button>
              </div>

              <button
                type="submit"
                id="signup-submit-btn"
                className="w-full mt-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-lg shadow-sm transition-all"
              >
                Create Account & Continue
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-[#F0EAE0] text-center text-[11px] text-gray-500">
            <p>
              Your contact credentials are kept strictly confidential for event coordination.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
