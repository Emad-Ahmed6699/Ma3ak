"use client";

import React from "react";
import { ArrowRight, Heart, MessageSquare, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SquaresBackground } from "@/components/ui/squares-background";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";

export function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* React Bits Squares Ambient Background */}
      <SquaresBackground
        speed={0.3}
        squareSize={48}
        direction="diagonal"
        borderColor="rgba(99, 102, 241, 0.07)"
        hoverFillColor="rgba(99, 102, 241, 0.16)"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Eyebrow Pill with React Bits ShinyText */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-highest/80 border border-outline-variant/40 shadow-sm transition-all hover:bg-surface-container-high"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <ShinyText
              text="V2.4 Discourse Release"
              speed={3}
              className="font-mono text-xs uppercase tracking-wider font-semibold text-primary"
            />
            <span className="text-outline-variant text-xs">•</span>
            <span className="text-xs text-on-surface-variant font-medium">
              Open to thoughtful thinkers
            </span>
          </motion.div>

          {/* Master Headline with React Bits BlurText */}
          <div className="mt-8 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] lg:leading-[62px] text-on-surface tracking-tight font-extrabold">
              <BlurText
                text="Where meaningful thoughts spark"
                delay={0.05}
                className="text-on-surface"
              />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
                <BlurText
                  text="real connections."
                  delay={0.07}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500"
                />
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg text-on-surface-variant max-w-xl leading-relaxed"
          >
            A distraction-free social habitat engineered for engineers, designers, and thoughtful minds to share insights and build genuine community.
          </motion.p>

          {/* CTAs with React Bits Magnetic pull */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic intensity={0.2}>
              <Link
                href="/auth?tab=register"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-semibold shadow-lg shadow-primary/25 transition-all duration-200"
              >
                <span>Sign up free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>

            <Magnetic intensity={0.15}>
              <Link
                href="/auth?tab=login"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-medium shadow-sm hover:bg-surface-container transition-all duration-200"
              >
                Log in
              </Link>
            </Magnetic>
          </motion.div>

          {/* Trust Proof with React Bits ShinyText */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-outline-variant/30 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5 overflow-hidden p-1">
              <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-surface bg-primary text-white text-xs font-bold items-center justify-center">
                SC
              </div>
              <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-surface bg-emerald-600 text-white text-xs font-bold items-center justify-center">
                MR
              </div>
              <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-surface bg-indigo-600 text-white text-xs font-bold items-center justify-center">
                AK
              </div>
              <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-surface bg-surface-container-highest text-on-surface text-xs font-semibold items-center justify-center">
                +50k
              </div>
            </div>
            <div className="flex flex-col">
              <ShinyText
                text="Joined by 50,000+ creators & developers"
                speed={5}
                className="text-xs sm:text-sm font-semibold"
              />
              <span className="text-xs text-on-surface-variant">
                No ads, no algorithmic noise, pure chronological signal
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Hero Mockup with SpotlightCard & Floating physics */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex justify-center"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-6 -right-6 w-56 h-56 bg-primary/25 dark:bg-primary/35 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Container */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[460px] flex flex-col gap-4"
          >
            {/* Mini Composer */}
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.18)"
              className="w-full p-4 shadow-md glow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                  YU
                </div>
                <div className="flex-1 bg-surface-container-low px-4 py-2.5 rounded-xl text-on-surface-variant text-xs select-none">
                  What's on your mind?
                </div>
                <Link
                  href="/auth?tab=register"
                  className="px-3.5 py-1.5 bg-primary-container text-on-primary text-xs font-semibold rounded-lg shadow-sm hover:bg-primary transition-all"
                >
                  Post
                </Link>
              </div>
            </SpotlightCard>

            {/* Post Card with React Bits Spotlight Card */}
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.22)"
              className="w-full p-5 shadow-lg space-y-4 glow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm">
                    SC
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-on-surface">Sarah Chen</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold">
                        Moderator
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant">2h ago • Architecture</span>
                  </div>
                </div>
                <button className="text-on-surface-variant hover:text-on-surface">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-on-surface leading-relaxed">
                Social media shouldn't be an algorithmic casino. Designing <span className="text-primary font-semibold">Ma3ak</span> with clean typography, calm spacing, and linear chronological feeds has made discourse enjoyable again.
              </p>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 font-mono text-[11px] text-on-surface-variant space-y-1">
                <div className="flex items-center justify-between text-outline-variant pb-1 border-b border-outline-variant/20">
                  <span>discourse.config.ts</span>
                  <span>TypeScript</span>
                </div>
                <p className="text-primary font-semibold">const signalToNoise = Infinity;</p>
                <p className="text-on-surface-variant">export default defineConfig(&#123; algorithms: false &#125;);</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-on-surface-variant text-xs">
                <div className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <Heart className="w-4 h-4 fill-rose-500/10 text-rose-500" />
                  <span className="text-on-surface font-medium">142</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>38</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
