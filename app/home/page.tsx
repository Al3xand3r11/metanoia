"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef, useState } from "react";
import { FaYoutube, FaSpotify, FaInstagram, FaTiktok } from "react-icons/fa";
import CleoDark from "@/public/CleoDark.webp";
import Cleo3 from "@/public/Mia3.webp";
import { useAudio } from "@/app/context/AudioContext";
import TrailRevealEffect from "@/app/components/TrailRevealEffect";

// Video files for mobile background
const mobileVideos = [
  "/eyes.mov",
  "/laying.mov",
  "/beach.mov",
  "/outside.mov",
  "/water.mov",
];

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0); // 0 = CleoDark, 1 = Cleo3
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isMetanoiaHovered, setIsMetanoiaHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play } = useAudio();

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

  // Switch images every 5 seconds (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);


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
                className="font-black uppercase text-[#F5F7FA] transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                style={{
                  fontFamily: "var(--font-saira-condensed)",
                  fontSize: "2.5rem",
                  textShadow: "0 4px 30px rgba(0, 0, 0, 0.6)",
                  letterSpacing: "0.2em",
                }}
              >
                METANOIA
              </span>
            </Link>
          </div>

          {/* Video progress indicator */}
          <div className="flex justify-center gap-2 pb-8">
            {mobileVideos.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  index === activeVideo ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (existing)
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#344259]">
      {/* Trail Reveal Effect - CLEO+ follows cursor on fast movement */}
      <TrailRevealEffect />
      
      {/* SVG Duotone Filters */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          {/* Duotone Filter 1: For CleoDark - #344259 → #FF1D9D */}
          <filter id="duotone1">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0    0    0    1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.204 1.0" />
              <feFuncG type="table" tableValues="0.259 0.114" />
              <feFuncB type="table" tableValues="0.349 0.616" />
            </feComponentTransfer>
          </filter>

          {/* Duotone Filter 2: For Cleo3 - #495b80 → #FF1D9D */}
          <filter id="duotone2">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0    0    0    1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.286 1.0" />
              <feFuncG type="table" tableValues="0.357 0.114" />
              <feFuncB type="table" tableValues="0.502 0.616" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {/* Image 1: CleoDark */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeImage === 0 ? 1 : 0 }}
        >
          <Image
            src={CleoDark}
            alt="Metanoia Moments"
            fill
            className="object-cover"
            priority
            style={{
              filter: "url(#duotone1) contrast(1.1)",
            }}
          />
        </div>

        {/* Image 2: Cleo3 */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeImage === 1 ? 1 : 0 }}
        >
          <Image
            src={Cleo3}
            alt="Metanoia Moments"
            fill
            className="object-cover"
            priority
            style={{
              filter: "url(#duotone2) contrast(1.1)",
            }}
          />
        </div>

        {/* Halftone/Scanline Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
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
          className="absolute inset-0 pointer-events-none opacity-10"
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
            <div ref={marqueeRef} className="flex whitespace-nowrap justify-center">
              {/* Duplicate content for seamless loop */}
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="mx-4 font-black uppercase leading-none text-[#111827]"
                  style={{ 
                    fontFamily: "var(--font-saira-condensed)",
                    fontSize: "clamp(1rem, 3vw, 3rem)",
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
