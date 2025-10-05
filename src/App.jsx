import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

const isAuthenticated = () => sessionStorage.getItem('isAdminAuthenticated') === 'true';
const PrivateRoute = ({ children }) => isAuthenticated() ? children : <Navigate to="/admin" />;

// This is the animation wrapper that was missing
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