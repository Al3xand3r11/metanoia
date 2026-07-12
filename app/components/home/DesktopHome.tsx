"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HiSpeakerWave, HiSpeakerXMark, HiXMark } from "react-icons/hi2";
import CleoLogo from "@/public/CleoLogoTrimmed.png";
import TrailRevealEffect from "@/app/components/TrailRevealEffect";
import ParticleDisplacementEffect from "@/app/components/ParticleDisplacementEffect";
import SocialIcons from "./SocialIcons";
import { useAudio } from "@/app/context/AudioContext";

const YOUTUBE_VIDEO_ID = "21s6Z8vOi1U";

export default function DesktopHome() {
  const { isPlaying, play, pause } = useAudio();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close the video modal on Escape and pause background music while it's open.
  useEffect(() => {
    if (!isVideoOpen) return;

    pause();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoOpen, pause]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#C8A0B8]">
      {/* Trail Reveal Effect - Cleo+ logo follows cursor */}
      <TrailRevealEffect />

      {/* Particle Displacement Effect - Interactive background */}
      <div className="absolute inset-0">
        <ParticleDisplacementEffect imageSrc="/cleoclose.webp" particleSize={4} />

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

        {/* Cleo+ Logo - Pushed to the bottom of the page, opens the YouTube video popup */}
        <div className="mt-auto flex justify-center px-6 pb-10">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            aria-label="Watch on YouTube"
            className="group relative inline-block cursor-pointer"
          >
            {/* Soft pink glow layer - slowly pulsates in the background pink, stays lit on hover */}
            <Image
              src={CleoLogo}
              alt=""
              aria-hidden
              width={812}
              height={398}
              priority
              className="animate-logo-glow pointer-events-none absolute inset-0 h-full w-full will-change-[opacity]"
              style={{
                filter: "blur(30px) drop-shadow(0 0 25px rgba(200, 160, 184, 0.9))",
                transform: "translateZ(0)",
              }}
            />
            <Image
              src={CleoLogo}
              alt="Cleo+"
              width={812}
              height={398}
              priority
              className="relative h-auto w-[21vw] max-w-[14.4rem] transition-transform duration-200 ease-out will-change-transform group-hover:scale-[1.02] md:w-[18vw] lg:w-[16.2vw]"
              style={{ transform: "translateZ(0)" }}
            />
          </button>
        </div>
      </div>

      {/* YouTube Video Popup */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Cleo+ video"
        >
          {/* Darkened, blurred backdrop - click to close */}
          <div
            onClick={() => setIsVideoOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal card */}
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-black shadow-2xl"
            style={{ boxShadow: "0 25px 80px -10px rgba(200, 160, 184, 0.55), 0 0 0 1px rgba(255,255,255,0.06)" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
            >
              <HiXMark className="h-5 w-5" />
            </button>

            {/* 16:9 video ready to play */}
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
