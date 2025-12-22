"use client";

import { useEffect, useRef, useCallback } from "react";

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const logoLoadedRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    // Load the Cleo+ logo
    const logo = new Image();
    logo.src = "/CleoLogo.png";
    logo.onload = () => {
      logoRef.current = logo;
      logoLoadedRef.current = true;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Logo dimensions
    const logoWidth = 140;
    const logoHeight = 70;

    const animate = () => {
      if (destroyed) return;

      const width = canvas.width;
      const height = canvas.height;

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.12;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Draw logo at mouse position
      if (mouseX > 0 && logoLoadedRef.current && logoRef.current) {
        ctx.save();
        
        // Soft transparency
        ctx.globalAlpha = 0.4;
        
        // Draw logo centered at cursor
        ctx.drawImage(
          logoRef.current,
          mouseX - logoWidth / 2,
          mouseY - logoHeight / 2,
          logoWidth,
          logoHeight
        );
        
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      destroyed = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

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
