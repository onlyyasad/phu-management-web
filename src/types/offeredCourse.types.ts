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

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
  _id: string;
};

export type TEnrolledCourse = {
  _id: string;
  semesterRegistration: string;
  academicFaculty: string;
  academicSemester: string;
  academicDepartment: string;
  offeredCourse: string;
  course: string;
  student: string;
  faculty: string;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMyOfferedCourse = Omit<
  TOfferedCourse,
  "semesterRegistration" | "academicSemester" | "academicFaculty" | "academicDepartment" | "faculty"
> & {
  __v: number;
  enrolledcourses: unknown[];
  completedCourses: TEnrolledCourse[];
  completedCourseIds: string[];
  isPreRequisitesFulfilled: boolean;
  isAlreadyEnrolled: boolean;
  course: TCourse;
};