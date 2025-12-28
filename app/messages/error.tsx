"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MessagesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Messages page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1
          className="text-2xl font-black text-white mb-4 uppercase"
          style={{ fontFamily: "var(--font-saira-condensed)" }}
        >
          Couldn&apos;t Load Moments
        </h1>
        
        <p
          className="text-white/60 mb-8"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          We had trouble loading the metanoia moments. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 text-white uppercase tracking-widest text-sm transition-all hover:scale-105"
            style={{
              fontFamily: "var(--font-helvetica-neue)",
              background: "linear-gradient(135deg, #FF1D9D 0%, #FF1D9D 100%)",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(255, 29, 157, 0.4)",
            }}
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 text-white/80 uppercase tracking-widest text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            style={{ fontFamily: "var(--font-helvetica-neue)" }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

