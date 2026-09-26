import React, { useState } from 'react';
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
} from '../data/mockData';
import { ServiceCategory, ServiceItem } from '../types';
import { useBooking } from '../context/BookingContext';
import {
  Sparkles,
  Camera,
  Utensils,
  Car,
  Music,
  Smile,
  Zap,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  Footprints,
  Signpost,
  Tv,
  CircleDot,
  Flower2,
  Palette,
  Video,
  Heart,
  Film,
  Radio,
  Image,
  Sun,
  MonitorPlay,
  Coffee,
  Cloud,
  IceCream,
  Leaf,
  GlassWater,
  Apple,
  Shield,
  Bike,
  Compass,
  Crown,
  Stars,
  CloudRain,
  Disc,
  Drum,
  Activity,
  Flame,
  Mic,
  Smartphone,
  Crosshair,
  Cpu,
  Circle,
  Wind
} from 'lucide-react';

const CATEGORY_META: Record<
  ServiceCategory,
  { label: string; short: string; description: string; icon: React.ReactNode }
> = {
  'DECORATION': {
    label: 'Stage & Venue Décor',
    short: 'Decoration',
    description: 'Floral mandaps, grand entrance archways, crystal chandeliers and ambient LED backdrops.',
    icon: <Sparkles className="w-4 h-4" />
  },
  'PHOTOGRAPHY & FILM': {
    label: 'Photography & 4K Film',
    short: 'Photography',
    description: 'Traditional ritual coverage, candid emotions, pre-wedding films, and licensed 4K drone cinematography.',
    icon: <Camera className="w-4 h-4" />
  },
  'FOOD & LIVE COUNTERS': {
    label: 'Food & Live Counters',
    short: 'Live Counters',
    description: 'Interactive dessert stations, Belgian chocolate fountains, spun cotton candy, and artisan royal paan.',
    icon: <Utensils className="w-4 h-4" />
  },
  'GRAND ENTRY': {
    label: 'Grand Entries',
    short: 'Grand Entry',
    description: 'Chauffeured luxury convertibles, vintage roadsters, motorized floral chariots, and cold pyro tunnels.',
    icon: <Car className="w-4 h-4" />
  },
  'ENTERTAINMENT': {
    label: 'Entertainment & Music',
    short: 'Entertainment',
    description: 'High-energy wedding DJs, acoustic fusion bands, traditional Kerala Chenda Melam, and charismatic MCs.',
    icon: <Music className="w-4 h-4" />
  },
  'CHARACTERS & SPECIAL ATTRACTIONS': {
    label: 'Characters & Mascots',
    short: 'Characters',
    description: 'Life-sized cartoon mascots, superhero cosplay artists, stilt-walking LED robots, and interactive party fun.',
    icon: <Smile className="w-4 h-4" />
  },
  'SPECIAL EFFECTS': {
    label: 'Special Effects (SFX)',
    short: 'Special Effects',
    description: 'Smokeless cold pyro, low-lying heavy dry ice fog, metallic confetti blasters, and bubble cascades.',
    icon: <Zap className="w-4 h-4" />
  }
};

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('DECORATION');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { openBookingModal } = useBooking();

  const activeServices = SERVICES_DATA.filter(s => s.category === activeCategory);

  const toggleServiceSelection = (serviceName: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleBookWithServices = () => {
    openBookingModal();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'DoorOpen': return <DoorOpen className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Signpost': return <Signpost className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5" />;
      case 'Flower2': return <Flower2 className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'MonitorPlay': return <MonitorPlay className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      case 'IceCream': return <IceCream className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'GlassWater': return <GlassWater className="w-5 h-5" />;
      case 'Apple': return <Apple className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Bike': return <Bike className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Stars': return <Stars className="w-5 h-5" />;
      case 'CloudRain': return <CloudRain className="w-5 h-5" />;
      case 'Disc': return <Disc className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Drum': return <Drum className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Circle': return <Circle className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#EDE6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#956C36] bg-[#F5EEDB] px-3.5 py-1 rounded-full inline-block mb-3 border border-[#DEC388]/40">
            Our Complete Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1F23] mb-4">
            Flawless Services, Curated by Category
          </h2>
          <p className="text-base text-[#5A6068] leading-relaxed">
            From regal stage decor and 4K aerial photography to live live-action counters and cinematic grand entries, browse our distinct event disciplines.
          </p>
        </div>

        {/* CATEGORY TABS / CHIPS */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2 sm:gap-2.5">
          {SERVICE_CATEGORIES.map((category) => {
            const meta = CATEGORY_META[category];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                id={`service-cat-tab-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center space-x-2 shrink-0 border ${
                  isActive
                    ? 'bg-[#1C1F23] text-white border-[#1C1F23] shadow-md -translate-y-0.5'
                    : 'bg-white text-[#4A4F55] hover:text-[#1C1F23] border-[#E8E0D2] hover:bg-[#F3EDE2]'
                }`}
              >
                <span className={isActive ? 'text-[#E5B869]' : 'text-[#956C36]'}>
                  {meta.icon}
                </span>
                <span>{meta.short}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-gray-500'
                }`}>
                  {SERVICES_DATA.filter(s => s.category === category).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CATEGORY BANNER DESCRIPTION */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-xs mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#956C36] mb-1">
              <span>Category Overview</span>
              <span>•</span>
              <span>{CATEGORY_META[activeCategory].short}</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#1C1F23]">
              {CATEGORY_META[activeCategory].label}
            </h3>
            <p className="text-sm text-[#5A6068] mt-1 max-w-2xl">
              {CATEGORY_META[activeCategory].description}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#B38845] hover:text-white rounded-md shadow-xs transition-colors"
            >
              Enquire for this Category
            </button>
          </div>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {activeServices.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`group bg-white rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#FBF8F0] shadow-md ring-1 ring-[#C5A059]'
                    : 'border-[#EDE6DA] shadow-xs hover:shadow-md hover:border-[#DEC388]'
                }`}
              >
                <div>
                  {/* ICON & BADGE ROW */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] border border-[#DEC388]/60 flex items-center justify-center text-[#956C36] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                      {renderIcon(service.iconName)}
                    </div>

                    {service.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#956C36] bg-[#F6EEDB] px-2 py-0.5 rounded-full border border-[#DEC388]/50">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* NAME & DESCRIPTION */}
                  <h4 className="font-serif text-lg font-semibold text-[#1C1F23] mb-2 group-hover:text-[#956C36] transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs text-[#5A6068] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* BOTTOM ACTION */}
                <div className="pt-3 border-t border-[#F0EAE0] flex items-center justify-between">
                  <button
                    onClick={() => toggleServiceSelection(service.name)}
                    className={`text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      isSelected ? 'text-[#956C36]' : 'text-[#666B72] hover:text-[#1C1F23]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Added to List</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#956C36]" />
                        <span>Select Service</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openBookingModal()}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#956C36] hover:underline"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FLOATING ENQUIRY BAR IF SERVICES SELECTED */}
        {selectedServices.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[92%] bg-[#1C1F23] text-white rounded-2xl p-4 shadow-2xl border border-[#C5A059]/40 flex items-center justify-between animate-in slide-in-from-bottom-5">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-[#1C1F23] font-bold text-xs flex items-center justify-center">
                {selectedServices.length}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">Services Selected</p>
                <p className="text-[11px] text-gray-300 truncate max-w-[240px] sm:max-w-xs">
                  {selectedServices.join(', ')}
                </p>
              </div>
            </div>

            <button
              onClick={handleBookWithServices}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1C1F23] bg-[#C5A059] hover:bg-[#D4B26F] rounded-lg shadow-sm shrink-0 flex items-center space-x-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
