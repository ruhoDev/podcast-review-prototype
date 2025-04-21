"use client";

import { useState } from 'react';
import { useCommentActions } from '../store/hooks';
import { Comment } from '../types';

interface CommentItemProps {
  comment: Comment;
  onSeek: (time: number) => void;
}

export default function CommentItem({ comment, onSeek }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  
  const { editComment, deleteComment } = useCommentActions();

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSaveEdit = () => {
    editComment(comment.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-2 sm:mb-3 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <button 
          onClick={() => onSeek(comment.timestamp)}
          className="bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-200 transition"
        >
          {formatTimestamp(comment.timestamp)}
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-gray-500 hover:text-blue-600 text-xs sm:text-sm"
            disabled={isEditing}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="text-gray-500 hover:text-red-600 text-xs sm:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            rows={3}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button 
              onClick={handleCancelEdit}
              className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveEdit}
              className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <pre className="text-gray-700 whitespace-pre-wrap font-sans text-xs sm:text-sm md:text-base">{comment.text}</pre>
      )}
    </div>
  );
} 