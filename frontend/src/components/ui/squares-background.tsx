"use client";

import React, { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export function SquaresBackground({
  direction = "right",
  speed = 0.5,
  borderColor = "rgba(99, 102, 241, 0.08)",
  squareSize = 44,
  hoverFillColor = "rgba(99, 102, 241, 0.12)",
  className = "",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const col = Math.floor((mouseX - (gridOffset.x % squareSize)) / squareSize);
      const row = Math.floor((mouseY - (gridOffset.y % squareSize)) / squareSize);
      hoveredSquareRef.current = { x: col, y: row };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (direction === "right") gridOffset.x += speed;
      if (direction === "left") gridOffset.x -= speed;
      if (direction === "up") gridOffset.y -= speed;
      if (direction === "down") gridOffset.y += speed;
      if (direction === "diagonal") {
        gridOffset.x += speed * 0.7;
        gridOffset.y += speed * 0.7;
      }

      const startX = gridOffset.x % squareSize;
      const startY = gridOffset.y % squareSize;

      const cols = Math.ceil(canvas.width / squareSize) + 2;
      const rows = Math.ceil(canvas.height / squareSize) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const sqX = i * squareSize + startX;
          const sqY = j * squareSize + startY;

          // Check hover
          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.x === i &&
            hoveredSquareRef.current.y === j
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sqX, sqY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(sqX, sqY, squareSize, squareSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${className}`}
    />
  );
}
