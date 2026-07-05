"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useState } from "react";
import { useAudio } from "@/app/context/AudioContext";
import TrailRevealEffect from "@/app/components/TrailRevealEffect";
import ParticleDisplacementEffect from "@/app/components/ParticleDisplacementEffect";
import SocialIcons from "./SocialIcons";
import DefinitionMarquee from "./DefinitionMarquee";

export default function DesktopHome() {
  const [isMetanoiaHovered, setIsMetanoiaHovered] = useState(false);
  const { play } = useAudio();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#C8A0B8]">
      {/* Trail Reveal Effect - Cleo+ logo follows cursor */}
      <TrailRevealEffect />

      {/* Particle Displacement Effect - Interactive background */}
      <div className="absolute inset-0">
        <ParticleDisplacementEffect imageSrc="/cleopaint.webp" particleSize={4} />

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
          <SocialIcons
            iconClassName="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
            containerClassName="gap-5 md:gap-8"
          />
        </div>

        {/* Main Content - METANOIA (Centered) */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <Link
            href="/messages"
            className="group inline-block cursor-pointer text-center"
            onClick={play}
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
          <DefinitionMarquee
            repeat={6}
            animationClassName="animate-marquee-desktop"
            containerStyle={{ marginTop: "-2vw" }}
            textClassName="mx-4 font-black uppercase leading-none text-[#111827]"
            textStyle={{
              fontFamily: "var(--font-saira-condensed)",
              fontSize: "clamp(0.875rem, 2vw, 2rem)",
              letterSpacing: "-0.02em",
            }}
          />
        </div>
      </div>
    </div>
  );
}
