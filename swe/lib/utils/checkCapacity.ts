import { Course } from "@prisma/client";

export default function checkCapacity(courseId: string, courses: Course[], setError: any) {
  let isAvailable;
  const targetCourse = courses.filter((course: any) => course.id === Number(courseId))[0];
  if (targetCourse.type === 'Online') return true;

  isAvailable = (targetCourse.registered + 1) <= targetCourse.capacity;
  if (!isAvailable) {
    setError('capacity',
      {
        type: 'manual',
        message: 'Selected course is full.'
      }
    )
    return false
  }
  return true
}
