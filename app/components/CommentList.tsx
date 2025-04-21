"use client";

import { Comment } from '../types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onSeek: (time: number) => void;
}

export default function CommentList({ comments, onEdit, onDelete, onSeek }: CommentListProps) {
  // Sort comments by timestamp
  const sortedComments = [...comments].sort((a, b) => a.timestamp - b.timestamp);
  
  return (
    <div className="max-h-[500px] overflow-y-auto pr-2">
      {sortedComments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Pause the video and add a comment.
        </div>
      ) : (
        sortedComments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={onEdit}
            onDelete={onDelete}
            onSeek={onSeek}
          />
        ))
      )}
    </div>
  );
} 