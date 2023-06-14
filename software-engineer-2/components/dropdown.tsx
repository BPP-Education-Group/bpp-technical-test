import { Course } from "../types/course"

interface DropdownProps {
  courses: Course[];
  placeholder: string;
  name: string;
  register: any;
  validationSchema: any;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <select
      className="rounded p-4 text-xl w-full"
      placeholder={props.placeholder}
      {...props.register(props.name, props.validationSchema)}
    >
      {props.courses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.title}
        </option>
      ))}
    </select>
  );
}
