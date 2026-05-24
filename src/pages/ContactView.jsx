import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Mail, Send, CheckCircle2, CreditCard } from 'lucide-react';

const HOTEL_COORDS = [6.9934, 81.0550]; // Badulla city coordinates

const ContactView = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current, {
      center: HOTEL_COORDS,
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    const hotelIcon = L.divIcon({
      className: 'custom-hotel-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-gold/30 rounded-full animate-ping"></div>
          <div class="absolute w-5 h-5 bg-gold border-2 border-white rounded-full shadow-lg"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const marker = L.marker(HOTEL_COORDS, { icon: hotelIcon }).addTo(map);
    marker.bindPopup(`
      <div class="text-left font-sans p-1">
        <h4 class="font-serif text-xs font-bold text-gold">River Side Hotel Inn</h4>
        <span class="text-[9px] text-gray-500 block">No-27, Lower King's Street, Badulla</span>
      </div>
    `).openPopup();

    return () => {
      map.remove();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full bg-white py-24 px-6 md:px-12 pt-32 text-river-blue">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-river-blue">
            Contact Us
          </h1>
          <p className="text-river-blue/60 text-xs md:text-sm max-w-xl font-light">
            Our reservation desk is available 24/7 to attend to your bookings, events, or travel inquiries.
          </p>
        </div>

        {/* Contact info grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              
              {/* Address details */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-river-blue/40 font-bold mb-1 font-sans">Hotel Address</h4>
                  <p className="text-sm text-river-blue/90 leading-relaxed font-medium">
                    River Side Hotel Inn (Pvt) Ltd.<br />
                    No-27, Lower King's Street, Badulla, Sri Lanka.
                  </p>
                </div>
              </div>

              {/* Telephone details */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-river-blue/40 font-bold mb-1 font-sans">Reservations Hotlines</h4>
                  <a href="tel:+94552222090" className="block text-sm text-river-blue/90 hover:text-gold transition-colors font-medium">
                    +94(0)55 2 222 090
                  </a>
                  <a href="tel:+94557210223" className="block text-sm text-river-blue/90 hover:text-gold transition-colors font-medium">
                    +94(0)55 7 210 223
                  </a>
                  <a href="tel:+94774245235" className="block text-sm text-river-blue/90 hover:text-gold transition-colors font-medium">
                    +94(0)77 4 245 235
                  </a>
                </div>
              </div>

              {/* Email details */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-river-blue/40 font-bold mb-1 font-sans">Reservations Email</h4>
                  <a href="mailto:riversidehotelinn@gmail.com" className="text-sm text-river-blue/90 hover:text-gold transition-colors font-medium">
                    riversidehotelinn@gmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* Payment & Social Details */}
            <div className="p-5 rounded-2xl glass border border-river-blue/10 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Accepted Payments</span>
                <div className="flex gap-3 text-river-blue/50 items-center">
                  <CreditCard className="h-5 w-5 text-gold" />
                  <span className="text-xs font-light">Visa, MasterCard, JCB, Local bank transfers</span>
                </div>
              </div>
              
              <div className="space-y-1.5 pt-2 border-t border-river-blue/5">
                <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Follow Us</span>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-river-blue/60 hover:text-gold transition-colors flex items-center gap-1.5 text-xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-river-blue/60 hover:text-gold transition-colors flex items-center gap-1.5 text-xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact message form */}
          <div className="lg:col-span-7 rounded-3xl glass border border-river-blue/10 p-6 md:p-8 text-left shadow-lg relative flex flex-col justify-center min-h-[400px]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-river-blue/10 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Direct Messaging</span>
                  <h3 className="text-xl font-serif font-bold text-river-blue">Send Us a Message</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-river-blue/50 font-semibold pl-1 font-sans">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-2.5 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-river-blue/50 font-semibold pl-1 font-sans">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-2.5 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-river-blue/50 font-semibold pl-1 font-sans">Message Body</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Type details of your request here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-river-blue/15 rounded-xl px-4 py-2.5 text-xs text-river-blue focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-dark hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="h-14 w-14 text-gold mx-auto animate-bounce" />
                <h3 className="text-2xl font-serif font-bold text-river-blue">Message Transmitted</h3>
                <p className="text-river-blue/60 text-xs md:text-sm max-w-xs mx-auto leading-relaxed font-light">
                  Thank you for contacting us. Your message has been received by our front office. We will reply to your email address shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-lg border border-river-blue/20 hover:border-gold text-river-blue hover:text-gold text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Leaflet map full width container */}
        <div className="relative w-full h-[320px] md:h-[400px] rounded-3xl overflow-hidden glass border border-river-blue/10 shadow-lg z-10">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

      </div>
    </div>
  );
};

export default ContactView;
