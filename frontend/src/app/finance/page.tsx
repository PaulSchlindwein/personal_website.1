'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinancePage() {
  const analysisAreas = [
    {
      title: 'Economic Theory',
      description: 'Applied economics with focus on market dynamics and policy implications',
      icon: '📊',
      color: 'from-teal-500 to-blue-500',
      topics: ['Microeconomics', 'Macroeconomics', 'Game Theory', 'Policy Analysis']
    },
    {
      title: 'Market Analysis',
      description: 'Technical and fundamental analysis of financial markets and instruments',
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
      topics: ['Technical Analysis', 'Fundamental Analysis', 'Risk Assessment', 'Portfolio Theory']
    },
    {
      title: 'Data Analytics',
      description: 'Quantitative analysis using statistical methods and financial modeling',
      icon: '🔢',
      color: 'from-purple-500 to-pink-500',
      topics: ['Statistical Modeling', 'Python/Pandas', 'Excel Analysis', 'Data Visualization']
    },
    {
      title: 'International Economics',
      description: 'Analysis of global markets, trade policies, and international relations',
      icon: '🌍',
      color: 'from-orange-500 to-red-500',
      topics: ['Trade Theory', 'Exchange Rates', 'Global Markets', 'Emerging Economies']
    },
    {
      title: 'Financial Planning',
      description: 'Personal and corporate financial planning and investment strategies',
      icon: '💰',
      color: 'from-indigo-500 to-purple-500',
      topics: ['Investment Strategy', 'Risk Management', 'Asset Allocation', 'Financial Modeling']
    },
    {
      title: 'Research & Publications',
      description: 'Academic research on economic policy and market behavior',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      topics: ['Policy Research', 'Market Studies', 'Academic Writing', 'Economic History']
    }
  ];

  const researchProjects = [
    {
      title: 'South African Economy Analysis',
      description: 'Comprehensive study of South Africa\'s economic trajectory and future prospects',
      status: 'Completed',
      focus: 'Emerging Markets'
    },
    {
      title: 'Democratic Republic of Congo Study',
      description: 'Analysis of economic development challenges and opportunities',
      status: 'Completed',
      focus: 'Development Economics'
    },
    {
      title: 'Post-Apartheid Policy Review',
      description: 'Critical examination of South Africa\'s economic policies since 1994',
      status: 'Completed',
      focus: 'Policy Analysis'
    },
    {
      title: 'Data Commodification Analysis',
      description: 'Study of data as economic commodity and its market implications',
      status: 'In Progress',
      focus: 'Digital Economics'
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
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-blue-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Financial Analysis
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Economic Insights & Market Intelligence
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Leveraging my background in applied economics to provide comprehensive financial analysis, 
              market insights, and economic research. From microeconomic theory to global market dynamics.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Analysis Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
          Areas of Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {analysisAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${area.color} p-8 rounded-2xl shadow-2xl transition-all duration-300`}
            >
              <div className="text-5xl mb-4">{area.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{area.title}</h3>
              <p className="text-gray-100 text-sm leading-relaxed mb-4">{area.description}</p>
              
              {/* Topics */}
              <div className="space-y-2">
                {area.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span className="text-gray-200 text-xs">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Research Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="flex items-center">
                  <span className="text-teal-400 text-xs font-medium">{project.focus}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent text-center">
              Technical Skills & Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-400 mb-2">Python</div>
                <div className="text-gray-400 text-sm">Data Analysis</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">Excel</div>
                <div className="text-gray-400 text-sm">Financial Modeling</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">SQL</div>
                <div className="text-gray-400 text-sm">Database Analysis</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">R</div>
                <div className="text-gray-400 text-sm">Statistical Analysis</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-8 border border-teal-500/20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Interactive Analysis Tools
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Coming soon: Interactive financial analysis tools, real-time market data visualization, 
              and automated reporting systems. This will include portfolio analysis, risk assessment, 
              and economic indicator dashboards.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-teal-500/20 text-teal-300 rounded-lg text-sm">Portfolio Analysis</span>
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Risk Metrics</span>
              <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm">Market Indicators</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="text-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 