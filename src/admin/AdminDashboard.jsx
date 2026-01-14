import React from 'react';
import { Link } from 'react-router-dom';
import { FaImages, FaProjectDiagram, FaEnvelope, FaCogs, FaInfoCircle, FaHome, FaCog, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const cards = [
    {
      to: 'services',
      icon: FaCogs,
      title: 'Services',
      description: 'Manage service offerings',
      color: 'from-accent to-cyan-500',
    },
    {
      to: 'projects',
      icon: FaProjectDiagram,
      title: 'Projects',
      description: 'Update project case studies',
      color: 'from-violet-500 to-purple-500',
    },
    {
      to: 'gallery',
      icon: FaImages,
      title: 'Gallery',
      description: 'Add or delete gallery images',
      color: 'from-geo-accent to-emerald-400',
    },
    {
      to: 'about',
      icon: FaInfoCircle,
      title: 'About Page',
      description: 'Update team, values & milestones',
      color: 'from-pink-500 to-rose-500',
    },
    {
      to: 'homepage',
      icon: FaHome,
      title: 'Homepage',
      description: 'Edit stats, features & CTA',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      to: 'contact',
      icon: FaEnvelope,
      title: 'Contact',
      description: 'Update contact information',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      to: 'settings',
      icon: FaCog,
      title: 'Site Settings',
      description: 'Global settings & social links',
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
          Welcome to <span className="text-gradient">Admin Dashboard</span>
        </h1>
        <p className="text-text-secondary">
          Manage your RRtechGeo website content from here.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={card.to}
                className="block glass-card p-6 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-glow transition-shadow`}>
                  <card.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm">{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Getting Started Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center">
            <FaRocket className="text-white" />
          </div>
          <h2 className="text-xl font-display font-semibold text-text-primary">Getting Started</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-secondary/50 rounded-xl">
            <p className="font-medium text-text-primary mb-1">1. Add Your Services</p>
            <p className="text-sm text-text-secondary">Showcase your geospatial service offerings.</p>
          </div>
          <div className="p-4 bg-surface-secondary/50 rounded-xl">
            <p className="font-medium text-text-primary mb-1">2. Configure Settings</p>
            <p className="text-sm text-text-secondary">Set up SEO, social links, and site branding.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;