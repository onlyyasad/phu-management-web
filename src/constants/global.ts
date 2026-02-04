const currentYear = new Date().getFullYear();
export const yearOptions = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString(), label: year.toString() };
});

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const dayOptions = [
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
];

const genders = ["Male", "Female", "Other"];

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const QueryTagTypes = {
  USERS: "Users",
  USER: "User",
  STUDENTS: "Students",
  STUDENT: "Student",
  ACADEMIC_FACULTIES: "AcademicFaculties",
  ACADEMIC_FACULTY: "AcademicFaculty",
  ACADEMIC_DEPARTMENTS: "AcademicDepartments",
  ACADEMIC_DEPARTMENT: "AcademicDepartment",
  ACADEMIC_SEMESTERS: "AcademicSemesters",
  ACADEMIC_SEMESTER: "AcademicSemester",
  SEMESTER_REGISTRATIONS: "SemesterRegistrations",
  COURSES: "Courses",
  FACULTIES: "Faculties",
  OFFERED_COURSES: "OfferedCourses",
};

export const USER_ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
