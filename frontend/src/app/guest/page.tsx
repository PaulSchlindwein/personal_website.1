"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Guest() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-6 tracking-wider">Welcome, Guest!</h1>
        <p className="text-xl text-gray-300 mb-8">
          You're browsing as a guest. Some features may be limited.
        </p>
        
        <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Features</h2>
          <ul className="text-left space-y-3 text-gray-300">
            <li className="flex items-center">
              <span className="text-green-400 mr-3">✓</span>
              Browse public content
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-3">✓</span>
              View portfolio and projects
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-3">⚠</span>
              Limited access to premium content
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-3">✗</span>
              No access to user dashboard
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Want full access? Consider creating an account!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold">
                Create Account
              </button>
            </Link>
            <Link href="/signin">
              <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        <Link href="/" className="block mt-8 text-gray-400 hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </motion.div>
    </main>
  );
} 