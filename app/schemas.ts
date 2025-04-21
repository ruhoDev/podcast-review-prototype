import { z } from 'zod';
import { Comment } from './types';

// Schema for parsed comments (comments coming from JSON)
export const parsedCommentSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  text: z.string(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format in createdAt field"
  })
});

// Schema for an array of parsed comments
export const parsedCommentsArraySchema = z.array(parsedCommentSchema);

// Helper function to validate and transform JSON data to Comment objects
export function validateAndTransformComments(data: unknown): Comment[] {
  // Validate the data against our schema
  const validatedData = parsedCommentsArraySchema.parse(data);
  
  // Transform string dates to Date objects
  return validatedData.map(comment => ({
    ...comment,
    createdAt: new Date(comment.createdAt)
  }));
} 