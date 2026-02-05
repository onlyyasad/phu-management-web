import { createBrowserRouter } from "react-router";
import App from "../App";
import { adminPaths } from "./admin.routes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { routesGenerator } from "../utils/routesGenerators";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { USER_ROLE } from "../constants/global";
import ChangePassword from "../pages/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={USER_ROLE.ADMIN}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role={USER_ROLE.FACULTY}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role={USER_ROLE.STUDENT}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "change-password",
    element: (
      <ProtectedRoute role={undefined}>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
]);
