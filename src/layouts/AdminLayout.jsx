import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaImages, FaCogs, FaInfoCircle, FaHome, FaCog } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from '../components/Toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard', end: true },
    { path: '/admin/dashboard/services', icon: FaCogs, label: 'Services' },
    { path: '/admin/dashboard/projects', icon: FaProjectDiagram, label: 'Projects' },
    { path: '/admin/dashboard/gallery', icon: FaImages, label: 'Gallery' },
    { path: '/admin/dashboard/about', icon: FaInfoCircle, label: 'About Page' },
    { path: '/admin/dashboard/homepage', icon: FaHome, label: 'Homepage' },
    { path: '/admin/dashboard/contact', icon: FaEnvelope, label: 'Contact' },
    { path: '/admin/dashboard/settings', icon: FaCog, label: 'Site Settings' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-geo-accent flex items-center justify-center shadow-lg p-2 overflow-hidden">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12h5a4 4 0 0 1 0 8H8v-8zm0 8h4l3 7" strokeOpacity="0.95" />
              <path d="M23 12h5a4 4 0 0 1 0 8h-5v-8zm0 8h4l3 7" strokeOpacity="0.95" />
              <path d="M4 8 h32" strokeWidth="1.5" stroke="#a5f3fc" strokeOpacity="0.8" className="animate-lidar drop-shadow-md" />
              <circle cx="35" cy="12" r="1.5" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="5" cy="28" r="1" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-text-primary">Admin CMS</h1>
            <p className="text-xs text-text-muted">RRtechGeo</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-accent to-geo-accent text-white shadow-glow'
                    : 'text-text-secondary hover:bg-accent/10 hover:text-accent'
                  }`
                }
              >
                <item.icon className="text-lg" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-glass-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <ToastProvider>
      <div className="flex h-screen bg-secondary-bg">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-glass-border shadow-soft">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="md:hidden fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden bg-white/80 backdrop-blur-xl p-4 flex justify-between items-center border-b border-glass-border shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-geo-accent flex items-center justify-center p-1.5 overflow-hidden">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12h5a4 4 0 0 1 0 8H8v-8zm0 8h4l3 7" strokeOpacity="0.95" />
                  <path d="M23 12h5a4 4 0 0 1 0 8h-5v-8zm0 8h4l3 7" strokeOpacity="0.95" />
                  <path d="M4 8 h32" strokeWidth="1.5" stroke="#a5f3fc" strokeOpacity="0.8" className="animate-lidar drop-shadow-md" />
                </svg>
              </div>
              <span className="font-display font-bold text-text-primary">Admin CMS</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 rounded-xl bg-secondary-bg flex items-center justify-center text-text-primary hover:bg-accent/10 transition-colors"
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </header>

          {/* Content Area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;