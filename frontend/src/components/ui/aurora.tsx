"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuroraProps {
  className?: string;
}

export function Aurora({ className = "" }: AuroraProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Aurora Layer 1 - Deep Indigo/Cyan */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1],
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          opacity: [0.3, 0.55, 0.35, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-600/30 to-purple-600/20 blur-[90px]"
      />

      {/* Aurora Layer 2 - Violet/Fuchsia Pulse */}
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.2, 1.1],
          x: [20, -35, 25, 20],
          y: [-20, 30, -15, -20],
          opacity: [0.25, 0.45, 0.3, 0.25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[110%] h-[110%] rounded-full bg-gradient-to-bl from-purple-500/25 via-pink-600/20 to-indigo-700/30 blur-[100px]"
      />
    </div>
  );
}
