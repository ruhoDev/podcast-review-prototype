# Video Framer - Podcast Review Platform

A prototype web application for podcast agencies that allows users to review audio/video content and leave timestamped feedback.

## Features

- Load and play MP4 audio/video files
- Pause at any moment to add comments tied to specific timestamps
- View all comments alongside the player with timestamps
- Edit and delete comments
- Click on comments to jump to their timestamp in the video
- Comments are persisted using localStorage
- Fully responsive design for mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks with custom hook for comments
- **Storage**: localStorage for persistence

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture & Thought Process

### Component Structure

The application is built with a component-based architecture:

- **VideoPlayer**: Handles video playback and timestamp tracking
- **CommentForm**: Allows users to add new comments at specific timestamps
- **CommentItem**: Individual comment display with edit/delete functionality
- **CommentList**: Renders all comments and handles sorting by timestamp

### State Management

- Custom `useComments` hook manages comment data and persistence
- State is maintained locally with React's `useState` and persisted with `localStorage`
- Component props for efficient data flow between related components

### Tradeoffs & Future Improvements

With more time, the following improvements could be implemented:

1. **Backend Integration**: Implement a proper backend for more robust data persistence
2. **Firebase Integration**: As mentioned in bonus features, connect to Firebase for real-time updates
3. **User Authentication**: Add user roles (Reviewer vs. Admin) for different permissions
4. **File Upload**: Implement actual file upload functionality rather than using a sample URL
5. **Playback Controls**: Add more sophisticated video controls and keyboard shortcuts
6. **Mobile Optimization**: Enhance the responsive design for better mobile experience
7. **Export Functionality**: Add ability to export feedback as JSON or CSV files
8. **Comment Categories**: Allow categorizing comments (e.g., technical, content, etc.)

## Development Process

The development process focused on:

1. Setting up the Next.js project with TypeScript and Tailwind CSS
2. Building core components with clear responsibilities
3. Implementing the comment system with timestamp synchronization
4. Adding data persistence with localStorage
5. Enhancing the UI for better user experience
6. Testing and ensuring cross-browser compatibility

### Mobile Responsiveness

The application is fully responsive across different device sizes:

- Adapts layout for mobile, tablet, and desktop screens
- Responsive typography that scales with screen size
- Touch-friendly buttons and controls
- Optimized video player for mobile viewing
- Stacked layout on smaller screens for better readability
