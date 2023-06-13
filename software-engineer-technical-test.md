# Software Engineer Technical Test

Welcome to BPP's Technical Test for Engineering!

## Course Management System**  
You have been tasked with building a Course Management System using Node.js and React. The system should allow users to view and enrol in available courses. Additionally, users should be able to see their enrolled courses and manage their enrolment.  

### Task 1  - Backend
-   Create a backend API using Node.js that provides the following endpoints:`/courses`  - GET request to fetch a list of available courses.
-   `/courses/:id`  - GET request to retrieve detailed information about a specific course.
-   `/enrollments`  - GET request to retrieve a list of a user's enrolled courses.
-   `/enrollments`  - POST request to enroll a user in a course.
-   `/enrollments/:id`  - DELETE request to remove a user's enrolment from a course.

#### Requirements
1.  Implement the API endpoints using Test-Driven Development (TDD) principles.
2.  Use an in-memory data store to store the course and enrolment data. You don't need to implement a persistent storage solution.

#### Data
This is already provided to you as a JSON string in the test

| Title      | Description          | Cost  | Type      | Max. Seats |
| ---------- | -------------------- | ----- | --------- | ---------- |
| Law        | A Law Course         | £1000 | Online    | Unlimited  |
| Accounting | An Accounting Course | £500  | Classroom | 10         |
| Management | A Management Course  | £200  | Classroom | 10         |

```
// data/courses.js
const courses = [
  {
    id: 1,
    title: 'Law',
    description: 'A Law Course',
    cost: '£1000',
    type: 'Online',
    maxSeats: 'Unlimited',
  },
  {
    id: 2,
    title: 'Accounting',
    description: 'An Accounting Course',
    cost: '£500',
    type: 'Classroom',
    maxSeats: '10',
  },
  {
    id: 3,
    title: 'Management',
    description: 'A Management Course',
    cost: '£200',
    type: 'Classroom',
    maxSeats: '10',
  }
```

### Task 2 - Front-end
-   Create a frontend application using React that consumes the API and provides the following features:Display a list of available courses with their titles, descriptions, costs, and remaining seats.
-   Allow users to enroll in a course by clicking on a "Enrol" button.
-   Show a user's enrolled courses with the ability to remove enrolment's.

#### Requirements
1.  Design and style the frontend application to provide a user-friendly experience.

