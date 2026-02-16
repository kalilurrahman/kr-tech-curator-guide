# Testing

This directory contains test files and configuration.

## Files

### `setup.ts`
Configuration file for the test environment.
-   Imports `jest-dom` for enhanced assertions (e.g., `toBeInTheDocument`).
-   Configures the testing library.

### `example.test.ts`
A sample test file demonstrating how to write tests for this project.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

## Writing Tests

We use `vitest` for running tests and `react-testing-library` for testing React components.

**Example Test:**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TechCurator');
  });
});
```
