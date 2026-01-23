import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin/CreateAdmin";
import CreateStudent from "../pages/Admin/CreateStudent/CreateStudent";
import CreateFaculty from "../pages/Admin/CreateFaculty/CreateFaculty";
import AcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create Academic Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semesters",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Create Academic Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create Academic Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
