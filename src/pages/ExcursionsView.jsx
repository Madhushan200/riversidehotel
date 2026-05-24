import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const EXCURSIONS = [
  {
    id: 'hiking',
    name: 'Mountain Hiking',
    target: 'Namunukula & Ella Trails',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    desc: 'Bespoke hiking trips arranged by our reception. Hike the lush Namunukula peak or walk up to Ella Rock to see standard misty valley views.',
    duration: 'Half Day / Full Day',
    difficulty: 'Moderate'
  },
  {
    id: 'cycling',
    name: 'Valley Cycling',
    target: 'Badulla Countryside Trails',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    desc: 'Rent standard mountain bikes at our lobby and trace the scenic winding trails, country roads, and old railway arches in Badulla.',
    duration: '2 - 4 Hours',
    difficulty: 'Easy'
  },
  {
    id: 'scenery',
    name: 'Lovely Sceneries',
    target: 'Nine Arch Bridge & Dunhinda',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    desc: 'Sightseeing tours to the historic Demodara Nine Arch Bridge and the majestic Dunhinda Waterfalls. Beautiful photo moments.',
    duration: '3 Hours',
    difficulty: 'Easy'
  },
  {
    id: 'rafting',
    name: 'White Water Rafting',
    target: 'Kitulgala Highland Rivers',
    image: 'https://images.unsplash.com/photo-1537905569194-3a9bc40d404d?q=80&w=800&auto=format&fit=crop',
    desc: 'Exciting white water rafting day excursions arranged on the wild rapids of nearby Kelani currents with trained safety instructors.',
    duration: 'Full Day Tour',
    difficulty: 'Adventurous'
  }
];

const ExcursionsView = () => {
  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Local Explorations
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-river-blue">
            Adventure Excursions
          </h1>
          <p className="text-river-blue/60 text-sm max-w-xl font-light">
            Embark on curated travel excursions surrounding Badulla, organized by River Side Hotel guides.
          </p>
        </div>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXCURSIONS.map((exc) => (
            <div 
              key={exc.id}
              className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-[400px] group cursor-pointer"
            >
              <div className="w-full h-[180px] overflow-hidden relative">
                <img 
                  src={exc.image} 
                  alt={exc.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-river-dark/50 to-transparent"></div>
                <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-river-dark/80 border border-royal/10 text-[9px] font-semibold uppercase tracking-wider text-gold">
                  {exc.difficulty}
                </div>
              </div>

              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {exc.target}
                  </span>
                  <h3 className="text-lg font-bold text-river-blue">
                    {exc.name}
                  </h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    {exc.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-river-blue/10 flex justify-between items-center text-xs text-river-blue/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gold" />
                    <span>Duration: {exc.duration}</span>
                  </div>
                  <span className="text-gold font-bold tracking-wider uppercase text-[9px]">Inquire at Lobby</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExcursionsView;
