"use client";

import Image from "next/image";
import Link from "next/link";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import CleoLogo from "@/public/CleoLogo.png";
import TrailRevealEffect from "@/app/components/TrailRevealEffect";
import ParticleDisplacementEffect from "@/app/components/ParticleDisplacementEffect";
import SocialIcons from "./SocialIcons";
import { useAudio } from "@/app/context/AudioContext";

export default function DesktopHome() {
  const { isPlaying, play, pause } = useAudio();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#C8A0B8]">
      {/* Trail Reveal Effect - Cleo+ logo follows cursor */}
      <TrailRevealEffect />

      {/* Particle Displacement Effect - Interactive background */}
      <div className="absolute inset-0">
        <ParticleDisplacementEffect imageSrc="/cleoclose.jpeg" particleSize={4} />

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
          {/* Sound Toggle - Left */}
          <button
            onClick={isPlaying ? pause : play}
            className="text-white/70 hover:text-white transition-colors p-1 md:p-2"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <HiSpeakerWave className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            ) : (
              <HiSpeakerXMark className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            )}
          </button>

          {/* Social Icons - Right */}
          <SocialIcons
            iconClassName="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
            containerClassName="gap-5 md:gap-8"
          />
        </div>

        {/* Cleo+ Logo - Centered, links to the YouTube video */}
        <div className="flex flex-1 items-center justify-center px-6">
          <Link
            href="/youtube"
            aria-label="Watch on YouTube"
            className="group relative inline-block"
          >
            {/* Soft pink glow layer - pre-rendered, only opacity animates for a smooth hover */}
            <Image
              src={CleoLogo}
              alt=""
              aria-hidden
              width={120}
              height={60}
              priority
              className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 ease-out will-change-[opacity] group-hover:opacity-90"
              style={{
                filter: "blur(30px) drop-shadow(0 0 25px rgba(214, 132, 184, 0.9))",
                transform: "translateZ(0)",
              }}
            />
            <Image
              src={CleoLogo}
              alt="Cleo+"
              width={120}
              height={60}
              priority
              className="relative h-auto w-[70vw] max-w-3xl transition-transform duration-200 ease-out will-change-transform group-hover:scale-[1.02] md:w-[60vw] lg:w-[55vw]"
              style={{ transform: "translateZ(0)" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
