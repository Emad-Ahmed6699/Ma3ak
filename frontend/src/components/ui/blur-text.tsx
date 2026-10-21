"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

export function BlurText({
  text,
  delay = 0.06,
  className = "",
  animateBy = "words",
  direction = "bottom",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-2.5", className)}>
      {elements.map((segment, i) => (
        <motion.span
          key={i}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: direction === "bottom" ? 18 : -18,
          }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: i * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {segment === " " ? "\u00A0" : segment}
        </motion.span>
      ))}
    </span>
  );
}
