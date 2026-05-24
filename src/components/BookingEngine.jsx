import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Home, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ROOM_OPTIONS = [
  { id: 'double', name: 'Classic Double Room', price: 80, count: 3 },
  { id: 'triple', name: 'Superior Triple Room', price: 110, count: 2 },
  { id: 'family', name: 'Heritage Family Suite', price: 150, count: 1 }
];

const BookingEngine = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('double');
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [successBooking, setSuccessBooking] = useState(null);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates.');
      return;
    }

    setIsLoading(true);
    setResults(null);

    setTimeout(() => {
      setIsLoading(false);
      const selected = ROOM_OPTIONS.find(r => r.id === roomType);
      
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

      setResults({
        room: selected.name,
        pricePerNight: selected.price,
        nights: nights,
        total: selected.price * nights,
        tax: Math.round(selected.price * nights * 0.12),
        available: selected.count > 0
      });
    }, 1500);
  };

  const handleConfirmBooking = () => {
    const resCode = `RVS-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessBooking({
      code: resCode,
      room: results.room,
      nights: results.nights,
      total: results.total + results.tax,
      checkIn,
      checkOut,
      guests
    });

    // Trigger gold confetti shower
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#D9A441', '#072B49', '#FFFFFF']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#D9A441', '#072B49', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const resetBooking = () => {
    setResults(null);
    setSuccessBooking(null);
    setCheckIn('');
    setCheckOut('');
  };

  return (
    <section className="relative w-full py-24 bg-slate-50 border-t border-river-blue/10 text-river-blue">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full text-center">
        
        {/* Header */}
        <div className="space-y-4 mb-12 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <span className="h-[1.5px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Instant Reservations
            </span>
            <span className="h-[1.5px] w-8 bg-gold"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-river-blue">
            Book Your Sanctuary
          </h2>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-lg font-light leading-relaxed">
            Specify your dates and preferences below. Our real-time booking engine will configure the ultimate luxury experience.
          </p>
        </div>

        {/* Booking Form */}
        <div className="rounded-3xl glass border border-river-blue/10 p-6 md:p-8 shadow-xl relative bg-white">
          
          <form onSubmit={handleCheckAvailability} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Check-In */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-bold flex items-center gap-1.5 pl-1">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                Check-In Date
              </label>
              <input
                type="date"
                required
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-sm text-river-blue focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-bold flex items-center gap-1.5 pl-1">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                Check-Out Date
              </label>
              <input
                type="date"
                required
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-sm text-river-blue focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-bold flex items-center gap-1.5 pl-1">
                <Users className="h-3.5 w-3.5 text-gold" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3 text-sm text-river-blue focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            {/* Room Preference */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-river-blue/60 font-bold flex items-center gap-1.5 pl-1">
                <Home className="h-3.5 w-3.5 text-gold" />
                Preferred Suite
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-3.5 text-sm text-river-blue focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                {ROOM_OPTIONS.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} (${room.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <div className="md:col-span-4 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-river-dark bg-gold hover:bg-gold-dark hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Checking Database Vault...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4.5 w-4.5" />
                    Check Availability
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Results Summary */}
          <AnimatePresence>
            {results && !successBooking && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-6 border-t border-river-blue/10 text-left overflow-hidden"
              >
                <div className="p-5 rounded-2xl glass-gold border border-gold/30 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Suite Confirmed Available</span>
                    <h3 className="text-xl font-serif font-bold text-river-blue">{results.room}</h3>
                    <p className="text-xs text-river-blue/60">
                      Stay Period: {results.nights} {results.nights === 1 ? 'Night' : 'Nights'} • ${results.pricePerNight} / Night
                    </p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-[10px] text-river-blue/40 uppercase tracking-widest block">Total Cost</span>
                      <span className="text-2xl font-bold text-gold">${results.total + results.tax}</span>
                      <span className="text-[9px] text-river-blue/40 block mt-0.5">(Includes 12% luxury tax)</span>
                    </div>

                    <button
                      onClick={handleConfirmBooking}
                      className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-dark hover:text-white shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Summary */}
          <AnimatePresence>
            {successBooking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white z-30 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center space-y-6"
              >
                <CheckCircle2 className="h-16 w-16 text-gold animate-bounce" />
                
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Booking Confirmed</span>
                  <h3 className="text-3xl font-serif font-bold text-river-blue">Ayubowan! Your Stay Awaits</h3>
                  <p className="text-xs text-river-blue/60">
                    A confirmation invoice has been sent to your email. Show your code on arrival.
                  </p>
                </div>

                <div className="w-full max-w-sm rounded-xl border border-river-blue/10 bg-slate-50 p-4.5 text-left text-xs space-y-2.5 font-light">
                  <div className="flex justify-between">
                    <span className="text-river-blue/50">Reservation Code:</span>
                    <span className="font-bold text-gold font-mono text-sm">{successBooking.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-river-blue/50">Selected Lodging:</span>
                    <span className="text-river-blue font-medium">{successBooking.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-river-blue/50">Guests:</span>
                    <span className="text-river-blue font-medium">{successBooking.guests} Adults</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-river-blue/50">Nights Check:</span>
                    <span className="text-river-blue font-medium">{successBooking.nights} Nights</span>
                  </div>
                  <div className="flex justify-between border-t border-river-blue/10 pt-2 text-sm font-semibold">
                    <span className="text-river-blue/60">Total Paid:</span>
                    <span className="text-gold">${successBooking.total}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={resetBooking}
                    className="px-6 py-2.5 rounded-xl border border-river-blue/20 hover:border-gold text-river-blue hover:text-gold text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default BookingEngine;
