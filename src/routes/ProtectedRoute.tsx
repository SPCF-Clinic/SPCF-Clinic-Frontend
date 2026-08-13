import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth";

interface ProtectedRouteProps {
    layoutType: string,
    requiredRole?: string
}

export default function ProtectedRoute({layoutType, requiredRole}:ProtectedRouteProps){

    const {isAuthenticated, role} = useAuthStore()

   if(!isAuthenticated){
    return <Navigate to={layoutType === "admin"? "/admin": "/"} replace/>
   }
// change yung navigate to dashboard
  if (requiredRole && role !== "superadmin" && role !== requiredRole) {
  return <Navigate to="/admin" replace />;
}
  if (
    requiredRole === "admin" &&
    role !== "admin" &&
    role !== "superadmin"
  ) {
    return <Navigate to="/" replace />;
  }


 return <Outlet/>
}