import { Course } from "@prisma/client";
import { useForm } from "react-hook-form";
import Dropdown from "./dropdown";
import Input from "./input";
import InputSpacer from "./input-spacer";
import saveRegistrationForm from "@/lib/services/saveRegistrationFormService";

export interface Props {
  courses: Course[];
}

export default function RegistrationForm({ courses }: Props) {
  const { register, handleSubmit } = useForm();

  const onFormSubmission = async (data: any, event: any) => {
    await saveRegistrationForm(data);
  };

  return (
    <>
      <div className="mb-3">
        <h2 className="text-3xl text-white">Register onto Course</h2>
      </div>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onFormSubmission)}
      >
        <InputSpacer>
          <Input
            placeholder="First Name"
            name="firstName"
            register={register}
            validationSchema={{ required: true }}
          />
        </InputSpacer>
        <InputSpacer>
          <Input
            placeholder="Last Name"
            name="lastName"
            register={register}
            validationSchema={{ required: true }}
          />
        </InputSpacer>
        <InputSpacer>
          <Input
            placeholder="Email"
            name="email"
            register={register}
            validationSchema={{ required: true }}
          />
        </InputSpacer>
        <InputSpacer>
          <Dropdown
            placeholder="Course"
            courses={courses}
            name="courseId"
            register={register}
            validationSchema={{ required: true }}
          />
        </InputSpacer>

        <button
          className="bg-blue-500 rounded-md p-4 text-blue-100"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
}
