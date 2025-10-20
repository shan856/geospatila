import React from 'react';
import { Link } from 'react-router-dom';
import { FaImages, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-accent mb-2">Admin Dashboard</h1>
      <p className="text-text-secondary mb-12">
        Welcome to the RRtechGeo Content Management System. From here, you can update the dynamic content on the public-facing website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Manage Projects Card */}
        <Link to="projects" className="bg-secondary-bg p-6 rounded-lg border border-border-color hover:border-accent hover:shadow-lg transition-all duration-300 text-center transform hover:-translate-y-1">
          <FaProjectDiagram className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary">Manage Projects</h2>
          <p className="text-text-secondary mt-2">Update project case studies.</p>
        </Link>

        {/* Manage Gallery Card */}
        <Link to="gallery" className="bg-secondary-bg p-6 rounded-lg border border-border-color hover:border-accent hover:shadow-lg transition-all duration-300 text-center transform hover:-translate-y-1">
          <FaImages className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary">Manage Gallery</h2>
          <p className="text-text-secondary mt-2">Add or delete gallery images.</p>
        </Link>
        
        {/* Manage Contact Info Card */}
        <Link to="contact" className="bg-secondary-bg p-6 rounded-lg border border-border-color hover:border-accent hover:shadow-lg transition-all duration-300 text-center transform hover:-translate-y-1">
          <FaEnvelope className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary">Manage Contact</h2>
          <p className="text-text-secondary mt-2">Update contact information.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;