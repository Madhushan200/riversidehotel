import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-slate-50 border-t border-river-blue/10 pt-12 overflow-hidden text-river-blue">
      
      {/* Decorative Wave Divider at top of footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-white">
          <path d="M0,0 C300,120 900,-80 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 pb-12 relative z-10">
        
        {/* Main 4 columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16 text-left">
          
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-4 space-y-6">
            <a href="#home" className="flex items-center space-x-2.5 group w-max">
              <img 
                src="/images/logo.jpg" 
                alt="River Side Hotel Logo" 
                className="h-11 w-auto object-contain rounded bg-white p-0.5 shadow-sm border border-river-blue/10" 
              />
              <span className="font-serif text-2xl tracking-wider text-river-blue font-bold">
                RIVERSIDE
              </span>
            </a>
            <p className="text-river-blue/70 text-xs md:text-sm font-light leading-relaxed max-w-sm">
              Experience heritage and town hospitality at River Side Hotel Inn in Badulla, Sri Lanka. Elegant Double, Triple, and Family stays since 1981.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full border border-river-blue/10 hover:border-gold text-river-blue/60 hover:text-gold transition-colors bg-white flex items-center justify-center shadow-sm"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full border border-river-blue/10 hover:border-gold text-river-blue/60 hover:text-gold transition-colors bg-white flex items-center justify-center shadow-sm"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold">The Hotel</h4>
            <ul className="space-y-2.5 text-xs text-river-blue/70">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#facilities" className="hover:text-gold transition-colors">Amenities</a></li>
              <li><a href="#excursions" className="hover:text-gold transition-colors">Excursions</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Location & Map</a></li>
            </ul>
          </div>

          {/* Column 3: Rooms & Dining */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold">Sanctuaries</h4>
            <ul className="space-y-2.5 text-xs text-river-blue/70">
              <li><a href="#rooms" className="hover:text-gold transition-colors">Double Rooms</a></li>
              <li><a href="#rooms" className="hover:text-gold transition-colors">Triple Rooms</a></li>
              <li><a href="#rooms" className="hover:text-gold transition-colors">Family Rooms</a></li>
              <li><a href="#dining" className="hover:text-gold transition-colors">Dining Menu</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign up */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold">Join River Club</h4>
            <p className="text-river-blue/70 text-xs font-light leading-relaxed">
              Subscribe to unlock private invitations, priority room bookings, and custom seasonal travel updates.
            </p>

            {/* Newsletter input form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-river-blue/15 rounded-xl px-4 py-2.5 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors font-light shadow-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-river-dark flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-2.5 text-[11px] text-gold font-semibold text-left"
              >
                <CheckCircle2 className="h-4.5 w-4.5" />
                <span>Welcome to the River Club! Check your inbox.</span>
              </motion.div>
            )}
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-river-blue/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-river-blue/50 tracking-wider">
          <p>© {new Date().getFullYear()} River Side Hotel Badulla. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <a href="#home" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#home" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
