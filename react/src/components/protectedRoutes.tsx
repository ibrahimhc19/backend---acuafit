import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { ProtectedRouteProps } from "@/types";



export const ProtectedRoute = ({ redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext();


  if (loading) {
    return <div>Cargando autenticación...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
