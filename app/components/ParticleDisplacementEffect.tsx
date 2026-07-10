"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleDisplacementEffectProps {
  imageSrc: string;
  particleSize?: number;
}

// Mobile breakpoint - matches Tailwind's md
const MOBILE_BREAKPOINT = 768;

export default function ParticleDisplacementEffect({
  imageSrc,
  particleSize = 4,
}: ParticleDisplacementEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const velocityRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const imageLoadedRef = useRef(false);
  
  // Track if we should render the particle effect or just a static image
  // Default to true (assume desktop) to avoid flash of wrong content
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check immediately
    checkMobile();
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Duotone color mapping - Steel blue shadows → Hot pink highlights (matching screenshot)
  const applyDuotone = useCallback((r: number, g: number, b: number): string => {
    // Convert to grayscale with slight emphasis on luminance
    const gray = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    
    // Colors sampled from screenshot:
    // Shadows: Brighter steel blue-gray with purple undertone
    // Highlights: Slightly muted hot pink/magenta
    const shadowColor = { r: 140, g: 150, b: 180 };  // Brighter steel blue-purple for shadows
    const highlightColor = { r: 235, g: 95, b: 195 }; // Flattened hot pink for highlights
    
    // Direct linear interpolation between shadow and highlight
    const finalR = shadowColor.r + (highlightColor.r - shadowColor.r) * gray;
    const finalG = shadowColor.g + (highlightColor.g - shadowColor.g) * gray;
    const finalB = shadowColor.b + (highlightColor.b - shadowColor.b) * gray;
    
    return `rgb(${Math.round(finalR)}, ${Math.round(finalG)}, ${Math.round(finalB)})`;
  }, []);

  const initParticles = useCallback((canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create temporary canvas to sample image
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw image to cover canvas (object-cover behavior)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgAspect;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgAspect;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    tempCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    // Sample pixels and create particles
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const particles: Particle[] = [];

    // Create particles at grid positions
    for (let y = 0; y < canvas.height; y += particleSize) {
      for (let x = 0; x < canvas.width; x += particleSize) {
        const i = (y * canvas.width + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip fully transparent pixels
        if (a < 10) continue;

        // Apply duotone effect to the color
        const duotoneColor = applyDuotone(r, g, b);

        particles.push({
          x: x,
          y: y,
          originX: x,
          originY: y,
          color: duotoneColor,
          vx: 0,
          vy: 0,
          size: particleSize,
        });
      }
    }

    particlesRef.current = particles;
    imageLoadedRef.current = true;
  }, [particleSize, applyDuotone]);

  // Particle effect - only runs on desktop
  useEffect(() => {
    // Wait until we know if we're on mobile
    if (isMobile === null) return;
    
    // Don't run particle effect on mobile - too heavy
    if (isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    const resize = () => {
      // Check mobile again on resize
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        return; // Don't initialize particles on mobile
      }
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize if image is loaded
      if (imageLoadedRef.current) {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = imageSrc;
        img.onload = () => {
          if (!destroyed) {
            initParticles(canvas, img);
          }
        };
      }
    };

    resize();

    // Load image and initialize particles
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      if (!destroyed) {
        initParticles(canvas, img);
      }
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Logo dimensions for interaction area (matches the CursorLogo size)
    const logoWidth = 280;
    const logoHeight = 140;

    // Animation loop
    const animate = () => {
      if (destroyed) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const velocity = velocityRef.current;

      // Subtle displacement parameters
      const baseForce = 2;
      const velocityForce = velocity * 4;
      const totalForce = baseForce + velocityForce;
      const returnSpeed = 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate distance from mouse (center of logo)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if particle is within the logo's elliptical area
        // Using ellipse equation: (x/a)² + (y/b)² = 1
        const normalizedX = dx / (logoWidth / 2);
        const normalizedY = dy / (logoHeight / 2);
        const ellipseDistance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);

        // Apply force if within logo area (ellipse)
        if (ellipseDistance < 1.5 && distance > 0) {
          // Smooth falloff at edges
          const influence = Math.max(0, 1 - ellipseDistance / 1.5);
          const force = influence * totalForce;
          const angle = Math.atan2(dy, dx);
          
          // Push particles away from cursor - subtle ripple effect
          p.vx -= Math.cos(angle) * force * 0.3;
          p.vy -= Math.sin(angle) * force * 0.3;
        }

        // Apply velocity with dampening
        p.x += p.vx;
        p.y += p.vy;

        // Spring back to origin
        const returnDx = p.originX - p.x;
        const returnDy = p.originY - p.y;
        
        p.vx += returnDx * returnSpeed;
        p.vy += returnDy * returnSpeed;

        // Apply friction
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Decay velocity
      velocityRef.current *= 0.95;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      velocityRef.current = Math.min(distance / 15, 1);
      
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Mouse leave handler - move cursor off screen
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      destroyed = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageSrc, initParticles, isMobile]);

  // Still determining if mobile - show nothing briefly to avoid flash
  if (isMobile === null) {
    return (
      <div className="absolute inset-0 bg-[#C8A0B8]" />
    );
  }

  // On mobile, render a static image instead of the particle effect
  if (isMobile) {
    return (
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        priority
        style={{
          filter: "sepia(0.3) saturate(1.2) hue-rotate(-20deg)",
        }}
      />
    );
  }

  // On desktop, render the canvas for particle effect
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
