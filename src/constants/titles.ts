export const SITE_NAME = "SPCF Clinic";

export function formatTitle(name?: string | null) {
  return name ? `${name} | ${SITE_NAME}` : SITE_NAME;
}

export interface RouteTitleEntry {
  pattern: string;
  title?: string | null;
  /** When true the route renders its own `<title>` (e.g. a page whose
   *  title depends on fetched data), so `RouteTitle` skips it. */
  dynamic?: boolean;
}

export const ROUTE_TITLES: RouteTitleEntry[] = [
  // Dashboards - only the site name
  { pattern: "/admin", title: null },
  { pattern: "/student-dashboard/:student_number", title: null },

  // Admin
  { pattern: "/admin/students", title: "Students" },
  { pattern: "/admin/students/:studentNumber", dynamic: true },
  { pattern: "/admin/medicines", title: "Medicines" },
  { pattern: "/admin/records", title: "Records" },
  { pattern: "/admin/content-manager", title: "Content Manager" },
  { pattern: "/admin/login", title: "Admin Login" },

  // Student
  {
    pattern: "/student-dashboard/:student_number/update-details",
    title: "Update Details",
  },
  {
    pattern: "/student-dashboard/:student_number/review-details",
    title: "Review Details",
  },
  { pattern: "/", title: "Login" },
  { pattern: "/register", title: "Register" },
  { pattern: "/register/form/:studentId", title: "Registration Form" },
];
