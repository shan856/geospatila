import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

const PublicLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Outlet renders the matched child route component */}
        <Outlet /> 
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default PublicLayout;