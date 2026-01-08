import Courses from "../components/courses";
import RegistrationForm from "../components/registration-form";
import Registrations from "../components/registrations";
import { prisma } from "@/lib/prisma";

async function getData() {
  const [registrations, courses] = await prisma.$transaction([
    prisma.registration.findMany({
      include: {
        course: true,
      },
    }),
    prisma.course.findMany(),
  ]);

  return {
    courses,
    registrations,
  };
}

export default async function HomePage() {
  const { courses, registrations } = await getData();

  return (
    <div className="flex">
      <section className="w-1/3 bg-gray-800 h-screen p-8">
        <RegistrationForm courses={courses} />
      </section>
      <section className="w-2/3 h-screen p-8">
        <Courses courses={courses} />
      </section>
      <section className="w-2/3 h-screen p-8">
        <Registrations registrations={registrations} />
      </section>
    </div>
  );
}
