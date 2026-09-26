export type EventType =
  | 'Wedding'
  | 'Wedding Reception'
  | 'Engagement'
  | 'Birthday Party'
  | 'Baby Shower'
  | 'Corporate Event'
  | 'Anniversary'
  | 'Private Celebration';

export type ServiceCategory =
  | 'DECORATION'
  | 'PHOTOGRAPHY & FILM'
  | 'FOOD & LIVE COUNTERS'
  | 'GRAND ENTRY'
  | 'ENTERTAINMENT'
  | 'CHARACTERS & SPECIAL ATTRACTIONS'
  | 'SPECIAL EFFECTS';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  tag?: string;
  startingPrice: string;
  numericPrice: number;
  description: string;
  includes: string[];
  popular?: boolean;
  color?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Receptions' | 'Birthdays' | 'Decorations' | 'Grand Entries' | 'Photography';
  imageUrl: string;
  caption: string;
  eventDate?: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface BookingEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  eventType: EventType;
  eventDate: string; // YYYY-MM-DD
  packageId?: string;
  packageName?: string;
  venueName?: string;
  eventLocation: string;
  expectedGuests?: string;
  additionalServices: string[];
  additionalRequirements?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
}

export type CalendarDateState = 'AVAILABLE' | 'BOOKED' | 'PENDING' | 'SELECTED' | 'BLOCKED' | 'PASSED';

export interface BlockedDate {
  date: string; // YYYY-MM-DD
  reason: string;
  blockedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isAdmin?: boolean;
}
