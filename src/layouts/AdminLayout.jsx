import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaImages } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const activeStyle = { backgroundColor: '#6D28D9', color: '#FFFFFF' }; // Accent color

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Could not log out. Please try again.");
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 text-center border-b border-border-color">
        <h1 className="text-2xl font-bold text-accent">Admin CMS</h1>
      </div>
      <nav className="p-4 flex-grow">
        <ul className="space-y-2">
          <li><NavLink to="/admin/dashboard" end style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg text-text-secondary hover:bg-indigo-100 hover:text-accent"><FaTachometerAlt className="mr-3" /> Dashboard</NavLink></li>
          <li><NavLink to="/admin/dashboard/projects" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg text-text-secondary hover:bg-indigo-100 hover:text-accent"><FaProjectDiagram className="mr-3" /> Manage Projects</NavLink></li>
          <li><NavLink to="/admin/dashboard/gallery" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg text-text-secondary hover:bg-indigo-100 hover:text-accent"><FaImages className="mr-3" /> Manage Gallery</NavLink></li>
          <li><NavLink to="/admin/dashboard/contact" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg text-text-secondary hover:bg-indigo-100 hover:text-accent"><FaEnvelope className="mr-3" /> Manage Contact</NavLink></li>
        </ul>
      </nav>
      <div className="p-4">
        <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-primary-bg text-text-primary">
      {/* --- THIS IS THE FULL, CORRECT LAYOUT --- */}
      <aside className="hidden md:flex md:flex-col w-64 bg-secondary-bg border-r border-border-color flex-shrink-0">
        <SidebarContent />
      </aside>
      
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-20" onClick={closeSidebar}>
          <aside className="fixed top-0 left-0 w-64 h-full bg-secondary-bg flex flex-col z-30">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-secondary-bg p-4 flex justify-between items-center border-b border-border-color">
          <h1 className="text-xl font-bold text-accent">Admin Menu</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-text-primary">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* This Outlet is what allows the dashboard content to be displayed */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;