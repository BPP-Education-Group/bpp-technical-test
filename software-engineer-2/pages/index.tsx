import Head from 'next/head';
import RegistrationForm from '../components/registration-form';
import Courses from '../components/courses'
import { Course } from '@/types/course';
import { useState } from 'react';

export async function getServerSideProps() {
  return {
    props: {
      initialCourses: [
        {
          "id": 1,
          "title": "Law",
          "description": "A Law Course",
          "cost": 1000,
          "type": "Online",
          "capacity": -1,
          "registered": 0
        },
        {
          "id": 2,
          "title": "Accounting",
          "description": "An Accounting Course",
          "cost": 500,
          "type": "Classroom",
          "capacity": 10,
          "registered": 0
        },
        {
          "id": 3,
          "title": "Management",
          "description": "A Management Course",
          "cost": 200,
          "type": "Classroom",
          "capacity": 10,
          "registered": 0
        }
      ]
    }
  };
}

export default function Index({ initialCourses } : { initialCourses: Course[] }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
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
            onSubmit={async (data, event) => {
              try {
                let courseIndex = event.target.course.value - 1;
                let newCourses = [...courses]; 
                let registeredCount = newCourses[courseIndex]["registered"];
                newCourses[courseIndex]["registered"] = registeredCount + 1; 
                setCourses(newCourses);
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
      </div>
    </>
  );
}