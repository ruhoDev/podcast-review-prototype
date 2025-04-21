"use client";

import { useCommentActions } from '../store/hooks';

export default function ExportButton() {
  const { comments } = useCommentActions();
  
  const handleExport = () => {
    // Prepare comments for export (convert Date objects to ISO strings)
    const exportData = comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString()
    }));
    
    // Create a JSON string with proper formatting
    const jsonStr = JSON.stringify(exportData, null, 2);
    
    // Create a blob from the JSON string
    const blob = new Blob([jsonStr], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element for downloading
    const a = document.createElement('a');
    a.href = url;
    a.download = `podcast-comments-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <button
      onClick={handleExport}
      disabled={comments.length === 0}
      className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-1" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Export JSON
    </button>
  );
} 