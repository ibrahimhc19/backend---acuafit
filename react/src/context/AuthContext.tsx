import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContextType, AuthProviderProps, IFormInput } from "@/types";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider ({ children }: AuthProviderProps) {
    const [user, setUser] = useState(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await axios.get("/user");
            setUser(data);
            setLoading(false);
        } catch (error: unknown) {
            console.error("Error al obtener el usuario: ", error);
            setUser(null);
            setLoading(false);
            setApiError("Error al revalidar sesión.");
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const login = async (data: IFormInput) => {
        setApiError(null);
        try {
            await csrf();
            await axios.post("/login", data, {
                headers: {
                    Accept: "application/json",
                },
            });
            await getUser();
            navigate("/dashboard", { replace: true });
        } catch (error: unknown) {
            let specificErrorMessage =
                "Error al iniciar sesión. Inténtalo de nuevo.";

            if (error instanceof AxiosError && error.response) {
                specificErrorMessage =
                    error.response.data.message ||
                    `Error ${error.response.status}: ${error.response.statusText}`;
            }
            setApiError(specificErrorMessage);

            console.error("Error de login:", error);
        }
    };
    const logout = async () => {
        setApiError(null);
        try {
            await axios.post("/logout", {
                headers: {
                    Accept: "application/json",
                },
            });
            setUser(null);
            navigate("/login", { replace: true });
        } catch (error: unknown) {
            let specificErrorMessage =
                "Error al cerrar sesión. Inténtalo de nuevo.";

            if (error instanceof AxiosError && error.response) {
                specificErrorMessage =
                    error.response.data.message ||
                    `Error ${error.response.status}: ${error.response.statusText}`;
            }
            setApiError(specificErrorMessage);

            console.error("Error de logout:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, apiError, getUser, setApiError, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuthContext debe ser usado dentro del AuthProvider");
    }
    return context;
}
