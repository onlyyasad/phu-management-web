import type { SemesterRegistrationStatus } from "../constants/semesterRegistration";
import type { TAcademicSemester } from "./academicSemester.types";
import type { TMeta } from "./global.types";

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: (typeof SemesterRegistrationStatus)[number];
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TSemesterRegistrationResponse = {
  meta: TMeta;
  data: TSemesterRegistration[];
};
