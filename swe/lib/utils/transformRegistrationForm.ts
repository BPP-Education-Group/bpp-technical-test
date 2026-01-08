import { RegistrationFormDto } from "@/prisma/types/RegistrationFormDto";
import { Prisma } from "@prisma/client";

const transformRegistrationForm = (
  registrationForm: RegistrationFormDto
): Prisma.RegistrationCreateInput => ({
  firstName: registrationForm.firstName,
  lastName: registrationForm.lastName,
  email: registrationForm.email,
  course: {
    connect: { id: parseInt(registrationForm.courseId, 10) },
  },
});

export default transformRegistrationForm;
