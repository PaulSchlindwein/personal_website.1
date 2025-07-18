'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Customer Database System',
      description: 'Full-stack web application with authentication, data management, and analytics',
      icon: '💼',
      color: 'from-orange-500 to-red-500',
      link: '/customers',
      status: 'Live',
      tech: ['Next.js', 'Flask', 'SQLite', 'TypeScript']
    },
    {
      title: 'Personal Website',
      description: 'This website - a modern portfolio with authentication and interactive features',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      link: '/',
      status: 'Live',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Financial Analysis Tools',
      description: 'Economic analysis and market research projects',
      icon: '📊',
      color: 'from-green-500 to-emerald-500',
      link: '/finance',
      status: 'In Development',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
    },
    {
      title: 'Academic Research',
      description: 'Various research projects on economics, policy, and international relations',
      icon: '📚',
      color: 'from-purple-500 to-pink-500',
      link: '#',
      status: 'Completed',
      tech: ['Research', 'Analysis', 'Writing']
    },
    {
      title: 'Environmental Projects',
      description: 'Volunteer work with Hudson River Park and conservation initiatives',
      icon: '🌱',
      color: 'from-teal-500 to-green-500',
      link: '#',
      status: 'Ongoing',
      tech: ['Conservation', 'Education', 'Community']
    },
    {
      title: 'Future Projects',
      description: 'Upcoming work in SaaS development and data science',
      icon: '🚀',
      color: 'from-indigo-500 to-purple-500',
      link: '#',
      status: 'Planning',
      tech: ['SaaS', 'Data Science', 'AI/ML']
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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Projects & Work
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Showcasing My Professional Journey
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              From web development to academic research, these projects represent my diverse skills and interests. 
              Each project demonstrates different aspects of my technical abilities and professional growth.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <Link href={project.link}>
                <div className={`bg-gradient-to-br ${project.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-300' :
                      project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-300' :
                      project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                      project.status === 'Ongoing' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-100 text-sm leading-relaxed group-hover:text-white transition-colors flex-grow mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action indicator */}
                    <div className="mt-auto flex items-center text-white group-hover:text-gray-100 transition-colors">
                      <span className="text-sm font-medium mr-2">View Project</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Project Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent text-center">
              Featured Project: Customer Database System
            </h2>
            <p className="text-gray-300 text-lg text-center mb-6">
              This full-stack application demonstrates my skills in modern web development, database design, and user authentication. 
              It's a complete system with a beautiful UI and robust backend functionality.
            </p>
            <div className="text-center">
              <Link href="/customers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
                >
                  Explore Customer Database
                </motion.button>
              </Link>
            </div>
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
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 