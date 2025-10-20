import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth'; // 1. IMPORT THE HOOK
import { auth } from './firebaseConfig';                 // 2. IMPORT FIREBASE AUTH

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageProjects from './admin/ManageProjects';
import ManageGallery from './admin/ManageGallery';
import ManageContact from './admin/ManageContact';
import ScrollToTop from './components/ScrollToTop';

// 3. THE OLD INSECURE FUNCTION IS NO LONGER NEEDED AND HAS BEEN REMOVED

// 4. THIS IS THE NEW, SECURE PRIVATE ROUTE
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // This shows a loading message while Firebase checks if you are logged in
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Authentication...</p>
      </div>
    );
  }

  // If a user is logged in via Firebase, show the admin content.
  // If not, redirect them to the admin login page.
  return user ? children : <Navigate to="/admin" />;
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
          <Route path="services" element={<AnimatedPage><ServicesPage /></AnimatedPage>} />
          <Route path="projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
          <Route path="gallery" element={<AnimatedPage><GalleryPage /></AnimatedPage>} />
          <Route path="contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
        </Route>

        <Route path="/admin" element={<AnimatedPage><AdminLogin /></AnimatedPage>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
          <Route path="projects" element={<AnimatedPage><ManageProjects /></AnimatedPage>} />
          <Route path="gallery" element={<AnimatedPage><ManageGallery /></AnimatedPage>} />
          <Route path="contact" element={<AnimatedPage><ManageContact /></AnimatedPage>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;