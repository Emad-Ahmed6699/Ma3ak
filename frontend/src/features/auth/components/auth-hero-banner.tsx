"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedAuthGrid } from "./animated-auth-grid";

export function AuthHeroBanner() {
  return (
    <div className="relative w-full lg:w-[46%] bg-gradient-to-br from-[#2c22b8] via-[#4338ca] to-[#1e1b4b] p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden text-white shrink-0">
      {/* Animated Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Interactive Living Grid & Mesh */}
      <AnimatedAuthGrid />

      {/* Top Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 space-y-4"
      >
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">
            Ma3ak
          </span>
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
              v2.4 Discourse Release
            </span>
          </div>
        </div>
      </motion.div>

      {/* Statement & Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 my-auto py-8 space-y-6"
      >
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
            Where meaningful thoughts spark real connections.
          </h1>
          <p className="text-indigo-100 text-sm leading-relaxed max-w-sm">
            A distraction-free habitat engineered for engineers, designers, and thoughtful minds.
          </p>
        </div>

        {/* Testimonial Quote */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-4.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/15 space-y-2.5 text-xs shadow-lg"
        >
          <Quote className="w-5 h-5 text-indigo-300" />
          <p className="text-white/95 italic leading-relaxed">
            "Ma3ak restored my faith in focused developer discourse. It feels like the early web again — pure signal and thoughtful conversations."
          </p>
          <div className="pt-1 flex items-center justify-between text-white/70 text-[11px] border-t border-white/10">
            <span className="font-semibold text-white">Elena Rostova</span>
            <span className="text-indigo-200">Senior Systems Architect</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/15 text-xs text-white/80"
      >
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full bg-white text-indigo-900 text-[10px] font-bold flex items-center justify-center shadow-sm">
            SC
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-400 text-slate-900 text-[10px] font-bold flex items-center justify-center shadow-sm">
            AK
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-300 text-slate-900 text-[10px] font-bold flex items-center justify-center shadow-sm">
            +
          </div>
        </div>
        <span className="font-medium text-white/90">50,000+ creators building together</span>
      </motion.div>
    </div>
  );
}
