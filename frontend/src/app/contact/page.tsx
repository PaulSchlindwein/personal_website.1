'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactPage() {
  const contactMethods = [
    {
      title: 'Email',
      value: 'pss416@nyu.edu',
      icon: '📧',
      color: 'from-blue-500 to-cyan-500',
      link: 'mailto:pss416@nyu.edu',
      description: 'Primary contact method for professional inquiries'
    },
    {
      title: 'Phone',
      value: '715-571-0820',
      icon: '📱',
      color: 'from-green-500 to-emerald-500',
      link: 'tel:715-571-0820',
      description: 'Available for urgent matters and calls'
    },
    {
      title: 'Location',
      value: 'New York, NY',
      icon: '📍',
      color: 'from-purple-500 to-pink-500',
      link: '#',
      description: 'Currently based in New York City'
    },
    {
      title: 'LinkedIn',
      value: 'Paul Sawyer Schlindwein',
      icon: '💼',
      color: 'from-indigo-500 to-blue-500',
      link: 'https://linkedin.com/in/paul-schlindwein',
      description: 'Professional networking and updates'
    },
    {
      title: 'GitHub',
      value: 'github.com/paulschlindwein',
      icon: '💻',
      color: 'from-gray-600 to-gray-800',
      link: 'https://github.com/paulschlindwein',
      description: 'Code repositories and technical projects'
    },
    {
      title: 'Portfolio',
      value: 'Personal Website',
      icon: '🌐',
      color: 'from-orange-500 to-red-500',
      link: '/',
      description: 'This website - my digital portfolio'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Let's Connect and Start a Conversation
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              I'm always open to new opportunities, collaborations, and interesting conversations. 
              Whether you have a project in mind, want to discuss ideas, or just want to say hello, 
              I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Methods */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={method.link} target={method.link.startsWith('http') ? '_blank' : '_self'}>
                <div className={`bg-gradient-to-br ${method.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-100 text-lg mb-3 group-hover:text-white transition-colors font-medium">
                      {method.value}
                    </p>
                    <p className="text-gray-200 text-sm leading-relaxed group-hover:text-gray-100 transition-colors flex-grow">
                      {method.description}
                    </p>
                    
                    {/* Action indicator */}
                    <div className="mt-6 flex items-center text-white group-hover:text-gray-100 transition-colors">
                      <span className="text-sm font-medium mr-2">
                        {method.link.startsWith('http') ? 'Visit' : method.link.startsWith('mailto') ? 'Email' : method.link.startsWith('tel') ? 'Call' : 'View'}
                      </span>
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

        {/* Additional Information */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Response Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">Within 24 hours</div>
                <div className="text-gray-400">Email responses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">Same day</div>
                <div className="text-gray-400">Urgent phone calls</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">Within 48 hours</div>
                <div className="text-gray-400">LinkedIn messages</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="text-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 