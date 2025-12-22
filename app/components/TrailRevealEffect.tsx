"use client";

import { useEffect, useRef, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

export default function TrailRevealEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const velocityRef = useRef(0);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>(0);
  const tintedLogoRef = useRef<HTMLCanvasElement | null>(null);
  const logoLoadedRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Store previous position for velocity calculation
    prevMouseRef.current = { ...mouseRef.current };
    
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    };

    // Calculate velocity (distance moved)
    const dx = mouseRef.current.x - prevMouseRef.current.x;
    const dy = mouseRef.current.y - prevMouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Smooth velocity with decay
    velocityRef.current = Math.min(distance, 100);

    // Add to trail if moving fast enough
    if (velocityRef.current > 5) {
      trailRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        opacity: Math.min(velocityRef.current / 40, 1), // Max opacity based on speed
        timestamp: Date.now(),
      });
    }

    // Limit trail length
    if (trailRef.current.length > 15) {
      trailRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    // Load the Cleo+ logo and tint it steel blue
    const logo = new Image();
    logo.src = "/CleoLogo.png";
    logo.onload = () => {
      // Create off-screen canvas to tint the logo
      const tintCanvas = document.createElement("canvas");
      tintCanvas.width = logo.naturalWidth;
      tintCanvas.height = logo.naturalHeight;
      const tintCtx = tintCanvas.getContext("2d");
      
      if (tintCtx) {
        // Draw original logo
        tintCtx.drawImage(logo, 0, 0);
        
        // Apply steel blue tint using composite operation
        tintCtx.globalCompositeOperation = "source-atop";
        tintCtx.fillStyle = "#5A6C8F"; // Steel blue
        tintCtx.fillRect(0, 0, tintCanvas.width, tintCanvas.height);
        
        tintedLogoRef.current = tintCanvas;
        logoLoadedRef.current = true;
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Logo dimensions
    const logoWidth = 200;
    const logoHeight = 100;

    const animate = () => {
      if (destroyed) return;

      const width = canvas.width;
      const height = canvas.height;
      const now = Date.now();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Decay velocity over time
      velocityRef.current *= 0.92;

      // Only draw if logo is loaded
      if (logoLoadedRef.current && tintedLogoRef.current) {
        // Draw trail points (older to newer for proper layering)
        trailRef.current = trailRef.current.filter((point) => {
          const age = now - point.timestamp;
          const maxAge = 600; // Trail lasts 600ms
          
          if (age > maxAge) return false;

          // Calculate fade based on age
          const fadeProgress = age / maxAge;
          const opacity = point.opacity * (1 - fadeProgress) * 0.6;

          if (opacity > 0.01) {
            ctx.save();
            ctx.globalAlpha = opacity;
            
            // Draw tinted logo centered at point
            ctx.drawImage(
              tintedLogoRef.current!,
              point.x - logoWidth / 2,
              point.y - logoHeight / 2,
              logoWidth,
              logoHeight
            );
            
            ctx.restore();
          }

          return true;
        });

        // Draw current position with velocity-based opacity
        if (mouseRef.current.x > 0 && velocityRef.current > 2) {
          ctx.save();
          
          // Opacity based on current velocity - more movement = more visible
          const currentOpacity = Math.min(velocityRef.current / 30, 0.8);
          ctx.globalAlpha = currentOpacity * 0.6;
          
          // Add glow effect for fast movement
          if (velocityRef.current > 15) {
            ctx.shadowColor = "rgba(90, 108, 143, 0.6)";
            ctx.shadowBlur = velocityRef.current / 3;
          }
          
          // Draw tinted logo centered at cursor
          ctx.drawImage(
            tintedLogoRef.current,
            mouseRef.current.x - logoWidth / 2,
            mouseRef.current.y - logoHeight / 2,
            logoWidth,
            logoHeight
          );
          
          ctx.restore();
        }
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
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
