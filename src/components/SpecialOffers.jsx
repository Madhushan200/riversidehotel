import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Gift, Calendar, Sparkles } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    title: 'Weekend Escape',
    price: 'From $150',
    desc: 'Unplug and recharge with a two-night stay, complimentary riverboat cruise, and guided forest bird tours.',
    coupon: '15% OFF',
    couponColor: 'text-gold bg-gold/10 border-gold/30',
    validTill: 'Valid Fri - Sun stays',
    details: 'Free organic tea tasting & late check-out.'
  },
  {
    id: 2,
    title: 'Family Safari Pack',
    price: 'From $220',
    desc: 'Create memories together. Includes deluxe family suite accommodations, kids campfire treats, and a guided safari hike.',
    coupon: 'FREE KIDS',
    couponColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    validTill: 'Book by Aug 2026',
    details: 'Complimentary extra bed & archery session.'
  },
  {
    id: 3,
    title: 'Honeymoon Romance',
    price: 'From $310',
    desc: 'An intimate escape for couples. A private river deck dinner, floral bath settings, and couples deep herbal massages.',
    coupon: 'FREE SPA',
    couponColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    validTill: 'Min. 3 nights stay',
    details: 'Free champagne on arrival & private musician.'
  }
];

const SpecialOffers = () => {
  return (
    <section id="offers" className="relative w-full py-24 bg-river-dark border-t border-royal/5">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              Seasonal Escapes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal">
            Bespoke Offers & Packages
          </h2>
          <p className="text-royal/60 text-xs md:text-sm max-w-xl font-light">
            Indulge in our curated seasonal packages designed to deliver the ultimate Sri Lankan riverside experience at an exceptional value.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {OFFERS.map((offer) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={offer.id}
              className="rounded-3xl glass border border-royal/10 p-6 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            >
              {/* Decorative background gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-royal/2 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Floating Coupon Badge with dynamic floating animations */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: offer.id * 0.4
                }}
                className={`absolute top-6 right-6 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-md ${offer.couponColor} z-10`}
              >
                {offer.coupon}
              </motion.div>

              <div className="space-y-4 text-left">
                <div className="p-3 w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Gift className="h-6 w-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-royal group-hover:text-gold transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <span className="text-lg font-bold text-gold block font-sans">
                    {offer.price}
                  </span>
                </div>

                <p className="text-royal/70 text-xs md:text-sm leading-relaxed font-light">
                  {offer.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-royal/15 text-left space-y-3">
                <div className="text-[11px] text-royal/60 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>{offer.validTill}</span>
                </div>
                <div className="text-[11px] text-gold font-medium italic">
                  * {offer.details}
                </div>
                
                <a
                  href="#booking"
                  className="block w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-river-dark bg-gold hover:bg-gold-light transition-all duration-300 shadow-md group-hover:shadow-gold/10"
                >
                  Book Package
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecialOffers;
