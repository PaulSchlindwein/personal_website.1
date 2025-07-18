'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SportsPage() {
  const teams = [
    {
      name: 'New York Knicks',
      sport: 'Basketball',
      league: 'NBA',
      icon: '🏀',
      color: 'from-orange-500 to-blue-500',
      description: 'My hometown team and primary basketball passion',
      status: 'Active Fan'
    },
    {
      name: 'New York Yankees',
      sport: 'Baseball',
      league: 'MLB',
      icon: '⚾',
      color: 'from-blue-500 to-gray-500',
      description: 'The Bronx Bombers - America\'s most storied franchise',
      status: 'Active Fan'
    },
    {
      name: 'New York Giants',
      sport: 'Football',
      league: 'NFL',
      icon: '🏈',
      color: 'from-blue-600 to-red-600',
      description: 'Big Blue - representing the NFC East',
      status: 'Active Fan'
    },
    {
      name: 'New York Rangers',
      sport: 'Hockey',
      league: 'NHL',
      icon: '🏒',
      color: 'from-blue-500 to-red-500',
      description: 'The Broadway Blueshirts at Madison Square Garden',
      status: 'Casual Fan'
    },
    {
      name: 'NYU Violets',
      sport: 'College Basketball',
      league: 'NCAA Division III',
      icon: '🏀',
      color: 'from-purple-500 to-violet-500',
      description: 'My alma mater - where I played collegiate basketball',
      status: 'Alumni'
    },
    {
      name: 'Lawrence Vikings',
      sport: 'College Basketball',
      league: 'NCAA Division III',
      icon: '🏀',
      color: 'from-blue-600 to-yellow-500',
      description: 'Former team during my transfer year',
      status: 'Former Player'
    }
  ];

  const achievements = [
    {
      title: 'Collegiate Basketball Player',
      description: 'Played at NYU (2017-2019) and Lawrence University (Fall 2019-Winter 2020)',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Competitive Experience',
      description: 'Competed at the NCAA Division III level until coaching changes and COVID-19',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Basketball Knowledge',
      description: 'Deep understanding of the game from both player and fan perspectives',
      icon: '🧠',
      color: 'from-blue-500 to-cyan-500'
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Sports Teams
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              My Sporting Passion & Fandom
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              From the hardwood to the gridiron, these are the teams that have my heart. 
              As a former collegiate athlete, I bring both fan passion and player insight to my sports fandom.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Teams Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          My Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${team.color} p-8 rounded-2xl shadow-2xl transition-all duration-300`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  team.status === 'Active Fan' ? 'bg-green-500/20 text-green-300' :
                  team.status === 'Casual Fan' ? 'bg-blue-500/20 text-blue-300' :
                  team.status === 'Alumni' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {team.status}
                </span>
              </div>

              <div className="text-5xl mb-4">{team.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
              <p className="text-gray-200 text-sm mb-3">{team.sport} • {team.league}</p>
              <p className="text-gray-100 text-sm leading-relaxed">{team.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Basketball Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Basketball Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className={`bg-gradient-to-br ${achievement.color} p-6 rounded-xl shadow-lg text-center`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-100 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">
              My Basketball Journey
            </h2>
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              I competed at NYU until coaching changes prompted my transfer to Lawrence University, 
              where I continued playing until the COVID-19 pandemic. This experience gave me a unique 
              perspective on the game - both as a player and as a passionate fan. The discipline, 
              teamwork, and competitive spirit I developed on the court continue to influence my 
              professional approach today.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="text-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 