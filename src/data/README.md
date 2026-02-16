# Data

This directory contains static data used by the application. This is where the content for resources, glossary terms, and learning paths is defined.

## Files

### `resources.ts`
The core dataset containing all learning resources.

**Structure:**
-   `resources`: An array of `Resource` objects.
-   `categories`: List of available categories (e.g., "AI & Machine Learning", "Web Development").
-   `resourceTypes`: List of resource types (e.g., "course", "github", "youtube").

**Type Definition (`Resource`):**
-   `id`: Unique identifier (string).
-   `title`: Resource title (string).
-   `description`: Brief description (string).
-   `url`: Link to the resource (string).
-   `type`: Type of resource (ResourceType).
-   `category`: Category of resource (Category).
-   `provider`: Provider name (string).
-   `tags`: Array of relevant tags (string[]).
-   `isFree`: Boolean indicating if the resource is free.
-   `difficulty`: Difficulty level (Beginner, Intermediate, Advanced).
-   `rating`: Optional rating (number).

### `glossary.ts`
Contains the glossary terms and definitions.

**Structure:**
-   `glossaryTerms`: An array of objects with `term`, `definition`, and `category`.
-   `glossaryCategories`: Categories specific to glossary terms.

### `cyberGlossary.ts`
Specific glossary terms related to cybersecurity.

### `learningPaths.ts`
Definitions for structured learning paths, referencing resource IDs from `resources.ts`.

## Contributing

To add a new resource:
1.  Open `resources.ts`.
2.  Add a new object to the `resources` array following the `Resource` type structure.
3.  Ensure the `id` is unique.
