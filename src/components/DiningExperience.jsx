import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Soup, Utensils, Award } from 'lucide-react';

const MENU_DATA = {
  sriLankan: [
    {
      name: 'Clay-Pot Crab Curry',
      desc: 'Wild lagoon mud crab stewed in a complex roasted curry powder, cardamom, and heavy coconut cream.',
      price: '26.00',
      ingredients: 'Lagoon Crab, Coconut, Lemon Grass, Fenugreek',
      tag: 'Chef Signature'
    },
    {
      name: 'Kandyan Hopper Feast',
      desc: 'Crispy fermented rice flour pancakes served with farm fresh egg, caramelized onion lunu miris, and coconut pol sambol.',
      price: '16.00',
      ingredients: 'Rice Flour, Coconut Toddy, Farm Egg, Chili',
      tag: 'Traditional'
    },
    {
      name: 'Spiced Jackfruit Ambula',
      desc: 'Tender baby jackfruit slow-cooked in clay pots with rich dark spices until meltingly tender.',
      price: '18.00',
      ingredients: 'Baby Jackfruit, Mustard, Garcinia, Pandan Leaves',
      tag: 'Vegan Delight'
    }
  ],
  western: [
    {
      name: 'Highland River Trout',
      desc: 'Pan-seared Badulla trout fillet topped with wild watercress and local lime-caper brown butter reduction.',
      price: '24.00',
      ingredients: 'Fresh Trout, Capers, Highlands Butter, Watercress',
      tag: 'Catch of the Day'
    },
    {
      name: 'Spiced Ribeye Medallion',
      desc: 'Char-grilled prime beef tenderloin dry-rubbed with local black pepper, served with a red wine reduction.',
      price: '32.00',
      ingredients: 'Prime Beef, Ceylon Pepper, Rosemary, Red Wine',
      tag: 'Premium Cut'
    }
  ],
  drinks: [
    {
      name: 'Ceylon Spiced Toddy Mocktail',
      desc: 'Sweet fermented coconut nectar infused with cinnamon sticks, star anise, and fresh ginger extract.',
      price: '9.00',
      ingredients: 'Coconut Nectar, Cinnamon, Ginger, Cloves',
      tag: 'House Special'
    },
    {
      name: 'Ella Mist Passion Spritzer',
      desc: 'Fresh passionfruit pulps mixed with garden basil, soda water, and a touch of wild mountain honey.',
      price: '8.00',
      ingredients: 'Passionfruit, Basil, Soda, Wild Honey',
      tag: 'Refreshing'
    }
  ],
  desserts: [
    {
      name: 'Kithul Treacle Watalappan',
      desc: 'Bespoke coconut custard spiced with nutmeg, cardamom, and sweetened with dark Ceylon kithul palm jaggery.',
      price: '11.00',
      ingredients: 'Jaggery, Cashews, Coconut Milk, Cardamom',
      tag: 'Award Winner'
    },
    {
      name: 'Highland Berry Mousse',
      desc: 'Whipped white chocolate mousse layered with local Nuwara Eliya strawberries and fresh raspberry compote.',
      price: '10.00',
      ingredients: 'Highlands Berries, White Chocolate, Organic Mint',
      tag: 'Sweet End'
    }
  ]
};

const DiningExperience = () => {
  const [activeTab, setActiveTab] = useState('sriLankan');

  const categories = [
    { id: 'sriLankan', label: 'Sri Lankan' },
    { id: 'western', label: 'Western' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' }
  ];

  return (
    <section id="dining" className="relative w-full py-24 bg-river-dark border-t border-royal/5">
      
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-river-light/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Main Grid: Left Chef Reveal, Right Menu Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Chef Reveal and Steam Effects */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-left relative">
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-2">
                <span className="h-[1px] w-8 bg-gold"></span>
                <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                  Culinary Craftsmanship
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal leading-tight">
                The River Grill Dining Room
              </h2>
            </div>

            {/* Chef Portrait Showcase Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="relative w-full max-w-[340px] h-[440px] rounded-3xl overflow-hidden glass border border-gold/25 p-4 shadow-2xl group"
            >
              {/* Chef Portrait Image */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                  alt="Executive Chef" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark amber gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-river-dark/80 via-river-dark/20 to-transparent"></div>

                {/* Steam particles rising from bottom over the image */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
                  {[1, 2, 3].map((num) => (
                    <div 
                      key={num}
                      className="steam-particle w-1.5 h-12 bg-royal/20 rounded-full blur-[3px]"
                      style={{ 
                        animationDelay: `${num * 0.8}s`,
                        animationDuration: `${2.5 + num * 0.3}s`
                      }}
                    />
                  ))}
                </div>

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 bg-river-dark/80 backdrop-blur-md border border-royal/10 p-3.5 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-gold font-sans">Chef Priyantha Perera</h4>
                    <span className="text-[10px] text-royal/60 uppercase tracking-widest block">Executive Chef</span>
                  </div>
                  <Award className="h-5 w-5 text-gold animate-bounce" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Menu Tabs and Food Cards */}
          <div className="lg:col-span-7 text-left space-y-8">
            <p className="text-royal/80 text-base font-light leading-relaxed">
              Every dish is a canvas. We source organic ingredients from our onsite greenhouse and combine them with traditional clay pot cooking techniques to bring you a menu that is vibrantly fresh and deeply rooted in Sri Lankan heritage.
            </p>

            {/* Menu Tabs Navigation */}
            <div className="flex flex-wrap gap-2.5 pb-2 border-b border-royal/10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 border ${
                    activeTab === cat.id
                      ? 'bg-gold border-gold text-river-dark shadow-md shadow-gold/10'
                      : 'bg-royal/5 border-royal/10 text-royal hover:border-gold hover:text-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Food Cards Grid */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {MENU_DATA[activeTab].map((dish, i) => (
                    <div 
                      key={i}
                      className="rounded-2xl p-5 glass border border-royal/10 flex flex-col justify-between hover:border-gold/30 transition-colors duration-500 shadow-lg glow-gold-hover relative group cursor-pointer"
                    >
                      {/* Interactive glow border element */}
                      <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded font-semibold">
                        {dish.tag}
                      </div>

                      <div className="space-y-2 mt-4 text-left">
                        <div className="flex justify-between items-baseline pr-16">
                          <h4 className="text-lg font-serif font-bold text-royal group-hover:text-gold transition-colors duration-300">
                            {dish.name}
                          </h4>
                        </div>
                        <p className="text-royal/60 text-xs leading-relaxed font-light">
                          {dish.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-royal/5 flex items-center justify-between">
                        <span className="text-xs text-royal/40 italic font-sans max-w-[70%] truncate">
                          Ingredients: {dish.ingredients}
                        </span>
                        <span className="text-base font-bold text-gold font-sans">
                          ${dish.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DiningExperience;
