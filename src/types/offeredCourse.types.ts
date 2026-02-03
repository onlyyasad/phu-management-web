import type { TSemesterRegistration } from "./semesterRegistration.types";
import type { TAcademicSemester } from "./academicSemester.types";
import type { TAcademicFaculty } from "./academicFaculty.types";
import type { TAcademicDepartment } from "./academicDepartment.types";
import type { TCourse } from "./courses.types";
import type { TFaculty } from "./faculty.types";
import type { TMeta } from "./global.types";

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string | TSemesterRegistration;
  academicSemester: string | TAcademicSemester;
  academicFaculty: string | TAcademicFaculty;
  academicDepartment: string | TAcademicDepartment;
  course: string | TCourse;
  faculty: string | TFaculty;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
};

export type TOfferedCourseResponse = {
  meta: TMeta;
  data: TOfferedCourse[];
};