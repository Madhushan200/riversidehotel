import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

const WEDDING_DATA = [
  {
    id: 'banquet',
    name: 'Royal Heritage Banquet Hall',
    capacity: '150 - 250 Guests',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    desc: 'Our premier luxury hall designed for weddings and grand receptions. Fully air-conditioned, featuring flexible layouts, glowing chandeliers, and custom stage rigs.',
    features: ['Luxury Stage setups', 'State-of-the-art Sound systems', 'Bespoke Floral decor', 'Custom Sri Lankan Buffet catering']
  },
  {
    id: 'conference',
    name: 'Executive Conference Hall',
    capacity: '50 - 100 Guests',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    desc: 'Perfect for business conferences, seminars, and corporate meetings. Equipped with widescreen projectors, acoustic sound dampening, and high-speed executive WiFi.',
    features: ['Widescreen HD Projectors', 'Wireless Mics & Audio board', 'Ergonomic table layouts', 'Catering tea breaks']
  }
];

const WeddingView = () => {
  const [formData, setFormData] = useState({ name: '', date: '', guests: '150', type: 'wedding' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Celebrate & Gather
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            Weddings & Functions
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            Host memorable celebrations and corporate events in our Banquet Halls and Conference Hall.
          </p>
        </div>

        {/* Wedding Areas List */}
        <div className="space-y-12 mb-20">
          {WEDDING_DATA.map((hall) => (
            <div 
              key={hall.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl glass border border-river-blue/10 p-5 md:p-8 shadow-md"
            >
              {/* Image Frame */}
              <div className="lg:col-span-6 rounded-2xl overflow-hidden relative min-h-[240px] md:min-h-[320px]">
                <img 
                  src={hall.image} 
                  alt={hall.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-river-dark/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-gold bg-gold/15 border border-gold/30 px-3.5 py-1.5 rounded-full font-bold">
                    Capacity: {hall.capacity}
                  </span>
                </div>
              </div>

              {/* Information Details */}
              <div className="lg:col-span-6 flex flex-col justify-between text-left p-2">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-river-blue">{hall.name}</h3>
                  <p className="text-river-blue/70 text-xs md:text-sm leading-relaxed font-light">
                    {hall.desc}
                  </p>

                  <div className="border-t border-river-blue/10 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-river-blue/50 mb-3 font-sans">Facilities Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {hall.features.map((feat, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-river-blue/90 font-light">
                          <Check className="h-4 w-4 text-gold" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-river-blue/10 text-xs text-river-blue/40">
                  * Custom seating setups and stage sizes are customizable on request.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Function Booking Form */}
        <div className="max-w-3xl mx-auto rounded-3xl glass border border-river-blue/10 p-6 md:p-8 text-left shadow-lg relative">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-river-blue/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Host Your Function</span>
                <h3 className="text-2xl font-serif font-bold text-river-blue">Enquire About Hall Booking</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-semibold pl-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-semibold pl-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-semibold pl-1">Guests Count</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    <option value="50">50-100 Guests</option>
                    <option value="150">100-200 Guests</option>
                    <option value="250">200-300 Guests</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-semibold pl-1">Function Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    <option value="wedding">Wedding Reception</option>
                    <option value="conference">Corporate Conference</option>
                    <option value="banquet">Private Gathering / Party</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-dark hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                Submit Inquiry
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="inline-flex p-3.5 rounded-full bg-gold/10 border border-gold/20 text-gold mb-2">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-river-blue">Inquiry Sent Successfully</h3>
              <p className="text-river-blue/60 text-xs md:text-sm max-w-sm mx-auto leading-relaxed font-light">
                Thank you, {formData.name}. Our event planning coordinator will contact you on the details provided within 24 hours to confirm rates and layouts.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-lg border border-river-blue/20 hover:border-gold text-river-blue hover:text-gold text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default WeddingView;
