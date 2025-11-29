"use client";

import Image from "next/image";
import Mia from "@/public/Mia.webp";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const metanoiaRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e0e8e8]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={Mia}
          alt="Metanoia Moments"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top Section - CLEO logo and MOMENTS */}
        <div className="flex items-start justify-between p-8 md:p-12">
          <div className="flex items-center justify-center rounded-full border-2 border-white bg-white/90 px-6 py-2">
            <span className="text-sm font-bold tracking-wider text-gray-700">CLEO</span>
          </div>
          
          <h2 className="text-right text-2xl font-light italic tracking-widest text-white md:text-4xl">
            MOMENTS
          </h2>
        </div>

        {/* Bottom Section - METANOIA */}
        <div className="mt-auto flex items-end p-8 md:p-12">
          <h1
            ref={metanoiaRef}
            className="text-7xl font-black uppercase leading-none tracking-tight text-white md:text-9xl lg:text-[12rem]"
            style={{
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            METANOIA
          </h1>
        </div>
      </div>
    </div>
  );
}
