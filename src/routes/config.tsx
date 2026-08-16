//Protected Route - modify till to meet the client preference
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// Layout
import WebLayout from "@/components/layout/WebLayout";
import MobLayout from "@/components/layout/MobLayout";

//Pages
import Student from "@/pages/student/index";

import AdminLogin from "@/pages/admin/login";
import Dashboard from "@/pages/admin/dashboard";
import StudentList from "@/pages/admin/student-list";
import StudentProfile from "@/pages/admin/student";
import Medicines from "@/pages/admin/medicines";
import Records from "@/pages/admin/records";
import ContentManager from "@/pages/admin/content-manager";

export const routes = [
  // Student Auth Routes (Redirects to "/" if already authed)
  {
    element: <PublicOnlyRoute redirectPath="/" />,
    children: [
      {
        path: "/login",
        element: <div>student login</div>,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
    ],
  },
  // Admin Auth Routes (Redirects to "/admin" if already authed)
  {
    element: <PublicOnlyRoute redirectPath="/admin" />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <MobLayout />,
    children: [
      {
        index: true,
        element: <Student />,
      },
      {
        path: "register",
        element: <Student />,
      },
      {
        element: <ProtectedRoute layoutType="student" requiredRole="Student" />,
        children: [
          {
            path: "edit",
            element: <Student />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <ProtectedRoute layoutType="student" requiredRole="Student" />,
  //   children: [
  //     {
  //       element: <MobLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <Student />,
  //         },
  //         {
  //           path: "edit",
  //           element: <Student />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: "/admin",
    element: <ProtectedRoute layoutType="admin" requiredRole="Admin" />,
    children: [
      {
        element: <WebLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "students",
            element: <StudentList />,
          },
          {
            path: "students/:studentNumber",
            element: <StudentProfile />,
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
            element: (
              <ProtectedRoute layoutType="admin" requiredRole="Super Admin" />
            ),
            children: [
              {
                index: true,
                element: <ContentManager />,
              },
            ],
          },
        ],
      },
    ],
  },
];
