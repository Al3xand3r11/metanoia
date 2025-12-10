"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { getApprovedMessages } from "@/lib/mockData";

export default function Messages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const approvedMessages = getApprovedMessages();

  // Split messages into 3 rows for the columns
  const row1 = approvedMessages.filter((_, i) => i % 3 === 0);
  const row2 = approvedMessages.filter((_, i) => i % 3 === 1);
  const row3 = approvedMessages.filter((_, i) => i % 3 === 2);

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

  const MessageCard = ({ content, index }: { content: string; index: number }) => (
    <div
      className="flex-shrink-0 w-[400px] md:w-[450px] lg:w-[500px] p-6 mx-4"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        borderRadius: "20px",
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
        className="text-white text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
        style={{ fontFamily: "var(--font-saira)" }}
      >
        &ldquo;{content}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-2">
        <div className="w-8 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
        <span
          className="text-white/30 text-xs uppercase tracking-widest"
          style={{ fontFamily: "var(--font-saira)" }}
        >
          Metanoia Moment
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black via-black/80 to-transparent">
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-saira)" }}
        >
          ← Back
        </Link>
        <h1
          className="text-white text-xl uppercase tracking-[0.3em] font-light"
          style={{ fontFamily: "var(--font-saira)" }}
        >
          Moments
        </h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Scrolling Messages Grid */}
      <div
        ref={scrollContainerRef}
        className="flex flex-col justify-center min-h-screen gap-6 py-24"
      >
        {/* Row 1 */}
        <div className="scroll-row flex whitespace-nowrap">
          {[...row1, ...row1].map((message, index) => (
            <MessageCard
              key={`row1-${message.id}-${index}`}
              content={message.content}
              index={index}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="scroll-row flex whitespace-nowrap">
          {[...row2, ...row2].map((message, index) => (
            <MessageCard
              key={`row2-${message.id}-${index}`}
              content={message.content}
              index={index}
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className="scroll-row flex whitespace-nowrap">
          {[...row3, ...row3].map((message, index) => (
            <MessageCard
              key={`row3-${message.id}-${index}`}
              content={message.content}
              index={index}
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
          style={{ fontFamily: "var(--font-saira)" }}
        >
          text your moment to{" "}
          <span style={{ color: "#FF1D9D" }}>1234567890</span>
        </p>
      </div>
    </div>
  );
}
