# Lib

This directory contains utility functions and shared library code.

## Files

### `utils.ts`
Contains helper functions used throughout the application.

**Key functions:**
-   `cn(...)`: Combines class names using `clsx` and merges Tailwind classes with `tailwind-merge`. This is standard for shadcn/ui components to allow className overrides.
-   `formatDate(date: Date)`: Formats dates consistently.
-   `slugify(text: string)`: Creates URL-friendly slugs from strings.

## Third-party Integrations

This folder may also house configuration or wrappers for external libraries if needed in the future (e.g., API clients, analytics).
