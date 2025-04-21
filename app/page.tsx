"use client";

import { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import { useComments } from './hooks/useComments';

// Sample video URL (can be replaced with upload functionality)
const SAMPLE_VIDEO_URL = "https://enabled-content-creation-toolkit-bucket.nyc3.cdn.digitaloceanspaces.com/Into%20The%20Spotlight%20-%20My%20Expat%20Life%20-%20MicroPod%20Episode%202.mp4 ";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekToTime, setSeekToTime] = useState<number | null>(null);
  const { comments, addComment, editComment, deleteComment } = useComments();
  
  // Function to handle seeking to a specific timestamp
  const handleSeek = (time: number) => {
    setSeekToTime(time);
    
    // Reset the seek value after it's been consumed
    setTimeout(() => {
      setSeekToTime(null);
    }, 100);
  };

  // Function to detect if video is playing or paused
  useEffect(() => {
    const videoElement = document.querySelector('video');
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    if (videoElement) {
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Podcast Review Platform</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              videoUrl={SAMPLE_VIDEO_URL} 
              onTimeUpdate={setCurrentTime} 
              seekToTime={seekToTime} 
            />
            
            <div className="mt-6">
              <CommentForm 
                isVideoPlaying={isPlaying} 
                currentTime={currentTime} 
                onAddComment={addComment} 
              />
            </div>
          </div>
          
          {/* Comments Column */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <CommentList 
              comments={comments} 
              onEdit={editComment} 
              onDelete={deleteComment} 
              onSeek={handleSeek} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
