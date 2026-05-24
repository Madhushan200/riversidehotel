import React from 'react';
import { Building, GlassWater, Coffee, ShieldCheck, Wifi, Flame, HeartHandshake } from 'lucide-react';

const FACILITIES = [
  {
    icon: Building,
    name: 'Moderated Ground Lobby',
    desc: 'Our newly designed reception lobby on the ground floor. Cozy seating areas, express check-in, and complimentary welcoming Ceylon tea.'
  },
  {
    icon: GlassWater,
    name: 'Rooftop Bar & Pub',
    desc: 'Located on the 4th floor. Features draft beers, international spirits, and a rustic pub environment overlooking Badulla town peaks.'
  },
  {
    icon: Coffee,
    name: 'Rooftop Restaurant',
    desc: 'Serves delicious Sri Lankan breakfasts, hoppers, curries, and Western options with scenic skyline mountain views.'
  },
  {
    icon: Flame,
    name: 'BBQ Terraces',
    desc: 'Special charcoal BBQ grills available on the roof-top deck for group celebrations and evening grill dinners.'
  },
  {
    icon: Wifi,
    name: 'Free Highspeed WiFi',
    desc: 'Uncapped, fast WiFi connection available throughout the lobby, rooms, conference halls, and dining areas.'
  },
  {
    icon: HeartHandshake,
    name: 'Bespoke Room Service',
    desc: 'Our hospitality staff is available for in-room dining drops, fresh towels, laundry service, and transport reservations.'
  }
];

const FacilitiesView = () => {
  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Comfort & Amenities
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            Hotel Facilities
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            Discover the modernized spaces and curated guest services built to make your Badulla stay seamless.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((fac, i) => {
            const IconComp = fac.icon;
            return (
              <div 
                key={i}
                className="p-6 rounded-2xl glass border border-river-blue/10 text-left space-y-4 hover:border-gold/30 transition-colors duration-500 shadow-md glow-gold-hover group cursor-pointer"
              >
                <div className="p-3 w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                  <IconComp className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-serif font-bold text-river-blue group-hover:text-gold transition-colors duration-300">
                    {fac.name}
                  </h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    {fac.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FacilitiesView;
