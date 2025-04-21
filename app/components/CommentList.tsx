"use client";

import { useSortedComments } from '../store/hooks';
import CommentItem from './CommentItem';

interface CommentListProps {
  onSeek: (time: number) => void;
}

export default function CommentList({ onSeek }: CommentListProps) {
  // Get sorted comments from our custom hook
  const sortedComments = useSortedComments();
  
  return (
    <div className="max-h-[300px] sm:max-h-[400px] md:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
      {sortedComments.length === 0 ? (
        <div className="text-center py-4 sm:py-8 text-gray-500 text-sm sm:text-base">
          No comments yet. Pause the video and add a comment.
        </div>
      ) : (
        sortedComments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onSeek={onSeek}
          />
        ))
      )}
    </div>
  );
} 