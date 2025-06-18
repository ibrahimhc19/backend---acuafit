// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { ProtectedRouteProps } from "@/types";



export const ProtectedRoute = ({ redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext();

  // Monitorear cuándo ProtectedRoute evalúa el estado
  useEffect(() => {
    console.log(`ProtectedRoute: Renderizando. User: ${user ? 'presente' : 'nulo'}, Loading: ${loading}`);
  }, [user, loading]);


  if (loading) {
    console.log("ProtectedRoute: Todavía cargando, mostrando spinner.");
    return <div>Cargando autenticación...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute: Carga finalizada, usuario nulo. Redirigiendo a:", redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log("ProtectedRoute: Carga finalizada, usuario presente. Mostrando rutas anidadas.");
  return <Outlet />;
};
