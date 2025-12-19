"use client";

import { useEffect, useRef, useCallback } from "react";

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);
  const ripplesRef = useRef<{ x: number; y: number; time: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    // Add a new ripple on click
    ripplesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      time: timeRef.current,
    });
    // Keep only last 5 ripples
    if (ripplesRef.current.length > 5) {
      ripplesRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const animate = () => {
      if (destroyed) return;

      const width = canvas.width;
      const height = canvas.height;

      timeRef.current += 0.02;

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const time = timeRef.current;

      // Draw continuous ripples from mouse position
      for (let ring = 0; ring < 6; ring++) {
        const baseRadius = (time * 60 + ring * 50) % 350;
        const alpha = Math.max(0, 1 - baseRadius / 350) * 0.12;

        if (alpha > 0 && mouseX > 0) {
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, baseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1.5 + (1 - baseRadius / 350) * 3;
          ctx.stroke();
        }
      }

      // Draw click ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const age = time - ripple.time;
        const radius = age * 150;
        const maxRadius = 400;
        const alpha = Math.max(0, 1 - radius / maxRadius) * 0.25;

        if (alpha > 0 && radius < maxRadius) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 2 + (1 - radius / maxRadius) * 4;
          ctx.stroke();
          return true;
        }
        return false;
      });

      // Subtle glow at mouse position
      if (mouseX > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      destroyed = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}

