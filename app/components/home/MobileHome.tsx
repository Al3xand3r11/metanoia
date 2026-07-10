"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef } from "react";
import { useAudio } from "@/app/context/AudioContext";
import SocialIcons from "./SocialIcons";

export default function MobileHome() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const { play } = useAudio();

  // Smooth progress bar update using requestAnimationFrame
  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current && progressBarRef.current) {
        const { currentTime, duration } = videoRef.current;
        if (duration > 0) {
          progressBarRef.current.style.width = `${(currentTime / duration) * 100}%`;
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
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          onCanPlay={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
        >
          <source src="/newcleo.mov" type="video/quicktime" />
          <source src="/newcleo.mp4" type="video/mp4" />
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
        <SocialIcons
          iconClassName="h-8 w-8"
          containerClassName="justify-center gap-6 px-6 py-8"
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Cleo+ Logo - links to the YouTube video */}
        <div className="flex justify-center pb-4">
          <Link href="/youtube" aria-label="Watch on YouTube" onClick={play}>
            <Image
              src={CleoLogo}
              alt="Cleo+"
              width={100}
              height={50}
              className="h-auto w-36 opacity-90"
            />
          </Link>
        </div>

        {/* Video progress timeline */}
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
