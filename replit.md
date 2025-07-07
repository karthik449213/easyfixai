# EssayFix - AI Essay Rewriter & Improver

## Overview

EssayFix is a modern web application designed to help students improve their academic writing using AI-powered essay rewriting capabilities. The application provides a clean, intuitive interface for users to input their essays and receive enhanced versions with different tones and styles.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **Theme Support**: Light/dark mode switching with persistent storage

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite middleware in development

### Key Design Decisions

1. **Monorepo Structure**: Organized with separate `client/`, `server/`, and `shared/` directories for clear separation of concerns
2. **Type Safety**: Full TypeScript implementation across frontend and backend with shared schema types
3. **Component Architecture**: Modular UI components using Radix UI primitives for accessibility
4. **Database-First**: Drizzle ORM with PostgreSQL for reliable data persistence
5. **Development Experience**: Integrated Vite development server with Express for seamless full-stack development

## Key Components

### Frontend Components
- **EssayFix Component**: Main application interface with essay input, tone selection, and results display
- **Theme Provider**: Global theme management with light/dark mode support
- **UI Components**: Comprehensive set of accessible components from shadcn/ui
- **Query Client**: Configured TanStack Query for API state management

### Backend Components
- **Route Handler**: Express router setup with API route registration
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Vite Integration**: Development server setup with HMR support
- **Error Handling**: Centralized error handling middleware

### Shared Components
- **Database Schema**: Drizzle schema definitions with Zod validation
- **Type Definitions**: Shared TypeScript interfaces and types

## Data Flow

1. **User Input**: User enters essay text and selects desired tone
2. **Frontend Processing**: React component handles form submission and state management
3. **API Communication**: TanStack Query manages API requests to backend
4. **Database Operations**: Drizzle ORM handles database interactions
5. **Response Handling**: Processed results returned to frontend for display
6. **State Updates**: UI updates reflect processing status and results

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Libraries**: Radix UI components, Lucide React icons
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS, Class Variance Authority
- **Form Handling**: React Hook Form with Zod resolvers
- **Utilities**: date-fns, clsx, cmdk

### Backend Dependencies
- **Web Framework**: Express.js with middleware support
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Session Management**: Express session with PostgreSQL store
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Development Dependencies
- **Build Tools**: Vite, TypeScript, ESBuild
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Code Quality**: TypeScript strict mode, path mapping

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Production Configuration
- **Environment Variables**: `DATABASE_URL` required for PostgreSQL connection
- **Static Assets**: Frontend assets served from `dist/public`
- **Process Management**: Node.js process serves both API and static content

### Development Workflow
- **Hot Reload**: Vite provides instant updates for frontend changes
- **TypeScript**: Continuous type checking with shared types
- **Database**: Local PostgreSQL instance with Drizzle migrations

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```