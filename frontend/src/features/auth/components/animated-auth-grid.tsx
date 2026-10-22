"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export function AnimatedAuthGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
      radius: 160,
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Color palette for cosmic digital mesh
    const nodeColors = [
      "rgba(147, 197, 253, 0.95)", // light blue
      "rgba(167, 139, 250, 0.95)", // purple
      "rgba(192, 132, 252, 0.95)", // fuchsia
      "rgba(94, 234, 212, 0.95)",  // teal
      "rgba(255, 255, 255, 1)",    // pure white spark
    ];

    // Initialize rich particle network
    const nodeCount = 55;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const baseR = Math.random() * 2.2 + 1.2;
      nodes.push({
        x: Math.random() * (width || 400),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        baseRadius: baseR,
        radius: baseR,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.03,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
      });
    }

    // Dynamic data packets flying through connections
    const packets: PulsePacket[] = [];
    const maxPackets = 18;

    const spawnPacket = () => {
      if (packets.length >= maxPackets || nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      // Find a close neighbor
      const from = nodes[fromIdx];
      let bestTo = -1;
      let minD = 135;

      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const dx = from.x - nodes[j].x;
        const dy = from.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minD) {
          bestTo = j;
          break;
        }
      }

      if (bestTo !== -1) {
        packets.push({
          fromNode: fromIdx,
          toNode: bestTo,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? "#67e8f9" : "#c084fc",
        });
      }
    };

    // Mouse tracking on container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 1. Draw Subtle Animated Perspective Grid
      const gridSize = 38;
      const wave = Math.sin(tick * 0.025);

      // Horizontal subtle lines
      for (let y = 0; y < height; y += gridSize) {
        const lineAlpha = 0.05 + Math.sin(tick * 0.02 + y * 0.015) * 0.035;
        ctx.strokeStyle = `rgba(165, 180, 252, ${Math.max(0.015, lineAlpha)})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical subtle lines
      for (let x = 0; x < width; x += gridSize) {
        const lineAlpha = 0.05 + Math.cos(tick * 0.02 + x * 0.015) * 0.035;
        ctx.strokeStyle = `rgba(165, 180, 252, ${Math.max(0.015, lineAlpha)})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Scanline light streak moving vertically
      const scanY = (tick * 1.2) % (height + 100) - 50;
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, "rgba(99, 102, 241, 0)");
      grad.addColorStop(0.5, "rgba(167, 139, 250, 0.12)");
      grad.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, width, 60);

      // 3. Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Velocity movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently at borders
        if (node.x < 10) { node.x = 10; node.vx *= -1; }
        if (node.x > width - 10) { node.x = width - 10; node.vx *= -1; }
        if (node.y < 10) { node.y = 10; node.vy *= -1; }
        if (node.y > height - 10) { node.y = height - 10; node.vy *= -1; }

        // Mouse attraction & repulsion interaction
        if (mouse.isHovered) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 1.4;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        // Pulse size
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.7;

        // Draw Node Core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, node.radius), 0, Math.PI * 2);
        ctx.fill();

        // Node Glow Halo
        const glowRadius = Math.max(2, node.radius * 3.5);
        const nodeGlow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        nodeGlow.addColorStop(0, "rgba(167, 139, 250, 0.45)");
        nodeGlow.addColorStop(1, "rgba(167, 139, 250, 0)");
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4. Connect nearby nodes with shimmering lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 125;
          if (dist < maxDist) {
            const alpha = Math.pow(1 - dist / maxDist, 1.3) * 0.38;
            ctx.strokeStyle = `rgba(199, 210, 254, ${alpha})`;
            ctx.lineWidth = alpha > 0.2 ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Connect nodes to mouse cursor
        if (mouse.isHovered) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.55;
            ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 5. Spawn & Render Data Packets
      if (Math.random() < 0.25) spawnPacket();

      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const n1 = nodes[packet.fromNode];
        const n2 = nodes[packet.toNode];
        if (!n1 || !n2) {
          packets.splice(p, 1);
          continue;
        }

        // Current position of the flying packet
        const px = n1.x + (n2.x - n1.x) * packet.progress;
        const py = n1.y + (n2.y - n1.y) * packet.progress;

        // Draw packet spark
        ctx.fillStyle = packet.color;
        ctx.shadowColor = packet.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 6. Mouse Cursor Ambient Ripple / Beacon
      if (mouse.isHovered) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 90
        );
        cursorGlow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        cursorGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.12)");
        cursorGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
        ctx.fill();
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-crosshair"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
