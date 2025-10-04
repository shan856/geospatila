import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import WhatsAppButton from '../components/WhatsAppButton';

const PublicLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Added overflow-hidden to prevent horizontal scroll on page transitions */}
        <div className="overflow-hidden">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
};
export default PublicLayout;