import React from 'react';
import { Building2, Compass, CalendarDays } from 'lucide-react';

const AboutView = () => {
  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Our Legacy Since 1981
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            The Riverside Story
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            An overview of our roots, our rebuilding, and our commitment to contemporary hospitality in Badulla, Sri Lanka.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Graphic (Maintains a dark contrast theme card for high-end definition) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[340px] h-[420px] rounded-3xl overflow-hidden glass border border-river-blue/15 p-4 shadow-xl">
              
              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-river-blue to-river-dark relative p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full filter blur-xl"></div>
                
                <div className="flex items-center justify-between text-gold">
                  <CalendarDays className="h-6 w-6" />
                  <span className="text-xs uppercase font-bold tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/20 text-gold">
                    Est. 1981
                  </span>
                </div>

                <div className="flex flex-col space-y-2 mt-8 border-l border-gold/20 pl-4 text-left">
                  <div className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="text-gold">04</span> Roof-top Pub & Restaurant
                  </div>
                  <div className="text-white/60 text-xs pl-6">Panoramic town view</div>
                  <div className="text-white text-sm font-semibold flex items-center gap-2 mt-2">
                    <span className="text-gold">03</span> Guest Suite Floor
                  </div>
                  <div className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="text-gold">02</span> Deluxe Stays Floor
                  </div>
                  <div className="text-white text-sm font-semibold flex items-center gap-2 mt-2">
                    <span className="text-gold">01</span> Moderated Ground Lobby
                  </div>
                  <div className="text-white/60 text-xs pl-6">Reception desk & tea welcome</div>
                </div>

                <div className="text-left mt-8 pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Badulla Landmark</span>
                  <p className="text-xs text-white font-serif italic mt-1">"Rebuilt & Modernized for the Future"</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Details Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-3xl font-serif font-bold text-river-blue">
              From Traditional Roots to Contemporary Luxury
            </h2>

            <p className="text-river-blue/80 text-sm md:text-base leading-relaxed font-light">
              River Side Hotel Badulla traces its origin back to 1981. Over 38 years ago, a traditional building stood in this prime location, welcoming guests with early-era hospitality. 
            </p>

            <p className="text-river-blue/70 text-xs md:text-sm leading-relaxed font-light">
              Just two years ago, the hotel underwent a major architectural renaissance. The entire structure was completely rebuilt, re-engineered, and modernized under new ownership. The result is a striking, contemporary 4-story building that caters to the sophisticated needs of today's travellers while maintaining the warmth and soul of classical Sri Lankan hospitality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/10 space-y-2">
                <Building2 className="h-5 w-5 text-gold" />
                <h4 className="text-sm font-bold">4-Story Modern Layout</h4>
                <p className="text-river-blue/60 text-[11px] leading-relaxed">
                  Featuring guest suites, conference facilities, and a stunning rooftop terrace with a restaurant and pub.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/10 space-y-2">
                <Compass className="h-5 w-5 text-gold" />
                <h4 className="text-sm font-bold">Moderated Lobby</h4>
                <p className="text-river-blue/60 text-[11px] leading-relaxed">
                  A beautiful ground-floor lounge designed for quick checks, refreshments, and greeting guests on arrival.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutView;
