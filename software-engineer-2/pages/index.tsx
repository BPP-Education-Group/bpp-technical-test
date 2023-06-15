import Head from 'next/head';
import RegistrationForm from '../components/registration-form';
import Courses from '../components/courses'
import Registrations from '../components/registrations'
import { PrismaClient, Prisma, Course, Registration } from '@prisma/client';
import { RegistrationForm as RegistrationFormDto } from '@/types/RegistrationForm';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const courses = await prisma.course.findMany();
  const registrations = await prisma.registration.findMany({
    include: {
      course: true
    }
  });
  return {
    props: {
      courses: courses,
      registrations: registrations
    }
  };
}

async function saveRegistrationForm(registrationForm: RegistrationFormDto) {
  let registrationData = transformRegistrationForm(registrationForm)

  const response = await fetch('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(registrationData)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

type IndexProps = {
  courses: Course[];
  registrations: (Registration & { course: Course })[];
};

export default function Index({ courses, registrations } : IndexProps) {

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
                await saveRegistrationForm(data);
                event.target.reset();
              } catch (err) {
                console.log(err);
              }
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

function transformRegistrationForm(registrationForm: RegistrationFormDto): Prisma.RegistrationCreateInput {
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
