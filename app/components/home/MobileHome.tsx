"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/app/context/AudioContext";
import { mobileVideos } from "./constants";
import SocialIcons from "./SocialIcons";
import DefinitionMarquee from "./DefinitionMarquee";

export default function MobileHome() {
  const [activeVideo, setActiveVideo] = useState(0);
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
          const videoProgress = (currentTime / duration) * 100;
          const totalProgress =
            (activeVideo / mobileVideos.length) * 100 +
            videoProgress / mobileVideos.length;
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
  }, [activeVideo]);

  // Cycle to next video when the current one ends
  const handleVideoEnded = () => {
    setActiveVideo((prev) => (prev + 1) % mobileVideos.length);
  };

  // Reset/reload video when activeVideo changes
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.load();
      // Force play with promise handling for mobile browsers
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented; muted autoplay usually succeeds so this rarely triggers
        });
      }
    }
  }, [activeVideo]);

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
          controls={false}
          preload="auto"
          onEnded={handleVideoEnded}
          onCanPlay={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
        >
          <source src={mobileVideos[activeVideo]} type="video/quicktime" />
          <source
            src={mobileVideos[activeVideo].replace(".mov", ".mp4")}
            type="video/mp4"
          />
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

        {/* Enter Button - Centered */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <Link
            href="/youtube"
            className="group inline-block cursor-pointer text-center"
            onClick={play}
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
          <DefinitionMarquee
            repeat={4}
            animationClassName="animate-marquee-mobile"
            containerClassName="-mt-1"
            textClassName="mx-3 font-medium uppercase leading-none text-white/70"
            textStyle={{
              fontFamily: "var(--font-saira-condensed)",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
            }}
          />
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
