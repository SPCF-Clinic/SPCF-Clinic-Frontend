import { useAuthStore } from "@/stores/useAuthStore";
import type { UserRole } from "@/types/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
// import useAuthStore from "../stores/zustand";

interface ProtectedRouteProps {
  layoutType: "student" | "admin";
  requiredRole?: UserRole;
}

export default function ProtectedRoute({
  layoutType,
  requiredRole,
}: ProtectedRouteProps) {
  // Temporary auth
  const { isAuthenticated, role } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      role: state.user?.role,
    })),
  );
  // const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    const loginPath = layoutType === "admin" ? "/admin/login" : "/";
    return <Navigate to={loginPath} replace />;
  }

  if (requiredRole && role !== "Super Admin" && role !== requiredRole) {
    return <Navigate to="/admin" replace />;
  }

  if (requiredRole === "Admin" && role !== "Admin" && role !== "Super Admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
