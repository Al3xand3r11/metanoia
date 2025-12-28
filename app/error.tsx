"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
      
      <div className="relative z-10 text-center max-w-md">
        {/* Error icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1
          className="text-3xl md:text-4xl font-black text-white mb-4 uppercase"
          style={{ fontFamily: "var(--font-saira-condensed)" }}
        >
          Something Went Wrong
        </h1>
        
        <p
          className="text-zinc-400 mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-helvetica-neue)" }}
        >
          We encountered an unexpected error. Don&apos;t worry, your data is safe. 
          Try refreshing the page or go back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            Go Home
          </Link>
        </div>

        {/* Error digest for debugging (only visible in development) */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-8 text-xs text-zinc-600 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

