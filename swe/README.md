# Technical Challenge

## Application Overview

This simple [Next.js](https://nextjs.org/) application allows a user to Register a Student onto a Course.

The Courses and Registrations are persisted in a SQLite database managed by [Prisma](https://www.prisma.io/), which is an open source ORM.

The Registration-Form component uses react-hook-form package, and tests are written using Jest.

## Getting Setup

### Install Packages

Firstly, install the Node Packages

```bash
npm install
# or
yarn
```

### Development Server

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prisma Studio

You can use Prisma Studio to view and modify the database directly, by running:

```bash
npx prisma studio
# or
yarn prisma studio
```

Then, open [http://localhost:5555](http://localhost:5555) with your browser launch Prisma Studio.

# User Stories

## Story 1: Update the Registered Total

1. Upon creating a Registration, the "registered" total of the Course being registered for should be increased by 1.

## Story 2: Registration Validation

1. Students cannot be Registered onto a **Classroom** Course if the registered count exceeds the Course capacity.
2. Students can be Registered onto an **Online** Course as many times as desired (-1 denotes unlimited).
3. Multiple registrations using the same Email for a particular Course are not allowed.
4. A suitable Error message should be displayed to the User on the Registration Form if any of the above validations fail. Use react-hook-form to achieve this.
5. To enable users to make another registration without refreshing the page when an Error is displayed, a new button should be included to Reset/Clear the form state.

## Story 3: Page Rendering

1. Once Registered, the Registrations component should immediately re-render to show the Registered Student.
2. Once Registered, the Courses component should immediately re-render with an updated registered total.
