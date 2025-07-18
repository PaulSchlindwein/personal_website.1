'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (!isAuthenticated || !userData) {
      router.push("/signin");
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/signin");
    } finally {
      setLoading(false);
    }

    // Welcome animation sequence
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => setShowMainContent(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const sections = [
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about my background, education, and experience',
      icon: '👤',
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      link: '/about'
    },
    {
      id: 'contact',
      title: 'Contact Me',
      description: 'Get in touch through various channels and platforms',
      icon: '📞',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      link: '/contact'
    },
    {
      id: 'interests',
      title: 'Interests',
      description: 'Explore my hobbies, passions, and areas of curiosity',
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      link: '/interests'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View my work, including the customer database system',
      icon: '💼',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600',
      link: '/projects'
    },
    {
      id: 'sports',
      title: 'Sports Teams',
      description: 'Discover my favorite teams and sporting interests',
      icon: '🏀',
      color: 'from-indigo-500 to-purple-500',
      hoverColor: 'hover:from-indigo-600 hover:to-purple-600',
      link: '/sports'
    },
    {
      id: 'finance',
      title: 'Financial Analysis',
      description: 'Explore my financial insights and market analysis',
      icon: '📊',
      color: 'from-teal-500 to-blue-500',
      hoverColor: 'hover:from-teal-600 hover:to-blue-600',
      link: '/finance'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="mb-8"
              >
                <div className="relative">
                  {/* PSS III Logo */}
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="relative">
                      {/* Main diamond */}
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 transform rotate-45 border-2 border-gray-400 shadow-lg"></div>
                      {/* Beveled edge 1 */}
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 transform rotate-45 translate-x-0.5 translate-y-0.5 opacity-60"></div>
                      {/* Beveled edge 2 */}
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 transform rotate-45 translate-x-1 translate-y-1 opacity-40"></div>
                      {/* Highlight */}
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-white to-transparent transform rotate-45 translate-x-0.5 translate-y-0.5 opacity-20"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-3xl tracking-wider leading-none">PSS</span>
                      <span className="text-gray-400 text-sm tracking-widest font-medium">III</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Welcome, {user.first_name}!
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Welcome to Paul Schlindwein's Personal Website
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="animate-pulse">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 py-12"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Paul Schlindwein's Personal Website
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore my world through these interactive sections. Each area offers a unique glimpse into my professional journey, personal interests, and the projects I'm passionate about.
              </p>
            </motion.div>

            {/* Interactive Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={section.link}>
                    <div className={`bg-gradient-to-br ${section.color} ${section.hoverColor} p-8 rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {section.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-gray-100 text-sm leading-relaxed group-hover:text-white transition-colors">
                          {section.description}
                        </p>
                        
                        {/* Arrow indicator */}
                        <div className="mt-6 flex items-center text-white group-hover:text-gray-100 transition-colors">
                          <span className="text-sm font-medium mr-2">Explore</span>
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

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center mt-16"
            >
              <p className="text-gray-400 text-sm">
                Click on any section above to explore and discover more about my world.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 