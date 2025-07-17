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

    // Show landing page after name animation (increased to 5 seconds total)
    const landingTimer = setTimeout(() => {
      setShowLanding(true);
    }, 5000);

    // Complete intro after landing page appears
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(landingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Clean, refined logo style
  const logoStyle = {
    textShadow: `
      /* Subtle depth */
      2px 2px 4px rgba(0,0,0,0.8),
      4px 4px 8px rgba(0,0,0,0.6),
      /* Subtle highlight */
      -1px -1px 0px rgba(255,255,255,0.3)
    `,
    transform: "perspective(1000px) rotateX(5deg)",
    filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.5))",
  };

  const logoStyleSmall = {
    textShadow: `
      /* Subtle depth for III */
      1px 1px 2px rgba(0,0,0,0.8),
      2px 2px 4px rgba(0,0,0,0.6),
      -1px -1px 0px rgba(255,255,255,0.3)
    `,
    transform: "perspective(1000px) rotateX(3deg)",
    filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.5))",
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Loading Animation */}
        {!showName && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
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
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* PSS III Logo Animation */}
        {showName && !showLanding && (
          <div className="relative flex items-center justify-center">
            {/* P Letter */}
            <motion.div
              className="absolute text-white text-8xl font-bold tracking-tighter"
              style={logoStyle}
              initial={{
                x: -200,
                y: -100,
                rotateY: -45,
                rotateX: -30,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: -25,
                y: 0,
                rotateY: -10,
                rotateX: 5,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 2.0,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
              }}
            >
              P
            </motion.div>

            {/* S Letter */}
            <motion.div
              className="absolute text-white text-8xl font-bold tracking-tighter"
              style={logoStyle}
              initial={{
                x: 0,
                y: 200,
                rotateY: 45,
                rotateX: 30,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 5,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 2.0,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              S
            </motion.div>

            {/* Second S Letter */}
            <motion.div
              className="absolute text-white text-8xl font-bold tracking-tighter"
              style={logoStyle}
              initial={{
                x: 200,
                y: -100,
                rotateY: 45,
                rotateX: -30,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: 25,
                y: 0,
                rotateY: 10,
                rotateX: 5,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 2.0,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              S
            </motion.div>

            {/* III Roman Numerals */}
            <motion.div
              className="absolute text-white text-4xl font-bold tracking-wider"
              style={logoStyleSmall}
              initial={{
                x: 0,
                y: 150,
                rotateY: 0,
                rotateX: 20,
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                x: 0,
                y: 80,
                rotateY: 0,
                rotateX: 3,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.8,
                delay: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              III
            </motion.div>
          </div>
        )}

        {/* Landing Page */}
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <div className="space-y-6 mb-16">
              {[
                { text: "Register", href: "/register" },
                { text: "Sign In", href: "/signin" },
                { text: "Continue as Guest", href: "/guest" },
              ].map((option, index) => (
                <motion.button
                  key={option.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.15,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1, ease: "easeOut" }
                  }}
                  className="block w-64 mx-auto px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-500 font-semibold text-lg"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
            
            {/* Logo underneath the buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8,
                duration: 1.0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex items-center justify-center"
            >
              <div className="text-white text-4xl font-bold tracking-tighter mr-2" style={logoStyle}>
                PSS
              </div>
              <div className="text-white text-xl font-bold tracking-wider" style={logoStyleSmall}>
                III
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 