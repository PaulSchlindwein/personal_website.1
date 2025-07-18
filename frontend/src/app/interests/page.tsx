'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InterestsPage() {
  const interests = [
    {
      title: 'Economics & Finance',
      description: 'Passionate about understanding market dynamics, economic theory, and financial analysis',
      icon: '📈',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Technology & Programming',
      description: 'Exploring software development, data science, and emerging technologies',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'International Travel',
      description: 'Experiencing different cultures and building global connections',
      icon: '✈️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Basketball & Sports',
      description: 'Former collegiate athlete with a love for competitive sports',
      icon: '🏀',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Environmental Conservation',
      description: 'Volunteering for ecological restoration and sustainability initiatives',
      icon: '🌱',
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'Philosophy & History',
      description: 'Deep interest in understanding human thought and historical patterns',
      icon: '📚',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Interests & Passions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Exploring What Drives Me
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              These are the areas that fuel my curiosity and shape my perspective on the world. 
              Each interest represents a different facet of who I am and what I'm passionate about.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Interests Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${interest.color} p-8 rounded-2xl shadow-2xl transition-all duration-300`}
            >
              <div className="text-5xl mb-4">{interest.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{interest.title}</h3>
              <p className="text-gray-100 text-sm leading-relaxed">{interest.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              More Coming Soon
            </h2>
            <p className="text-gray-300 text-lg">
              I'm constantly exploring new interests and passions. This page will be updated with more detailed content about each area of interest, including specific projects, experiences, and insights.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="text-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 