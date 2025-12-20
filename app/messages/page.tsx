"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { getApprovedMessages } from "@/lib/mockData";
import RippleEffect from "@/app/components/RippleEffect";

export default function Messages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const approvedMessages = getApprovedMessages();

  // Split messages into 2 rows
  const row1 = approvedMessages.filter((_, i) => i % 2 === 0);
  const row2 = approvedMessages.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const rows = scrollContainerRef.current.querySelectorAll(".scroll-row");

      rows.forEach((row, index) => {
        const rowElement = row as HTMLElement;
        const contentWidth = rowElement.scrollWidth / 2;

        // Alternate scroll directions and speeds for visual interest
        const direction = index % 2 === 0 ? -1 : 1;
        const duration = 200 + index * 40; // Slightly different speeds

        gsap.to(rowElement, {
          x: direction * -contentWidth,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
      });
    }
  }, []);

  const MessageCard = ({ content }: { content: string }) => (
    <div
      className="shrink-0 w-[600px] md:w-[750px] lg:w-[900px] p-8 md:p-12 mx-6"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        borderRadius: "28px",
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 10px 20px rgba(0, 0, 0, 0.3),
          0 20px 40px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <blockquote
        className="text-white text-base md:text-lg lg:text-xl font-light leading-relaxed whitespace-normal"
        style={{ fontFamily: "var(--font-helvetica-neue)" }}
      >
        &ldquo;{content}&rdquo;
        <span className="text-white/40 text-sm ml-2">({content.length})</span>
      </blockquote>
      <div className="mt-6 flex items-center gap-2">
        <div className="w-10 h-px bg-linear-to-r from-white/40 to-transparent" />
        <span
          className="text-white/30 text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          Metanoia Moment
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Ripple Effect */}
      <RippleEffect />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black via-black/80 to-transparent">
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          ← Back
        </Link>
        <h1
          className="text-white text-xl uppercase tracking-[0.3em] font-light"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          Moments of Metanoia
        </h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Scrolling Messages Grid */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex flex-col justify-center min-h-screen gap-8 py-24"
      >
        {/* Row 1 */}
        <div className="scroll-row flex whitespace-nowrap items-stretch">
          {[...row1, ...row1].map((message, index) => (
            <MessageCard
              key={`row1-${message.id}-${index}`}
              content={message.content}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="scroll-row flex whitespace-nowrap items-stretch">
          {[...row2, ...row2].map((message, index) => (
            <MessageCard
              key={`row2-${message.id}-${index}`}
              content={message.content}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="fixed top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-40" />
      <div className="fixed top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-40" />

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <p
          className="text-white text-sm md:text-base uppercase tracking-widest"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          text your moment of metanoia to{" "}
          <span style={{ color: "#FF1D9D" }}>8448716554</span>
        </p>
      </div>
    </div>
  );
}
