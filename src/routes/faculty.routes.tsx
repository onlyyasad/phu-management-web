import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses";
import MyCourseStudents from "../pages/Faculty/MyCourseStudents.tsx";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "my-courses",
    element: <MyCourses />,
  },
  {
    path: "my-courses/:semesterRegistrationId/:courseId",
    element: <MyCourseStudents />,
  },
];
