"use client";

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Comment } from '../types';

// Primary atoms - core state
export const commentsAtom = atomWithStorage<Comment[]>('video-framer-comments', []);
export const currentTimeAtom = atom<number>(0);
export const isPlayingAtom = atom<boolean>(false);
export const seekToTimeAtom = atom<number | null>(null);

// Derived atom for sorted comments
export const sortedCommentsAtom = atom((get) => {
  const comments = get(commentsAtom);
  return [...comments].sort((a, b) => a.timestamp - b.timestamp);
}); 