import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaProjectDiagram, FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const activeStyle = {
    backgroundColor: '#FBBF24', // yellow-400
    color: '#1F2937', // gray-800
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex-shrink-0">
        <div className="p-4 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">Admin CMS</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                end // a special prop to ensure it's only active for the exact path
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaTachometerAlt className="mr-3" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/services"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaCogs className="mr-3" /> Manage Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/projects"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaProjectDiagram className="mr-3" /> Manage Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/about"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaInfoCircle className="mr-3" /> Manage About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/contact"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaEnvelope className="mr-3" /> Manage Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;