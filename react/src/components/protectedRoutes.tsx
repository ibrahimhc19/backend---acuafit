import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ProtectedRouteProps } from "@/types";


export const ProtectedRoute = ({
    redirectPath = "/login",
}: ProtectedRouteProps) => {

    const [loading, setLoading] = useState(true);
    const auth = useAuthContext();
    if (!auth) {
        return "Contexto de autenticación no encontrado";
    }
    const { user, getUser } = auth;
    // Deuda
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchUser = async () => {
            if (!user) {
                try {
                    await getUser();
                } catch (error) {
                    console.error(
                        "Error al obtener el usuario en ProtectedRoute:",
                        error
                    );
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [user, getUser]);

    if (loading) {
        console.log("Cargando");
    }

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
