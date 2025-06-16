import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useState } from "react";

const formSchema = z
    .object({
        nombres: z.string().min(2, { message: "El nombre es obligatorio." }),
        apellidos: z
            .string()
            .min(2, { message: "El apellido es obligatorio." }),
        tipo_documento: z.enum(
            [
                "Tarjeta de identidad",
                "Registro civil",
                "Cédula de ciudadanía",
                "Documento extranjero",
            ],
            { required_error: "Debe seleccionar un tipo de documento." }
        ),
        documento: z
            .string()
            .min(5, { message: "El documento debe tener al menos 5 dígitos." }),
        correo: z
            .string()
            .min(1, { message: "El correo es obligatorio." })
            .email({ message: "Formato de correo inválido." }),
        telefono: z
            .string()
            .min(10, {
                message: "El teléfono debe tener al menos 10 dígitos.",
            }),
        direccion: z
            .string()
            .min(10, { message: "La dirección es obligatoria." }),
        edad: z.string().min(1, { message: "La edad es obligatoria." }),
        rut: z.string().optional(),
        sede: z.string({ required_error: "Debe seleccionar una sede." }),
        grupo: z.string({ required_error: "Debe seleccionar un grupo." }),
        autorizacion_imagen: z.enum(["si", "no"], {
            required_error: "Debe seleccionar una opción.",
        }),
        aceptacion_reglamento: z
            .boolean()
            .refine((val) => val === true, {
                message: "Debe aceptar el reglamento.",
            }),
        requiere_acudiente: z.boolean().default(false),
        nombre_acudiente: z.string().optional(),
        documento_acudiente: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.requiere_acudiente) {
            if (!data.nombre_acudiente || data.nombre_acudiente.length < 2) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El nombre del acudiente es obligatorio.",
                    path: ["nombre_acudiente"],
                });
            }
            if (
                !data.documento_acudiente ||
                data.documento_acudiente.length < 5
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "El documento del acudiente debe tener al menos 5 dígitos.",
                    path: ["documento_acudiente"],
                });
            }
        }
    });
    type FormData = z.infer<typeof formSchema>;

export default function ProfileForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema) as never,
        defaultValues: {
            nombres: "",
            apellidos: "",
            documento: "",
            correo: "",
            telefono: "",
            direccion: "",
            edad: "",
            rut: "",
            aceptacion_reglamento: false,
            requiere_acudiente: false,
            nombre_acudiente: "",
            documento_acudiente: "",
        } as FormData,
    });

    const onSubmit = (values: FormData) => {
        console.log({
            ...values,
            documento: parseInt(values.documento, 10),
            edad: parseInt(values.edad, 10),
        });
    };

    const tipos_documento = [
        "Tarjeta de identidad",
        "Registro civil",
        "Cédula de ciudadanía",
        "Documento extranjero",
    ];
    const sedes = ["Poblado", "Castilla", "La Estrella"];
    const grupos = [
        "Adultos sábados, de 8 a.m a 9 a.m",
        "Adultos sábados, de 9 a.m a 10 a.m",
        "Niños sábados, de 10 a.m a 11 a.m",
        "Adultos domingos, de 8 a.m a 9 a.m",
        "Adultos domingos, de 9 a.m a 10 a.m",
        "Niños domingos, de 10 a.m a 11 a.m",
        "Niños domingos, de 11 a.m a 12 m.",
    ];
    const [requiereAcudiente, setRequiereAcudiente] = useState(false);
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto max-w-2xl px-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                            Formulario de Inscripción Acuafit{" "}
                            {new Date().getFullYear()}
                        </h1>
                        <p className="text-gray-500 text-center mb-6">
                            * Indica campo obligatorio
                        </p>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="requiere_acudiente"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-start gap-3 rounded-lg border p-4">

                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    ¿El estudiante es menor de
                                                    edad y/o requiere datos de
                                                    acudiente?
                                                </FormLabel>
                                            </div>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                        setRequiereAcudiente(
                                                            Boolean(checked)
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {requiereAcudiente && (
                                    <div className="space-y-4 border-l-4 border-primary pl-4 py-2">
                                        <h3 className="font-semibold text-lg text-gray-800">
                                            Datos del Acudiente
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="nombre_acudiente"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nombre completo del
                                                        acudiente *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nombre del acudiente"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="documento_acudiente"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Número de documento del
                                                        acudiente *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Documento del acudiente"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                                {/* Nombres */}
                                <FormField
                                    control={form.control}
                                    name="nombres"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Nombres del estudiante *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nombres"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Apellidos */}
                                <FormField
                                    control={form.control}
                                    name="apellidos"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Apellidos del estudiante *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Apellidos"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Tipo de documento */}
                                <FormField
                                    control={form.control}
                                    name="tipo_documento"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Tipo de documento de identidad
                                                del estudiante *
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {tipos_documento.map(
                                                        (tipo) => (
                                                            <FormItem
                                                                key={tipo}
                                                                className="flex items-center gap-3"
                                                            >
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={
                                                                            tipo
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {tipo}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Documento */}
                                <FormField
                                    control={form.control}
                                    name="documento"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Número de documento de identidad
                                                del estudiante *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="123456789"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Correo */}
                                <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Correo electrónico de contacto *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="ejemplo@correo.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Telefono */}
                                <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Celular de contacto *
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="tel" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Direccion */}
                                <FormField
                                    control={form.control}
                                    name="direccion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Dirección completa de residencia
                                                (incluyendo ciudad) *
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* RUT (Opcional) */}
                                <FormField
                                    control={form.control}
                                    name="rut"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Número de RUT (si aplica)
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Edad */}
                                <FormField
                                    control={form.control}
                                    name="edad"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Edad del estudiante (años
                                                cumplidos) *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Sede */}
                                <FormField
                                    control={form.control}
                                    name="sede"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Sede de preferencia *
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione una sede" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {sedes.map((sede) => (
                                                        <SelectItem
                                                            key={sede}
                                                            value={sede}
                                                        >
                                                            {sede}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Grupo */}
                                <FormField
                                    control={form.control}
                                    name="grupo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Elija el grupo de natación (día
                                                y horario) *
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {grupos.map((grupo) => (
                                                        <FormItem
                                                            key={grupo}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={
                                                                        grupo
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {grupo}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Autorización de imagen */}
                                <FormField
                                    control={form.control}
                                    name="autorizacion_imagen"
                                    render={({ field }) => (
                                        <FormItem className="p-4 border border-gray-200 rounded-md">
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Autorización de uso de imagen *
                                            </FormLabel>
                                            <p className="text-sm text-gray-500 my-2">
                                                ¿Permite el uso de fotografías
                                                y/o videos del estudiante para
                                                fines publicitarios? Conoce más
                                                en:{" "}
                                                <a
                                                    href="https://docs.google.com/document/d/1sub10661QHigJBqdSmgX181-YsMIPrUIgWr_XbLE5L8/edit?usp=sharing"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Documento de derechos de
                                                    imagen.
                                                </a>
                                            </p>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="si" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Sí autorizo
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="no" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            No autorizo
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Aceptación del Reglamento */}
                                <FormField
                                    control={form.control}
                                    name="aceptacion_reglamento"
                                    render={({ field }) => (
                                        <FormItem className="p-4 border border-gray-200 rounded-md">
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Aceptación del Reglamento
                                                Acuafit *
                                            </FormLabel>
                                            <FormDescription className="text-sm text-gray-500 mb-2">
                                                Conoce más en:{" "}
                                                <Link
                                                    to="https://docs.google.com/document/d/112yqhEhp1Zf0CwjOjEYGqIEC5pYjbHiuJv2HKsOKBhU/edit?usp=sharing"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Reglamento Acuafit.
                                                </Link>
                                            </FormDescription>
                                            <div className="flex items-center space-x-2 mt-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    He leído y acepto el
                                                    reglamento de Acuafit.
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                                    <Button type="submit">
                                        Enviar inscripción
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="outline"
                                        onClick={() => form.reset()}
                                    >
                                        Limpiar formulario
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
