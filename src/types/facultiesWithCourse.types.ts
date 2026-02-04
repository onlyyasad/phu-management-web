import type { TFaculty } from "./faculty.types";
import type { TCourse } from "./courses.types";

export type TFacultiesWithCourse = {
  _id: string;
  __v?: number;
  course: string | TCourse;
  faculties: TFaculty[];
};
