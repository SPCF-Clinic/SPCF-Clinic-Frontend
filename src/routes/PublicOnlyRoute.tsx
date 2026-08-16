import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
// import useAuthStore from "../stores/zustand";

interface PublicOnlyRouteProps {
  redirectPath?: string;
}

export default function PublicOnlyRoute({
  redirectPath = "/admin",
}: PublicOnlyRouteProps) {
  // Temporary auth
  const { isAuthenticated, role } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      role: state.user?.role,
    })),
  );

  if (isAuthenticated) {
    const destination = role === "Student" ? "/" : redirectPath;
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
