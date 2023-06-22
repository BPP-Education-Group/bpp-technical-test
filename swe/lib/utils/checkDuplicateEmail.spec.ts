import { Course } from "@prisma/client";
import { HomePageProps } from "@/pages";

import checkDuplicateEmail from "./checkDuplicateEmail";

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Course 1",
    description: "Description 1",
    cost: 10,
    type: "Online",
    capacity: 0,
    registered: 0,
  },
  {
    id: 2,
    title: "Course 2",
    description: "Description 2",
    cost: 20,
    type: "Classroom",
    capacity: 0,
    registered: 0,
  },
];

const mockRegistrations: HomePageProps["registrations"] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    courseId: 1,
    course: mockCourses[0],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    courseId: 2,
    course: mockCourses[1],
  },
];

describe('CheckDuplicationEmail', () => {
  it('returns `false` if email input is unique email among previously registered emails', () => {
    const regWithDuplicate = {
      firstName: 'Jane',
      lastName: 'Smith Smith',
      email: "jane@example.com",
      courseId: '2'
    }
    const setError = jest.fn();
    const { courseId, email } = regWithDuplicate;
    const value = checkDuplicateEmail(courseId, email, setError, mockRegistrations);
    expect(value).toEqual(false);
  });

  it('returns `true` if email input is unique email among previously registered emails', () => {
    const regWithValidEmail = {
      firstName: 'Jane',
      lastName: 'Smith Smith',
      email: "secondJane@example.com",
      courseId: '2'
    }
    const setError = jest.fn();
    const { courseId, email } = regWithValidEmail;
    const value = checkDuplicateEmail(courseId, email, setError, mockRegistrations);
    expect(value).toEqual(true);
  });
})