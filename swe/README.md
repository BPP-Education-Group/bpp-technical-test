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
npx prisma studio
# or
yarn prisma studio
```

Then, open [http://localhost:5555](http://localhost:5555) with your browser to see the result.

# User Stories

## Story 1 - Registration Validation

### Acceptance Criteria

1. Students cannot be Registered onto a Classroom Course if the limit has been reached and a suitable Error message should be displayed
2. Students can be Registered onto an Online Course as many times as desired
3. A Registration with the same Email cannot happen for the same Course more than once

### Non-functional Criteria

1. Unit tests should be written where appropriate

## Story 2 - Page Rendering

### Acceptance Criteria

1. Once Registered, the Registrations panel should immediately re-render to show the Registered Student
2. Once Registered, the Course should immediately re-render with an updated Registrations count
