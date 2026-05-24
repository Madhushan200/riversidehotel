import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const DynamicNavbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Rooms', id: 'rooms' },
    { name: 'Dining', id: 'dining' },
    { name: 'Wedding & Function', id: 'wedding' },
    { name: 'Facilities', id: 'facilities' },
    { name: 'Excursions', id: 'excursions' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact Us', id: 'contact' }
  ];

  const handleLinkClick = (id) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showSolidNav = isScrolled || currentPage !== 'home';

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300">
      
      {/* Top Contact Info Ribbon (Dark contrast header ribbon for luxury definition) */}
      <div className={`w-full bg-river-blue text-royal/90 border-b border-royal/5 text-[11px] font-medium tracking-wider transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'py-2.5 px-6 md:px-12'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <a href="tel:+94552222090" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>Reservations: +94(0)55 2 222 090</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:riversidehotelinn@gmail.com" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Mail className="h-3.5 w-3.5 text-gold" />
              <span>Email: riversidehotelinn@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-500 ease-in-out ${
        showSolidNav 
          ? 'py-4 bg-white/90 backdrop-blur-md border-b border-river-blue/10 shadow-md' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
          >
            <div className="relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/images/logo.jpg" 
                alt="River Side Hotel Logo" 
                className="h-12 md:h-14 w-auto object-contain rounded bg-white p-0.5 shadow-sm border border-river-blue/5" 
              />
            </div>
            <span className={`font-serif text-xl md:text-2xl tracking-wider ${
              showSolidNav ? 'text-river-blue' : 'text-white'
            } group-hover:text-gold transition-colors duration-300 font-bold`}>
              RIVERSIDE
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none ${
                  currentPage === link.id
                    ? 'text-gold border-b-2 border-gold pb-1 font-bold'
                    : `${showSolidNav ? 'text-river-blue/80' : 'text-white/85'} hover:text-gold pb-1 hover:border-b-2 hover:border-gold/30`
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-dark hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-gold/20 glow-gold-hover"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${showSolidNav ? 'text-river-blue' : 'text-white'} hover:text-gold transition-colors duration-300 focus:outline-none`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`lg:hidden fixed inset-0 top-[60px] bg-white/98 backdrop-blur-xl border-t border-river-blue/10 transition-all duration-500 z-40 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="flex flex-col items-center justify-center h-[80vh] space-y-5 overflow-y-auto py-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-lg font-bold tracking-widest uppercase transition-colors duration-300 ${
                  currentPage === link.id ? 'text-gold font-bold' : 'text-river-blue hover:text-gold'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('contact')}
              className="mt-4 px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-river-blue hover:bg-gold hover:text-river-dark transition-all duration-300 w-48 text-center shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DynamicNavbar;
