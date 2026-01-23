import type { TMeta } from "./global.types";

export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicSemesterResponse = {
  meta: TMeta;
  data: TAcademicSemester[];
};