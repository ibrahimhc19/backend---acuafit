import { createContext, useContext, useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContextType, AuthProviderProps, IFormInput } from "@/types";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider ({ children }: AuthProviderProps) {
    const [user, setUser] = useState(null);
    const [apiError, setApiError] = useState<string | null>(null)
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const navigate = useNavigate();

    const getUser = async () => {
        const { data } = await axios.get("/user");
        setUser(data);
    };

    const login = async (data: IFormInput) => {
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
        try {
            await axios.post("/logout", {
                headers: {
                    Accept: "application/json",
                },
            });
            navigate("/", { replace: true });
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
            value={{ user, login, logout, apiError, getUser, setApiError }}
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
