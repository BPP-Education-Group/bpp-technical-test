import { PrismaClient, Course, Registration } from "@prisma/client";
import Head from "next/head";
import Courses from "../components/courses";
import RegistrationForm from "../components/registration-form";
import Registrations from "../components/registrations";

const prisma = new PrismaClient();

export async function getServerSideProps() {

  const [registrations, courses] = await prisma.$transaction([
    prisma.registration.findMany({
      include: {
        course: true
      }
    }),
    prisma.course.findMany(),
  ]);

  return {
    props: {
      courses,
      registrations,
    }
  };
}
export type HomePageProps = {
  courses: Course[];
  registrations: (Registration & { course: Course })[];
};

export default function HomePage({ courses, registrations }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Course Registration</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex">
        <section className="w-1/3 bg-gray-800 h-screen p-8">
          <RegistrationForm courses={courses} registrations={registrations} />
        </section>
        <section className="w-2/3 h-screen p-8">
          <Courses courses={courses} />
        </section>
        <section className="w-2/3 h-screen p-8">
          <Registrations registrations={registrations} />
        </section>
      </div>
    </>
  );
}
