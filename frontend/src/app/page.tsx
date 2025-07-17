"use client";
import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

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
        <div className="space-y-6">
          {[
            { text: "Register", href: "/register" },
            { text: "Sign In", href: "/signin" },
            { text: "Continue as Guest", href: "/guest" },
          ].map((option, index) => (
            <button
              key={option.text}
              className="block w-64 mx-auto px-8 py-4 bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
