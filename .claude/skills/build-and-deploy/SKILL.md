---
name: build-and-deploy
description: Build and deploy this Next.js application with PostgreSQL database. Use when building, deploying, setting up database, or preparing the project for production. Triggers on requests to build, deploy, seed database, or publish.
---

# Build and Deploy Natural Language Postgres

## Overview

Build and deploy the natural language PostgreSQL query application. This Next.js project provides an AI-powered natural language interface to query and visualize PostgreSQL data.

## Environment Variables

All required environment variables are pre-configured in CCVM and available directly:
- `OPENAI_API_KEY` - OpenAI API key for natural language processing
- `POSTGRES_URL` - PostgreSQL connection string
- `POSTGRES_PRISMA_URL` - Prisma accelerate connection (optional)
- `VERCEL_TOKEN` - For Vercel CLI authentication
- `NETLIFY_AUTH_TOKEN` - For Netlify CLI authentication

## Workflow

### 1. Setup Environment Variables

```bash
cp .env.example .env
```

Then populate `.env` with values from environment:
- `OPENAI_API_KEY` - Available as `$OPENAI_API_KEY` in VM environment
- `POSTGRES_URL` - Available as `$POSTGRES_URL` in VM environment

Example:
```bash
cat > .env << EOF
OPENAI_API_KEY="${OPENAI_API_KEY}"
POSTGRES_URL="${POSTGRES_URL}"
POSTGRES_PRISMA_URL="${POSTGRES_PRISMA_URL:-}"
EOF
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Seed Database

```bash
pnpm run seed
```

**Critical:** Must run after database provisioning. Seeds database with unicorn companies data from `unicorns.csv` (~1000+ records).

**Database Schema:**
- Single table: `unicorns`
- Contains: company, valuation, date_joined, country, city, industry, investors

### 4. Build

```bash
pnpm run build
```

### 5. Deploy

**Vercel:**
```bash
vercel deploy --prod --yes
```

**Netlify:**
```bash
# First deployment
netlify deploy --prod --create-site

# Subsequent deployments
netlify deploy --prod
```

## Database Setup

If database not yet provisioned:

```bash
# Create Vercel Postgres database
vercel postgres create

# Ensure POSTGRES_URL is set in environment
```

## Critical Notes

- **Seed Required:** Must run `pnpm run seed` after database setup
- **Database:** PostgreSQL required (Vercel Postgres recommended)
- **AI Dependency:** Requires OpenAI API key for functionality
- **No Dev Server:** Never run `pnpm dev` in VM environment

## Features

- Natural language to SQL conversion using OpenAI GPT-4o
- Automatic data visualization with Recharts
- Query explanation and SQL display
- Interactive table and chart views
