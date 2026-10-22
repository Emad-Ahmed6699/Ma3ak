"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Waves } from "@/components/ui/waves";
import { Aurora } from "@/components/ui/aurora";
import { ShinyText } from "@/components/ui/shiny-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function AuthHeroBanner() {
  return (
    <div className="relative w-full lg:w-[48%] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#2e1065] p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden text-white shrink-0 shadow-2xl">
      {/* 1. React Bits Soft Aurora Glows */}
      <Aurora />

      {/* 2. React Bits Interactive Harmonic Waves (Silk Ribbons - No Dots) */}
      <Waves className="opacity-85" speed={1} />

      {/* 3. Top Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 space-y-4 pointer-events-none"
      >
        <div className="pointer-events-auto inline-block">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white shadow-xl border border-white/25 group-hover:border-cyan-400/60 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </motion.div>
            <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-md">
              Ma3ak
            </span>
          </Link>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <ShinyText
              text="v2.4 Discourse Release"
              speed={3}
              className="text-[11px] font-semibold uppercase tracking-wider text-cyan-200"
            />
          </div>
        </div>
      </motion.div>

      {/* 4. Statement & Interactive Spotlight Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 my-auto py-8 space-y-6 pointer-events-none"
      >
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] lg:leading-[42px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
            Where meaningful thoughts spark{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300">
              real connections
            </span>
            .
          </h1>
          <p className="text-indigo-100/90 text-sm leading-relaxed max-w-sm">
            A distraction-free habitat engineered for engineers, designers, and thoughtful minds.
          </p>
        </div>

        {/* Interactive Spotlight Testimonial Card */}
        <div className="pointer-events-auto">
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.22)"
            className="p-5 rounded-2xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 space-y-3 text-xs shadow-2xl hover:border-cyan-300/40 transition-all duration-300"
          >
            <Quote className="w-5 h-5 text-cyan-300/80" />
            <p className="text-white/95 italic leading-relaxed text-[13px]">
              "Ma3ak restored my faith in focused developer discourse. It feels like the early web again — pure signal and thoughtful conversations."
            </p>
            <div className="pt-2 flex items-center justify-between text-white/75 text-[11px] border-t border-white/10">
              <span className="font-semibold text-white tracking-wide">Elena Rostova</span>
              <span className="text-cyan-200 font-medium">Senior Systems Architect</span>
            </div>
          </SpotlightCard>
        </div>
      </motion.div>

      {/* 5. Footer Social Proof with Glowing Avatars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/15 text-xs text-white/90 pointer-events-none"
      >
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-white text-indigo-950 text-[11px] font-extrabold flex items-center justify-center shadow-lg border-2 border-indigo-950">
            SC
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-lg border-2 border-indigo-950">
            AK
          </div>
          <div className="w-8 h-8 rounded-full bg-cyan-300 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-lg border-2 border-indigo-950">
            MR
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-400 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-lg border-2 border-indigo-950">
            +
          </div>
        </div>
        <ShinyText
          text="50,000+ creators building together"
          speed={4}
          className="font-medium text-xs text-white/95"
        />
      </motion.div>
    </div>
  );
}
