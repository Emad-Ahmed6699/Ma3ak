"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-surface-container-high border border-outline-variant/40" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-14 h-7.5 px-1 rounded-full bg-surface-container border border-outline-variant/40 shadow-inner hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none text-xs">
        <Sun className="w-3.5 h-3.5 text-amber-500/70" />
        <Moon className="w-3.5 h-3.5 text-indigo-400/70" />
      </div>

      {/* Sliding Knob with Spring Animation */}
      <motion.div
        className="w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-md z-10"
        animate={{
          x: isDark ? 26 : 0,
          backgroundColor: isDark ? "#4f46e5" : "#ffffff",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          key={isDark ? "dark-icon" : "light-icon"}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-white fill-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
