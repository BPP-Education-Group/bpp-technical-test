export const registerStudent = jest.fn().mockResolvedValue({
  success: true,
  data: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    courseId: 1,
  },
});
