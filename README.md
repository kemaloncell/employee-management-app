# Employee Management System

A modern employee management application built with vanilla Web Components and LitElement. This project demonstrates component-based architecture, state management patterns, and comprehensive testing practices.

## Overview

The goal was to create a maintainable, testable, and scalable employee management system using native web standards rather than relying on heavy frameworks like React or Vue. I focused on building reusable components, implementing a clean state management pattern, and ensuring the application works flawlessly across different screen sizes.

## Tech Stack & Rationale

### Core Technologies

**LitElement** - LitElement over other frameworks for several reasons:
- Lightweight 5KB with minimal runtime overhead
- Built on Web Components standard, ensuring future compatibility
- Simple reactive property system
- No virtual DOM complexity

**Vaadin Router** - A lightweight client-side router that works seamlessly with Web Components. It provides:
- Declarative route configuration
- Lifecycle hooks for route transitions
- Built-in lazy loading support

**Web Test Runner** - Modern testing tool that runs tests in real browsers:
- Fast test execution with Playwright
- Coverage reporting out of the box
- No browser mocking - tests run in actual browser environments

## Architecture

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── form-input.js
│   ├── form-select.js
│   ├── action-buttons.js
│   ├── app-pagination.js
│   ├── confirm-dialog.js
│   └── page-header.js
├── pages/           # Page-level components
│   ├── employee-list-page.js
│   └── employee-form-page.js
├── store/           # Centralized state management
│   ├── store.js
│   └── actions.js
├── router/          # Route configuration
├── locales/         # i18n translations
├── styles/          # Shared CSS-in-JS styles
├── utils/           # Helper functions & formatters
└── constants/       # App-wide constants
```

### State Management

I implemented a simple publish-subscribe pattern for state management instead of using a library like Redux. The store provides:

```javascript
// Centralized state with localStorage persistence
const store = {
  getState,      // Returns current state snapshot
  setState,      // Updates state and notifies subscribers
  subscribe      // Components subscribe to state changes
}
```

**Why this approach?**
- Lightweight - 60 lines of code vs thousands in Redux
- Sufficient for this scale - managing employees, view mode, and language
- Built-in persistence through localStorage
- Easy to test and reason about

Components subscribe to store changes in their lifecycle:

```javascript
constructor() {
  this.unsubscribe = store.subscribe((state) => {
    this.employees = state.employees;
    this.requestUpdate();
  });
}

disconnectedCallback() {
  this.unsubscribe(); // Prevent memory leaks
}
```

### Component Design

I focused on creating small, focused components with clear responsibilities:

#### Form Components

**form-input** & **form-select**
- Emit custom events for form interactions
- Handle their own validation display
- Support error states and helper text

```javascript
// Components dispatch custom events instead of callbacks
this.dispatchEvent(new CustomEvent('input-change', {
  detail: { name: this.name, value: e.target.value },
  bubbles: true,
  composed: true
}));
```

**Why custom events?** They work across shadow boundaries and keep components decoupled from parent implementations.

#### UI Components

**action-buttons** - Reusable button group with two modes:
- `icon-only` - Used in table view for compact layout
- `icon-text` - Used in list view for better mobile UX

**app-pagination** - Smart pagination component:
- Calculates visible page range automatically
- Handles edge cases (first/last page)
- Emits page change events

**confirm-dialog** - Modal confirmation:
- Prevents accidental deletions
- Accessible with proper focus management
- Flexible content through props

**page-header** - Composite component combining:
- Title display
- Search functionality
- View mode toggle (table/list)

This component demonstrates composition - it manages multiple features but delegates rendering to the parent.

### Pages

**employee-list-page**
- Manages pagination state locally
- Filters employees based on search
- Switches between table and list views
- Handles delete confirmations

**employee-form-page**
- Form state management
- Field-level validation
- Edit mode vs create mode
- Integration with router for navigation

## Features Implementation

### Multi-language Support

I implemented a simple i18n system:
- Translation files for Turkish and English
- `t()` function with parameter interpolation
- Language state persisted to localStorage
- Components re-render on language change

```javascript
// Translation with parameters
t('confirmations.deleteMessage', {
  name: `${employee.firstName} ${employee.lastName}`
})
```

### Responsive Design

Mobile-first approach with breakpoints:
- **Desktop (1024px+)**: Table view with full information
- **Tablet (768px)**: Adjusted table with horizontal scroll
- **Mobile (480px)**: List view recommended, stacked layout

The table view uses CSS overflow while list view restructures the layout completely.

### Form Validation

Validation strategy:
- Client-side validation with HTML5 constraints
- Custom validators for complex rules (phone, email format)
- Field-level errors shown on blur
- Form-level validation on submit
- Disabled submit button until form is valid

### Data Persistence

All data persists to localStorage automatically:
- Employee records
- User preferences (language, view mode)
- Survives page refreshes
- Error handling for quota exceeded

## Development Decisions

### CSS-in-JS with Lit

I used Lit's CSS approach for several reasons:
- Automatic style scoping
- Co-located with components
- Type checking for CSS custom properties
- Shared styles through CSS module imports

```javascript
export const buttonStyles = css`
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-white);
  }
`;
```

### No Build Step Required

While I use a dev server, the app could run without any build step:
- ES modules work natively in browsers
- No JSX transformation needed
- No complex webpack configuration

### Testing Strategy

Achieved 96%+ coverage through:
- Unit tests for utilities and formatters
- Component tests with real DOM
- User interaction testing
- Form validation scenarios
- Store subscription patterns

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode during development
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run serve
```

Visit `http://localhost:8000`

### Production Build

```bash
npm run serve:prod
```

### Running Tests

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:prod       # Production mode tests
```