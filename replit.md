# RenewAlert - Document Renewal Reminders

## Overview

RenewAlert is a document renewal reminder service designed primarily for expatriates in GCC countries. The application helps users track and manage important document renewals like passports, visas, IDs, and residency permits through timely notifications. Currently in development, it features an early access sign-up system with multi-language support and intelligent geolocation-based country detection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Component-based UI architecture using functional components and hooks
- **Wouter**: Lightweight client-side routing solution for single-page application navigation
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with pre-built component library
- **React Hook Form + Zod**: Form handling with schema validation for type-safe form management
- **TanStack Query**: Server state management for API interactions and caching
- **Multi-language Support**: Context-based internationalization supporting English, Arabic, and Hindi with RTL support

### Backend Architecture
- **Express.js**: Node.js web framework handling API routes and middleware
- **TypeScript**: Type-safe server-side development
- **Session-based Architecture**: Express sessions for admin authentication
- **Rate Limiting**: IP-based rate limiting for both signup and admin endpoints to prevent abuse
- **Middleware Pipeline**: Request logging, JSON parsing, and error handling middleware

### Data Storage
- **PostgreSQL**: Primary relational database for persistent data storage
- **Drizzle ORM**: Type-safe database schema definition and query building
- **Neon Database**: Serverless PostgreSQL provider with connection pooling
- **Database Schema**: Users table for admin accounts, phone_numbers table for signups with IP tracking and submission counts

### Security & Authentication
- **API Key Authentication**: Secure admin access using environment-based API keys with constant-time comparison
- **IP-based Abuse Prevention**: Tracking submission counts per IP address with configurable limits
- **Rate Limiting**: Multiple rate limiters for different endpoint types
- **Environment Variables**: Secure configuration management for sensitive data

### Analytics & Tracking
- **Google Analytics 4**: Comprehensive visitor analytics with custom event tracking
- **IP Geolocation**: Automatic country detection using external APIs with fallback mechanisms
- **User Behavior Tracking**: Form submissions, social sharing, and page navigation tracking

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with WebSocket support
- **Drizzle Kit**: Database migration and schema management tooling

### Analytics & Tracking
- **Google Analytics 4 (G-8MG9K676V5)**: Web analytics and user behavior tracking
- **IP Geolocation API (ipapi.co)**: Country detection based on user IP addresses

### Email Services
- **SendGrid**: Email delivery service for notifications and communications

### UI Component Libraries
- **Radix UI Primitives**: Unstyled, accessible UI components for complex interactions
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets including social media icons

### Development Tools
- **Vite**: Fast build tool and development server with HMR support
- **esbuild**: JavaScript bundler for production builds
- **TypeScript**: Static type checking and enhanced developer experience

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Replit Theme Plugin**: Dynamic theme configuration support

The application follows a modern full-stack architecture with emphasis on type safety, user experience, and scalability. The system is designed to handle high traffic through rate limiting and caching while providing a responsive, accessible interface for users across different languages and regions.