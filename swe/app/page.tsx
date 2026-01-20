import { prisma } from "@/lib/prisma";
import Courses from "../components/courses";
import RegistrationForm from "../components/registration-form";
import Registrations from "../components/registrations";

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
    <div className="flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/3 bg-gray-800 min-h-screen p-8">
        <RegistrationForm courses={courses} />
      </section>
      <div className="w-full lg:w-2/3 flex flex-col">
        <section className="p-8 overflow-auto">
          <Courses courses={courses} />
        </section>
        <section className="p-8 overflow-auto">
          <Registrations registrations={registrations} />
        </section>
      </div>
    </div>
  );
}
