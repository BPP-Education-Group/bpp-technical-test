import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import HomePage, { HomePageProps } from "@/pages";
import { RegistrationForm } from "@/types/RegistrationForm";

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '',
      replace: jest.fn()
    };
  },
}));


const mockCourses: HomePageProps["courses"] = [
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
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    courseId: 2,
    course: mockCourses[1],
  },
];

const server = setupServer(
  rest.post("/api/register", async (req, res, ctx) => {
    const registration = await req.json();
    const savedRegistration = { id: 1, ...registration }; // Mock saved registration data

    return res(ctx.status(200), ctx.json(savedRegistration));
  })
);

describe("HomePage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders the page correctly", () => {
    const mockCourses: HomePageProps["courses"] = [
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

    render(
      <HomePage courses={mockCourses} registrations={mockRegistrations} />
    );

    expect(screen.getByText("Register onto Course")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();

    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Course 1" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Course 2" })).toBeInTheDocument();

    expect(screen.getByText("Registrations")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("handles form submission correctly and updates Registration List", async () => {
    const mockRegistration: RegistrationForm = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      courseId: "2",
    };

    server.use(
      rest.post("/api/register", async (req, res, ctx) => {
        const { firstName, lastName, email, courseId } =
          (await req.json()) as RegistrationForm;
        // Assert that the endpoint is called with the correct values
        expect(firstName).toBe(mockRegistration.firstName);
        expect(lastName).toBe(mockRegistration.lastName);
        expect(email).toBe(mockRegistration.email);
        expect(courseId).toBe(mockRegistration.courseId);

        // Return a mock response
        return res(ctx.json({ id: 1, firstName, lastName, email }));
      })
    );

    render(<HomePage courses={mockCourses} registrations={mockRegistrations} />);

    const user = userEvent.setup();

    // Enter form input values
    user.type(
      screen.getByPlaceholderText("First Name"),
      mockRegistration.firstName
    );
    user.type(
      screen.getByPlaceholderText("Last Name"),
      mockRegistration.lastName
    );
    user.type(screen.getByPlaceholderText("Email"), mockRegistration.email);

    // Select a course from the dropdown
    user.selectOptions(
      screen.getByPlaceholderText("Course"),
      mockRegistration.courseId.toString()
    );

    // Submit the form

    user.click(screen.getByRole("button", { name: "Register" }));

    // Assert that form fields are cleared
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("");
  });

  /* Add cypress for page level integration tests to test useRouter, updates on Registration and 
  Course components after refetch. 

  it('increments the number of Course Registered and Reigsteration item when a register request succeeds', async () => {
  }) */
});
