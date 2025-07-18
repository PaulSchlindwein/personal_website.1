'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function AboutMePage() {
  const [activeSection, setActiveSection] = useState('education');

  const sections = [
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'skills', label: 'Skills' },
    { id: 'travel', label: 'Travel' }
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
              Paul Sawyer Schlindwein
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Applied Economics Student & Emerging Tech Professional
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-lg">
              <span>📍 New York, NY</span>
              <span>📧 pss416@nyu.edu</span>
              <span>📱 715-571-0820</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-700"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12"
      >
        {/* Education Section */}
        {activeSection === 'education' && (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-blue-400">New York University</h3>
                  <span className="text-gray-400">August 2025</span>
                </div>
                <p className="text-xl text-gray-300 mb-2">Bachelor of Arts, Concentration (Applied Economics)</p>
                <p className="text-gray-400 mb-4">Gallatin School of Individualized Study, New York, NY</p>
                <div className="space-y-2">
                  <p className="text-gray-300">• Cumulative GPA: <span className="text-green-400 font-semibold">3.6</span></p>
                  <p className="text-gray-300">• Final Year GPA: <span className="text-green-400 font-semibold">3.9 (And Climbing!)</span></p>
                  <p className="text-gray-300">• Selected Coursework: Economics, Accounting, Computer Science, Philosophy</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-purple-400">Lawrence University</h3>
                  <span className="text-gray-400">2019-2020</span>
                </div>
                <p className="text-gray-400 mb-4">Appleton, WI</p>
                <p className="text-gray-300">• Completed coursework in History and English</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Academic Projects
            </h2>
            <div className="grid gap-6">
              {[
                {
                  title: "Analysis of South and Central African Economies",
                  description: "Past, Present and Future of the Republic of South Africa and the Democratic Republic of the Congo",
                  type: "Economic Analysis"
                },
                {
                  title: "The Perils of Democracy",
                  description: "Policy Review of South Africa's Post-Apartheid Trajectory",
                  type: "Policy Analysis"
                },
                {
                  title: "Nationalism in the Near East",
                  description: "An Exploration of Nationalism Within the Context of an Ethnically Diverse, Multicultural Empire",
                  type: "Historical Research"
                },
                {
                  title: "High-Density Farming Techniques",
                  description: "An Analysis of Methods, Advantages, Challenges, and Environmental Impacts",
                  type: "Environmental Study"
                },
                {
                  title: "The Rise of Data as a Commodity",
                  description: "Implications, Dangers, and Potential Solutions",
                  type: "Technology Analysis"
                },
                {
                  title: "A Defense of Slavery (Just Kidding)",
                  description: "An Analysis of Tribal Thinking in America and Abroad",
                  type: "Sociological Study"
                },
                {
                  title: "Business Plan for Cheesecake Factory",
                  description: "Comprehensive business strategy and financial analysis",
                  type: "Business Plan"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-green-400">{project.title}</h3>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leadership Section */}
        {activeSection === 'leadership' && (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Leadership & Volunteering
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Hudson River Park River Project & Pier 40 WetLab</h3>
                <p className="text-gray-400 mb-3">Volunteer | Fall 2024 | New York, NY</p>
                <p className="text-gray-300">• Supported ecological restoration and public education on Hudson River conservation</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">iNaturalist BioBlitz</h3>
                <p className="text-gray-400 mb-3">Participant | Fall 2024 | New York, NY</p>
                <p className="text-gray-300">• Documented local biodiversity to support ecological research and conservation efforts</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-green-400 mb-2">Additional Volunteering</h3>
                <p className="text-gray-400 mb-3">2014-Present | Various Organizations, Wausau, WI and New York, NY</p>
                <p className="text-gray-300">• Engaged in community initiatives with Boys and Girls Club, Red Cross, Humane Society, Women's Community, Wausau Noon Optimist, and American Legion</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">Collegiate Basketball</h3>
                <p className="text-gray-400 mb-3">Player | 2018-2020 | NYU & Lawrence University</p>
                <p className="text-gray-300">• Competed at NYU until coaching changes; transferred to Lawrence to continue playing until the Covid-19 pandemic hit</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Intermediate Level</h3>
                <div className="space-y-3">
                  {['Python', 'Microsoft Suite (Particularly Excel Spreadsheets)', 'Accounting'].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Basic Level</h3>
                <div className="space-y-3">
                  {['SQL', 'Javascript', 'Java', 'CSS', 'HTML'].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Travel Section */}
        {activeSection === 'travel' && (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Global Experience
            </h2>
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-green-400 mb-6">International Travel & Connections</h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">• Traveled extensively to <span className="text-blue-400 font-semibold">Eastern and Central Europe</span></p>
                <p className="text-lg">• Explored the <span className="text-purple-400 font-semibold">Middle East</span></p>
                <p className="text-lg">• Experienced the <span className="text-yellow-400 font-semibold">Caribbean</span></p>
                <p className="text-lg mt-6">• Built connections and maintained long-standing friendships in many countries across each region</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="text-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 