/**
 * Dynamic SEO and Metadata Manager
 * Updates document.title, meta descriptions, OpenGraph tags, and Schema.org JSON-LD
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
}

export const PAGE_SEO_DATA: Record<string, PageMetadata> = {
  website: {
    title: 'MSB Event Management | Luxury Weddings, Decor & Celebrations',
    description: 'Premier event management & royal wedding planning across Tamil Nadu & Puducherry. Luxury stage decoration, grand entries, catering & photography. Call +91 73391 95148.',
    ogType: 'website',
  },
  'thank-you': {
    title: 'Enquiry Received & Thank You | MSB Event Management',
    description: 'Thank you for your event enquiry with MSB Event Management. Our team has received your details and our coordinator will connect shortly.',
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy | MSB Event Management',
    description: 'Learn how MSB Event Management collects, protects, and handles your booking data and personal information with utmost security.',
    ogType: 'website',
  },
  terms: {
    title: 'Terms and Conditions | MSB Event Management',
    description: 'Official terms of service, date reservation policies, payment guidelines, and cancellation terms for MSB Event Management clients.',
    ogType: 'website',
  },
  '404': {
    title: '404 Page Not Found | MSB Event Management',
    description: 'The celebration page you are looking for does not exist or has moved. Return to MSB Event Management home or explore our luxury event services.',
    ogType: 'website',
  },
  admin: {
    title: 'Operations Dashboard | MSB Event Management',
    description: 'Administrative calendar management and customer enquiry workflow for MSB Event Management staff.',
    ogType: 'website',
  },
};

export function updatePageSEO(viewKey: string, customData?: Partial<PageMetadata>): void {
  const meta = {
    ...(PAGE_SEO_DATA[viewKey] || PAGE_SEO_DATA.website),
    ...customData,
  };

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Helper to set or create <meta> tag
  const setMetaTag = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Standard Meta Description
  setMetaTag('name', 'description', meta.description);

  // 4. Update OpenGraph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:type', meta.ogType || 'website');
  setMetaTag('property', 'og:site_name', 'MSB Event Management');
  setMetaTag('property', 'og:url', window.location.href);
  setMetaTag('property', 'og:image', `${window.location.origin}/og-image.svg`);

  // 5. Update Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:image', `${window.location.origin}/og-image.svg`);

  // 6. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonical || window.location.href);
}
