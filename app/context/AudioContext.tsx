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

const START_TIME = 19;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasStartedRef = useRef(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/metanoia-cleo-master.m4a");
      audio.loop = true;
      audio.preload = "auto"; // Preload the audio file
      audioRef.current = audio;

      // Try to seek when metadata is loaded
      const handleLoadedMetadata = () => {
        if (!hasStartedRef.current) {
          audio.currentTime = START_TIME;
        }
      };

      // Also try when enough data is buffered to play
      const handleCanPlay = () => {
        if (!hasStartedRef.current && audio.currentTime < START_TIME) {
          audio.currentTime = START_TIME;
        }
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
      
      // Start loading immediately
      audio.load();
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
      const audio = audioRef.current;
      
      // Mark that playback has started
      hasStartedRef.current = true;
      
      // Force seek if we're before the start time
      if (audio.currentTime < START_TIME) {
        audio.currentTime = START_TIME;
      }
      
      // Use a small timeout to ensure seek takes effect
      setTimeout(() => {
        audio.play().catch(console.error);
      }, 50);
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
        audioRef.current.muted = false;
        audioRef.current.play().catch(console.error);
        setIsMuted(false);
      } else {
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
