# Software Architecture Document Overview

This project is a modern full-stack web application starter built with Next.js, designed for rapid development of SaaS and web products. It integrates best-in-class services for authentication, database, storage, payments, email, and AI, with a focus on developer experience, scalability, and maintainability.

# Technology Stack

## Frontend

- **Framework:** Next.js (App Router, SSR/SSG, API routes)  
- **UI Library:** Shadcn/UI (customizable React components)  
- **Styling:** TailwindCSS, tailwindcss-animate, class-variance-authority, clsx  
- **Icons:** Lucide React, Heroicons  
- **Theming:** next-themes  
- **Markdown:** react-markdown

## Backend & Data

- **Database:** Convex (cloud database, schema, backend logic in `/convex/`)  
- **API:** Next.js API routes (`/app/api/`)  
- **Business Logic:** Modularized in `/lib/services/` and `/convex/`

## Authentication & Authorization

- **Provider:** Clerk (OAuth, user management, admin roles via env vars)  
- **Integration:** Clerk SDKs for backend and Next.js

## Storage & File Handling

- **Provider:** AWS S3 (file storage, flat file DB)  
- **CDN:** AWS CloudFront (recommended for image delivery)

## Email & Communication

- **Provider:** SendGrid (transactional email, contact forms)  
- **Integration:** Environment variables for API keys

## Payments

- **Provider:** Stripe (checkout, payment processing)  
- **Integration:** Stripe JS and React SDKs

## AI & Generative Features

- **SDKs:** ai-sdk (OpenAI, Replicate, etc.)  
- **Hooks:** useGenerateText, useGenerateImage, useGenerateObject, useGenerateStrings

## Testing & Quality

- **E2E Testing:** Playwright (UI mode, headless, CI integration)  
- **Linting:** ESLint, Prettier

## Utilities & Tooling

- **Date Handling:** date-fns  
- **UUIDs:** uuid  
- **Validation:** zod  
- **Misc:** lodash-es, slugify, sonner (notifications), ignore

# Project Structure & Conventions

- **Directory Structure:** Modular, feature-based (see `/app/`, `/components/`, `/convex/`, `/lib/`, `/types/`, `/public/`)  
- **Naming:** Kebab-case for files, feature-based directories, max 300 lines per file  
- **Config:** Environment variables for all integrations, `.env` file required

# DevOps & Deployment

- **Scripts:** pnpm for package management, scripts for dev, build, test, codegen, and deployment  
- **Deployment:** Environment variables must be set for production

