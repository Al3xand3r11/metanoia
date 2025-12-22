"use client";

import { useEffect, useRef, useCallback } from "react";

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

  // Duotone color mapping
  const applyDuotone = useCallback((r: number, g: number, b: number): string => {
    // Convert to grayscale
    const gray = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    
    // Duotone colors: Lighter steel blue base → #FF1D9D (light/accent) for highlights
    const darkColor = { r: 110, g: 130, b: 165 };  // Lighter steel blue for shadows
    const midColor = { r: 140, g: 160, b: 190 };   // Even lighter steel blue for midtones
    const lightColor = { r: 255, g: 29, b: 157 };  // #FF1D9D (hot pink for highlights)
    
    let finalR, finalG, finalB;
    
    if (gray < 0.5) {
      // Interpolate between dark and mid
      const t = gray * 2;
      finalR = darkColor.r + (midColor.r - darkColor.r) * t;
      finalG = darkColor.g + (midColor.g - darkColor.g) * t;
      finalB = darkColor.b + (midColor.b - darkColor.b) * t;
    } else {
      // Interpolate between mid and light (subtle pink in highlights)
      const t = (gray - 0.5) * 2;
      // Only add slight pink tint to very bright areas
      const pinkInfluence = Math.pow(t, 3) * 0.3; // Cubic falloff, max 30% influence
      finalR = midColor.r + (lightColor.r - midColor.r) * pinkInfluence + (255 - midColor.r) * t * 0.7;
      finalG = midColor.g + (lightColor.g - midColor.g) * pinkInfluence + (255 - midColor.g) * t * 0.3;
      finalB = midColor.b + (lightColor.b - midColor.b) * pinkInfluence + (255 - midColor.b) * t * 0.5;
    }
    
    // Apply contrast boost
    const contrast = 1.1;
    finalR = ((finalR / 255 - 0.5) * contrast + 0.5) * 255;
    finalG = ((finalG / 255 - 0.5) * contrast + 0.5) * 255;
    finalB = ((finalB / 255 - 0.5) * contrast + 0.5) * 255;
    
    return `rgb(${Math.round(Math.max(0, Math.min(255, finalR)))}, ${Math.round(Math.max(0, Math.min(255, finalG)))}, ${Math.round(Math.max(0, Math.min(255, finalB)))})`;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    const resize = () => {
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
  }, [imageSrc, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
