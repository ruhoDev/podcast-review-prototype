"use client";

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate: (currentTime: number) => void;
  seekToTime: number | null;
}

export default function VideoPlayer({ videoUrl, onTimeUpdate, seekToTime }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (seekToTime !== null && videoRef.current) {
      videoRef.current.currentTime = seekToTime;
    }
  }, [seekToTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-md">
      <video
        ref={videoRef}
        className="w-full max-h-[80vh] object-contain"
        controls
        onTimeUpdate={handleTimeUpdate}
        controlsList="nodownload"
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 