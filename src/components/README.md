# Components

This directory contains reusable UI components used throughout the application.

## Directory Structure

-   `ui/`: Contains primitive UI components built with [shadcn/ui](https://ui.shadcn.com/). These are the building blocks of the application design system.
    -   Buttons, Inputs, Dialogs, Toasts, etc.

## Key Components

### `AppHeader`
The main navigation header, containing the logo, theme toggle, and bookmarks view toggle.

### `HeroSection`
The top section of the home page, featuring the title, description, and the main search bar.

### `QuickFilterBar`
A sticky bar below the hero section providing quick access to filter by category, type, difficulty, and free/paid status.

### `ResourceCard`
A card component displaying individual resource details, including title, description, tags, provider, rating, and bookmark/completion status.

### `StatsBar`
Displays aggregate statistics about the resources (Total resources, categories, free resources, etc.).

### `Glossary` related
-   `KeyTermsSection`: A section highlighting key technical terms.
-   `FeaturedSection`: Highlights featured or popular resources.

### `LearningPathsSection`
Displays curated learning paths for structured learning.

### `ProgressTracker`
Visualizes the user's progress through completed resources.

### `SocialLinksSection`
Links to social media and external profiles.

## Usage

Components are designed to be modular and composable. Most components accept props for customization and data injection.
