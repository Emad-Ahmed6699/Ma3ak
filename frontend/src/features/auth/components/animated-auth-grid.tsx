"use client";

import React, { useEffect, useRef } from "react";

export function AnimatedAuthGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Grid pulse waves
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw subtle animated grid lines
      const gridSize = 40;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        const alpha = 0.06 + Math.sin(time + x * 0.01) * 0.03;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.02, alpha)})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        const alpha = 0.06 + Math.cos(time + y * 0.01) * 0.03;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.02, alpha)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw network nodes and connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        node.pulse += 0.03;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        // Draw node
        ctx.fillStyle = "rgba(167, 139, 250, 0.75)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(224, 231, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
