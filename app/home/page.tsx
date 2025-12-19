"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaYoutube, FaSpotify, FaInstagram, FaTiktok } from "react-icons/fa";
import background from "@/public/Mia.webp";

export default function Home() {
  const metanoiaRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  // Marquee animation for the scrolling text - COMMENTED OUT FOR PERFORMANCE
  // useEffect(() => {
  //   if (marqueeRef.current) {
  //     const marqueeContent = marqueeRef.current;
  //     const contentWidth = marqueeContent.scrollWidth / 2;

  //     gsap.to(marqueeContent, {
  //       x: -contentWidth,
  //       duration: 120,
  //       ease: "none",
  //       repeat: -1,
  //     });
  //   }
  // }, []);

  const marqueeText =
    "(meh-tuh-NOY-uh): a deep shift in your mind, heart, and spirit — a turning point back to your light.";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e0e8e8]">
      {/* Regular Background*/}
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Background"
          fill
          className="object-cover"
          priority
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
              style={{ filter: "brightness(0.3)" }}
            />
          </div>

          {/* Social Icons - Right */}
          <div className="flex items-center gap-5 md:gap-8">
            <a
              href="#"
              className="text-midnight transition-opacity hover:opacity-60"
              aria-label="YouTube"
            >
              <FaYoutube className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-midnight transition-opacity hover:opacity-60"
              aria-label="Spotify"
            >
              <FaSpotify className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-midnight transition-opacity hover:opacity-60"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
            <a
              href="#"
              className="text-midnight transition-opacity hover:opacity-60"
              aria-label="TikTok"
            >
              <FaTiktok className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
            </a>
          </div>
        </div>

        {/* Main Content - METANOIA */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
          <Link
            href="/messages"
            className="group inline-block cursor-pointer text-center"
          >
            {/* METANOIA text */}
            <h1
              ref={metanoiaRef}
              className="font-black uppercase leading-[0.85] text-white transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
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

