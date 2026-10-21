"use client";

import React from "react";
import { Zap, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShinyText } from "@/components/ui/shiny-text";

const features = [
  {
    icon: Zap,
    title: "Chronological Flow",
    desc: "Never miss what matters. Your timeline follows real time order with zero engagement-bait manipulating your feed.",
  },
  {
    icon: ShieldCheck,
    title: "Community-Driven Moderation",
    desc: "Transparent moderation queues, reputation indicators, and clear guidelines foster welcoming peer conversations.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    desc: "No third-party trackers, no behavioral advertising, and full ownership of your data and exports at any moment.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-surface-container-low/50 border-y border-outline-variant/30 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-block">
            <ShinyText
              text="Core Philosophy"
              speed={4}
              className="text-xs uppercase tracking-wider font-semibold text-primary"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">
            Designed for Signal, Not Noise
          </h2>
          <p className="text-sm text-on-surface-variant">
            Every feature in Ma3ak is built around high-trust community discourse and respect for user focus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(99, 102, 241, 0.2)"
                  className="p-6 h-full space-y-4 glow-card hover:border-primary/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base text-on-surface">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
