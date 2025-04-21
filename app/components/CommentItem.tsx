"use client";

import { useState } from 'react';
import { Comment } from '../types';

interface CommentItemProps {
  comment: Comment;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onSeek: (time: number) => void;
}

export default function CommentItem({ comment, onEdit, onDelete, onSeek }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <button 
          onClick={() => onSeek(comment.timestamp)}
          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium hover:bg-blue-200 transition"
        >
          {formatTimestamp(comment.timestamp)}
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-gray-500 hover:text-blue-600"
            disabled={isEditing}
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(comment.id)} 
            className="text-gray-500 hover:text-red-600"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button 
              onClick={handleCancelEdit}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveEdit}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <pre className="text-gray-700 whitespace-pre-wrap font-sans">{comment.text}</pre>
      )}
    </div>
  );
} 