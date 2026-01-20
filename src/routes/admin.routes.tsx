import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin/CreateAdmin";
import CreateStudent from "../pages/Admin/CreateStudent/CreateStudent";
import CreateFaculty from "../pages/Admin/CreateFaculty/CreateFaculty";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
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
