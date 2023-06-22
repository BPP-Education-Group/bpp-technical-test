import { Course } from "@prisma/client";
import { HomePageProps } from "@/pages";

import checkCapacity from "./checkCapacity";

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
    capacity: 2,
    registered: 2,
  },
];

const mockRegistrations: HomePageProps["registrations"] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    courseId: 2,
    course: mockCourses[1],
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

describe('checkCapacity', () => {
  it('always returns `true` if course type is Online ', () => {
    const mockRegForm = {
      firstName: 'Jane',
      lastName: 'Smith Smith',
      email: "jane@example.com",
      courseId: '1'
    }
    const setError = jest.fn();
    const { courseId } = mockRegForm;

    const value = checkCapacity(courseId, mockCourses, setError);
    expect(value).toEqual(true);
  });

  it('returns `false` if course max capacity exceeeds', () => {
    const mockRegForm = {
      firstName: 'Tom',
      lastName: 'Midnight',
      email: "goodbye@example.com",
      courseId: '2'
    }
    const setError = jest.fn();
    const { courseId } = mockRegForm;

    const value = checkCapacity(courseId, mockCourses, setError);
    expect(value).toEqual(false);
  });
})