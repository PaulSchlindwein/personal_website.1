"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const userObj = JSON.parse(userData);
        setUser(userObj);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-wider mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back, {user?.first_name}!</p>
        </div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/20 border border-gray-700 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-lg">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Username</p>
              <p className="text-lg">{user?.username}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-lg">{user?.is_admin ? "Administrator" : "User"}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-bold mb-3">Profile</h3>
            <p className="text-gray-300 mb-4">Update your account information and preferences.</p>
            <button className="px-4 py-2 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-bold mb-3">Settings</h3>
            <p className="text-gray-300 mb-4">Manage your account settings and security.</p>
            <button className="px-4 py-2 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black transition-colors">
              Settings
            </button>
          </div>

          <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-bold mb-3">Customer Data</h3>
            <p className="text-gray-300 mb-4">View and manage customer information and analytics.</p>
            <Link href="/customers" className="inline-block px-4 py-2 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black transition-colors">
              View Customer Data
            </Link>
          </div>

          {user?.is_admin && (
            <div className="bg-gray-900/20 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-bold mb-3">Admin Panel</h3>
              <p className="text-gray-300 mb-4">Manage users and system settings.</p>
              <Link href="/admin" className="inline-block px-4 py-2 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black transition-colors">
                Admin Panel
              </Link>
            </div>
          )}
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </AuthenticatedLayout>
  );
} 