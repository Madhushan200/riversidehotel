import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DynamicNavbar from './components/DynamicNavbar';
import Footer from './components/Footer';

// Page Views
import HomeView from './pages/HomeView';
import RoomsView from './pages/RoomsView';
import DiningView from './pages/DiningView';
import WeddingView from './pages/WeddingView';
import FacilitiesView from './pages/FacilitiesView';
import ExcursionsView from './pages/ExcursionsView';
import GalleryView from './pages/GalleryView';
import ContactView from './pages/ContactView';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} />;
      case 'rooms':
        return <RoomsView setCurrentPage={setCurrentPage} />;
      case 'dining':
        return <DiningView />;
      case 'wedding':
        return <WeddingView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'excursions':
        return <ExcursionsView />;
      case 'gallery':
        return <GalleryView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-river-dark text-royal selection:bg-gold selection:text-river-dark overflow-x-hidden flex flex-col justify-between">
      
      {/* Global Navbar */}
      <DynamicNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Pages Content Area with Smooth Cross-fades */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default App;
