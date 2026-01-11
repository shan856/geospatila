import React from 'react';
import { Link } from 'react-router-dom';
import { FaImages, FaProjectDiagram, FaEnvelope, FaChartLine, FaUsers, FaEye, FaSlideshare } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const cards = [
    {
      to: 'projects',
      icon: FaProjectDiagram,
      title: 'Manage Projects',
      description: 'Update and manage project case studies',
      color: 'from-accent to-cyan-500',
    },
    {
      to: 'gallery',
      icon: FaImages,
      title: 'Manage Gallery',
      description: 'Add or delete gallery images',
      color: 'from-geo-accent to-emerald-400',
    },
    {
      to: 'contact',
      icon: FaEnvelope,
      title: 'Manage Contact',
      description: 'Update contact information',
      color: 'from-violet-500 to-purple-500',
    },
    {
      to: 'hero-slides',
      icon: FaSlideshare,
      title: 'Manage Hero Slides',
      description: 'Update homepage slideshow',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    { icon: FaProjectDiagram, value: '24', label: 'Projects', change: '+2 this month' },
    { icon: FaImages, value: '156', label: 'Gallery Images', change: '+12 this week' },
    { icon: FaUsers, value: '1.2K', label: 'Visitors', change: '+15% this month' },
    { icon: FaEye, value: '8.5K', label: 'Page Views', change: '+22% this month' },
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="icon-soft w-10 h-10 flex items-center justify-center">
                <stat.icon className="text-accent" />
              </div>
              <span className="text-2xl font-display font-bold text-text-primary">{stat.value}</span>
            </div>
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-xs text-geo-accent mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
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

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-display font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New project added', item: 'Urban Development Mapping', time: '2 hours ago' },
            { action: 'Gallery updated', item: 'Added 5 new aerial images', time: '5 hours ago' },
            { action: 'Contact info updated', item: 'Office location changed', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-glass-border last:border-0">
              <div>
                <p className="text-text-primary font-medium">{activity.action}</p>
                <p className="text-sm text-text-secondary">{activity.item}</p>
              </div>
              <span className="text-xs text-text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;