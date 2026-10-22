"use client";

import React, { useRef, useEffect } from "react";

interface WavesProps {
  className?: string;
  speed?: number;
}

export function Waves({ className = "", speed = 1 }: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      radius: 180,
      strength: 0,
      isHovered: false,
    };

    const handleResize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
      mouse.strength = Math.min(mouse.strength + 0.1, 1);
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Multi-layered chromatic silk ribbons
    const ribbons = [
      {
        baseY: 0.82,
        amplitude: 55,
        freq: 0.0035,
        speed: 0.012 * speed,
        stroke: "rgba(56, 189, 248, 0.85)", // Vibrant Cyan
        glow: "rgba(56, 189, 248, 0.4)",
        fillTop: "rgba(56, 189, 248, 0.12)",
        fillBottom: "rgba(30, 27, 75, 0)",
        lineWidth: 2,
      },
      {
        baseY: 0.72,
        amplitude: 65,
        freq: 0.0028,
        speed: -0.015 * speed,
        stroke: "rgba(129, 140, 248, 0.9)", // Electric Indigo
        glow: "rgba(129, 140, 248, 0.45)",
        fillTop: "rgba(99, 102, 241, 0.15)",
        fillBottom: "rgba(15, 23, 42, 0)",
        lineWidth: 2.2,
      },
      {
        baseY: 0.60,
        amplitude: 75,
        freq: 0.0022,
        speed: 0.018 * speed,
        stroke: "rgba(192, 132, 252, 0.95)", // Neon Purple
        glow: "rgba(192, 132, 252, 0.5)",
        fillTop: "rgba(168, 85, 247, 0.16)",
        fillBottom: "rgba(15, 23, 42, 0)",
        lineWidth: 2.4,
      },
      {
        baseY: 0.48,
        amplitude: 70,
        freq: 0.0031,
        speed: -0.013 * speed,
        stroke: "rgba(244, 114, 182, 0.85)", // Fuchsia Pink
        glow: "rgba(244, 114, 182, 0.4)",
        fillTop: "rgba(236, 72, 153, 0.12)",
        fillBottom: "rgba(15, 23, 42, 0)",
        lineWidth: 1.8,
      },
      {
        baseY: 0.35,
        amplitude: 60,
        freq: 0.0025,
        speed: 0.016 * speed,
        stroke: "rgba(94, 234, 212, 0.75)", // Mint Cyan
        glow: "rgba(94, 234, 212, 0.35)",
        fillTop: "rgba(45, 212, 191, 0.10)",
        fillBottom: "rgba(15, 23, 42, 0)",
        lineWidth: 1.6,
      },
      {
        baseY: 0.22,
        amplitude: 50,
        freq: 0.0038,
        speed: -0.011 * speed,
        stroke: "rgba(165, 180, 252, 0.7)", // Soft Lavender
        glow: "rgba(165, 180, 252, 0.3)",
        fillTop: "rgba(129, 140, 248, 0.08)",
        fillBottom: "rgba(15, 23, 42, 0)",
        lineWidth: 1.5,
      },
    ];

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Mouse position lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      if (!mouse.isHovered) {
        mouse.strength *= 0.95;
      }

      // Draw each silk ribbon layer from top to bottom
      for (let r = 0; r < ribbons.length; r++) {
        const ribbon = ribbons[r];
        const currentBaseY = height * ribbon.baseY;

        ctx.save();

        // Glowing stroke effect
        ctx.shadowColor = ribbon.glow;
        ctx.shadowBlur = 14;
        ctx.strokeStyle = ribbon.stroke;
        ctx.lineWidth = ribbon.lineWidth;

        // Path creation with smooth bezier interpolation
        ctx.beginPath();
        const stepX = 16;
        const totalPoints = Math.ceil(width / stepX) + 2;

        let firstY = currentBaseY;

        for (let i = 0; i <= totalPoints; i++) {
          const x = i * stepX;

          // Harmonic multi-frequency waves
          const wave1 = Math.sin(x * ribbon.freq + time * ribbon.speed) * ribbon.amplitude;
          const wave2 = Math.cos(x * ribbon.freq * 1.6 - time * ribbon.speed * 0.8) * (ribbon.amplitude * 0.35);
          const wave3 = Math.sin(x * 0.001 + time * 0.005) * 15;

          let y = currentBaseY + wave1 + wave2 + wave3;

          // Interactive fluid ripple around mouse cursor
          if (mouse.strength > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius) {
              const influence = Math.pow(1 - dist / mouse.radius, 2) * 55 * mouse.strength;
              // Push wave downward/upward based on cursor position
              y += Math.sin((dist / mouse.radius) * Math.PI) * (dy > 0 ? influence : -influence * 0.7);
            }
          }

          if (i === 0) {
            firstY = y;
            ctx.moveTo(x, y);
          } else {
            // Cubic bezier smoothing
            const prevX = (i - 1) * stepX;
            const midX = (prevX + x) / 2;
            ctx.lineTo(x, y);
          }
        }

        // Stroke the luminous wave top edge
        ctx.stroke();

        // Fill translucent silk gradient beneath the wave
        ctx.shadowBlur = 0; // Disable shadow for fill to keep performance high
        ctx.lineTo(width, height + 50);
        ctx.lineTo(0, height + 50);
        ctx.closePath();

        const fillGradient = ctx.createLinearGradient(0, currentBaseY - ribbon.amplitude, 0, height);
        fillGradient.addColorStop(0, ribbon.fillTop);
        fillGradient.addColorStop(1, ribbon.fillBottom);

        ctx.fillStyle = fillGradient;
        ctx.fill();

        ctx.restore();
      }

      // Draw subtle luminous cursor aura when hovered
      if (mouse.isHovered && mouse.strength > 0.1) {
        ctx.save();
        const cursorGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 0.85
        );
        cursorGlow.addColorStop(0, "rgba(56, 189, 248, 0.18)");
        cursorGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
        cursorGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-pointer ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
