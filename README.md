# Video Framer - Podcast Review Platform

A prototype web application for podcast agencies that allows users to review audio/video content and leave timestamped feedback.

## Features

- Load and play MP4 audio/video files
- Pause at any moment to add comments tied to specific timestamps
- View all comments alongside the player with timestamps
- Edit and delete comments
- Click on comments to jump to that time in the player
- Comments are persisted using localStorage
- Fully responsive design for mobile, tablet, and desktop
- Export comments as JSON for sharing or backup
- Import comments from previously exported JSON files
- Global state management with Jotai and custom hooks

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Jotai for global atomic state with custom React hooks
- **Storage**: localStorage for persistence
- **Validation**: Zod for schema validation and data parsing

## Project Structure

```
video-framer/
├── app/                      # Next.js app directory
│   ├── components/           # UI components
│   │   ├── CommentForm.tsx   # Form for adding new comments
│   │   ├── CommentItem.tsx   # Individual comment display
│   │   ├── CommentList.tsx   # List of all comments
│   │   ├── ExportButton.tsx  # Button to export comments as JSON
│   │   ├── ImportButton.tsx  # Button to import comments from JSON
│   │   └── VideoPlayer.tsx   # Video player component
│   ├── store/                # State management
│   │   ├── atoms.ts          # Jotai atoms for state
│   │   └── hooks.ts          # Custom hooks for state operations
│   ├── types.ts              # TypeScript interfaces
│   ├── schemas.ts            # Zod validation schemas
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # App layout component
│   └── page.tsx              # Main page component
├── public/                   # Static assets
├── next.config.mjs           # Next.js configuration
├── package.json              # NPM dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

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

The application uses a combination of Jotai and custom hooks for state management:

- **Jotai atoms**: Core state is managed with Jotai atoms for video playback and comments
- **Custom hooks**: Business logic is encapsulated in custom hooks that provide clean interfaces
- **Separation of concerns**: State is separated from actions for better organization
- **Atomic updates**: Only components that depend on specific state pieces re-render
- **Reduced boilerplate**: Simpler than Redux with less code
- **Persistence**: Seamless integration with localStorage for offline data

Key hooks include:
- `useCommentActions`: Manages adding, editing, deleting and importing comments
- `useVideoState`: Handles video playback state and seeking
- `useSortedComments`: Provides comments sorted by timestamp

This approach makes the codebase more maintainable, easier to test, and provides better performance through encapsulation and targeted re-rendering.

### Tradeoffs & Future Improvements

With more time, the following improvements could be implemented:

1. **Backend Integration**: Implement a proper backend for more robust data persistence
2. **Firebase Integration**: As mentioned in bonus features, connect to Firebase for real-time updates
3. **User Authentication**: Add user roles (Reviewer vs. Admin) for different permissions
4. **File Upload**: Implement actual file upload functionality rather than using a sample URL
5. **Playback Controls**: Add more sophisticated video controls and keyboard shortcuts

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

### Future Improvements

If I had more time to enhance this application, I would implement:

- **Firebase Authentication** for secure user management
- **Firestore Database Integration** with models for:
  * Users
  * Videos
  * Comments
- **Server Components** for optimized Comments CRUD operations

### Architecture Decisions

For this client-focused prototype, I carefully selected these technologies:

* **Next.js with TypeScript and Tailwind CSS** - Providing type safety, component reusability, and responsive design
* **Jotai for State Management** - Offering atomic state updates with custom React hooks
* **Zod** - Ensuring runtime type safety and data validation
* **localStorage** - Enabling client-side persistence without backend dependencies

Jotai was specifically chosen for its:
* Granular reactivity through atomic state management
* Zero configuration with no context providers required
* Seamless integration with browser storage solutions

### Enhancement Roadmap

1. **Video Library Integration** - Connect with Firebase to enable multiple video selection
2. **Role-Based Access Control** - Implement admin and reviewer roles where:
   - Admins can assign videos to specific reviewers
   - Reviewers can add timestamped comments to their assigned videos
3. **Visual Comment Enhancement** - Add screenshot capture functionality to comments
4. **Social Sharing** - Enable comment sharing across social media platforms