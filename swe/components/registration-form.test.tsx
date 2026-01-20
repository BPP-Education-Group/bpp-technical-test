import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegistrationFormDto } from "@/prisma/types/RegistrationFormDto";
import RegistrationForm, { Props } from "./registration-form";

// Mock the server action
jest.mock("@/app/actions/registerStudent");

describe("RegistrationForm", () => {
  it("renders the page correctly", () => {
    const mockCourses: Props["courses"] = [
      {
        id: 1,
        title: "fake title 1",
        description: "fake description 1",
        cost: 1,
        type: "fake type 1",
        capacity: 1,
        registered: 1,
      },
    ];

    render(<RegistrationForm courses={mockCourses} />);

    expect(screen.getByText("Register onto Course")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const mockRegistrationData: RegistrationFormDto = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      courseId: "1",
    };

    const mockCourses: Props["courses"] = [
      {
        id: 1,
        title: "fake title 1",
        description: "fake description 1",
        cost: 1,
        type: "fake type 1",
        capacity: 1,
        registered: 1,
      },
    ];
    const user = userEvent.setup();

    render(<RegistrationForm courses={mockCourses} />);

    // Enter form input values
    await user.type(
      screen.getByPlaceholderText("First Name"),
      mockRegistrationData.firstName
    );
    await user.type(
      screen.getByPlaceholderText("Last Name"),
      mockRegistrationData.lastName
    );
    await user.type(
      screen.getByPlaceholderText("Email"),
      mockRegistrationData.email
    );

    // Select a course from the dropdown
    await user.selectOptions(
      screen.getByPlaceholderText("Course"),
      mockRegistrationData.courseId.toString()
    );

    // Submit the form
    await user.click(screen.getByRole("button", { name: "Register" }));

    // Assert that form fields are cleared
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("");
  });
});
