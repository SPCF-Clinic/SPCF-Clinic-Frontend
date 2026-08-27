//Protected Route - modify till to meet the client preference
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// Layout
import MobLayout from "@/components/layout/MobLayout";
import WebLayout from "@/components/layout/WebLayout";

//Student
import LoginPage from "../pages/student/loginPage/index";
import RegisterPage from "../pages/student/registerPage";
import FormPage from "../pages/student/registerPage/registerForm";
import StudentDashboard from "@/pages/student/dashboardPage";
import Updatedetails from "@/pages/student/dashboardPage/UpdateDetails";
import ReviewDetails from "@/pages/student/dashboardPage/ReviewDeatils";

//Admin
import ContentManager from "@/pages/admin/content-manager";
import Dashboard from "@/pages/admin/dashboard";
import AdminLogin from "@/pages/admin/login";
import Medicines from "@/pages/admin/medicines";
import Records from "@/pages/admin/records";
import StudentProfile from "@/pages/admin/student";
import StudentList from "@/pages/admin/student-list";

export const routes = [
  // Student Auth Routes (Redirects to "/" if already authed)
  {
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
        element: <ProtectedRoute layoutType="student" requiredRole="Student" />,
        children: [
          {
            path: "student-dashboard/:student_number",
            element: <StudentDashboard />,
          },
           {
            path: "student-dashboard/:student_number/update-details",
            element: <Updatedetails />,
          },
          { path: "student-dashboard/:student_number/review-details",
            element: <ReviewDetails />,}
        ],
      },
    ],
  },
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
