//Protected Route - modify till to meet the client preference
import ProtectedRoute from "./ProtectedRoute";

// Layout
import WebLayout from "@/components/layout/WebLayout";
import MobLayout from "@/components/layout/MobLayout";

//Pages

//Student
import LoginPage from "../pages/student/loginPage/index";
import RegisterPage from "../pages/student/registerPage";
import FormPage from "../pages/student/registerPage/registerForm";
import StudentDashboard from "@/pages/student/dashboardPage"

//Admin
import Dashboard from "@/pages/admin/dashboard";
import StudentList from "@/pages/admin/student-list";
import Medicines from "@/pages/admin/medicines";
import Records from "@/pages/admin/records";
import ContentManager from "@/pages/admin/content-manager";

export const routes = [
  {
    path: "/",
    element: <MobLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "register/form/:studentId", 
        element: <FormPage />,
      },
      {
        element: <ProtectedRoute layoutType="student" requiredRole="Student" />,
        children: [
          {
            path: "student-dashboard",
            element: <StudentDashboard />
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // {
      //   element: <ProtectedRoute layoutType="admin" requiredRole="admin" />,
      //   children: [
      //     {
      //       path: "register",
      //       element: <Admin />,
      //     },
      //     {
      //       path: "edit",
      //       element: <Admin />,
      //     },
      //   ],
      // },
      // {
      //   element: (
      //     <ProtectedRoute layoutType="admin" requiredRole="SuperAdmin" />
      //   ),
      //   children: [
      //     {
      //       path: "register",
      //       element: <Admin />,
      //     },
      //     {
      //       path: "edit",
      //       element: <Admin />,
      //     },
      //   ],
      // },
      {
        path: "students",
        element: <StudentList />,
      },
      {
        path: "medicines",
        element: <Medicines />,
      },
      {
        path: "records",
        element: <Records />,
      },
      {
        path: "content-manager",
        element: <ContentManager />,
      },
    ],
  },
];
