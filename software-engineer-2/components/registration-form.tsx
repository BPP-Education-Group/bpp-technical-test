import { useForm } from 'react-hook-form';
import Dropdown from './dropdown';
import Input from './input';
import InputSpacer from './input-spacer';
import { Prisma, Course, Registration } from '@prisma/client';
import { RegistrationForm as RegistrationFormDto } from '@/types/RegistrationForm';

const FormError = ({ errorMessage } : { errorMessage: string }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface RegisterCourseProps {
  courses: Course[];
  registrations: Registration & { course: Course }[]
  setRegistrations: () => {};
  setCourseState: () => {};
}

export default function RegistrationForm(props: RegisterCourseProps) {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const onFormSubmission = async (data: any, event: any) => {
    clearErrors();

    try {
      const createdRegistration = await saveRegistrationForm(data);
      event.target.reset();
      props.setRegistrations(previousState => [...previousState, createdRegistration])

      let updatedCourses = props.courses.filter(course => course.id !== createdRegistration.courseId);
      updatedCourses.unshift(createdRegistration.course);
      props.setCourseState(updatedCourses);

      console.log(`Updated courses is: ${JSON.stringify(updatedCourses)}`)

      // const updatedCourses = props.registrations.map((registration) => {
      //   return registration.course;
      // });
      // props.setCourseState(previousState => [...previousState, updatedCourses]);

    } catch (err) {
      const error = err as Error;
      console.log(error.message);

      setError('serverError', {
        message: error.message
      });
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onFormSubmission)}>
      <InputSpacer>
        <Input
          placeholder="First Name"
          name="firstName"
          register={register} 
          validationSchema={{ required: true }}
        />
        {errors.firstName && (
          <FormError errorMessage="First Name is required" />
        )}
      </InputSpacer>
      <InputSpacer>
        <Input
          placeholder="Last Name"
          name="lastName"
          register={register} 
          validationSchema={{ required: true }}
        />
        {errors.lastName && <FormError errorMessage="Last Name is required" />}
      </InputSpacer>
      <InputSpacer>
        <Input
          placeholder="Email"
          name="email"
          register={register} 
          validationSchema={{ required: true }}
        />
        {errors.email && <FormError errorMessage="Email is required" />}
      </InputSpacer>
      <InputSpacer>
        <Dropdown 
          placeholder="Course"
          courses={props.courses} 
          name="courseId"
          register={register} 
          validationSchema={{ required: true }}
        />
        {errors.course && <FormError errorMessage="Course is required" />}
      </InputSpacer>

      { errors.serverError && <FormError errorMessage={errors.serverError.message as string} />}

      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}

async function saveRegistrationForm(registrationForm: RegistrationFormDto) {
  let registrationData = transformRegistrationForm(registrationForm)

  const response = await fetch('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(registrationData)
  });

  if (!response.ok) {
    const responseText = await response.text();
    const responseTextObject = JSON.parse(responseText);
    console.log(`Response text is: ${responseText}`);

    throw new Error(responseTextObject.message);
  }
  return await response.json();
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
