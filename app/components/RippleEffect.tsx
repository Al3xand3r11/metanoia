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

    // Logo dimensions - more proportionate
    const logoWidth = 100;
    const logoHeight = 40;

    // Create offscreen canvas for blue-tinted logo
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

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

      // Draw logo at mouse position with blue hue
      if (mouseX > 0 && logoLoadedRef.current && logoRef.current && offscreenCtx) {
        // Set up offscreen canvas
        offscreenCanvas.width = logoWidth;
        offscreenCanvas.height = logoHeight;
        
        // Clear and draw the original logo
        offscreenCtx.clearRect(0, 0, logoWidth, logoHeight);
        offscreenCtx.drawImage(logoRef.current, 0, 0, logoWidth, logoHeight);
        
        // Get image data and colorize each pixel
        const imageData = offscreenCtx.getImageData(0, 0, logoWidth, logoHeight);
        const data = imageData.data;
        
        // Blue color components (steel blue #5A6C8F)
        const blueR = 90;
        const blueG = 108;
        const blueB = 143;
        
        for (let i = 0; i < data.length; i += 4) {
          // Get the brightness of the original pixel
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
          
          // Apply blue color based on brightness
          data[i] = blueR * brightness;     // R
          data[i + 1] = blueG * brightness; // G
          data[i + 2] = blueB * brightness; // B
          // Alpha stays the same
        }
        
        offscreenCtx.putImageData(imageData, 0, 0);
        
        ctx.save();
        
        // Visible, blends with blue background
        ctx.globalAlpha = 0.8;
        
        // Draw the blue-tinted logo centered at cursor
        ctx.drawImage(
          offscreenCanvas,
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
