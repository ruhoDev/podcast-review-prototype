"use client";

import { useState, useRef } from 'react';
import { useCommentActions } from '../store/hooks';
import { Comment } from '../types';

export default function ImportButton() {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importComments } = useCommentActions();

  // Validate that the data has the correct structure for comments
  const validateComments = (data: any[]): boolean => {
    return data.every(item => 
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.text === 'string' &&
      typeof item.timestamp === 'number' &&
      typeof item.createdAt === 'string' && 
      !isNaN(Date.parse(item.createdAt))
    );
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        if (!Array.isArray(data)) {
          setError("Invalid format: Expected an array of comments");
          setTimeout(() => setError(null), 5000);
          return;
        }
        
        if (!validateComments(data)) {
          setError("Invalid format: Comments in the file are missing required fields");
          setTimeout(() => setError(null), 5000);
          return;
        }
        
        // Convert string dates back to Date objects
        const commentsWithDates = data.map(comment => ({
          ...comment,
          createdAt: new Date(comment.createdAt)
        }));
        
        importComments(commentsWithDates as Comment[]);
        
        // Reset the input
        if (fileInputRef.current) fileInputRef.current.value = '';
        
      } catch (err) {
        setError("Failed to parse JSON file");
        setTimeout(() => setError(null), 5000);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="relative">
      <input 
        type="file" 
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="hidden" 
      />
      <button
        onClick={handleImport}
        className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7-11.414V13a1 1 0 11-2 0V5.586L5.707 7.879a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414L10 5.586z" clipRule="evenodd" />
        </svg>
        Import JSON
      </button>
      
      {error && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-10">
          <p className="text-xs sm:text-sm">{error}</p>
        </div>
      )}
    </div>
  );
} 