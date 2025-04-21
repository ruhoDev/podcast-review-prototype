"use client";

import { useState, useEffect } from 'react';
import { Comment, ParsedComment } from '../types';

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  // Load comments from localStorage on initial render
  useEffect(() => {
    const savedComments = localStorage.getItem('video-framer-comments');
    if (savedComments) {
      try {
        // Parse the saved comments and convert string dates back to Date objects
        const parsedComments = JSON.parse(savedComments).map((comment: ParsedComment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt)
        }));
        setComments(parsedComments);
      } catch (error) {
        console.error('Error loading comments from localStorage:', error);
      }
    }
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('video-framer-comments', JSON.stringify(comments));
  }, [comments]);

  // Add a new comment
  const addComment = (text: string, timestamp: number) => {
    const newComment: Comment = {
      id: generateId(),
      text,
      timestamp,
      createdAt: new Date()
    };
    setComments([...comments, newComment]);
  };

  // Edit an existing comment
  const editComment = (id: string, text: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  // Delete a comment
  const deleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  // Import comments from JSON
  const importComments = (importedComments: Comment[]) => {
    // Replace all current comments with the imported ones
    setComments(importedComments);
  };

  return {
    comments,
    addComment,
    editComment,
    deleteComment,
    importComments
  };
} 