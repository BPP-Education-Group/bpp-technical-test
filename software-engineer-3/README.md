# Technical Challenge

## Application Overview

This simple [Next.js](https://nextjs.org/) application allows a user to Register a Student onto a Course.

The Courses and Registrations are persisted in a SQLite database managed by [Prisma](https://www.prisma.io/), which is an open source ORM.

## Getting Setup

### Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prisma Studio

You can use Prisma Studio to view and modify the database, by running:

```bash
npm prisma studio
# or
yarn prisma studio
```

Then, open [http://localhost:5555](http://localhost:5555) with your browser to see the result.

### User Stories

## Story 1 - Registration Validation

Students cannot be Registered onto a Classroom Course if the limit has been reached and a suitable Error message should be displayed.

Criteria:

- Update the register api (`software-engineer-3/pages/api/register.ts`) to check capacity of the Course and return an appropriate error message if the Course is full
- Update the home page (`software-engineer-3/pages/index.tsx`) to display the error message if the Course is full

## Story 2 - Showing Refreshed Registrations

Once Registered, the Registrations panel should immediately display the updated registration list.

Criteria:

- Update the home page (`software-engineer-3/pages/index.tsx`) to support functionality
