import type {
  TUser,
  TName,
  TAcademicDepartment,
  TAcademicFaculty,
} from "./student.types";

export type TFaculty = {
  _id: string;
  id: string;
  user: string | TUser;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
};
