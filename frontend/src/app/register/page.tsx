"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Basic validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          confirm_password: "",
        });
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 tracking-wider">Register</h1>
          <p className="text-gray-300">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              placeholder="Password (min 8 characters)"
            />
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              placeholder="Confirm Password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-300"
            >
              {error}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-300"
            >
              {message}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-500 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link href="/signin" className="text-white hover:underline">
              Sign In
            </Link>
          </p>
          <Link href="/" className="block mt-4 text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
} 