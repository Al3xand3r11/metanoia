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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const animate = () => {
      if (destroyed) return;

      const width = canvas.width;
      const height = canvas.height;
      const now = Date.now();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Decay velocity over time
      velocityRef.current *= 0.92;

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
          
          // Set up text style
          ctx.font = "800 180px 'Saira Condensed', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // Subtle transparent fill only - no outline
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
          ctx.fillText("CLEO+", point.x, point.y);
          
          ctx.restore();
        }

        return true;
      });

      // Draw current position with velocity-based opacity
      if (mouseRef.current.x > 0 && velocityRef.current > 2) {
        ctx.save();
        
        ctx.font = "800 180px 'Saira Condensed', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Opacity based on current velocity - more movement = more visible
        const currentOpacity = Math.min(velocityRef.current / 30, 0.8);
        
        // Subtle transparent fill only - no outline
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.4})`;
        
        // Subtle glow effect for fast movement
        if (velocityRef.current > 15) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
          ctx.shadowBlur = velocityRef.current / 4;
        }
        
        ctx.fillText("CLEO+", mouseRef.current.x, mouseRef.current.y);
        
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
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}

