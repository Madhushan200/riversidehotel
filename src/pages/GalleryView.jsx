import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, title: 'Morning Mist Balcony', category: 'rooms', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop', aspect: 'h-[320px]' },
  { id: 2, title: 'Reflecting Water Basin', category: 'nature', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop', aspect: 'h-[240px]' },
  { id: 3, title: 'Gourmet Hopper Spread', category: 'food', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', aspect: 'h-[280px]' },
  { id: 4, title: 'Banquet Celebration Setups', category: 'events', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop', aspect: 'h-[360px]' },
  { id: 5, title: 'Heritage Double Suite', category: 'rooms', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop', aspect: 'h-[260px]' },
  { id: 6, title: 'Namunukula Mountain peak', category: 'nature', image: 'https://images.unsplash.com/photo-1537905569194-3a9bc40d404d?q=80&w=600&auto=format&fit=crop', aspect: 'h-[380px]' },
  { id: 7, title: 'Spiced Ginger Toddy Glass', category: 'food', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop', aspect: 'h-[230px]' },
  { id: 8, title: 'Rooftop Bar Nightscape', category: 'events', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop', aspect: 'h-[290px]' },
  { id: 9, title: 'Badulla Tea Valleys', category: 'nature', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', aspect: 'h-[340px]' }
];

const GalleryView = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'nature', label: 'Nature' },
    { id: 'food', label: 'Food' },
    { id: 'events', label: 'Events' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => prev === 0 ? filteredItems.length - 1 : prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => prev === filteredItems.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-gold"></span>
              <span className="text-gold uppercase tracking-widest text-xs font-bold">
                Visual Portfolios
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
              The Hotel Gallery
            </h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setLightboxIndex(null); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-gold border-gold text-river-dark'
                    : 'bg-river-blue/5 border-river-blue/10 text-river-blue hover:border-gold hover:text-gold'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className={`w-full ${item.aspect} rounded-2xl overflow-hidden glass border border-river-blue/10 relative group cursor-pointer break-inside-avoid shadow-lg`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-river-dark/80 via-river-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-1">{item.category}</span>
                <h3 className="text-lg font-serif font-bold text-white flex items-center justify-between">
                  {item.title}
                  <Maximize2 className="h-4 w-4 text-white/60 group-hover:text-gold transition-colors" />
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-river-dark/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-river-dark/70 hover:bg-gold/20 text-white hover:text-gold border border-royal/15 transition-colors z-20"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-river-dark/70 hover:bg-gold/20 text-white hover:text-gold border border-royal/15 transition-colors z-20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="relative max-w-4xl max-h-[80vh] flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-royal/10"
                />
              </AnimatePresence>
              <div className="text-center mt-6 space-y-1 text-white">
                <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold">{filteredItems[lightboxIndex].category}</span>
                <h3 className="text-2xl font-serif font-bold">{filteredItems[lightboxIndex].title}</h3>
                <span className="text-xs text-white/40 tracking-widest font-sans">{lightboxIndex + 1} / {filteredItems.length}</span>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-river-dark/70 hover:bg-gold/20 text-white hover:text-gold border border-royal/15 transition-colors z-20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryView;
