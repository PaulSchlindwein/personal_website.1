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

export default function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      router.push("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    return (
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800/50 px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Home Link */}
        <Link href="/dashboard" className="flex items-center space-x-3 group hover:opacity-80 transition-opacity">
          <div className="relative">
            {/* PSS III Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Main diamond */}
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 transform rotate-45 border-2 border-gray-400 shadow-lg"></div>
                {/* Beveled edge 1 */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 transform rotate-45 translate-x-0.5 translate-y-0.5 opacity-60"></div>
                {/* Beveled edge 2 */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 transform rotate-45 translate-x-1 translate-y-1 opacity-40"></div>
                {/* Highlight */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-white to-transparent transform rotate-45 translate-x-0.5 translate-y-0.5 opacity-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-wider leading-none">PSS</span>
                <span className="text-gray-400 text-xs tracking-widest font-medium">III</span>
              </div>
            </div>
          </div>
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-3 text-white hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg px-3 py-2 hover:bg-gray-800/50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-700">
                <span className="text-white font-bold text-sm">
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </span>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="font-semibold text-sm">{user.first_name}</span>
                <span className="text-gray-400 text-xs">{user.is_admin ? 'Administrator' : 'User'}</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-72 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="px-6 py-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-600">
                      <span className="text-white font-bold text-sm">
                        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{user.first_name} {user.last_name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {user.is_admin ? 'Administrator' : 'User'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                      </svg>
                    </div>
                    <span className="font-medium">Dashboard</span>
                  </Link>

                  <Link
                    href="/customers"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">Customer Data</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">About Me</span>
                  </Link>

                  {user.is_admin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}

                  <div className="border-t border-gray-700/50 mt-3 pt-3">
                    <Link
                      href="/"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span className="font-medium">Home Page</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-6 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Backdrop for closing dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
} 