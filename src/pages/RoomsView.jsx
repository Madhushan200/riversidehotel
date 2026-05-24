import React from 'react';
import { Wind, Wifi, Check } from 'lucide-react';

const ROOMS = [
  {
    id: 'double',
    name: 'Classic Double Room',
    price: '80',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop'
    ],
    desc: 'Bespoke double room designed for comfort and relaxation. Perfect for couples or single travellers seeking a peaceful retreat in Badulla.',
    specs: ['AC & Fans', 'Free Highspeed WiFi', 'Flat TV Screen', 'Mini Tea Bar', 'Modern Toiletries', 'Ground-Lobby Access'],
    size: '32 m²',
    bed: 'King Bed'
  },
  {
    id: 'triple',
    name: 'Superior Triple Room',
    price: '110',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800&auto=format&fit=crop'
    ],
    desc: 'Spacious accommodation featuring a configuration of one double bed and one single bed. Ideal for friend groups or small families.',
    specs: ['AC & Fans', 'Free Highspeed WiFi', 'Flat TV Screen', 'Mini Tea Bar', 'Lounge Seating', 'Balcony Area'],
    size: '42 m²',
    bed: '1 Double + 1 Single'
  },
  {
    id: 'family',
    name: 'Heritage Family Suite',
    price: '150',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
    ],
    desc: 'Our largest accommodation suite, featuring comfortable double beds, a spacious living area, and private balcony terraces with views of Badulla mountain peaks.',
    specs: ['AC & Fans', 'Free Highspeed WiFi', 'Smart TV Console', 'Complimentary BBQ Grill', 'Premium Room Service', 'Private Terrace Balcony'],
    size: '56 m²',
    bed: '2 Queen Beds'
  }
];

const RoomsView = ({ setCurrentPage }) => {
  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Rooms & Accommodation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            Exquisite Guest Suites
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            Explore our Double, Triple, and Family room selections, newly rebuilt to offer modern amenities and absolute comfort.
          </p>
        </div>

        {/* Rooms Stack */}
        <div className="space-y-12">
          {ROOMS.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={room.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl glass border border-river-blue/10 p-5 md:p-8 shadow-md ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Room Image Carousel */}
                <div className={`lg:col-span-6 rounded-2xl overflow-hidden relative min-h-[250px] md:min-h-[350px] ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <img 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-river-dark/50 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="text-[10px] uppercase tracking-widest text-gold bg-gold/15 border border-gold/30 px-3.5 py-1.5 rounded-full font-bold">
                      {room.size} • {room.bed}
                    </span>
                  </div>
                </div>

                {/* Room Content */}
                <div className={`lg:col-span-6 flex flex-col justify-between text-left p-2 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-river-blue">{room.name}</h3>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gold font-sans">${room.price}</span>
                        <span className="block text-[9px] text-river-blue/40 uppercase tracking-widest">/ Night</span>
                      </div>
                    </div>

                    <p className="text-river-blue/70 text-xs md:text-sm leading-relaxed font-light">
                      {room.desc}
                    </p>

                    <div className="border-t border-river-blue/10 pt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-river-blue/50 mb-3">Room Specifications</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {room.specs.map((spec, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-river-blue/90 font-light">
                            <Check className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4 mt-6 border-t border-river-blue/10">
                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="flex-1 py-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-river-dark bg-gold hover:bg-gold-dark hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Book Room
                    </button>
                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-river-blue border border-river-blue/20 hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default RoomsView;
