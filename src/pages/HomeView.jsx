import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Building, Coffee, GlassWater, Compass, ArrowRight, ShieldCheck, HeartHandshake, Wifi, Flame, Landmark, MapPin, Calendar } from 'lucide-react';
import BookingEngine from '../components/BookingEngine';

const SLIDES = [
  {
    image: '/images/facade_clean.jpg',
    title: 'Hotel River Side Inn',
    subtitle: 'Celebrating 38 years of premium guest hospitality in the heart of Badulla.'
  },
  {
    image: '/images/facade_sign.jpg',
    title: 'Experience Riverside Luxury',
    subtitle: 'Modern rooms, rooftop dining, and scenic excursions tailored for you.'
  }
];

const HomeView = ({ setCurrentPage }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col bg-white text-river-blue">
      
      {/* HERO BANNER SECTION (IMAGE SLIDER) */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Banner Images Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={SLIDES[activeSlide].image} 
                alt="Banner slide"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-river-dark/70 via-river-dark/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Hero Slider Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full text-left z-25 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl flex flex-col space-y-5 text-white"
          >
            <div className="flex items-center space-x-2">
              <span className="h-[1.5px] w-6 bg-gold"></span>
              <span className="text-gold uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Hotel River Side • Est. 1981
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-wide leading-tight drop-shadow-sm">
              {SLIDES[activeSlide].title}
            </h1>

            <p className="text-white/90 text-sm max-w-md font-light leading-relaxed">
              {SLIDES[activeSlide].subtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => setCurrentPage('rooms')}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-md shadow-gold/10 cursor-pointer"
              >
                View Rooms
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/30 hover:border-gold hover:text-gold bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slider Indicator Dots */}
        <div className="absolute bottom-12 right-12 z-30 flex space-x-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'w-5 bg-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* QUICK WELCOME INTRODUCTION */}
      <section className="py-16 bg-white px-6 md:px-12 border-t border-river-blue/5">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex p-3 rounded-full bg-gold/10 border border-gold/20 text-gold mb-1">
            <Landmark className="h-5.5 w-5.5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-river-blue">
            Welcome To Hotel River Side
          </h2>
          <p className="text-river-blue/70 text-sm leading-relaxed font-light">
            Founded in 1981, River Side Hotel has hosted visitors to Badulla for over 38 years. Initially a traditional building, the property was completely rebuilt and modernized just two years ago under new owners. The hotel features a stylish ground-floor lobby, guest suites, a rooftop restaurant, and an active rooftop pub bar.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-5 py-2.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white text-xs uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* CORE SERVICES GRID (STANDARD CARDS SIZES) */}
      <section className="py-16 bg-slate-50 px-6 md:px-12 border-y border-river-blue/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left space-y-2 mb-10">
            <span className="text-gold uppercase tracking-widest text-[10px] font-bold block">Teasers List</span>
            <h2 className="text-2xl md:text-3xl font-bold text-river-blue">Explore Our Domains</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Rooms Teaser */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop" alt="Rooms" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Luxury Rooms</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">Double Room, Triple Room, and spacious Family Room setups designed with modern comfort.</p>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  View Rooms <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Dining Teaser */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop" alt="Dining" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Rooftop Restaurant & Bar</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">Freshly cooked Ceylon cuisines, outdoor BBQ terraces, and drafts at our top floor pub.</p>
                </div>
                <button onClick={() => setCurrentPage('dining')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  View Dining <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Banquet Teaser */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" alt="Banquets" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Weddings & Seminars</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">Elegant Banquet Halls and high-tech Conference setups to accommodate up to 250 guests.</p>
                </div>
                <button onClick={() => setCurrentPage('wedding')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  View Halls <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEARBY ATTRACTIONS */}
      <section className="py-16 bg-white px-6 md:px-12 border-b border-river-blue/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left space-y-2 mb-10">
            <span className="text-gold uppercase tracking-widest text-[10px] font-bold block flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 animate-spin-slow" /> Excursions & Sightseeing
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-river-blue">Nearby Attractions</h2>
            <p className="text-river-blue/60 text-xs font-light max-w-xl">
              Explore the rich heritage and natural wonders of Badulla and the Uva Province, situated just minutes from the hotel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Dunhinda Falls */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1548263599-9fb36b0d7c16?q=80&w=600&auto=format&fit=crop" alt="Dunhinda Falls" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">5.2 km</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Dunhinda Waterfalls</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    One of Sri Lanka's most scenic waterfalls, famous for its smoky spray and scenic jungle walking trails.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('excursions')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Muthiyangana Temple */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop" alt="Muthiyangana Temple" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">800 m</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Muthiyangana Temple</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    An ancient Buddhist temple located in the heart of Badulla, revered as one of the 16 sacred places visited by Lord Buddha.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('excursions')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Nine Arch Bridge */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop" alt="Nine Arch Bridge" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">22 km</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Demodara Nine Arch Bridge</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    A grand colonial-era railway viaduct bridge nestled inside lush green valleys, located a short drive away in Ella.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('excursions')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RECENT EVENTS */}
      <section className="py-16 bg-slate-50 px-6 md:px-12 border-b border-river-blue/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left space-y-2 mb-10">
            <span className="text-gold uppercase tracking-widest text-[10px] font-bold block flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Hotel Happenings
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-river-blue">Recent & Upcoming Events</h2>
            <p className="text-river-blue/60 text-xs font-light max-w-xl">
              Stay updated with our curated weekly programs, seasonal celebrations, and local experiences hosted at River Side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Event 1 */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop" alt="BBQ Event" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Calendar className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">Every Saturday</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Rooftop Grill & Acoustic Night</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    Savor premium grilled selections at our rooftop bar and restaurant accompanied by live acoustic performances under the stars.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('dining')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  See Menu <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop" alt="Tea Event" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Calendar className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">Daily 3PM - 6PM</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">High Tea & Uva Tea Tasting</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    Indulge in freshly brewed local tea selections paired with traditional Sri Lankan short eats and sweet local delicacies.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('dining')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  Explore Dining <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Event 3 */}
            <div className="rounded-2xl bg-white border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-[380px]">
              <div className="h-[180px] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1551632871-e5d2db6d942f?q=80&w=600&auto=format&fit=crop" alt="Hiking Event" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-river-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Calendar className="h-3 w-3 text-gold" />
                  <span className="text-[10px] font-bold text-river-blue uppercase">Weekends</span>
                </div>
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-river-blue">Guided Mountain Trekking</h3>
                  <p className="text-river-blue/70 text-xs leading-relaxed font-light">
                    Join our weekend hiking excursions to the Narangala mountain peak or take bicycle tours through local mountain villages.
                  </p>
                </div>
                <button onClick={() => setCurrentPage('excursions')} className="text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-gold-dark cursor-pointer w-max">
                  Book Excursion <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (STANDARD CARD SIZES) */}
      <section className="py-20 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 text-left space-y-3">
            <span className="text-gold uppercase tracking-widest text-xs font-bold block">Core Advantages</span>
            <h2 className="text-2xl md:text-3xl font-bold text-river-blue leading-tight">
              Hospitality Perfected Since 1981
            </h2>
            <p className="text-river-blue/70 text-xs font-light leading-relaxed">
              We combine years of local experience with a fresh structural redesign to deliver a luxury stay right in Badulla town center.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            
            <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/5 space-y-2 h-[130px] flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5.5 w-5.5 text-gold" />
                <h4 className="text-sm font-bold text-river-blue">Reception Lobby</h4>
              </div>
              <p className="text-river-blue/60 text-xs font-light">Newly built moderated check-in lobby for quick, hospitable guest greetings.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/5 space-y-2 h-[130px] flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="h-5.5 w-5.5 text-gold" />
                <h4 className="text-sm font-bold text-river-blue">Rooftop Pub & Bar</h4>
              </div>
              <p className="text-river-blue/60 text-xs font-light">A rooftop restaurant and bar offering excellent cocktails, BBQ, and town views.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/5 space-y-2 h-[130px] flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5.5 w-5.5 text-gold" />
                <h4 className="text-sm font-bold text-river-blue">Personalized Service</h4>
              </div>
              <p className="text-river-blue/60 text-xs font-light">Our dedicated team coordinates transport, excursions, and custom meals daily.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-river-blue/5 space-y-2 h-[130px] flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <Compass className="h-5.5 w-5.5 text-gold" />
                <h4 className="text-sm font-bold text-river-blue">Prime Location</h4>
              </div>
              <p className="text-river-blue/60 text-xs font-light">Located on No-27, Lower King's Street, near Badulla loops and waterfalls.</p>
            </div>

          </div>

        </div>
      </section>

      {/* AMENITIES SUMMARY */}
      <section className="py-16 bg-slate-50 px-6 md:px-12 border-t border-river-blue/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-5 justify-center">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-river-blue/70">
              <Wifi className="h-4.5 w-4.5 text-gold" />
              <span>Free WiFi</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-river-blue/70">
              <Flame className="h-4.5 w-4.5 text-gold" />
              <span>Rooftop Grills</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-river-blue/70">
              <Coffee className="h-4.5 w-4.5 text-gold" />
              <span>Tea Bar</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-river-blue/70">
              <ShieldCheck className="h-4.5 w-4.5 text-gold" />
              <span>Parking</span>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('facilities')}
            className="px-5 py-2.5 rounded-lg bg-gold text-river-dark text-xs font-bold uppercase tracking-wider hover:bg-gold-dark hover:text-white transition-colors cursor-pointer"
          >
            All Facilities
          </button>
        </div>
      </section>

      {/* BOOKING ENGINE RESERVATIONS */}
      <BookingEngine />

    </div>
  );
};

export default HomeView;
