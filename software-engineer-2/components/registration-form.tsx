import { useForm } from 'react-hook-form';
import Dropdown from './dropdown';
import Input from './input';
import InputSpacer from './input-spacer';
import { Prisma, Course } from '@prisma/client';
import { RegistrationForm as RegistrationFormDto } from '@/types/RegistrationForm';

const FormError = ({ errorMessage } : { errorMessage: string }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface RegisterCourseProps {
  courses: Course[];
}

export default function RegistrationForm(props: RegisterCourseProps) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onFormSubmission = async (data: any, event: any) => {
    try {
      await saveRegistrationForm(data);
      event.target.reset();
    } catch (err) {
      console.log(err);
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
    throw new Error(response.statusText);
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
