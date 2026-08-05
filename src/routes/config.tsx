//Protected Route - modify till to meet the client preference
import ProtectedRoute from "./ProtectedRoute";

// Layout
import WebLayout from "../components/layout/WebLayout";
import MobLayout from "../components/layout/MobLayout";

//Pages
import Student from "../pages/student/index";
import Admin from "../pages/admin/index";

export const routes = [
  {
    path: "/",
    element: <MobLayout />,
    children: [
      {
        index: true,
        element: <Student />,
      },
       {
        path: "/register",
        element: <Student />,
      },
      {
        element: <ProtectedRoute layoutType="student" requiredRole="student"/>,
        children: [
          {
            path: "/edit",
            element: <Student />,
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
        element: <Admin />,
      },
      {
        element: <ProtectedRoute layoutType="admin" requiredRole="admin"/>,
        children: [
          {
            path: "/register",
            element: <Student />,
          },
          {
            path: "/edit",
            element: <Student />,
          },
        ],
      },
      {
        element: <ProtectedRoute layoutType="admin" requiredRole="SuperAdmin"/>,
        children: [
          {
            path: "/register",
            element: <Student />,
          },
          {
            path: "/edit",
            element: <Student />,
          },
        ],
      },
    ],
  },
];
