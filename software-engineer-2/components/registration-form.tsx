import { useForm } from 'react-hook-form';
import Dropdown from './dropdown';
import Input from './input';
import InputSpacer from './input-spacer';
import { Course } from '@prisma/client';

const FormError = ({ errorMessage } : { errorMessage: string }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface RegisterCourseProps {
  courses: Course[];
  onSubmit: any;
}

export default function RegistrationForm(props: RegisterCourseProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
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

      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
