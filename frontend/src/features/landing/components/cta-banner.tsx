"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary-container to-indigo-900 text-white relative overflow-hidden shadow-2xl"
      >
        {/* Animated Background Pulsing Glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm">
            Ready to experience calm, thoughtful discourse?
          </h2>
          <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
            Join thousands of students, creators, and professionals sharing authentic insights today on Ma3ak.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth?tab=register"
                className="px-8 py-3.5 rounded-xl bg-white text-primary font-bold text-sm shadow-xl hover:bg-slate-100 transition-all block"
              >
                Create Your Account
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth?tab=login"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all border border-white/20 block"
              >
                Log In
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
