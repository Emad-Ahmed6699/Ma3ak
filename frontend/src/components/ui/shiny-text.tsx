"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent font-medium",
        disabled
          ? "text-on-surface"
          : "bg-gradient-to-r from-on-surface via-primary to-on-surface bg-[length:200%_100%] animate-shine",
        className
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
