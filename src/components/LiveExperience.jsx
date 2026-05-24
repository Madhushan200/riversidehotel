import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Eye, MapPin, Sparkles, X, ChevronRight } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'dining',
    name: 'The River Plate',
    coordinates: { x: '25%', y: '18%' },
    title: 'Fine Dining on the Water',
    desc: 'Indulge in candlelit dinners right on the river banks, accompanied by the soothing melody of flowing water and local jazz.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    attraction: 'Chef’s table & organic spices'
  },
  {
    id: 'pool',
    name: 'Infinity River Pool',
    coordinates: { x: '70%', y: '35%' },
    title: 'Seamless Waterscape Pool',
    desc: 'An infinity edge pool that merges directly with the flowing Badulu Oya river, offering temperature-controlled relaxation year-round.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop',
    attraction: 'Poolside bar & sunbeds'
  },
  {
    id: 'view',
    name: 'Mist View Deck',
    coordinates: { x: '35%', y: '55%' },
    title: 'Sunrise Vista Deck',
    desc: 'Perched high over the river curve. Watch the iconic morning mist slowly lift from the valley mountains with a fresh cup of Ceylon tea.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop',
    attraction: 'Telescope view & tea lounge'
  },
  {
    id: 'family',
    name: 'Nature Camp Zone',
    coordinates: { x: '60%', y: '72%' },
    title: 'Riverside Campgrounds',
    desc: 'Secure, lush campgrounds designed for stargazing, evening campfires, and active exploration of the surrounding tropical woods.',
    image: 'https://images.unsplash.com/photo-1537905569194-3a9bc40d404d?q=80&w=600&auto=format&fit=crop',
    attraction: 'Bonfires & archery guides'
  },
  {
    id: 'events',
    name: 'Wilderness Sanctuary',
    coordinates: { x: '30%', y: '88%' },
    title: 'Elegant Forest Weddings',
    desc: 'Say your vows under an archway of tropical foliage, with the majestic mountains and glistening river as your witness.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    attraction: 'Capacity for up to 150 guests'
  }
];

const LiveExperience = () => {
  const [activeSpot, setActiveSpot] = useState(HOTSPOTS[0]);

  return (
    <section id="experiences" className="relative w-full py-24 bg-river-dark border-t border-royal/5">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-river-light/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Headers */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              Curated Encounters
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal">
            Live Riverside Experiences
          </h2>
          <p className="text-royal/60 text-xs md:text-sm max-w-xl font-light">
            Interactive map of our hotel grounds. Click on the pulsating hotspots along our flowing river coordinate map to reveal curated moments.
          </p>
        </div>

        {/* Interactive map display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[500px]">
          
          {/* Left: River Map Canvas */}
          <div className="lg:col-span-7 rounded-3xl glass border border-royal/10 relative p-6 overflow-hidden flex items-center justify-center min-h-[350px] lg:min-h-[500px]">
            
            {/* The Animated Winding River SVG */}
            <svg 
              viewBox="0 0 400 600" 
              className="absolute inset-0 w-full h-full p-8 opacity-80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="river-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#072B49" />
                  <stop offset="50%" stopColor="#0b3d68" />
                  <stop offset="100%" stopColor="#072B49" />
                </linearGradient>
              </defs>

              {/* River Bed Silhouette */}
              <path 
                d="M 120,0 C 140,100 80,180 150,280 C 230,380 280,420 180,500 C 120,550 140,600 140,600"
                fill="none" 
                stroke="url(#river-grad)" 
                strokeWidth="48" 
                strokeLinecap="round"
              />

              {/* Flowing Water waves lines */}
              <path 
                d="M 120,0 C 140,100 80,180 150,280 C 230,380 280,420 180,500 C 120,550 140,600 140,600"
                fill="none" 
                stroke="#D9A441" 
                strokeWidth="2" 
                strokeDasharray="15 25"
                strokeLinecap="round"
                opacity="0.6"
                className="animate-[dash_6s_linear_infinite]"
                style={{
                  animation: 'riverFlow 12s linear infinite'
                }}
              />
              <path 
                d="M 124,0 C 144,100 84,180 154,280 C 234,380 284,420 184,500 C 124,550 144,600 144,600"
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="1" 
                strokeDasharray="8 30"
                strokeLinecap="round"
                opacity="0.3"
                style={{
                  animation: 'riverFlow 8s linear infinite'
                }}
              />
            </svg>

            {/* Custom Animation Inline Styles for River Dash offset */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes riverFlow {
                to {
                  stroke-dashoffset: -200;
                }
              }
            `}} />

            {/* Interactive Pulse Hotspots */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeSpot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpot(spot)}
                  style={{
                    left: spot.coordinates.x,
                    top: spot.coordinates.y
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring ripple animations */}
                    <div className={`absolute w-10 h-10 border rounded-full transition-all duration-700 ${
                      isActive 
                        ? 'border-gold scale-125 opacity-100 animate-ping' 
                        : 'border-royal/30 scale-75 group-hover:scale-100 group-hover:opacity-80 group-hover:border-gold animate-pulse'
                    }`} />
                    <div className={`absolute w-6 h-6 border rounded-full transition-all duration-700 ${
                      isActive 
                        ? 'border-gold/60 scale-110' 
                        : 'border-royal/10 scale-90'
                    }`} />

                    {/* Central Dot */}
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 shadow-md ${
                      isActive 
                        ? 'bg-gold glow-gold scale-110' 
                        : 'bg-royal/80 group-hover:bg-gold'
                    }`} />

                    {/* Hover text label */}
                    <div className="absolute top-6 whitespace-nowrap bg-river-dark/95 border border-royal/10 text-[10px] tracking-widest uppercase font-semibold text-royal px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {spot.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Glassmorphic Reveal Drawer */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-3xl glass border border-royal/10 p-6 flex flex-col justify-between shadow-xl min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col text-left space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 animate-spin-slow" />
                      Active Hotspot
                    </span>
                    <span className="text-xs text-royal/40 tracking-wider">
                      {activeSpot.attraction}
                    </span>
                  </div>

                  {/* Spot Image */}
                  <div className="w-full h-[220px] rounded-2xl overflow-hidden shadow-md relative">
                    <img 
                      src={activeSpot.image} 
                      alt={activeSpot.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-river-dark/50 to-transparent"></div>
                  </div>

                  {/* Spot Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-royal">
                      {activeSpot.title}
                    </h3>
                    <p className="text-royal/80 text-xs md:text-sm leading-relaxed">
                      {activeSpot.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom booking routing CTA */}
              <div className="pt-4 border-t border-royal/10 flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2 text-royal/50 text-[11px] uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  <span>River Side Grounds</span>
                </div>
                <a
                  href="#booking"
                  className="text-xs font-bold text-gold hover:text-gold-light tracking-wider flex items-center gap-1 uppercase transition-colors"
                >
                  Explore Booking
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LiveExperience;
