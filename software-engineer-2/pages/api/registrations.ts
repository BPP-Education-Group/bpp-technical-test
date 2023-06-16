import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma, Course } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log(`POST - /api/registrations - ${req.body}`);
    const registration: Prisma.RegistrationCreateInput = JSON.parse(req.body);
    const requestBody = JSON.parse(req.body);

    const requestedCourseParams = requestBody.course;
    console.log(`requestedCourse is: ${JSON.stringify(requestedCourseParams)}`);

    const requestedCourse = await prisma.course.findFirst({
      where: {
        id: requestedCourseParams.connect.id
      }
    }) as Course;

    if ((requestedCourse?.capacity <= requestedCourse?.registered) && requestedCourse.type === 'Classroom') {
      console.log('Maximum capacity reached - returning error')

      res.status(400).json({ message: 'Course capacity has been reached' });
    }

    const registrationExists = await prisma.registration.findFirst({
      where: {
        email: registration.email,
        courseId: requestedCourse.id
      }
    });

    if (registrationExists) {
      console.log('User is already enrolled - returning error')

      res.status(400).json({ message: 'User is already enrolled' });
    }

    const savedRegistration = await prisma.registration.create({ data: registration });
    const incrementRegistrationCount = requestedCourse.registered + 1;
    await prisma.course.update({
      where: {
        id: requestedCourse.id
      },
      data: {
        registered: incrementRegistrationCount
      }
    });

    const registrationAndCourse = await prisma.registration.findFirst({
      where: {
        id: savedRegistration.id
      },
      include: {
        course: true
      }
    });
    
    console.log("api-registration-saved: " + savedRegistration)
    res.status(200).json(registrationAndCourse);
  } catch (err) {
    console.log("error: " + err)
    res.status(400).json({ message: 'Something went wrong' });
  }
};
