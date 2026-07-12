"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark, HiXMark } from "react-icons/hi2";
import CleoLogo from "@/public/CleoLogoTrimmed.png";
import SocialIcons from "./SocialIcons";

const YOUTUBE_VIDEO_ID = "21s6Z8vOi1U";

export default function MobileHome() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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

  // Keep the video element's muted property in sync with state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Pause the background video while the YouTube overlay is open, resume on close
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoOpen) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isVideoOpen]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (!next) {
      // Unmuting counts as a user gesture, so (re)start playback with sound
      video.play().catch(() => {});
    }
  };

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
          <source src="/newcleo.mp4" type="video/mp4" />
          <source src="/newcleo.mov" type="video/quicktime" />
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
        {/* Top Bar */}
        <div className="relative flex items-center justify-center px-6 py-6">
          {/* Sound Toggle - mutes/unmutes the background video */}
          <button
            onClick={toggleMute}
            className="absolute left-6 text-white/70 transition-colors hover:text-white"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <HiSpeakerXMark className="h-6 w-6" />
            ) : (
              <HiSpeakerWave className="h-6 w-6" />
            )}
          </button>

          {/* Social Icons - Center */}
          <SocialIcons iconClassName="h-8 w-8" containerClassName="justify-center gap-6" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Cleo+ Logo - opens the YouTube video overlay */}
        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            aria-label="Watch on YouTube"
            className="group relative inline-block"
          >
            {/* Soft pink glow layer - slowly pulsates in the brand pink */}
            <Image
              src={CleoLogo}
              alt=""
              aria-hidden
              width={812}
              height={398}
              className="animate-logo-glow pointer-events-none absolute inset-0 h-full w-full will-change-[opacity]"
              style={{
                filter: "blur(22px) drop-shadow(0 0 18px rgba(200, 160, 184, 0.9))",
                transform: "translateZ(0)",
              }}
            />
            <Image
              src={CleoLogo}
              alt="Cleo+"
              width={812}
              height={398}
              className="relative h-auto w-[85px] opacity-90"
              style={{ transform: "translateZ(0)" }}
            />
          </button>
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

      {/* Full-screen YouTube overlay */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Cleo+ video"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform active:scale-95"
          >
            <HiXMark className="h-6 w-6" />
          </button>

          {/* 16:9 player, autoplays with sound (opened via user tap) */}
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&playsinline=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
