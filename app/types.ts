export interface Comment {
  id: string;
  timestamp: number;
  text: string;
  createdAt: Date;
} 

export interface ParsedComment {
  id: string;
  timestamp: number;
  text: string;
  createdAt: string;
}

