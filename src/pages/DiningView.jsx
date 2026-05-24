import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DINING_AREAS = [
  {
    id: 'restaurant',
    name: 'Roof-top Restaurant',
    desc: 'Located on the 4th floor. Experience panoramic sunset vistas of Badulla town while tasting Ceylon delicacies and international favorites.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pub',
    name: 'The Rooftop Pub & Bar',
    desc: 'Our latest moderated pub lounge. Offers classic drafts, tropical mocktails, and a curated selection of spirits in a cozy highland evening atmosphere.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bbq',
    name: 'BBQ & Grill Terraces',
    desc: 'Enjoy outdoor charcoal-grilled skewers, steaks, and fresh fish prepared on our roof terrace under the stars.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'action',
    name: 'Live Action Stations',
    desc: 'Watch our culinary team toss hoppers, sear local trout, and mix authentic Sri Lankan kottu at our live action stalls.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop'
  }
];

const MENU_ITEMS = {
  restaurant: [
    { name: 'Lagoon Crab Curry Feast', price: '24', desc: 'Mud crab slow-cooked in a roasted blend of highland spices, lemongrass, and thick coconut cream.', tag: 'Signature' },
    { name: 'Kandyan Rice & Curry Platter', price: '12', desc: 'Red heirloom rice served in clay pots with 5 organic vegetable curries, papadam, and coconut sambol.', tag: 'Traditional' }
  ],
  pub: [
    { name: 'Ceylon Toddy Fusion', price: '8', desc: 'Mocktail blending sweet coconut blossom nectar, spiced ginger extract, and star anise infusion.', tag: 'House Special' },
    { name: 'Highland Sunset Punch', price: '7', desc: 'Fresh passionfruit pulps mixed with garden basil, soda water, and local forest honey.', tag: 'Refreshing' }
  ],
  bbq: [
    { name: 'Teriyaki Highland Trout Skewer', price: '16', desc: 'Charcoal-grilled Badulla trout pieces brushed with a sweet soy-ginger glaze and grilled bell peppers.', tag: 'Grill Special' },
    { name: 'Peppered Beef Medallion', price: '22', desc: 'Sizzling prime beef medallions dry-rubbed with local black pepper grains and rosemary.', tag: 'Sizzler' }
  ],
  action: [
    { name: 'Kandyan Egg Hopper Bowl', price: '9', desc: 'Fermented rice flour pancakes seared in live pans, with egg center, served with lunu miris onion sambol.', tag: 'Live Stations' },
    { name: 'Classic Kottu Roti Station', price: '10', desc: 'Shredded flatbread chopped on hot metal griddles with vegetables, eggs, and rich gravy.', tag: 'Street Favorite' }
  ]
};

const DiningView = () => {
  const [activeMenu, setActiveMenu] = useState('restaurant');

  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Culinary Art & Spirits
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            Dining & Rooftop Lounge
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            Indulge in our roof-top restaurant, modernized pub, outdoor BBQ grill, and dynamic live action cooking stations.
          </p>
        </div>

        {/* Dining Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {DINING_AREAS.map((area) => (
            <div 
              key={area.id}
              className="rounded-3xl glass border border-river-blue/10 overflow-hidden flex flex-col justify-between shadow-md group cursor-pointer"
            >
              <div className="w-full h-[240px] overflow-hidden relative">
                <img 
                  src={area.image} 
                  alt={area.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-river-dark/70 to-transparent"></div>
              </div>
              <div className="p-6 text-left space-y-2">
                <h3 className="text-xl font-serif font-bold text-river-blue group-hover:text-gold transition-colors duration-300">
                  {area.name}
                </h3>
                <p className="text-river-blue/60 text-xs leading-relaxed font-light">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed Menu Section */}
        <div className="rounded-3xl glass border border-river-blue/10 p-6 md:p-8 text-left shadow-lg relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-river-blue/10 gap-4">
            <div>
              <span className="text-gold uppercase tracking-widest text-[10px] font-bold block mb-1">
                Bespoke Flavor Selections
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-river-blue">
                Taste Our Specialties
              </h2>
            </div>

            {/* Menu Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(MENU_ITEMS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMenu(key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                    activeMenu === key
                      ? 'bg-gold border-gold text-river-dark'
                      : 'bg-river-blue/5 border-river-blue/10 text-river-blue hover:border-gold hover:text-gold'
                  }`}
                >
                  {key === 'action' ? 'Action Stations' : key === 'bbq' ? 'BBQ Grill' : key}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {MENU_ITEMS[activeMenu].map((item, i) => (
                  <div 
                    key={i}
                    className="p-5 rounded-2xl bg-slate-50 border border-river-blue/5 flex flex-col justify-between hover:border-gold/30 transition-colors duration-500 shadow-md relative group"
                  >
                    <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded font-semibold">
                      {item.tag}
                    </div>

                    {/* Steam Visual particles inside active culinary sections */}
                    {(activeMenu === 'restaurant' || activeMenu === 'bbq' || activeMenu === 'action') && (
                      <div className="absolute bottom-4 right-6 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="steam-particle w-1 h-8 bg-river-blue/10 rounded-full blur-[2px]" />
                        <div className="steam-particle w-1 h-8 bg-river-blue/10 rounded-full blur-[2px]" style={{ animationDelay: '0.4s' }} />
                      </div>
                    )}

                    <div className="space-y-1.5 mt-2">
                      <h4 className="text-lg font-serif font-bold text-river-blue group-hover:text-gold transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-river-blue/60 text-xs leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-river-blue/5 flex justify-between items-center">
                      <span className="text-xs text-river-blue/40 italic">Fresh Daily Ingredients</span>
                      <span className="text-base font-bold text-gold font-sans">${item.price}.00</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DiningView;
