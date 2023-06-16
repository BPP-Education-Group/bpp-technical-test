import { useForm } from 'react-hook-form';
import { Course } from '@prisma/client';

import Dropdown from './dropdown';
import Input from './input';
import InputSpacer from './input-spacer';
import saveRegistrationForm from '@/lib/services/saveRegistrationFormService';

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