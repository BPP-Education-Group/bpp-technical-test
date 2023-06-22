import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import { HomePageProps } from "@/pages";
import RegistrationForm from '../../components/registration-form'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
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

/* UI-focus unit tests from user's perspective */
describe("Registration Form", () => {
  it('render Registration Form correctly', () => {
    render(<RegistrationForm courses={mockCourses} registrations={mockRegistrations} />)

    expect(screen.getByText("Register onto Course")).toBeInTheDocument();
  })

  it('render Registration Form with Register and Reset buttons', () => {
    render(<RegistrationForm courses={mockCourses} registrations={mockRegistrations} />)

    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  })

  it('displays suitable error message when a selected class exceeds its capacity.', async () => {
    render(<RegistrationForm courses={mockCourses} registrations={mockRegistrations} />)

    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText("First Name"),
      "Heather"
    );
    await user.type(
      screen.getByPlaceholderText("Last Name"),
      "Yun"
    );

    await user.type(
      screen.getByPlaceholderText("Email"),
      "heather@gmail.com"
    );

    user.selectOptions(
      screen.getByPlaceholderText("Course"),
      '2'
    );

    await user.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByText('Selected course is full, please select others.')).toBeInTheDocument()
  });

  it('displays suitable error message when an existing email is used to register', async () => {
    render(<RegistrationForm courses={mockCourses} registrations={mockRegistrations} />)

    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText("First Name"),
      "Tom"
    );
    await user.type(
      screen.getByPlaceholderText("Last Name"),
      "Midnight"
    );

    await user.type(
      screen.getByPlaceholderText("Email"),
      "john@example.com"
    );

    user.selectOptions(
      screen.getByPlaceholderText("Course"),
      '1'
    );

    await user.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByText('This email has been registered previously the course. Please use a different email.')).toBeInTheDocument()
  })

  it('resets Registraton Form and  clears error message when user click Reset button', async () => {
    const user = userEvent.setup();

    render(<RegistrationForm courses={mockCourses} registrations={mockRegistrations} />)

    await user.type(
      screen.getByPlaceholderText("First Name"),
      "Tom"
    );
    await user.type(
      screen.getByPlaceholderText("Last Name"),
      "Midnight"
    );

    await user.type(
      screen.getByPlaceholderText("Email"),
      "john@example.com"
    );

    user.selectOptions(
      screen.getByPlaceholderText("Course"),
      '1'
    );

    /* check error shows */
    await user.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByText('This email has been registered previously the course. Please use a different email.')).toBeInTheDocument()

    /* Error no longer shows - use queryByText as getByTest throws an error when an element does not exist. */
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("");
    expect(screen.queryByText('This email has been registered previously the course. Please use a different email.')).not.toBeInTheDocument()
  });
})