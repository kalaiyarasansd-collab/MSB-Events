import {
  EventType,
  ServiceCategory,
  ServiceItem,
  PackageItem,
  GalleryItem,
  BookingEnquiry,
  Testimonial,
  FAQItem,
  BlockedDate,
} from '../types';

// BUSINESS CONTACT & LOCATION DETAILS
export const BUSINESS_WHATSAPP = "917339195148";
export const BUSINESS_WHATSAPP_DISPLAY = "+91 73391 95148";
export const BUSINESS_PHONE = "+91 73391 95148";
export const BUSINESS_PHONE_TEL = "+917339195148";
export const BUSINESS_EMAIL = "msbevents01@gmail.com";
export const BUSINESS_ADDRESS = "K R Palayam, Thirukkanur, Puducherry 605 501";
export const BUSINESS_CONSULTATION_HOURS = "Sunday – Saturday, 6:00 AM – 10:00 PM";
export const BUSINESS_INSTAGRAM = "@msb_event__";
export const BUSINESS_INSTAGRAM_URL = "https://www.instagram.com/msb_event__/";
export const SERVICE_AREAS = "All Over Tamil Nadu, Puducherry, Kerala & Karnataka";

export interface EventTypeItem {
  id: string;
  name: EventType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  highlightTag: string;
}

export const EVENT_TYPES: EventTypeItem[] = [
  {
    id: 'et-wedding',
    name: 'Wedding',
    title: 'Grand Weddings',
    shortDesc: 'Traditional and contemporary royal wedding celebrations designed with timeless grandeur.',
    fullDesc: 'From traditional rituals to grand royal setups, we conceptualize, design, and seamlessly coordinate your dream wedding with exquisite floral mandaps, ambient lighting, and impeccable hospitality.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Royal Mandaps & Floral Decor'
  },
  {
    id: 'et-reception',
    name: 'Wedding Reception',
    title: 'Wedding Receptions',
    shortDesc: 'Glamorous evening receptions with breathtaking stages, grand entries and curated entertainment.',
    fullDesc: 'A celebratory evening marked by magnificent stage architectures, celebrity entries, dazzling cold pyro moments, and dynamic DJ entertainment that captivates every guest.',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Luxury Stage & Grand Entry'
  },
  {
    id: 'et-engagement',
    name: 'Engagement',
    title: 'Engagement Ceremonies',
    shortDesc: 'Intimate and elegant ring exchange ceremonies with personalized romantic backdrops.',
    fullDesc: 'Cherish the promise of forever with bespoke stage setups, romantic floral arches, delicate candlelit aesthetics, and traditional ring ceremony coordination.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Romantic Florals & Theme Setups'
  },
  {
    id: 'et-birthday',
    name: 'Birthday Party',
    title: 'Birthday Celebrations',
    shortDesc: 'Vibrant themed birthdays, 1st birthdays, and milestone anniversaries filled with joy and excitement.',
    fullDesc: 'Enchanting themes from fairy tales to superhero universes, complete with mascot characters, live cotton candy and chocolate fountain counters, balloon archways, and magic shows.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Themed Decor & Mascot Fun'
  },
  {
    id: 'et-babyshower',
    name: 'Baby Shower',
    title: 'Baby Showers (Seemantham / Valaikappu)',
    shortDesc: 'Heartwarming, culturally enriched setups celebrating the blessings of new life.',
    fullDesc: 'Celebrate motherhood with traditional floral swing decorations, pastel balloon arches, custom photo booths, sweet beeda & dessert bars, and heartwarming rituals.',
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Floral Swings & Pastel Palettes'
  },
  {
    id: 'et-corporate',
    name: 'Corporate Event',
    title: 'Corporate Events & Galas',
    shortDesc: 'High-impact business conferences, award ceremonies, gala dinners, and annual brand meets.',
    fullDesc: 'Immaculate executive event execution featuring state-of-the-art AV engineering, curved LED backdrops, seamless live streaming, red carpet VIP welcoming, and emcee coordination.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'LED Walls & Executive Galas'
  },
  {
    id: 'et-anniversary',
    name: 'Anniversary',
    title: 'Milestone Anniversaries',
    shortDesc: 'Silver, Golden, and intimate romantic anniversary celebrations honoring love across the years.',
    fullDesc: 'Refined celebrations with timeless elegance, photo memory tunnels, customized live acoustic bands, family reunion banquet planning, and grand stage backdrops.',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Memory Walls & Live Music'
  },
  {
    id: 'et-private',
    name: 'Private Celebration',
    title: 'Private & Housewarming Celebrations',
    shortDesc: 'Housewarmings, sangeet nights, pool parties, and exclusive family soirees.',
    fullDesc: 'Bespoke event production tailored to your private villa, farmhouse, or banquet hall with custom catering counters, 360-degree video booths, and energetic DJ nights.',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80',
    highlightTag: 'Custom Lighting & Audio'
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'DECORATION',
  'PHOTOGRAPHY & FILM',
  'FOOD & LIVE COUNTERS',
  'GRAND ENTRY',
  'ENTERTAINMENT',
  'CHARACTERS & SPECIAL ATTRACTIONS',
  'SPECIAL EFFECTS'
];

export const SERVICES_DATA: ServiceItem[] = [
  // CATEGORY 1 — DECORATION
  { id: 'dec-1', name: 'Stage Decoration', category: 'DECORATION', description: 'Grand bespoke wedding & reception stages with fresh flower carvings, velvet drapes, and ambient lighting.', iconName: 'Sparkles', popular: true },
  { id: 'dec-2', name: 'Entrance Decoration', category: 'DECORATION', description: 'Regal floral archways, ornamental pillars, and illuminated entryway tunnels welcoming guests.', iconName: 'DoorOpen', popular: true },
  { id: 'dec-3', name: 'Red Carpet', category: 'DECORATION', description: 'VIP crimson plush aisle runner flanked by polished brass stanchions and ceremonial lanterns.', iconName: 'Footprints' },
  { id: 'dec-4', name: 'Welcome Board', category: 'DECORATION', description: 'Custom acrylic, wooden easel, or floral illuminated mirror greeting sign with couple/celebrant name.', iconName: 'Signpost' },
  { id: 'dec-5', name: 'LED Backdrop', category: 'DECORATION', description: 'High-density pixel pitch LED video backdrop displaying dynamic animated visuals and custom monograms.', iconName: 'Tv', popular: true },
  { id: 'dec-6', name: 'Balloon Decoration', category: 'DECORATION', description: 'Organic pastel balloon garlands, thematic archways, and character balloon sculptures for birthdays.', iconName: 'CircleDot' },
  { id: 'dec-7', name: 'Flower Decoration', category: 'DECORATION', description: 'Imported orchids, fragrant jasmine, Dutch roses, and carnations woven into traditional or contemporary motifs.', iconName: 'Flower2', popular: true },
  { id: 'dec-8', name: 'Theme Decoration', category: 'DECORATION', description: 'Complete concept-driven environments (Royal Rajasthani, Bohemian Chic, Enchanted Forest, Bollywood).', iconName: 'Palette' },

  // CATEGORY 2 — PHOTOGRAPHY & FILM
  { id: 'photo-1', name: 'Traditional Photography', category: 'PHOTOGRAPHY & FILM', description: 'High-resolution ceremonial coverage ensuring every guest, family ritual, and stage portrait is preserved.', iconName: 'Camera' },
  { id: 'photo-2', name: 'Traditional Videography', category: 'PHOTOGRAPHY & FILM', description: 'Full-length cinematic 4K video recording capturing rituals, speeches, and stage moments seamlessly.', iconName: 'Video' },
  { id: 'photo-3', name: 'Candid Photography', category: 'PHOTOGRAPHY & FILM', description: 'Artistic emotional storytelling capturing spontaneous smiles, tearful joys, and heartfelt embraces.', iconName: 'Heart', popular: true },
  { id: 'photo-4', name: 'Candid Videography', category: 'PHOTOGRAPHY & FILM', description: 'Cinematic wedding teaser and short highlights film with color grading and emotional soundtrack.', iconName: 'Film', popular: true },
  { id: 'photo-5', name: 'Drone Shoot', category: 'PHOTOGRAPHY & FILM', description: 'Sweeping aerial views of the venue, baraat procession, grand entry, and outdoor wedding rituals.', iconName: 'Radio' },
  { id: 'photo-6', name: 'Pre-Wedding Shoot', category: 'PHOTOGRAPHY & FILM', description: 'Romantic couple photoshoot at scenic heritage spots, beaches, or private outdoor film studios.', iconName: 'Image' },
  { id: 'photo-7', name: 'Post-Wedding Shoot', category: 'PHOTOGRAPHY & FILM', description: 'Relaxed artistic portrait session capturing the newlyweds in serene, candid natural settings.', iconName: 'Sun' },
  { id: 'photo-8', name: 'LED Wall / Live Streaming', category: 'PHOTOGRAPHY & FILM', description: 'High-definition live video broadcast to giant venue screens and YouTube/Zoom for remote family.', iconName: 'MonitorPlay', popular: true },

  // CATEGORY 3 — FOOD & LIVE COUNTERS
  { id: 'food-1', name: 'Chocolate Fountain', category: 'FOOD & LIVE COUNTERS', description: 'Multi-tiered cascading Belgian chocolate fountain served with marshmallows, fresh fruits, and wafers.', iconName: 'Utensils', popular: true },
  { id: 'food-2', name: 'Popcorn Counter', category: 'FOOD & LIVE COUNTERS', description: 'Live theater-style kettle popcorn stall serving hot buttery, caramel, and peri-peri flavors.', iconName: 'Coffee' },
  { id: 'food-3', name: 'Cotton Candy', category: 'FOOD & LIVE COUNTERS', description: 'Colorful spun sugar candy counter in pink strawberry, blue blueberry, and vanilla flavors.', iconName: 'Cloud' },
  { id: 'food-4', name: 'Ice Gola', category: 'FOOD & LIVE COUNTERS', description: 'Traditional crushed ice shaved gola sticks with Kala Khatta, Kacchi Keri, Rose, and Khus syrups.', iconName: 'IceCream' },
  { id: 'food-5', name: 'Sweet Beeda', category: 'FOOD & LIVE COUNTERS', description: 'Artisan royal paan counter featuring Meetha Paan, Chocolate Paan, and Fire Paan for wedding guests.', iconName: 'Leaf' },
  { id: 'food-6', name: 'Fresh Juice Counter', category: 'FOOD & LIVE COUNTERS', description: 'Live cold-pressed seasonal fruit juice bar serving sugarcane, watermelon, orange, and mocktails.', iconName: 'GlassWater', popular: true },
  { id: 'food-7', name: 'Fruit Salad Counter', category: 'FOOD & LIVE COUNTERS', description: 'Exotic carved fruits, dragon fruit skewers, mixed fruit bowls served with honey and mint drizzle.', iconName: 'Apple' },
  { id: 'food-8', name: 'Ice Cream Counter', category: 'FOOD & LIVE COUNTERS', description: 'Rolled ice cream live counter or premium scoops with custom waffle cones and assorted toppings.', iconName: 'Smile' },

  // CATEGORY 4 — GRAND ENTRY
  { id: 'entry-1', name: 'BMW Car Entry', category: 'GRAND ENTRY', description: 'Chauffeured luxury BMW convertible entrance decorated with elegant floral bonnet arrangements.', iconName: 'Car', popular: true },
  { id: 'entry-2', name: 'Vintage Car Entry', category: 'GRAND ENTRY', description: 'Classic antique roadster entry creating a timeless royal vintage spectacle for the bride and groom.', iconName: 'Shield' },
  { id: 'entry-3', name: 'Royal Enfield Entry', category: 'GRAND ENTRY', description: 'Signature high-octane groom entry on a custom-accessorized Royal Enfield Bullet with cold sparklers.', iconName: 'Bike' },
  { id: 'entry-4', name: 'Bullock Cart Entry', category: 'GRAND ENTRY', description: 'Rustic South Indian heritage entry in an ornate floral decorated traditional bullock cart.', iconName: 'Compass' },
  { id: 'entry-5', name: 'Flower Chariot Entry', category: 'GRAND ENTRY', description: 'Fairytale motorized floral carriage / chariot that glides down the aisle amidst dense fog.', iconName: 'Crown', popular: true },
  { id: 'entry-6', name: 'Cold Pyro Entry', category: 'GRAND ENTRY', description: 'Synchronized wireless cold fireworks shooting 10-foot gold sparks safely as the couple steps in.', iconName: 'Zap', popular: true },
  { id: 'entry-7', name: 'Sparkle Entry', category: 'GRAND ENTRY', description: 'Handheld warm sparkler aisle tunnel held by guests creating magical golden photography reflections.', iconName: 'Stars' },
  { id: 'entry-8', name: 'Fog Entry', category: 'GRAND ENTRY', description: 'Heavy low-lying dry ice fog creating an ethereal "walking on clouds" entrance down the runway.', iconName: 'CloudRain' },

  // CATEGORY 5 — ENTERTAINMENT
  { id: 'ent-1', name: 'DJ', category: 'ENTERTAINMENT', description: 'Professional celebrity club & wedding DJ with high-wattage sound rigs, bass bins, and dance floor hits.', iconName: 'Disc', popular: true },
  { id: 'ent-2', name: 'Live Music', category: 'ENTERTAINMENT', description: 'Fusion acoustic instrumentalists, violinists, flute maestros, and multi-piece live wedding bands.', iconName: 'Music', popular: true },
  { id: 'ent-3', name: 'Kerala Drums', category: 'ENTERTAINMENT', description: 'Energetic traditional Chenda Melam / Nasik Dhol ensemble generating electric celebratory beats.', iconName: 'Drum' },
  { id: 'ent-4', name: 'Welcome Dancers', category: 'ENTERTAINMENT', description: 'Graceful classical Bharatanatyam or Mohiniyattam artistes greeting guests with aarthi and flowers.', iconName: 'Activity' },
  { id: 'ent-5', name: 'Dance Performance', category: 'ENTERTAINMENT', description: 'Choreographed Bollywood, contemporary, and Western dance troupes for Sangeet & Reception stages.', iconName: 'Flame' },
  { id: 'ent-6', name: 'Anchor / MC', category: 'ENTERTAINMENT', description: 'Bilingual charismatic master of ceremonies keeping the audience engaged, laughing, and involved.', iconName: 'Mic', popular: true },
  { id: 'ent-7', name: 'Content Creator', category: 'ENTERTAINMENT', description: 'Dedicated on-site social media creator capturing instant vertical reels and viral wedding moments.', iconName: 'Smartphone' },
  { id: 'ent-8', name: '360° Video Booth', category: 'ENTERTAINMENT', description: 'Rotating slow-motion 360-degree video platform with instant QR-code download for guests.', iconName: 'Camera', popular: true },

  // CATEGORY 6 — CHARACTERS & SPECIAL ATTRACTIONS
  { id: 'char-1', name: 'Mickey Mouse', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Life-sized interactive mascot dancing with kids and posing for photo memories.', iconName: 'Smile' },
  { id: 'char-2', name: 'Donald Duck', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Playful Disney duck mascot bringing comical antics to birthday parties and family meets.', iconName: 'Smile' },
  { id: 'char-3', name: 'Panda', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Giant fluffy dancing Panda mascot beloved by children and adults alike.', iconName: 'Smile' },
  { id: 'char-4', name: 'Chhota Bheem', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Energetic popular Indian cartoon superhero mascot bringing cheers to young fans.', iconName: 'Zap' },
  { id: 'char-5', name: 'Dora', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Dora the Explorer mascot guiding playful interactive party games for children.', iconName: 'Compass' },
  { id: 'char-6', name: 'Teddy Bear', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Giant cuddly hugging teddy bear mascot greeting guests at baby showers and 1st birthdays.', iconName: 'Heart' },
  { id: 'char-7', name: 'Minion', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Quirky yellow Minion mascot delighting the crowd with lively dance steps and hugs.', iconName: 'Smile' },
  { id: 'char-8', name: 'Iron Man', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Illuminated Arc-Reactor superhero cosplay character for futuristic birthday parties.', iconName: 'Shield' },
  { id: 'char-9', name: 'Spider-Man', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Acrobatic web-slinging superhero character posing for dynamic photo ops.', iconName: 'Crosshair' },
  { id: 'char-10', name: 'Robot Character', category: 'CHARACTERS & SPECIAL ATTRACTIONS', description: 'Stilt-walking LED robot with laser gloves and CO2 smoke cannons.', iconName: 'Cpu', popular: true },

  // CATEGORY 7 — SPECIAL EFFECTS
  { id: 'fx-1', name: 'Cold Pyro', category: 'SPECIAL EFFECTS', description: 'Safe, smokeless, non-hazardous indoor cold spark fountains producing brilliant 3m gold plumes.', iconName: 'Zap', popular: true },
  { id: 'fx-2', name: 'Dry Ice / Fog', category: 'SPECIAL EFFECTS', description: 'Dense floor-hugging clouds for first dances, couple ring exchanges, and divine stage ceremonies.', iconName: 'Cloud', popular: true },
  { id: 'fx-3', name: 'Confetti', category: 'SPECIAL EFFECTS', description: 'High-pressure CO2 confetti blasts showering gold metallic flutter and rose petals on the couple.', iconName: 'Sparkles' },
  { id: 'fx-4', name: 'Bubble Machine', category: 'SPECIAL EFFECTS', description: 'Continuous stream of thousands of iridescent floating bubbles creating magical outdoor atmospheres.', iconName: 'Circle' },
  { id: 'fx-5', name: 'Smoke Effects', category: 'SPECIAL EFFECTS', description: 'Vibrant organic color smoke blasts for Baraat entries, Haldi celebrations, and couple shoots.', iconName: 'Wind' },
  { id: 'fx-6', name: 'Sparkular Effects', category: 'SPECIAL EFFECTS', description: 'Programmable electronic fountain machines with adjustable spark heights for stage highlights.', iconName: 'Sun', popular: true }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-custom',
    name: 'CUSTOM PACKAGE',
    startingPrice: 'Custom Quote',
    numericPrice: 0,
    tag: 'MOST REQUESTED',
    description: 'Completely tailored to your taste, venue dimensions, and guest count. Pick your decor, entries, photo/film, and live counters.',
    includes: [
      '100% Customized to Your Venue & Budget',
      'Choice of Stage, Mandap & Theme Décor',
      'Traditional or Candid Photography & Cinematic Film',
      'Custom Grand Entry & Special Effects Options',
      'Dedicated Event Coordinator & Floor Management'
    ],
    popular: true
  },
  {
    id: 'pkg-essential',
    name: 'ESSENTIAL PACKAGE',
    startingPrice: 'Custom Quote',
    numericPrice: 0,
    tag: 'Classic Elegance',
    description: 'Ideal for intimate gatherings, traditional engagements, and budget-conscious beautiful ceremonies.',
    includes: [
      'Stage Decoration (Floral or Fabric Backdrop)',
      'Traditional Photography (Ceremony Coverage)',
      'Entrance Decoration with Floral Arch & Welcome Carpet',
      'Welcome Board with Easel Stand'
    ],
    popular: false
  },
  {
    id: 'pkg-signature',
    name: 'SIGNATURE PACKAGE',
    startingPrice: 'Custom Quote',
    numericPrice: 0,
    tag: 'Grand Celebrations',
    description: 'Our comprehensive curation for grand wedding receptions, milestone birthdays, and memorable celebrations.',
    includes: [
      'Premium Stage Decoration with Custom Monograms',
      'Candid Photography & Full-Event Storytelling',
      'Cinematic Videography & Teaser Film',
      'Drone Aerial Coverage (Venue & Procession)',
      'Grand Entrance Decoration with Flower Tunnels',
      'Cold Pyro Fireworks (Stage & Entry Moments)'
    ],
    popular: false
  },
  {
    id: 'pkg-royal',
    name: 'ROYAL PACKAGE',
    startingPrice: 'Custom Quote',
    numericPrice: 0,
    tag: 'Luxury Experience',
    description: 'The ultimate bespoke royal experience. Complete end-to-end luxury management for unforgettable memories.',
    includes: [
      'Luxury Architectural Stage Setup with Fresh Exotic Florals',
      'Complete Photography & 4K Cinematic Wedding Film Suite',
      'Licensed 4K Drone Aerial Coverage',
      'Ultra-HD Curved LED Wall with Live Video Streaming',
      'Grand Entry Experience (Choice of Luxury Car or Chariot)',
      'Full Entertainment Suite (DJ, Anchor / MC & Live Fusion Music)',
      'Complete Special Effects (Cold Pyro, Dry Ice Cloud, Confetti Blasts)'
    ],
    popular: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Floral Mandap Under Twilight Skies',
    category: 'Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    caption: 'Exquisite 10,000-rose botanical mandap setup at Leela Palace.',
    eventDate: 'August 2026'
  },
  {
    id: 'gal-2',
    title: 'Grand Reception Stage with Crystal Chandeliers',
    category: 'Receptions',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    caption: 'Curved gold geometric stage architecture with amber accent lights.',
    eventDate: 'July 2026'
  },
  {
    id: 'gal-3',
    title: 'Cold Pyro Sparkling Entrance',
    category: 'Grand Entries',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
    caption: 'Synchronized 10ft cold pyro fireworks during couple entrance.',
    eventDate: 'September 2026'
  },
  {
    id: 'gal-4',
    title: 'Fairytale 1st Birthday Pastel Palace',
    category: 'Birthdays',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Whimsical balloon archway and customized dessert counter.',
    eventDate: 'June 2026'
  },
  {
    id: 'gal-5',
    title: 'Heritage Floral Pathway & Red Carpet',
    category: 'Decorations',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    caption: 'Brass urli bowls, floating marigolds, and crimson aisle runner.',
    eventDate: 'May 2026'
  },
  {
    id: 'gal-6',
    title: 'Candid Joy of the Ring Ceremony',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
    caption: 'Emotional candid capture of the promise of forever.',
    eventDate: 'August 2026'
  },
  {
    id: 'gal-7',
    title: 'Vintage Roadster Bridal Entry',
    category: 'Grand Entries',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    caption: 'Classic ivory convertible entry draped in exotic white lilies.',
    eventDate: 'April 2026'
  },
  {
    id: 'gal-8',
    title: 'Royal Temple Bell Backdrop',
    category: 'Decorations',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Brass temple bells combined with cascading tuberose strings.',
    eventDate: 'March 2026'
  },
  {
    id: 'gal-9',
    title: 'Sunset Beachside Wedding Vows',
    category: 'Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    caption: 'Panoramic oceanfront wedding arch with bespoke sheer drapes.',
    eventDate: 'February 2026'
  },
  {
    id: 'gal-10',
    title: 'Walking on Clouds Dry Ice Fog',
    category: 'Grand Entries',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    caption: 'Low-lying clouds during the couple first romantic waltz.',
    eventDate: 'January 2026'
  },
  {
    id: 'gal-11',
    title: 'Emotional Haldi Celebration Shots',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=85',
    caption: 'Vibrant marigold petals and joyful laughter frozen in time.',
    eventDate: 'August 2026'
  },
  {
    id: 'gal-12',
    title: 'LED Wall & Live Concert Audio Rig',
    category: 'Receptions',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    caption: 'P4 high-definition video backdrop with dynamic lighting choreography.',
    eventDate: 'July 2026'
  }
];

// Real-time booking store: initialized empty so calendar reflects only genuine bookings
export const INITIAL_BOOKINGS: BookingEnquiry[] = [];

// Real-time calendar block store: initialized empty so calendar reflects only genuine admin blocks
export const INITIAL_BLOCKED_DATES: BlockedDate[] = [];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Arun & Priya',
    event: 'Wedding Reception',
    location: 'ITC Grand Chola, Chennai',
    rating: 5,
    quote: 'MSB made our reception beautiful. The decoration, photography and coordination were handled perfectly. Every single guest complimented the grand stage and floral entrance!'
  },
  {
    id: 't-2',
    name: 'Karthik',
    event: '1st Birthday Celebration',
    location: 'ECR, Chennai',
    rating: 5,
    quote: 'The theme decoration, live popcorn, chocolate fountain, and cartoon characters kept all the children and families thoroughly entertained. Zero stress for parents on such a big day.'
  },
  {
    id: 't-3',
    name: 'Nivetha',
    event: 'Grand Engagement & Sangeet',
    location: 'Coimbatore',
    rating: 5,
    quote: 'From the romantic floral stage and cold pyro grand entry to the drone shoots and cinematic teaser, everything exceeded our expectations. The MSB team is humble, punctual, and extraordinarily creative.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How early should I book my event?',
    answer: 'For weddings and large weekend receptions, we strongly recommend booking 3 to 6 months in advance, especially during auspicious muhurtham dates when dates fill up rapidly. For birthdays, corporate events, and intimate gatherings, 3 to 4 weeks advance booking is usually sufficient.'
  },
  {
    id: 'faq-2',
    question: 'Can packages be customized?',
    answer: 'Yes, absolutely! Our Essential, Signature, and Royal packages serve as structured baselines. You can add or swap any service—including live food stalls, grand car entries, specific floral species, or live musicians—to match your venue dimensions and individual vision.'
  },
  {
    id: 'faq-3',
    question: 'Do you provide services outside the city?',
    answer: 'Yes. While our headquarters are in Chennai, MSB Event Management regularly executes destination weddings and celebrations across Coimbatore, Madurai, Trichy, Pondicherry, Bangalore, and all major destinations in South India.'
  },
  {
    id: 'faq-4',
    question: 'How do I check whether my date is available?',
    answer: 'You can use our interactive "Check Event Availability" calendar right on this website. Simply navigate to the month of your event. Dates marked in green/light are available, amber dates have pending enquiries, and red dates are fully booked or confirmed. Select an available date to begin your enquiry.'
  },
  {
    id: 'faq-5',
    question: 'Does submitting an enquiry confirm my booking?',
    answer: 'No. Submitting an online enquiry marks your interest as PENDING. Our event operations director reviews the venue availability, technical requirements, and logistics within 2 to 4 hours. The booking is officially CONFIRMED only after mutual discussion and advance deposit.'
  },
  {
    id: 'faq-6',
    question: 'Can I add additional services later?',
    answer: 'Yes, you can easily add extra attractions like the 360-degree video booth, cold pyro fireworks, live counters, or mascot characters up to 7 days before your event date.'
  },
  {
    id: 'faq-7',
    question: 'Do you provide photography separately?',
    answer: 'Yes! While most clients prefer our complete event packages for seamless coordination, you can book our Traditional, Candid, Cinematic Videography, and 4K Drone photography team as an independent service.'
  }
];
