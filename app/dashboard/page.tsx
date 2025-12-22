"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Message } from "@/lib/types";
import { mockMessages } from "@/lib/mockData";
import { FiEye, FiEyeOff, FiTrash2, FiClock, FiCheck, FiLock } from "react-icons/fi";

const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
      
      <div className="relative z-10 w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/CleoLogo.png"
              alt="Cleo+"
              width={140}
              height={50}
              className="brightness-0 invert opacity-90"
              priority
            />
          </div>

          {/* Password Input Container */}
          <div className={`w-full ${isShaking ? "animate-shake" : ""}`}>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className={`w-full bg-zinc-900/60 backdrop-blur-sm border ${
                  error ? "border-red-500/50" : "border-zinc-800"
                } rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all text-center tracking-widest`}
                style={{ fontFamily: "var(--font-saira)" }}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <FiLock className="w-4 h-4" />
              </button>
            </div>
            
            {/* Error message */}
            <div className={`mt-4 text-center transition-opacity duration-200 ${error ? "opacity-100" : "opacity-0"}`}>
              <span className="text-red-400/80 text-sm" style={{ fontFamily: "var(--font-saira)" }}>
                Incorrect password
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* CSS for shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use state to manage messages (simulating database updates)
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "hidden">("all");

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  // Toggle message visibility
  const toggleVisibility = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const newStatus = msg.status === "approved" ? "hidden" : "approved";
          return {
            ...msg,
            status: newStatus,
            approved_at: newStatus === "approved" ? new Date().toISOString() : null,
          };
        }
        return msg;
      })
    );
  };

  // Filter messages based on selected filter
  const filteredMessages = messages.filter((msg) => {
    if (filter === "all") return true;
    return msg.status === filter;
  });

  // Get counts for each status
  const counts = {
    all: messages.length,
    pending: messages.filter((m) => m.status === "pending").length,
    approved: messages.filter((m) => m.status === "approved").length,
    hidden: messages.filter((m) => m.status === "hidden").length,
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge styles
  const getStatusStyles = (status: Message["status"]) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "hidden":
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-zinc-500 hover:text-white transition-colors text-sm"
                style={{ fontFamily: "var(--font-saira)" }}
              >
                ← Home
              </Link>
              <h1
                className="text-white text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-saira)" }}
              >
                Dashboard
              </h1>
            </div>
            <Link
              href="/messages"
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              View Public Page →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {(["all", "pending", "approved", "hidden"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-saira)" }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs opacity-60">({counts[status]})</span>
            </button>
          ))}
        </div>

        {/* Messages Table */}
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-sm font-medium uppercase tracking-wider">
            <div className="col-span-6" style={{ fontFamily: "var(--font-saira)" }}>Message</div>
            <div className="col-span-2 text-center" style={{ fontFamily: "var(--font-saira)" }}>Status</div>
            <div className="col-span-2 text-center" style={{ fontFamily: "var(--font-saira)" }}>Date</div>
            <div className="col-span-2 text-center" style={{ fontFamily: "var(--font-saira)" }}>Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zinc-800/50">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-zinc-800/30 transition-colors"
              >
                {/* Message Content */}
                <div className="col-span-6">
                  <p
                    className="text-white text-base leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-saira)" }}
                  >
                    &ldquo;{message.content}&rdquo;
                  </p>
                </div>

                {/* Status Badge */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(
                      message.status
                    )}`}
                    style={{ fontFamily: "var(--font-saira)" }}
                  >
                    {message.status === "approved" && <FiCheck className="w-3 h-3" />}
                    {message.status === "pending" && <FiClock className="w-3 h-3" />}
                    {message.status === "hidden" && <FiEyeOff className="w-3 h-3" />}
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2 text-center">
                  <span
                    className="text-zinc-500 text-sm"
                    style={{ fontFamily: "var(--font-saira)" }}
                  >
                    {formatDate(message.created_at)}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  {/* Toggle Visibility Button */}
                  <button
                    onClick={() => toggleVisibility(message.id)}
                    className={`p-2.5 rounded-lg transition-all ${
                      message.status === "approved"
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }`}
                    title={message.status === "approved" ? "Hide from public" : "Show on public page"}
                  >
                    {message.status === "approved" ? (
                      <FiEye className="w-4 h-4" />
                    ) : (
                      <FiEyeOff className="w-4 h-4" />
                    )}
                  </button>

                  {/* Delete Button (no functionality) */}
                  <button
                    className="p-2.5 rounded-lg bg-zinc-800 text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition-all"
                    title="Delete message"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMessages.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p
                className="text-zinc-500 text-lg"
                style={{ fontFamily: "var(--font-saira)" }}
              >
                No messages found
              </p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 flex items-center justify-between text-zinc-500 text-sm">
          <p style={{ fontFamily: "var(--font-saira)" }}>
            Showing {filteredMessages.length} of {messages.length} messages
          </p>
          <p style={{ fontFamily: "var(--font-saira)" }}>
            {counts.approved} visible on public page
          </p>
        </div>
      </main>
    </div>
  );
}
