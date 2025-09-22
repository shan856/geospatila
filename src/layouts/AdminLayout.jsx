import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaProjectDiagram, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const activeStyle = { backgroundColor: '#FBBF24', color: '#1F2937' };

  const SidebarContent = () => (
    <>
      <div className="p-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-yellow-400">Admin CMS</h1>
      </div>
      <nav className="p-4 flex-grow">
        <ul className="space-y-2">
          <li><NavLink to="/admin/dashboard" end style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"><FaTachometerAlt className="mr-3" /> Dashboard</NavLink></li>
          <li><NavLink to="/admin/dashboard/services" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"><FaCogs className="mr-3" /> Manage Services</NavLink></li>
          <li><NavLink to="/admin/dashboard/projects" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"><FaProjectDiagram className="mr-3" /> Manage Projects</NavLink></li>
          <li><NavLink to="/admin/dashboard/about" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"><FaInfoCircle className="mr-3" /> Manage About Us</NavLink></li>
          <li><NavLink to="/admin/dashboard/contact" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={closeSidebar} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"><FaEnvelope className="mr-3" /> Manage Contact</NavLink></li>
        </ul>
      </nav>
      <div className="p-4"><button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"><FaSignOutAlt className="mr-3" /> Logout</button></div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (off-canvas) */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={closeSidebar}>
          <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 flex flex-col z-30">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-yellow-400">Admin Menu</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </header>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;