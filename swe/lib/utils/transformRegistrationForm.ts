import { Prisma } from '@prisma/client';
import { RegistrationForm as RegistrationFormDto } from '@/types/RegistrationForm';

export default function transformRegistrationForm(registrationForm: RegistrationFormDto): Prisma.RegistrationCreateInput {
  const registrationDb: Prisma.RegistrationCreateInput = {
    firstName: registrationForm.firstName,
    lastName: registrationForm.lastName,
    email: registrationForm.email,
    course: {
      connect: { id: parseInt(registrationForm.courseId, 10) }
    }
  };

  return registrationDb;
}
