"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showName, setShowName] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // Show loading animation for 2 seconds
    const loadingTimer = setTimeout(() => {
      setShowName(true);
    }, 2000);

    // Show landing page after name animation
    const landingTimer = setTimeout(() => {
      setShowLanding(true);
    }, 4000);

    // Complete intro after landing page appears
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(landingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <AnimatePresence>
        {/* Loading Animation */}
        {!showName && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Name Reveal */}
        {showName && !showLanding && (
          <motion.div
            key="name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-6xl font-bold tracking-wider"
          >
            PAUL SCHLINDWEIN
          </motion.div>
        )}

        {/* Landing Page */}
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-4xl font-bold mb-12 tracking-wider"
            >
              PAUL SCHLINDWEIN
            </motion.h1>
            
            <div className="space-y-6">
              {[
                { text: "Register", href: "/register" },
                { text: "Sign In", href: "/signin" },
                { text: "Continue as Guest", href: "/guest" },
              ].map((option, index) => (
                <motion.button
                  key={option.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-64 mx-auto px-8 py-4 bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 