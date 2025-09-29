# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development Environment

- `npm run dev` - Starts both JSON Server (port 3001) and Next.js (port 3000) with smart port cleanup
- `npm run dev:legacy` - Alternative start method using concurrently
- `npm run json-server` - Starts only JSON Server on port 3001
- `npm run dev:with-api` - Alias for concurrent startup

### Code Quality & Testing

- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking without compilation
- `npm run prettier` - Format code with Prettier
- `npm run prettier:check` - Check code formatting
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Production

- `npm run build` - Build for production
- `npm run start` - Start production server

## Architecture Overview

### Dual Backend System

This application supports two backend environments:

1. **JSON Server** (Default for development)
   - Mock API running on port 3001
   - Uses `/db.json` for data storage
   - Configured in `src/services/jsonServerService.js`

2. **Neon Database + Arktos Backend** (Production)
   - Real backend service
   - Configured in `src/services/vercelApiService.js`

### State Management Architecture

- **Context API** for global state management (no Redux)
- **AuthContext**: User authentication and profile data
- **CartContext**: Shopping cart with localStorage persistence (works for guest users)
- **WishlistContext**: Wishlist management (requires authentication)
- **ListsContext**: Custom product lists functionality
- **CookieConsentContext**: GDPR cookie consent management
- **ToastContext**: Global toast notifications

### Authentication System

- **Cookie-based authentication** using `auth-token` cookie
- **Middleware protection** in `src/middleware.js` for protected routes
- **Base64 encoded tokens** with expiry validation
- **Automatic token cleanup** for invalid/expired tokens
- **Route guards**: `/profile/*` routes require authentication

### API Service Layer

- **Environment-aware routing**: `src/services/apiService.js` switches between backends
- **Abstracted API calls**: Common interface regardless of backend
- **Hook-based consumption**: `src/hooks/useApiService.js` for components

### Component Architecture

- **App Router**: Next.js 15 app directory structure
- **Server/Client Components**: Proper SSR/hydration patterns
- **Layout Components**: Reusable navigation, footer, mobile bottom nav
- **Core Components**: Radix UI-based design system in `/src/components/core/`
- **E-commerce Components**: Business logic components in `/src/components/ecommerce/`

### Responsive Design Strategy

- **Mobile-first approach** with breakpoints for all devices
- **Galaxy Fold 4 support** (280px width minimum)
- **Tailwind CSS** with custom responsive utilities
- **Progressive enhancement** patterns

## Key File Locations

### API Configuration

- `src/services/apiService.js` - Main API service selector
- `src/services/jsonServerService.js` - JSON Server configuration
- `src/services/vercelApiService.js` - Production backend configuration
- `api/server.js` - JSON Server setup for Vercel deployment

### Authentication & Middleware

- `src/middleware.js` - Route protection and token validation
- `src/app/api/auth/` - Authentication API routes
- `src/contexts/AuthContext.jsx` - Auth state management

### Smart Development Setup

- `scripts/dev-start.js` - Intelligent development server startup with port management
- Automatically kills existing processes on ports 3000/3001
- Updates service configurations with correct ports
- Handles graceful server startup and shutdown

## Special Routes & Features

### Hidden Admin Interface

- **Purpose**: Switch between JSON Server and Neon DB backends
- **Access**: Requires authentication, direct URL access only
- **Security**: Should be admin-only in production

### Protected Routes

All routes under `/profile/*` require authentication and will redirect to `/login` with return URL.

### API Endpoints (JSON Server)

- `GET /products` - All products
- `GET /products?category=:category` - Filter by category
- `GET /featuredProducts` - Featured products
- `GET /bestSellers` - Best selling products
- `GET /dailyDeals` - Daily deals with discount info
- `GET /users` - User management
- `GET /orders` - Order management

## Development Notes

### Common Issues

- **JSON Syntax Error**: If you see "Unexpected token '<', \"<!DOCTYPE \"..." this means the frontend is receiving HTML instead of JSON from the API. Check that JSON Server is running on port 3001.
- **Port Conflicts**: The dev-start script handles this automatically, but manual port cleanup may be needed: `lsof -ti:3000,3001 | xargs kill -9`

### E-commerce Business Logic

- **Guest Cart**: Shopping cart works without authentication using localStorage
- **Authenticated Wishlist**: Wishlist requires user login
- **Order Flow**: Checkout process requires authentication
- **Product Categories**: Dynamic category filtering via query parameters

### Data Flow Patterns

- **Server Components**: For SEO and initial page loads
- **Client Components**: For interactive features and state management
- **Loading States**: Skeleton components for better UX during data fetching
- **Error Boundaries**: Graceful error handling throughout the app

### Security Considerations

- **Token expiration**: Automatic cleanup of expired authentication tokens
- **Route protection**: Middleware-based access control
- **Input validation**: Form validation using react-hook-form + zod
- **XSS prevention**: Proper data sanitization in components
