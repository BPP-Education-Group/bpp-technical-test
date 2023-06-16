import { RegistrationForm as RegistrationFormDto } from "@/types/RegistrationForm";
import { Course, Prisma, PrismaClient, Registration } from "@prisma/client";
import Head from "next/head";
import Courses from "../components/courses";
import RegistrationForm from "../components/registration-form";
import Registrations from "../components/registrations";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const [registrations, courses] = await prisma.$transaction([
    prisma.registration.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    }),
    prisma.course.findMany(),
  ]);

  return {
    props: {
      courses,
      registrations,
    },
  };
}

async function registerUser(registrationForm: RegistrationFormDto) {
  let registrationData = transformRegistrationForm(registrationForm);

  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export type HomePageProps = {
  courses: Course[];
  registrations: (Registration & { course: Pick<Course, "id" | "title"> })[];
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
          <div className="mb-3">
            <h2 className="text-3xl text-white">Register onto Course</h2>
          </div>

          <RegistrationForm
            onSubmit={async (data: RegistrationFormDto, event: any) => {
              try {
                await registerUser(data);
                event.target.reset();
              } catch (err) {}
            }}
            courses={courses}
          />
        </section>
        <section className="w-2/3 h-screen p-8">
          <Courses courses={courses} />
        </section>
        <section className="w-2/3 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-gray-700">Registrations</h2>
          </div>
          <Registrations registrations={registrations} />
        </section>
      </div>
    </>
  );
}

function transformRegistrationForm(
  registrationForm: RegistrationFormDto
): Prisma.RegistrationCreateInput {
  const registrationDb: Prisma.RegistrationCreateInput = {
    firstName: registrationForm.firstName,
    lastName: registrationForm.lastName,
    email: registrationForm.email,
    course: {
      connect: { id: parseInt(registrationForm.courseId, 10) },
    },
  };

  return registrationDb;
}
