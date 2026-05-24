import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'United Kingdom',
    text: 'A piece of absolute paradise on earth. Watching the mountain mist lift over the winding river from my private deck with a fresh Ceylon tea was unforgettable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Anura Senanayake',
    location: 'Colombo, Sri Lanka',
    text: 'Spectacular dining. The Clay-pot Crab Curry cooked over charcoal was a culinary masterpiece. The staff welcomed us like family with traditional warmth.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    location: 'Munich, Germany',
    text: 'The infinity river pool is a design marvel. Swimming right at the edge of the rushing river currents in warm waters was pure wellness bliss.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Jean & Chloe',
    location: 'Paris, France',
    text: 'Breathtaking honeymoon! The private candlelit deck dinner on the river banks with soft traditional flute music was the highlight of our Sri Lankan trip.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop'
  }
];

// Duplicate the array to allow seamless infinite scroll marquee looping
const DOUBLE_REVIEWS = [...REVIEWS, ...REVIEWS];

const Reviews = () => {
  return (
    <section id="reviews" className="relative w-full py-24 bg-river-dark overflow-hidden border-t border-royal/5">
      
      {/* Background glow overlay */}
      <div className="absolute bottom-1/4 right-[20%] w-[450px] h-[450px] bg-river-light/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        
        {/* Header */}
        <div className="space-y-4 mb-16 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              Guest Impressions
            </span>
            <span className="h-[1px] w-8 bg-gold"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal">
            Voices from the Riverside
          </h2>
        </div>

        {/* Marquee Scroller container */}
        <div className="relative w-full overflow-hidden py-4 flex mask-fade-edges">
          
          {/* Custom style for marquee looping */}
          <style dangerouslySetInnerHTML={{__html: `
            .mask-fade-edges {
              mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            }
            @keyframes marqueeX {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marqueeX 35s linear infinite;
            }
          `}} />

          {/* Marquee Row */}
          <div className="flex space-x-6 md:space-x-8 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing w-max">
            {DOUBLE_REVIEWS.map((rev, index) => (
              <div
                key={index}
                className="w-[300px] md:w-[380px] flex-shrink-0 rounded-2xl glass border border-royal/10 p-6 md:p-8 flex flex-col justify-between text-left shadow-lg transition-transform duration-500 hover:scale-[1.01] hover:border-gold/20 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Stars */}
                    <div className="flex space-x-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-gold/30 group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <p className="text-royal/80 text-xs md:text-sm leading-relaxed font-light mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 border-t border-royal/10 pt-4">
                  {/* Animated Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/30 p-0.5">
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 border border-gold/30 rounded-full scale-95 animate-pulse-slow"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-royal">{rev.name}</h4>
                    <span className="text-[10px] text-royal/40 uppercase tracking-widest block">{rev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Reviews;
