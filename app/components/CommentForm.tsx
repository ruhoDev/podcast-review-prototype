"use client";

import { useState, FormEvent } from 'react';
import { useCommentActions } from '../store/hooks';

interface CommentFormProps {
  isVideoPlaying: boolean;
  currentTime: number;
}

export default function CommentForm({ isVideoPlaying, currentTime }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const { addComment } = useCommentActions();

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(commentText, currentTime);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 mb-3 sm:mb-4">
      <div className="flex flex-wrap items-center mb-2 sm:mb-3 gap-2">
        <span className="text-xs sm:text-sm font-semibold text-gray-900">
          Current Timestamp: {formatTimestamp(currentTime)}
        </span>
        <span className="text-xs sm:text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">
          {isVideoPlaying ? 'Playing' : 'Paused'}
        </span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add your comment here..."
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          rows={3}
          disabled={isVideoPlaying}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isVideoPlaying || !commentText.trim()}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
} 