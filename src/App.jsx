import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Import animation components

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages

import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageServices from './admin/ManageServices';
import ManageProjects from './admin/ManageProjects';
import ManageAbout from './admin/ManageAbout';
import ManageContact from './admin/ManageContact';

// Simple authentication check
const isAuthenticated = () => sessionStorage.getItem('isAdminAuthenticated') === 'true';

// Wrapper for protected routes
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin" />;
};

// This component will handle the animated transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><HomePage /></motion.div>} />
          <Route path="about" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AboutPage /></motion.div>} />
          <Route path="services" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ServicesPage /></motion.div>} />
          <Route path="projects" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ProjectsPage /></motion.div>} />
          <Route path="contact" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ContactPage /></motion.div>} />
        </Route>

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AdminLogin /></motion.div>} />
        <Route 
          path="/admin/dashboard" 
          element={<PrivateRoute><AdminLayout /></PrivateRoute>}
        >
          <Route index element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AdminDashboard /></motion.div>} />
          <Route path="services" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ManageServices /></motion.div>} />
          <Route path="projects" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ManageProjects /></motion.div>} />
          <Route path="about" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ManageAbout /></motion.div>} />
          <Route path="contact" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ManageContact /></motion.div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
    <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;