# Agent Guidelines for SuperM E-commerce App

## Tech Stack
- React 19, Vite, Supabase, TanStack Query, React Router 7
- Server: Node.js with Express (server.jsx)
- State: Context API + localStorage, no Redux/Zustand

## Commands
- **Dev**: `npm run dev` (Vite dev server)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint + React rules)
- **Preview**: `npm run preview` (preview build)
- **No tests** - use lint for code quality

## Code Style
- **Components**: Functional with hooks, PascalCase (e.g., `ProductDetails.jsx`)
- **Functions**: camelCase (e.g., `handleAddProduct`)
- **CSS**: kebab-case classes (e.g., `product-image`)
- **Imports**: Group by React/Router → icons → local components/context
- **JSX**: Runtime enabled, no prop-types (TypeScript types preferred)

## Patterns
- **State**: Context API with localStorage persistence, spread operator for updates
- **Error Handling**: `useFormValidation` hook, safe string comparisons with `String()`
- **Data Fetching**: TanStack Query for server state
- **Forms**: React Hook Form pattern with validation
- **Styling**: CSS modules/classes, responsive design

## ESLint Rules
- React Compiler: error level (avoid unnecessary re-renders)
- React hooks: recommended rules enforced
- JSX runtime: enabled, prop-types: disabled