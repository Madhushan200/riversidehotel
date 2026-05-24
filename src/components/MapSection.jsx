import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Compass, Navigation, Landmark } from 'lucide-react';

const HOTEL_COORDS = [6.9934, 81.0550]; // Badulla, Sri Lanka coordinates

const ATTRACTIONS = [
  {
    name: 'Dunhinda Falls',
    coords: [7.0227, 81.0628],
    dist: '6.2 km',
    desc: 'One of Sri Lanka’s most beautiful waterfalls, famous for its smoky mist sprays.'
  },
  {
    name: 'Muthiyangana Temple',
    coords: [6.9897, 81.0575],
    dist: '1.2 km',
    desc: 'An ancient Buddhist temple in the center of Badulla, visited by Lord Buddha.'
  },
  {
    name: 'Demodara Nine Arch Bridge',
    coords: [6.8768, 81.0608],
    dist: '14.5 km',
    desc: 'The iconic colonial-era stone railway bridge nestled in lush green hills.'
  },
  {
    name: 'Badulla Railway Loop',
    coords: [6.9031, 81.0372],
    dist: '11.0 km',
    desc: 'Engineering marvel where the train loop runs under itself in a spiral tunnel.'
  }
];

const MapSection = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [activeAttraction, setActiveAttraction] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix for default Leaflet marker icons not displaying due to bundler paths
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Create Map Instance
    const map = L.map(mapContainerRef.current, {
      center: HOTEL_COORDS,
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });
    
    mapRef.current = map;

    // Load standard map tiles (styled dark via CSS filters in index.css)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom Gold Pin Icon for Hotel
    const hotelIcon = L.divIcon({
      className: 'custom-hotel-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-gold/30 rounded-full animate-ping"></div>
          <div class="absolute w-5 h-5 bg-gold border-2 border-river-dark rounded-full shadow-lg"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Add Hotel Marker
    const hotelMarker = L.marker(HOTEL_COORDS, { icon: hotelIcon }).addTo(map);
    hotelMarker.bindPopup(`
      <div class="text-left font-sans p-1">
        <h4 class="font-serif text-sm font-bold text-gold">Riverside Hotel</h4>
        <p class="text-[10px] text-gray-200 mt-1 leading-relaxed">Luxury stay beside the flowing waters of Badulla.</p>
      </div>
    `).openPopup();

    markerRef.current = hotelMarker;

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  // Pan to Attraction
  const showAttraction = (att) => {
    if (!mapRef.current) return;
    
    setActiveAttraction(att);
    
    // Smoothly fly map to coordinates
    mapRef.current.flyTo(att.coords, 14, {
      duration: 1.5,
      easeLinearity: 0.25
    });

    // Create popup at coordinates
    L.popup()
      .setLatLng(att.coords)
      .setContent(`
        <div class="text-left font-sans p-1">
          <h4 class="font-serif text-sm font-bold text-gold">${att.name}</h4>
          <span class="text-[9px] uppercase tracking-widest text-white/50 block mt-0.5">${att.dist} from hotel</span>
          <p class="text-[10px] text-gray-300 mt-1.5 leading-relaxed">${att.desc}</p>
        </div>
      `)
      .openOn(mapRef.current);
  };

  const resetMap = () => {
    if (!mapRef.current) return;
    setActiveAttraction(null);
    mapRef.current.flyTo(HOTEL_COORDS, 13, { duration: 1.5 });
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-river-dark border-t border-royal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Grid Split: Left Map, Right Directions & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Map container */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass border border-royal/10 shadow-2xl z-10">
              
              {/* Map Holder */}
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Floating Map Utility Controllers */}
              <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
                <button
                  onClick={resetMap}
                  className="px-3.5 py-2 rounded-lg bg-river-dark/95 border border-royal/10 hover:border-gold text-xs font-semibold uppercase tracking-wider text-royal hover:text-gold transition-colors backdrop-blur-md"
                >
                  Recenter Hotel
                </button>
              </div>

              {/* Float Map Info Box */}
              <div className="absolute bottom-4 left-4 right-4 md:right-auto z-20 p-4.5 rounded-2xl glass-heavy border border-gold/15 backdrop-blur-md text-left max-w-sm hidden md:block">
                <span className="text-[9px] uppercase tracking-widest text-gold font-bold flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Riverside Coordinates
                </span>
                <p className="text-xs text-royal/90 leading-relaxed mt-2 font-medium">
                  Lower Lower Road, River Drive, Badulla, Sri Lanka
                </p>
                <div className="flex gap-2 mt-4">
                  <a
                    href="https://maps.google.com/?q=Badulla+Sri+Lanka"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 text-center rounded-lg bg-gold hover:bg-gold-light text-river-dark text-[10px] uppercase font-bold tracking-wider transition-colors"
                  >
                    Open Google Maps
                  </a>
                  <button
                    onClick={() => {
                      if(mapRef.current) {
                        mapRef.current.setView(HOTEL_COORDS, 16);
                      }
                    }}
                    className="px-4 py-2 rounded-lg border border-royal/20 hover:border-gold text-royal hover:text-gold text-[10px] uppercase font-bold tracking-wider transition-colors bg-royal/5"
                  >
                    Zoom In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direction utilities & attractions checklist */}
          <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="h-[1px] w-8 bg-gold"></span>
                  <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                    The Location
                  </span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-royal">
                  Reach Our Haven
                </h2>
                <p className="text-royal/60 text-xs md:text-sm font-light leading-relaxed">
                  Located in the highlands of Badulla, Riverside Hotel is easily accessible by the iconic Colombo-Badulla scenic railway or via private mountain highways.
                </p>
              </div>

              {/* Local attractions checklist */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-royal/70 flex items-center gap-1.5">
                  <Landmark className="h-3.5 w-3.5 text-gold" />
                  Nearby Attractions
                </h4>
                <div className="space-y-2">
                  {ATTRACTIONS.map((att, i) => (
                    <button
                      key={i}
                      onClick={() => showAttraction(att)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                        activeAttraction?.name === att.name 
                          ? 'bg-gold/10 border-gold/40 text-gold' 
                          : 'bg-royal/5 border-royal/10 text-royal/80 hover:border-gold/30 hover:text-gold'
                      }`}
                    >
                      <div className="space-y-0.5 max-w-[80%]">
                        <span className="text-xs font-semibold block">{att.name}</span>
                        <span className="text-[10px] text-royal/40 group-hover:text-gold/60 block">{att.desc.substring(0, 50)}...</span>
                      </div>
                      <div className="text-[10px] font-bold text-gold bg-gold/5 border border-gold/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {att.dist}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* General Travel Contact Details */}
            <div className="p-4.5 rounded-2xl glass border border-royal/10 text-xs text-royal/70 space-y-2.5">
              <span className="block font-bold text-gold uppercase tracking-wider">Transport Services</span>
              <p>We provide private helicopter shuttle drops from Colombo Airport (BIA) and classic luxury train ticketing services from Kandy.</p>
              <div className="flex gap-4 pt-2 font-semibold">
                <a href="tel:+94551234567" className="hover:text-gold transition-colors">Call: +94 (55) 123 4567</a>
                <a href="mailto:stay@riversidebadulla.com" className="hover:text-gold transition-colors">stay@riversidebadulla.com</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MapSection;
