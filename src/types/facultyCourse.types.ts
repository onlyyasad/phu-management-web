import type { TSemesterRegistration } from "./semesterRegistration.types";
import type { TAcademicFaculty } from "./academicFaculty.types";
import type { TAcademicSemester } from "./academicSemester.types";
import type { TAcademicDepartment } from "./academicDepartment.types";
import type { TOfferedCourse, TCourseMarks } from "./offeredCourse.types";
import type { TCourse } from "./courses.types";
import type { TStudent } from "./student.types";
import type { TFaculty } from "./faculty.types";

export type TFacultyCourse = {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  academicFaculty: TAcademicFaculty;
  academicSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  offeredCourse: TOfferedCourse;
  course: TCourse;
  student: TStudent;
  faculty: TFaculty;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}