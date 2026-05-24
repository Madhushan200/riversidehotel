import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Wifi, Waves, Map, UtensilsCrossed, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

const ROOMS_DATA = [
  {
    id: 1,
    number: '101',
    name: 'Deluxe River Haven',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['AC', 'WiFi', 'River View', 'Balcony', 'Dining'],
    size: '45 m²',
    bed: 'King Size'
  },
  {
    id: 2,
    number: '202',
    name: 'Mountain View Sanctuary',
    price: 260,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['AC', 'WiFi', 'Mountain View', 'Private Jacuzzi', 'Balcony'],
    size: '58 m²',
    bed: 'Super King'
  },
  {
    id: 3,
    number: '303',
    name: 'Riverside Emerald Suite',
    price: 380,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['AC', 'WiFi', 'River View', 'Living Lounge', 'Private Bar', 'Dining'],
    size: '80 m²',
    bed: 'Super King Plume'
  },
  {
    id: 4,
    number: '404',
    name: 'Badulla Presidential Estate',
    price: 520,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['AC', 'WiFi', '360° Panoramas', 'Infinity Pool Access', 'Private Chef', 'Dining', 'Balcony'],
    size: '125 m²',
    bed: 'Royal Double King'
  }
];

const FeatureIcon = ({ name }) => {
  const cn = "h-4 w-4 text-gold";
  switch (name.toLowerCase()) {
    case 'ac': return <Wind className={cn} />;
    case 'wifi': return <Wifi className={cn} />;
    case 'river view': return <Waves className={cn} />;
    case 'mountain view': return <Map className={cn} />;
    case 'balcony': return <Map className={cn} />;
    case 'dining': return <UtensilsCrossed className={cn} />;
    default: return <Sparkles className={cn} />;
  }
};

const RoomCard = ({ room, onExplore }) => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const cardRef = useRef(null);

  // Calculate image index based on cursor horizontal position inside the image
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    
    // Divide card width into number of images for 360 virtual tour effect
    const idx = Math.min(
      Math.floor(pct * room.images.length), 
      room.images.length - 1
    );
    if (idx >= 0) {
      setHoverIndex(idx);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex-shrink-0 w-[300px] md:w-[360px] h-[520px] rounded-3xl overflow-hidden glass border border-royal/10 flex flex-col justify-between p-4 shadow-xl relative group"
    >
      {/* Dynamic Image Container */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(0)}
        className="w-full h-[260px] rounded-2xl overflow-hidden relative cursor-ew-resize"
      >
        <img
          src={room.images[hoverIndex]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-river-dark/50 to-transparent"></div>
        <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-river-dark/70 border border-royal/10 text-xs font-semibold uppercase tracking-widest text-gold">
          Suite {room.number}
        </div>

        {/* 360 degree indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 py-1 px-2.5 rounded-full bg-gold/15 backdrop-blur-md border border-gold/30 text-[9px] uppercase tracking-wider text-gold font-bold">
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping"></span>
          <span>Hover to Rotate 360°</span>
        </div>

        {/* Rotational segments visual helper */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {room.images.map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-colors ${i === hoverIndex ? 'bg-gold' : 'bg-royal/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="flex-1 flex flex-col justify-between mt-4">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-serif font-bold text-royal group-hover:text-gold transition-colors duration-300">
              {room.name}
            </h3>
            <span className="text-right">
              <span className="text-lg font-bold text-gold font-sans">${room.price}</span>
              <span className="block text-[10px] text-royal/40 uppercase tracking-widest">/ Night</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {room.features.slice(0, 4).map((feat, i) => (
              <div 
                key={i} 
                className="flex items-center space-x-1.5 py-1 px-2.5 rounded-lg bg-royal/5 border border-royal/5 text-[10px] text-royal/80"
              >
                <FeatureIcon name={feat} />
                <span>{feat}</span>
              </div>
            ))}
            {room.features.length > 4 && (
              <div className="py-1 px-2 rounded-lg bg-royal/5 border border-royal/5 text-[10px] text-gold font-bold">
                +{room.features.length - 4} More
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-royal/10 flex justify-between items-center mt-4">
          <div className="text-[11px] text-royal/50 tracking-wider">
            <span>{room.size}</span>
            <span className="mx-2">•</span>
            <span>{room.bed}</span>
          </div>

          <button
            onClick={() => onExplore(room)}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-light transition-all duration-300"
          >
            Explore Room
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const RoomShowcase = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="rooms" className="relative w-full py-24 bg-river-dark border-t border-royal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-gold"></span>
              <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                Sanctuaries of Quietude
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal">
              Exquisite Stays & Suites
            </h2>
          </div>

          {/* Navigation sliders buttons */}
          <div className="flex space-x-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 rounded-full border border-royal/20 hover:border-gold text-royal hover:text-gold bg-royal/5 backdrop-blur-sm transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 rounded-full border border-royal/20 hover:border-gold text-royal hover:text-gold bg-royal/5 backdrop-blur-sm transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Area */}
        <div 
          ref={scrollRef}
          className="flex space-x-6 md:space-x-8 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth"
        >
          {ROOMS_DATA.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onExplore={setSelectedRoom} 
            />
          ))}
        </div>

      </div>

      {/* Cinematic Modal Window */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-river-dark/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-heavy border border-gold/20 p-6 md:p-8 flex flex-col md:grid md:grid-cols-2 gap-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-river-dark/70 hover:bg-gold/20 text-royal hover:text-gold transition-colors z-20 border border-royal/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Carousel Showcase */}
              <div className="flex flex-col space-y-4">
                <div className="w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden relative shadow-lg">
                  <img
                    src={selectedRoom.images[0]}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-river-dark/40 to-transparent"></div>
                </div>
                {/* Image Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {selectedRoom.images.map((img, i) => (
                    <div key={i} className="h-16 rounded-xl overflow-hidden border border-royal/15">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Information details */}
              <div className="flex flex-col justify-between text-left space-y-6">
                <div>
                  <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold block mb-1">
                    Suite {selectedRoom.number}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-royal">
                    {selectedRoom.name}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-2xl font-bold text-gold">${selectedRoom.price}</span>
                    <span className="text-xs text-royal/50 tracking-wider">/ Night</span>
                  </div>

                  <p className="text-royal/80 text-xs md:text-sm leading-relaxed mt-4">
                    Our luxury sanctuary provides a retreat for rest, relaxation, and sensory bliss. Step into standard amenities like plush Egyptian linens, a private viewing deck, customizable environmental controls, and a fully stocked high-end minibar featuring local Sri Lankan delights.
                  </p>

                  {/* Complete features specification list */}
                  <h4 className="text-xs font-semibold text-royal uppercase tracking-widest mt-6 mb-3">
                    Premium Features included
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRoom.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2.5 text-xs text-royal/90">
                        <div className="p-1.5 rounded-lg bg-gold/15 border border-gold/30">
                          <FeatureIcon name={feat} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Size & Bed Details */}
                  <div className="grid grid-cols-2 gap-4 mt-6 border-t border-royal/10 pt-4 text-xs text-royal/50">
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-royal/70">Room Size</span>
                      <span className="text-gold">{selectedRoom.size}</span>
                    </div>
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-royal/70">Bed Type</span>
                      <span className="text-gold">{selectedRoom.bed}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <a
                    href="#booking"
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1 py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-light transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Select Room & Book
                  </a>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-royal border border-royal/20 hover:border-gold hover:text-gold transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default RoomShowcase;
