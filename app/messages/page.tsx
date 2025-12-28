"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { getApprovedMessages } from "@/lib/mockData";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useAudio } from "@/app/context/AudioContext";
import messageBackground from "@/public/messageBackground.webp";

export default function Messages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isMuted, toggleMute } = useAudio();
  const approvedMessages = getApprovedMessages();
  const [isMobile, setIsMobile] = useState(false);
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionsRef = useRef<number[]>([]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Split messages into 2 rows (only used on desktop)
  const row1 = approvedMessages.filter((_, i) => i % 2 === 0);
  const row2 = approvedMessages.filter((_, i) => i % 2 === 1);

  // Handle drag start
  const handleDragStart = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    
    // Pause all animations and store current positions
    if (scrollContainerRef.current) {
      const rows = scrollContainerRef.current.querySelectorAll(".scroll-row");
      dragStartPositionsRef.current = [];
      
      rows.forEach((row, index) => {
        const rowElement = row as HTMLElement;
        const transform = gsap.getProperty(rowElement, "x") as number;
        dragStartPositionsRef.current[index] = transform;
      });
      
      animationsRef.current.forEach(anim => anim.pause());
    }
  }, []);

  // Handle drag move
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    
    const deltaX = clientX - dragStartXRef.current;
    const rows = scrollContainerRef.current.querySelectorAll(".scroll-row");
    
    rows.forEach((row, index) => {
      const rowElement = row as HTMLElement;
      const contentWidth = rowElement.scrollWidth / 2;
      let newX = dragStartPositionsRef.current[index] + deltaX * (index % 2 === 0 ? 1 : -1);
      
      // Wrap around for infinite scroll effect
      if (newX > 0) newX = -contentWidth + (newX % contentWidth);
      if (newX < -contentWidth) newX = newX % contentWidth;
      
      gsap.set(rowElement, { x: newX });
    });
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    // Resume animations from current positions
    if (scrollContainerRef.current) {
      const rows = scrollContainerRef.current.querySelectorAll(".scroll-row");
      
      // Kill old animations
      animationsRef.current.forEach(anim => anim.kill());
      animationsRef.current = [];
      
      rows.forEach((row, index) => {
        const rowElement = row as HTMLElement;
        const contentWidth = rowElement.scrollWidth / 2;
        const currentX = gsap.getProperty(rowElement, "x") as number;
        
        const direction = index % 2 === 0 ? -1 : 1;
        const duration = isMobile ? 120 : 200 + index * 40;
        
        // Calculate remaining distance for seamless continuation
        const targetX = direction * -contentWidth;
        const remainingDistance = Math.abs(targetX - currentX);
        const remainingDuration = (remainingDistance / contentWidth) * duration;
        
        const anim = gsap.to(rowElement, {
          x: targetX,
          duration: remainingDuration,
          ease: "none",
          onComplete: () => {
            // Reset and restart infinite loop
            gsap.set(rowElement, { x: 0 });
            const loopAnim = gsap.to(rowElement, {
              x: targetX,
              duration: duration,
              ease: "none",
              repeat: -1,
            });
            animationsRef.current[index] = loopAnim;
          }
        });
        animationsRef.current[index] = anim;
      });
    }
  }, [isMobile]);

  // Mouse events for desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      container.style.cursor = "grabbing";
      handleDragStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX);
    };

    const handleMouseUp = () => {
      container.style.cursor = "grab";
      handleDragEnd();
    };

    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        container.style.cursor = "grab";
        handleDragEnd();
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  // Touch events for mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const rows = scrollContainerRef.current.querySelectorAll(".scroll-row");
      animationsRef.current = [];

      rows.forEach((row, index) => {
        const rowElement = row as HTMLElement;
        const contentWidth = rowElement.scrollWidth / 2;

        // Alternate scroll directions and speeds for visual interest
        const direction = index % 2 === 0 ? -1 : 1;
        const duration = isMobile ? 120 : 200 + index * 40; // Faster on mobile

        const anim = gsap.to(rowElement, {
          x: direction * -contentWidth,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
        
        animationsRef.current.push(anim);
      });
    }
    
    return () => {
      animationsRef.current.forEach(anim => anim.kill());
    };
  }, [isMobile]);

  const MessageCard = ({ content }: { content: string }) => (
    <div
      className="shrink-0 w-[260px] md:w-[750px] lg:w-[900px] p-5 md:p-12 mx-3 md:mx-6"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        borderRadius: isMobile ? "16px" : "28px",
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
        className="text-white text-xs md:text-lg lg:text-xl font-light leading-relaxed whitespace-normal"
        style={{ fontFamily: "var(--font-helvetica-neue)" }}
      >
        &ldquo;{content}&rdquo;
      </blockquote>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={messageBackground}
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gradient-to-b from-black via-black/80 to-transparent">
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors text-[10px] md:text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          ← Back
        </Link>
        <h1
          className="text-white text-xs md:text-xl uppercase tracking-[0.15em] md:tracking-[0.3em] font-light"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          Moments of Metanoia
        </h1>
        <button
          onClick={toggleMute}
          className="text-white/60 hover:text-white transition-colors p-1 md:p-2"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <HiSpeakerXMark className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <HiSpeakerWave className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>
      </div>

      {/* Scrolling Messages Grid */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex flex-col justify-center min-h-screen gap-4 md:gap-8 py-20 md:py-24 cursor-grab select-none"
      >
        {isMobile ? (
          /* Mobile: Single Row */
          <div className="scroll-row flex whitespace-nowrap items-stretch">
            {[...approvedMessages, ...approvedMessages].map((message, index) => (
              <MessageCard
                key={`mobile-${message.id}-${index}`}
                content={message.content}
              />
            ))}
          </div>
        ) : (
          /* Desktop: Two Rows */
          <>
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
          </>
        )}
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="fixed top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-40" />
      <div className="fixed top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-40" />

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-4 md:px-8 py-4 md:py-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        <Link
          href="/submit"
          className="px-6 py-3 md:px-10 md:py-4 text-white uppercase tracking-widest text-[10px] md:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            fontFamily: "var(--font-helvetica-neue)",
            background: "linear-gradient(135deg, #FF1D9D 0%, #FF1D9D 100%)",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(255, 29, 157, 0.5), 0 0 30px rgba(255, 29, 157, 0.3), 0 0 45px rgba(255, 29, 157, 0.2), 0 4px 20px rgba(255, 29, 157, 0.4)",
          }}
        >
          Submit Your Moment of Metanoia
        </Link>
      </div>
    </div>
  );
}
