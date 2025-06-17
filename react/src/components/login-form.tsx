import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";

import { AlertCircle } from "lucide-react";

import {
    Alert,
    AlertDescription,
    // AlertTitle,
} from "@/components/ui/alert";
import { IFormInput } from "@/types";

export default function LoginPage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormInput>();

    const auth = useAuthContext();

    if (!auth) {
        console.error("useAuthContext must be used within an AuthProvider");
        return <div>Error: Authentication context not found.</div>;
    }

    const { login, apiError } = auth;

    const submit = (data: IFormInput) => {
        login(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#352c6f] to-[#6e59f7] p-4">
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            Administración Acuafit
                        </CardTitle>
                        <CardDescription>
                            Inicia sesión con tu usuario y contraseña
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(submit)}>
                            <div className="grid gap-y-3">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Usuario</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="correo@ejemplo.com"
                                            required
                                            {...register("email", {
                                                required:
                                                    "El email es obligatorio",
                                            })}
                                            aria-invalid={
                                                errors.email ? "true" : "false"
                                            }
                                            aria-describedby="email-error"
                                        />
                                        {errors.email && (
                                            <p
                                                id="email-error"
                                                className="text-red-600 text-sm mt-1"
                                            >
                                                {errors.email.message}
                                            </p>
                                        )}
                                        {apiError && (
                                            <Alert
                                                variant="destructive"
                                                className="flex gap-0"
                                            >
                                                <AlertCircle className="h-4 w-4" />
                                                {/* <AlertTitle>Error al iniciar sesión.</AlertTitle> */}
                                                <AlertDescription>
                                                    Error al iniciar sesión.
                                                    Intente nuevamente.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Contraseña
                                            </Label>
                                            <a
                                                href="#"
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            {...register("password", {
                                                required:
                                                    "La contraseña es obligatoria",
                                            })}
                                            aria-invalid={
                                                errors.password
                                                    ? "true"
                                                    : "false"
                                            }
                                            aria-describedby="password-error"
                                        />
                                        {errors.password && (
                                            <p
                                                id="password-error"
                                                className="text-red-600 text-sm mt-1"
                                            >
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Iniciando sesión..."
                                            : "Iniciar Sesión"}
                                    </Button>
                                </div>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        O continúa con
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Inicio de sesión de Google
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    ¿No tienes una cuenta?{" "}
                                    <a
                                        href="#"
                                        className="underline underline-offset-4"
                                    >
                                        Regístrate
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-muted *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    Al hacer click en continuar aceptas nuestros{" "}
                    <a href="#">Terminos y condiciones de servicio</a>
                    <br /> y <a href="#">Política de privacidad</a>.
                </div>
            </div>
        </div>
    );
}
