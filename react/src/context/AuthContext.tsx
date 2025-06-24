import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContextType, AuthProviderProps, IFormInput, User } from "@/types";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await axios.get("auth/user");
            setUser(data);
        } catch (error) {
            console.error("getUser: Error al obtener el usuario:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const login = async (data: IFormInput) => {
        setApiError(null);
        try {
            await csrf();
            await axios.post("auth/login", data, {
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
            await axios.post("auth/logout", null, {
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

    const hasRole = (roles: string[] | string): boolean => {
        if (!user) return false;

        if (typeof roles === "string") {
            return user.roles.includes(roles);
        }

        return roles.some((role) => user.roles.includes(role));
    };

    const hasPermission = (perm: string) =>
        user?.permissions.includes(perm) ?? false;

    // const hasPermission = (perms: string[] | string): boolean => {
    //     if (!user) return false;

    //     if (typeof perms === "string") {
    //         return user.permissions.includes(perms);
    //     }

    //     return perms.some((perm) => user.permissions.includes(perm));
    // };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                apiError,
                getUser,
                setApiError,
                loading,
                hasRole,
                hasPermission,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
