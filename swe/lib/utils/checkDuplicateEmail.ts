import { Course, Registration } from "@prisma/client";

export default function checkDuplicateEmail(courseId: string, email: string, setError: any, registrations: (Registration & { course: Course })[]
) {
  const isDuplicate = registrations.filter((registration: any) => (registration.courseId === Number(courseId) && (registration.email === email)));

  if (isDuplicate.length) {
    setError('duplicateEmail',
      {
        type: 'manual',
        message: 'This email has been registered previously the course. Please use a different email.'
      }
    )
    return false
  }
  return true
}