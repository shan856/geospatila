import React from 'react';
import { Link } from 'react-router-dom';
import { FaCogs, FaProjectDiagram, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Admin Dashboard</h1>
      <p className="text-gray-300 mb-12">
        Welcome to the GeoSpatial Innovations Content Management System. From here, you can update all the content on the public-facing website. Your changes will be saved directly to the JSON files that power the site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Manage Services Card */}
        <Link to="services" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-center">
          <FaCogs className="text-5xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Manage Services</h2>
          <p className="text-gray-400 mt-2">Add, edit, or delete service offerings.</p>
        </Link>

        {/* Manage Projects Card */}
        <Link to="projects" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-center">
          <FaProjectDiagram className="text-5xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          <p className="text-gray-400 mt-2">Update project case studies.</p>
        </Link>

        {/* Manage About Us Card */}
        <Link to="about" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-center">
          <FaInfoCircle className="text-5xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Manage About Us</h2>
          <p className="text-gray-400 mt-2">Edit the company's story and values.</p>
        </Link>

        {/* Manage Contact Info Card */}
        <Link to="contact" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-center">
          <FaEnvelope className="text-5xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Manage Contact</h2>
          <p className="text-gray-400 mt-2">Update contact information.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;