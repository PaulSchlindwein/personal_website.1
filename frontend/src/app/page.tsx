"use client";
import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Link from "next/link";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Logo styling from IntroAnimation
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

  if (!introComplete) {
    return <IntroAnimation onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 tracking-wider">
          PAUL SCHLINDWEIN
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Welcome to my personal website
        </p>
        <div className="space-y-6 mb-16">
          {[
            { text: "Register", href: "/register" },
            { text: "Sign In", href: "/signin" },
            { text: "Continue as Guest", href: "/guest" },
          ].map((option) => (
            <Link key={option.text} href={option.href}>
              <button className="block w-64 mx-auto px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-500 ease-in-out transform hover:scale-105 active:scale-95 font-semibold text-lg">
                {option.text}
              </button>
            </Link>
          ))}
        </div>
        
        {/* PSS III Logo underneath the buttons */}
        <div className="flex items-center justify-center">
          <div className="text-white text-4xl font-bold tracking-tighter mr-2" style={logoStyle}>
            PSS
          </div>
          <div className="text-white text-xl font-bold tracking-wider" style={logoStyleSmall}>
            III
          </div>
        </div>
      </div>
    </main>
  );
}
