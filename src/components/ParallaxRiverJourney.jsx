import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, Ship, Sunrise, Key, Home, Coffee, Sunset, Heart } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Arrival',
    desc: 'Lush valley gates open. Luggage is carried through tropical pathways.',
    icon: Sunrise,
    percent: 0.05
  },
  {
    id: 2,
    title: 'Check-in',
    desc: 'Bowing Ayubowan reception, warm Ceylon ginger tea, and cabin key ceremony.',
    icon: Key,
    percent: 0.23
  },
  {
    id: 3,
    title: 'Stay',
    desc: 'Settling into your luxury river terrace room with full floor glass views.',
    icon: Home,
    percent: 0.45
  },
  {
    id: 4,
    title: 'Dining',
    desc: 'Bespoke Sri Lankan culinary delights cooked with riverside organic farm ingredients.',
    icon: Coffee,
    percent: 0.67
  },
  {
    id: 5,
    title: 'Relaxation',
    desc: 'Deep tissue herbal spa treatments and infinity pool swimming under sunrays.',
    icon: Sunset,
    percent: 0.85
  },
  {
    id: 6,
    title: 'Memories',
    desc: 'Bidding farewell with traditional gifts and a spirit refreshed by nature.',
    icon: Heart,
    percent: 0.98
  }
];

const ParallaxRiverJourney = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [boatPos, setBoatPos] = useState({ x: 150, y: 30, angle: 90 });
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress inside this section (from entering screen to leaving screen)
      const sectionHeight = rect.height;
      const scrollStart = rect.top; // starts when top of container meets viewport
      
      // We want to map progress from when the section is centered
      const totalScrollableDist = sectionHeight - windowHeight;
      let progress = -scrollStart / totalScrollableDist;
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));

      // Calculate path coords
      try {
        const path = pathRef.current;
        const totalLength = path.getTotalLength();
        
        // Find point at current scroll percentage
        const currentLength = progress * totalLength;
        const point = path.getPointAtLength(currentLength);
        
        // Find a tiny bit ahead to calculate angle/tangent
        const lookAheadLength = Math.min(totalLength, currentLength + 2);
        const nextPoint = path.getPointAtLength(lookAheadLength);
        
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        
        // Add 90 degrees offset because boat SVG points vertically
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        
        setBoatPos({
          x: point.x,
          y: point.y,
          angle: angle
        });

        // Determine active step based on progress
        let active = 1;
        for (let i = 0; i < TIMELINE_STEPS.length; i++) {
          if (progress >= TIMELINE_STEPS[i].percent - 0.05) {
            active = TIMELINE_STEPS[i].id;
          }
        }
        setActiveStep(active);
      } catch (err) {
        // Path might not be fully loaded initially
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="journey" 
      className="relative w-full bg-river-dark border-t border-royal/5"
      style={{ height: '200vh' }} // Extended height for scroll engagement
    >
      
      {/* Sticky side context wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-[20%] w-96 h-96 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-[15%] w-[400px] h-[400px] bg-river-light/10 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative py-16">
          
          {/* Left Column: Heading and Timeline descriptions */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center h-full z-15">
            <div className="space-y-4 mb-10">
              <div className="flex items-center space-x-2">
                <span className="h-[1px] w-8 bg-gold"></span>
                <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                  A Scenic Transition
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal">
                Your Parallax River Journey
              </h2>
              <p className="text-royal/60 text-xs md:text-sm font-light">
                Scroll down to navigate our classic luxury riverboat down the flowing streams, tracing your holiday timeline milestones.
              </p>
            </div>

            {/* Timeline cards stack with progress highlighting */}
            <div className="relative border-l border-royal/15 pl-6 space-y-6 max-h-[50vh] overflow-y-auto no-scrollbar py-2">
              {TIMELINE_STEPS.map((step) => {
                const IconComp = step.icon;
                const isActive = activeStep === step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    animate={{ 
                      x: isActive ? 6 : 0,
                      opacity: isActive ? 1 : 0.4
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative text-left"
                  >
                    {/* Glowing Bullet */}
                    <div className={`absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gold border-gold text-river-dark scale-110 shadow-lg shadow-gold/20' 
                        : 'bg-river-dark border-royal/30'
                    }`}>
                      <div className="w-1.5 h-1.5 bg-royal rounded-full" />
                    </div>

                    <div className="space-y-1">
                      <h3 className={`text-base font-semibold tracking-wider flex items-center gap-2 ${
                        isActive ? 'text-gold' : 'text-royal'
                      }`}>
                        <IconComp className="h-4 w-4" />
                        {step.title}
                      </h3>
                      <p className="text-royal/70 text-xs leading-relaxed max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Floating Winding River & Navigating Boat Canvas */}
          <div className="lg:col-span-7 h-full flex items-center justify-center relative min-h-[300px]">
            <div className="w-full h-[80%] max-w-[420px] rounded-3xl glass border border-royal/10 relative p-4 shadow-inner">
              
              {/* Grid backgrounds */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal/5 via-transparent to-transparent opacity-20 pointer-events-none"></div>

              <svg
                viewBox="0 0 300 500"
                className="w-full h-full relative"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Winding River Path */}
                <path
                  ref={pathRef}
                  d="M 150,30 C 220,100 240,160 150,220 C 50,280 80,360 180,410 C 240,440 150,470 150,470"
                  fill="none"
                  stroke="#072B49"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Streamlines inside river */}
                <path
                  d="M 150,30 C 220,100 240,160 150,220 C 50,280 80,360 180,410 C 240,440 150,470 150,470"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="1.5"
                  strokeDasharray="5 15"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Timeline Milestone Markers along River */}
                {TIMELINE_STEPS.map((step, index) => {
                  // Approximate pixel anchors along path for visual cues
                  const percentMapping = [0.05, 0.23, 0.45, 0.67, 0.85, 0.98];
                  let anchor = { x: 150, y: 30 };
                  if (pathRef.current) {
                    try {
                      anchor = pathRef.current.getPointAtLength(percentMapping[index] * pathRef.current.getTotalLength());
                    } catch (e) {}
                  }

                  return (
                    <g key={step.id} transform={`translate(${anchor.x}, ${anchor.y})`}>
                      <circle 
                        r="5" 
                        fill="#031422" 
                        stroke={activeStep >= step.id ? "#D9A441" : "rgba(255,255,255,0.3)"} 
                        strokeWidth="2" 
                      />
                      {activeStep === step.id && (
                        <circle r="9" fill="none" stroke="#D9A441" strokeWidth="1" className="animate-ping" />
                      )}
                    </g>
                  );
                })}

                {/* Scroll Navigating Boat (SVG Group) */}
                <g 
                  transform={`translate(${boatPos.x}, ${boatPos.y}) rotate(${boatPos.angle})`}
                  style={{ transition: 'transform 0.1s ease-out' }}
                >
                  {/* Luxury Boat Silhouette */}
                  {/* Boat hull */}
                  <path 
                    d="M 0,-14 C 4,-8 5,6 0,14 C -5,6 -4,-8 0,-14 Z" 
                    fill="#D9A441" 
                    stroke="#FFFFFF" 
                    strokeWidth="1" 
                    className="glow-gold"
                  />
                  {/* Cabin roof */}
                  <rect x="-2" y="-4" width="4" height="8" fill="#072B49" rx="1" />
                  {/* Cabin windshield */}
                  <path d="M -1.5,-4 Q 0,-5 1.5,-4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
                  {/* Dynamic water waves rippling from the boat tail */}
                  <path d="M -3,8 Q -8,15 -12,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                  <path d="M 3,8 Q 8,15 12,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                </g>
              </svg>

              {/* Scroll indicator overlay */}
              <div className="absolute top-4 right-4 flex items-center space-x-1.5 py-1 px-2.5 rounded-full bg-gold/15 backdrop-blur-md border border-gold/30 text-[9px] uppercase tracking-wider text-gold font-bold">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Steering Riverboat</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative Wave Transition Divider (for visual transition to dining) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-25">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-river-dark">
          <path d="M0,0 C300,120 900,-80 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
};

export default ParallaxRiverJourney;
