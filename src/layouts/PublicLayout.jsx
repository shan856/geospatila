import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="overflow-hidden">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default PublicLayout;