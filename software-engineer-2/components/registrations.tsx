import { Registration, Course } from '@prisma/client';
import Image from 'next/image';

interface RegistrationsProps {
  registrations: (Registration & {
    course: Course;
  })[];
}

export default function Registrations(props: RegistrationsProps) {
  return (
    <>
    {props.registrations.map((registration, i: number) => (
      <div className="mb-3" key={i}>
        <div className="border rounded-lg p-4 flex">
          <div className="my-auto">
            <Image
              src={`https://i.pravatar.cc/50?img=${i}`}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="ml-4">
            <p className="text-xl text-gray-700">
              {registration.firstName} {registration.lastName}
            </p>
            <p className="text-gray-500">{registration.email}</p>
            <p className="text-l text-blue-500">
              {registration.course.title}
            </p>
          </div>
        </div>
      </div>
    ))}
    </>
  );
}
