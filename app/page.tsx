"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CleoDoll from "@/public/cleodoll.png";

export default function SplashPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Show "loading" for 2 seconds, then switch to "enter site"
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    router.push("/home");
  };

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo - only shows after loading */}
        <div
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={CleoDoll}
            alt="Cleo"
            width={80}
            height={100}
            className="h-auto w-16 md:w-20"
            priority
          />
        </div>

        {/* Text */}
        <button
          onClick={handleEnter}
          disabled={isLoading}
          className={`transition-all duration-500 ${
            isLoading
              ? "cursor-default"
              : "cursor-pointer hover:opacity-70"
          }`}
          style={{
            fontFamily: "var(--font-helvetica-neue)",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            fontWeight: 300,
            color: "#1E3A8A",
            letterSpacing: "0.02em",
          }}
        >
          {isLoading ? "Loading" : "Enter Site"}
        </button>
      </div>
    </div>
  );
}
