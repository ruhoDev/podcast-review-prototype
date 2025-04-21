"use client";

import { useAtomValue, useAtom } from 'jotai';
import { commentsAtom, currentTimeAtom, isPlayingAtom, seekToTimeAtom, sortedCommentsAtom } from './atoms';
import { Comment } from '../types';

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export function useCommentActions() {
  const [comments, setComments] = useAtom(commentsAtom);
  
  const addComment = (text: string, timestamp: number) => {
    const newComment: Comment = {
      id: generateId(),
      text,
      timestamp,
      createdAt: new Date()
    };
    setComments([...comments, newComment]);
  };

  const editComment = (id: string, text: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const importComments = (importedComments: Comment[]) => {
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

export function useVideoState() {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [seekToTime, setSeekToTime] = useAtom(seekToTimeAtom);
  
  const handleSeek = (time: number) => {
    setSeekToTime(time);
    
    // Reset the seek value after it's been consumed
    setTimeout(() => {
      setSeekToTime(null);
    }, 100);
  };
  
  return {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    seekToTime,
    handleSeek
  };
}

export function useSortedComments() {
  return useAtomValue(sortedCommentsAtom);
} 