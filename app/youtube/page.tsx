"use client";

// Replace with the desired YouTube video ID (the part after "watch?v=").
const YOUTUBE_VIDEO_ID = "21s6Z8vOi1U";

export default function YouTube() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* 16:9 player at ~2/3 of the screen while preserving aspect ratio */}
      <div className="aspect-video h-auto w-2/3 max-h-[37.5vw] max-w-[118.52vh]">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
