//Protected Route - modify till to meet the client preference
import ProtectedRoute from "./ProtectedRoute";

// Layout
import WebLayout from "../components/layout/WebLayout";
import MobLayout from "../components/layout/MobLayout";

//Pages

//Student
import LoginPage from "../pages/student/loginPage/index";
import RegisterPage from "../pages/student/registerPage";
import FormPage from "../pages/student/formPage";

//Admin
import Admin from "../pages/admin/index";

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
        path: "register/form", 
        element: <FormPage />,
      },
      // {
      //   element: <ProtectedRoute layoutType="student" requiredRole="student" />,
      //   children: [
      //     {
      //       path: "edit",
      //       element: <LoginPage />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/admin",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        element: <ProtectedRoute layoutType="admin" requiredRole="admin" />,
        children: [
          {
            path: "register",
            element: <Admin />,
          },
          {
            path: "edit",
            element: <Admin />,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute layoutType="admin" requiredRole="SuperAdmin" />
        ),
        children: [
          {
            path: "register",
            element: <Admin />,
          },
          {
            path: "edit",
            element: <Admin />,
          },
        ],
      },
    ],
  },
];
