# Hooks

This directory contains custom React hooks used across the application for managing state and side effects.

## `useBookmarks.ts`
Manages the user's bookmarked resources.
-   Persists bookmarks to `localStorage`.
-   Provides `toggleBookmark`, `isBookmarked`, and `bookmarkCount` helpers.

## `useProgress.ts`
Tracks the user's progress through resources (completed items).
-   Persists completion status to `localStorage`.
-   Calculates completion percentage for learning paths.
-   Provides `toggleCompleted`, `isCompleted`, and `getPathProgress` helpers.

## `useTheme.ts`
Manages the application's theme (light/dark mode).
-   Persists theme preference to `localStorage`.
-   Applies the theme class to the `document.documentElement`.
-   Provides `toggleTheme` and current `theme` state.

## `use-mobile.tsx`
Detects if the application is running on a mobile device (viewport width < 768px).
-   Returns `isMobile` boolean.

## `use-toast.ts`
Provides a simple toast notification system.
-   Used for displaying success/error messages (e.g., "Resource bookmarked").
