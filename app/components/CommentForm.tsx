"use client";

import { useState, FormEvent } from 'react';

interface CommentFormProps {
  isVideoPlaying: boolean;
  currentTime: number;
  onAddComment: (text: string, timestamp: number) => void;
}

export default function CommentForm({ isVideoPlaying, currentTime, onAddComment }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText, currentTime);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center mb-3">
        <span className="text-sm font-semibold text-gray-900">
          Current Timestamp: {formatTimestamp(currentTime)}
        </span>
        <span className="ml-2 text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">
          {isVideoPlaying ? 'Playing' : 'Paused'}
        </span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add your comment here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          disabled={isVideoPlaying}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isVideoPlaying || !commentText.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
} 