"use client";

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/Metanoia - Cleo+ (master 2.0).m4a");
      audio.loop = true;
      audio.currentTime = 18; // Start at 18 seconds
      audioRef.current = audio;

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      // If audio hasn't been started yet, set to 18 seconds
      if (audioRef.current.currentTime === 0 || audioRef.current.currentTime === 18) {
        audioRef.current.currentTime = 18;
      }
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute and resume playing
        audioRef.current.muted = false;
        audioRef.current.play().catch(console.error);
        setIsMuted(false);
      } else {
        // Mute and pause
        audioRef.current.muted = true;
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, play, pause, toggleMute, audioRef }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

