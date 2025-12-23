"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef, useState } from "react";
import { FaYoutube, FaSpotify, FaInstagram, FaTiktok } from "react-icons/fa";
import { useAudio } from "@/app/context/AudioContext";
import TrailRevealEffect from "@/app/components/TrailRevealEffect";
import ParticleDisplacementEffect from "@/app/components/ParticleDisplacementEffect";

// Video files for mobile background
const mobileVideos = [
  "/eyes.mov",
  "/laying.mov",
  "/beach.mov",
  "/outside.mov",
  "/water.mov",
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isMetanoiaHovered, setIsMetanoiaHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const { play } = useAudio();

  // Smooth progress bar update using requestAnimationFrame
  useEffect(() => {
    if (!isMobile) return;
    
    const updateProgress = () => {
      if (videoRef.current && progressBarRef.current) {
        const { currentTime, duration } = videoRef.current;
        if (duration > 0) {
          const videoProgress = (currentTime / duration) * 100;
          const totalProgress = ((activeVideo / mobileVideos.length) * 100) + (videoProgress / mobileVideos.length);
          progressBarRef.current.style.width = `${totalProgress}%`;
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, activeVideo]);

  // Handle METANOIA click - play music and navigate
  const handleMetanoiaClick = () => {
    play();
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle video ended - cycle to next video
  const handleVideoEnded = () => {
    setActiveVideo((prev) => (prev + 1) % mobileVideos.length);
  };

  // Reset video when activeVideo changes
  useEffect(() => {
    if (videoRef.current && isMobile) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [activeVideo, isMobile]);

  const marqueeText =
    "(meh-tuh-NOY-uh): a deep shift in your mind, heart, and spirit — a turning point back to your light.";

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            key={activeVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
          >
            <source src={mobileVideos[activeVideo]} type="video/quicktime" />
          </video>
          
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Halftone/Scanline Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.4) 2px,
                rgba(0, 0, 0, 0.4) 4px
              )`,
              backgroundSize: "100% 4px",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex min-h-screen w-full flex-col">
          {/* Social Icons - Top Center */}
          <div className="flex items-center justify-center gap-6 px-6 py-8">
            <a
              href="https://www.youtube.com/@itscleoplus"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="YouTube"
            >
              <FaYoutube className="h-8 w-8" />
            </a>
            <a
              href="https://open.spotify.com/artist/2eg5AuNNcwQYMtoZQNTH4p"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="Spotify"
            >
              <FaSpotify className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/itscleoplus/"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.tiktok.com/@itscleoplus"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="TikTok"
            >
              <FaTiktok className="h-8 w-8" />
            </a>
          </div>

          {/* Enter Button - Centered */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <Link
              href="/messages"
              className="group inline-block cursor-pointer text-center"
              onClick={handleMetanoiaClick}
            >
              <span
                className="font-black uppercase text-white"
                style={{
                  fontFamily: "var(--font-saira-condensed)",
                  fontSize: "2.5rem",
                  letterSpacing: "0.05em",
                  textShadow: `
                    0 0 8px #fff,
                    0 0 15px #fff,
                    0 0 30px #fff,
                    0 0 60px #fff,
                    0 0 100px rgba(255,255,255,0.9),
                    0 0 150px rgba(255,255,255,0.7),
                    0 0 200px rgba(255,255,255,0.5)
                  `,
                  animation: "neon-pulsate 2s ease-in-out infinite",
                }}
              >
                METANOIA
              </span>
            </Link>

            {/* Definition Text - Mobile Marquee */}
            <div 
              className="w-full overflow-hidden -mt-1"
            >
              <div 
                className="flex whitespace-nowrap animate-marquee-mobile"
              >
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="mx-3 font-medium uppercase leading-none text-white/70"
                    style={{ 
                      fontFamily: "var(--font-saira-condensed)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {marqueeText}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cleo+ Logo - Above progress indicator */}
          <div className="flex justify-center pb-4">
            <Image
              src={CleoLogo}
              alt="Cleo+"
              width={100}
              height={50}
              className="h-auto w-24 opacity-90"
            />
          </div>

          {/* Video progress timeline - single continuous bar for all 5 videos */}
          <div className="flex justify-center px-8 pb-8">
            <div className="relative w-full max-w-xs h-1 bg-white/20 rounded-full overflow-hidden">
              {/* Progress fill - updated via ref for smooth animation */}
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (existing)
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#8B9CB5]">
      {/* Trail Reveal Effect - Cleo+ logo follows cursor */}
      <TrailRevealEffect />
      
      {/* Particle Displacement Effect - Interactive background */}
      <div className="absolute inset-0">
        <ParticleDisplacementEffect 
          imageSrc="/Mia3.webp"
          particleSize={4}
        />
        
        {/* Halftone/Scanline Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.4) 2px,
              rgba(0, 0, 0, 0.4) 4px
            )`,
            backgroundSize: "100% 4px",
          }}
        />
        {/* Subtle noise texture for extra grit */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10 z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Top Navigation */}
        <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
          {/* Logo - Left */}
          <div className="shrink-0">
            <Image
              src={CleoLogo}
              alt="Cleo Logo"
              width={120}
              height={60}
              className="h-auto w-24 md:w-32 lg:w-36"
            />
          </div>

          {/* Social Icons - Right */}
          <div className="flex items-center gap-5 md:gap-8">
            <a
              href="#"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="YouTube"
            >
              <FaYoutube className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="Spotify"
            >
              <FaSpotify className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-[#F5F7FA] transition-opacity hover:opacity-60"
              aria-label="TikTok"
            >
              <FaTiktok className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
          </div>
        </div>

        {/* Main Content - METANOIA (Centered) */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <Link
            href="/messages"
            className="group inline-block cursor-pointer text-center"
            onClick={handleMetanoiaClick}
          >
            {/* METANOIA text */}
            <h1
              className="font-black uppercase leading-[0.85] text-[#F5F7FA] transition-all duration-300"
              style={{
                fontFamily: "var(--font-saira-condensed)",
                fontSize: "clamp(3rem, 12vw, 12rem)",
                textShadow: isMetanoiaHovered 
                  ? "0 0 20px #fff, 0 0 40px #fff, 0 0 80px #fff, 0 0 120px rgba(255,255,255,0.8), 0 0 200px rgba(255,255,255,0.6)"
                  : "0 4px 30px rgba(0, 0, 0, 0.4)",
                letterSpacing: "-0.02em",
              }}
              onMouseEnter={() => setIsMetanoiaHovered(true)}
              onMouseLeave={() => setIsMetanoiaHovered(false)}
            >
              METANOIA
            </h1>
          </Link>

          {/* Definition Text - below METANOIA */}
          <div 
            className="w-full overflow-hidden"
            style={{ marginTop: "-2vw" }}
          >
            <div className="flex whitespace-nowrap animate-marquee-desktop">
              {/* Duplicate content for seamless loop */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="mx-4 font-black uppercase leading-none text-[#111827]"
                  style={{ 
                    fontFamily: "var(--font-saira-condensed)",
                    fontSize: "clamp(0.875rem, 2vw, 2rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
