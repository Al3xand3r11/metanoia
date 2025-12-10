"use client";

import Image from "next/image";
import Link from "next/link";
import Mia2 from "@/public/Mia2.webp";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaYoutube, FaSpotify, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Home() {
  const metanoiaRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (metanoiaRef.current) {
      // Initial state - positioned off screen to the right
      gsap.set(metanoiaRef.current, {
        x: 200,
        opacity: 0,
      });

      // Animate in
      gsap.to(metanoiaRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }, []);

  // Marquee animation for the scrolling text
  useEffect(() => {
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current;
      const contentWidth = marqueeContent.scrollWidth / 2;

      gsap.to(marqueeContent, {
        x: -contentWidth,
        duration: 120,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const marqueeText =
    "(meh-tuh-NOY-uh): a deep shift in your mind, heart, and spirit — a turning point back to your light.";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e0e8e8]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={Mia2}
          alt="Metanoia Moments"
          fill
          className="object-cover"
          priority
          style={{
            // darken the image
            filter: "brightness(0.8)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Top Navigation */}
        <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Image
              src={CleoLogo}
              alt="Cleo Logo"
              width={80}
              height={40}
              className="h-auto w-16 md:w-20"
            />
          </div>

          {/* Center Text */}
          <p
            className="hidden text-center text-sm font-medium uppercase tracking-[0.3em] text-white md:block"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            THIS IS JUST TEST WORDING FOR THE TOP
          </p>

          {/* Social Icons - Right */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="YouTube"
            >
              <FaYoutube className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="Spotify"
            >
              <FaSpotify className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="TikTok"
            >
              <FaTiktok className="h-6 w-6 md:h-7 md:w-7" />
            </a>
          </div>
        </div>

        {/* Main Content - METANOIA */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
          <Link
            href="/messages"
            className="group relative inline-block cursor-pointer text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* "Enter" text that appears on hover */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 text-xl font-medium uppercase tracking-widest text-white transition-all duration-300 md:text-3xl lg:text-4xl ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ 
                fontFamily: "var(--font-saira)",
                top: "-3vw",
                color: "#FF1D9D",
              }}
            >
              Enter
            </span>

            {/* METANOIA text */}
            <h1
              ref={metanoiaRef}
              className="font-black uppercase leading-[0.85] text-white"
              style={{
                fontFamily: "var(--font-saira-condensed)",
                fontSize: "clamp(4rem, 28vw, 25rem)",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              METANOIA
            </h1>
          </Link>

          {/* Scrolling Marquee Text - overlaps METANOIA */}
          <div 
            className="w-full overflow-hidden"
            style={{ marginTop: "-8vw" }}
          >
            <div ref={marqueeRef} className="flex whitespace-nowrap">
              {/* Duplicate content for seamless loop */}
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="mx-8 font-black uppercase leading-none text-black"
                  style={{ 
                    fontFamily: "var(--font-saira-condensed)",
                    fontSize: "clamp(3rem, 16.8vw, 20rem)",
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
