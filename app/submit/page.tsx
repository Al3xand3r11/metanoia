"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cleo3 from "@/public/Mia3.webp";

// Video files for mobile background
const mobileVideos = [
  "/eyes.mov",
  "/laying.mov",
  "/beach.mov",
  "/outside.mov",
  "/water.mov",
];

export default function Submit() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const MAX_MESSAGE_LENGTH = 500;

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!message.trim()) {
      setError("Please share your metanoia moment");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        {/* Background - same as form */}
        {isMobile ? (
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
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#5A6C8F]">
            <svg className="absolute h-0 w-0" aria-hidden="true">
              <defs>
                <filter id="duotone-success">
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
            <Image
              src={Cleo3}
              alt="Metanoia"
              fill
              className="object-cover"
              priority
              style={{ filter: "url(#duotone-success) contrast(1.1)" }}
            />
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
          </div>
        )}

        {/* Success Content */}
        <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6">
          <div className="text-center">
            <h2
              className="text-[#F5F7FA] font-black uppercase mb-4"
              style={{
                fontFamily: "var(--font-saira-condensed)",
                fontSize: isMobile ? "2rem" : "clamp(2rem, 5vw, 4rem)",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              Thank You
            </h2>
            <p
              className="text-white/80 text-sm md:text-lg max-w-md mx-auto mb-8"
              style={{ fontFamily: "var(--font-helvetica-neue)" }}
            >
              Your metanoia moment has been received. It&apos;s being reviewed and may appear in our gallery soon.
            </p>
            <Link
              href="/messages"
              className="inline-block px-8 py-3 text-white uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "var(--font-helvetica-neue)",
                background: "linear-gradient(135deg, #FF1D9D 0%, #FF1D9D 100%)",
                borderRadius: "4px",
                boxShadow: "0 4px 20px rgba(255, 29, 157, 0.4)",
              }}
            >
              View Moments
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Darker overlay for form readability */}
          <div className="absolute inset-0 bg-black/50" />

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
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link
              href="/messages"
              className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-helvetica-neue)" }}
            >
              ← Back
            </Link>
          </div>

          {/* Form - Centered */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
            <h1
              className="text-[#F5F7FA] font-black uppercase mb-2 text-center"
              style={{
                fontFamily: "var(--font-saira-condensed)",
                fontSize: "1.75rem",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.6)",
                letterSpacing: "0.1em",
              }}
            >
              Share Your Moment
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#FF1D9D] transition-colors text-sm"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                />
              </div>

              {/* Message Input */}
              <div>
                <textarea
                  placeholder="Your Metanoia Moment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#FF1D9D] transition-colors text-sm resize-none"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      message.length > MAX_MESSAGE_LENGTH * 0.9
                        ? "text-[#FF1D9D]"
                        : "text-white/40"
                    }`}
                    style={{ fontFamily: "var(--font-helvetica-neue)" }}
                  >
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p
                  className="text-[#FF1D9D] text-xs text-center"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                >
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-white uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  fontFamily: "var(--font-helvetica-neue)",
                  background: "linear-gradient(135deg, #FF1D9D 0%, #FF1D9D 100%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(255, 29, 157, 0.4)",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
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

  // Desktop Layout
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#5A6C8F]">
      {/* SVG Duotone Filter */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="duotone">
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

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={Cleo3}
          alt="Metanoia Moments"
          fill
          className="object-cover"
          priority
          style={{
            filter: "url(#duotone) contrast(1.1)",
          }}
        />

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
          <Link
            href="/messages"
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
            style={{ fontFamily: "var(--font-helvetica-neue)" }}
          >
            ← Back
          </Link>
        </div>

        {/* Form - Centered */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          {/* Semi-transparent card for the form */}
          <div
            className="w-full max-w-lg p-8 md:p-12"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(16px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h1
              className="text-[#F5F7FA] font-black uppercase mb-6 text-center"
              style={{
                fontFamily: "var(--font-saira-condensed)",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                letterSpacing: "0.1em",
              }}
            >
              Share Your Moment
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF1D9D] transition-colors"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                />
              </div>

              {/* Message Input */}
              <div>
                <textarea
                  placeholder="Your Metanoia Moment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  rows={6}
                  className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF1D9D] transition-colors resize-none"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                />
                <div className="flex justify-end mt-2">
                  <span
                    className={`text-sm ${
                      message.length > MAX_MESSAGE_LENGTH * 0.9
                        ? "text-[#FF1D9D]"
                        : "text-white/40"
                    }`}
                    style={{ fontFamily: "var(--font-helvetica-neue)" }}
                  >
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p
                  className="text-[#FF1D9D] text-sm text-center"
                  style={{ fontFamily: "var(--font-helvetica-neue)" }}
                >
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-white uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  fontFamily: "var(--font-helvetica-neue)",
                  background: "linear-gradient(135deg, #FF1D9D 0%, #FF1D9D 100%)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(255, 29, 157, 0.4)",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Your Moment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

