import { Course, Registration } from "@prisma/client";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

import Dropdown from "./dropdown";
import Input from "./input";
import InputSpacer from "./input-spacer";
import saveRegistrationForm from "@/lib/services/saveRegistrationFormService";
import checkDuplicateEmail from "@/lib/utils/checkDuplicateEmail";
import checkCapacity from "@/lib/utils/checkCapacity";

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface RegisterCourseProps {
  courses: Course[];
  registrations: (Registration & { course: Course })[];
}

export default function RegistrationForm(props: RegisterCourseProps) {
  const { courses, registrations } = props;
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

  const onFormSubmission = async (data: any, event: any) => {
    const { courseId, email } = data;
    const isOpenCourse = checkCapacity(courseId, courses, setError)
    const isValidEmail = checkDuplicateEmail(courseId, email, setError, registrations);

    if (isOpenCourse && isValidEmail) {
      try {
        await saveRegistrationForm(data);
        event.target.reset();
        router.replace(router.asPath);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="mb-3">
        <h2 className="text-3xl text-white">Register onto Course</h2>
      </div>
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
        {/* Add custom error using react-hook-form for custom validation rules */}
        {errors.capacity && <FormError errorMessage="Selected course is full, please select others." />}
        {errors.duplicateEmail && <FormError errorMessage="This email has been registered previously the course. Please use a different email." />}
        <button
          className="bg-blue-500 rounded-md p-4 text-blue-100"
          type="submit"
          name="Register"
        >
          Register
        </button>
        {/* Add Reset button */}
        <button className="bg-blue-500 rounded-md p-4 m-4 text-blue-100" onClick={reset} name="Reset" type="reset">Reset</button>
      </form>
    </>
  );
}
