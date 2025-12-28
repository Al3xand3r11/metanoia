"use client";

import { useEffect } from "react";

/**
 * Global error boundary - catches errors in the root layout
 * This is a special error boundary that wraps the entire app
 * It must render its own <html> and <body> tags
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0a0a0a" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            {/* Error icon */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <svg
                  style={{ width: "40px", height: "40px", color: "#f87171" }}
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
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Critical Error
            </h1>

            <p
              style={{
                color: "#a1a1aa",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              The application encountered a critical error and couldn&apos;t recover. 
              Please try refreshing the page.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontWeight: 500,
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Try Again
              </button>

              <a
                href="/"
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#27272a",
                  color: "#ffffff",
                  fontWeight: 500,
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  border: "1px solid #3f3f46",
                }}
              >
                Return to Homepage
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

