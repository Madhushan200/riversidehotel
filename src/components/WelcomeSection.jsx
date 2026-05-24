import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ endValue, label, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(endValue.toString().replace(/[^0-9]/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, endValue, duration]);

  // Format count back
  const displayValue = endValue.toString().includes('+') 
    ? `${count.toLocaleString()}+` 
    : count;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 rounded-2xl glass border border-royal/10 text-center">
      <span className="text-3xl md:text-4xl font-bold text-gold tracking-tight text-glow">
        {displayValue}
      </span>
      <span className="text-xs md:text-sm font-medium text-royal/60 uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
};

const WelcomeSection = () => {
  const [isBowing, setIsBowing] = useState(false);

  // Trigger auto bow every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBowing(true);
      setTimeout(() => setIsBowing(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="welcome" className="relative w-full min-h-screen py-24 bg-river-dark flex items-center justify-center overflow-hidden border-t border-royal/5">
      
      {/* Background flowing water pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="river-wave" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 0,20 Q 20,5 40,20 T 80,20" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M 0,60 Q 20,45 40,60 T 80,60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#river-wave)" />
        </svg>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-river-light/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Sri Lankan Host Avatar */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div 
            className="relative w-64 h-80 md:w-80 md:h-96 cursor-pointer"
            onMouseEnter={() => setIsBowing(true)}
            onMouseLeave={() => setIsBowing(false)}
          >
            {/* Soft decorative background circles */}
            <div className="absolute inset-0 bg-gold/5 border border-gold/10 rounded-full filter blur-xl animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold/20 rounded-full opacity-60"></div>
            
            {/* Host SVG illustration */}
            <svg 
              viewBox="0 0 200 240" 
              className="w-full h-full relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lower Body/Base (Static) */}
              <g id="lower-body">
                {/* Traditional Sarong (red/gold patterns) */}
                <path d="M60 160 L140 160 L150 240 L50 240 Z" fill="#072B49" stroke="#D9A441" strokeWidth="1.5" />
                <path d="M50 240 Q100 230 150 240" fill="none" stroke="#D9A441" strokeWidth="2" />
                {/* Sash */}
                <rect x="60" y="150" width="80" height="12" rx="4" fill="#D9A441" />
              </g>

              {/* Bowing Torso (Animated group) */}
              <motion.g 
                id="upper-body"
                animate={{ 
                  rotateX: isBowing ? 15 : 0, 
                  y: isBowing ? 8 : 0 
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ originX: "100px", originY: "160px" }}
              >
                {/* Shoulders / Torso */}
                <path d="M50 150 L150 150 L135 90 L65 90 Z" fill="#FFFFFF" stroke="#072B49" strokeWidth="1.5" />
                {/* Collar V neck */}
                <path d="M85 90 L100 110 L115 90" fill="none" stroke="#072B49" strokeWidth="2" />

                {/* Neck */}
                <rect x="92" y="76" width="16" height="15" fill="#fcd34d" rx="2" />

                {/* Face & Head */}
                <g id="head">
                  {/* Face */}
                  <ellipse cx="100" cy="55" rx="18" ry="22" fill="#fcd34d" />
                  {/* Hair */}
                  <path d="M82 48 Q100 35 118 48 Q100 30 82 48" fill="#1e293b" />
                  <ellipse cx="100" cy="36" rx="6" ry="6" fill="#1e293b" />
                  {/* Traditional Headband (Kandyan style red-gold) */}
                  <path d="M83 45 Q100 40 117 45" fill="none" stroke="#D9A441" strokeWidth="3" />
                  {/* Small Smile */}
                  <path d="M96 64 Q100 68 104 64" fill="none" stroke="#b45309" strokeWidth="1.5" />
                  {/* Eyes */}
                  <circle cx="93" cy="53" r="1.5" fill="#1e293b" />
                  <circle cx="107" cy="53" r="1.5" fill="#1e293b" />
                </g>

                {/* Arms clasped in traditional greeting gesture (Namaste/Ayubowan) */}
                <g id="hands">
                  {/* Left Arm */}
                  <path d="M65 90 C 50 110, 75 135, 95 125" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                  <path d="M65 90 C 50 110, 75 135, 95 125" fill="none" stroke="#072B49" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Right Arm */}
                  <path d="M135 90 C 150 110, 125 135, 105 125" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                  <path d="M135 90 C 150 110, 125 135, 105 125" fill="none" stroke="#072B49" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Clasped palms */}
                  <path d="M95 125 L100 110 L105 125 Z" fill="#fcd34d" stroke="#D9A441" strokeWidth="1" />
                </g>
              </motion.g>
            </svg>
          </div>

          {/* Ayubowan text */}
          <div className="text-center mt-6">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold">
              Ayubowan • வணக்கம் • Welcome
            </span>
            <p className="text-royal/50 text-xs mt-2 italic">
              "May you be blessed with a long life"
            </p>
          </div>
        </div>

        {/* Right Side: Introduction & Statistics */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              The Riverside Legacy
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal leading-tight">
            Where Wilderness Meets Unrivaled Luxury
          </h2>

          <p className="text-royal/80 text-base font-light leading-relaxed">
            Nestled on the banks of the serene Badulu Oya river, Riverside Hotel stands as an oasis of absolute calm. We offer discerning travelers a perfect harmony of untouched lush nature, breathtaking mountain vistas, and curated high-end hospitality. 
          </p>

          <p className="text-royal/70 text-sm font-light leading-relaxed">
            Every room is designed with floor-to-ceiling windows to invite the river mist inside, while our chefs craft bespoke Sri Lankan culinary adventures that celebrate local spices and organic farming. Discover the rich heritage, majestic waterfalls, and tea plantations of Badulla, then return to the peaceful lull of flowing water.
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <StatCounter endValue="12000+" label="Happy Guests" />
            <StatCounter endValue="45" label="Luxury Rooms" />
            <StatCounter endValue="12+" label="Years of Grace" />
            <StatCounter endValue="28" label="Curated Tours" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;
