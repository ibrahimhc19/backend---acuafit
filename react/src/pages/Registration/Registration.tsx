import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toCapital from "@/helpers/toCapital";

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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Horario, Sede } from "@/types";
import axios from "axios";
import { TIPOS_DOCUMENTO } from "@/config/constants";

const formSchema = z
    .object({
        nombres: z.string().min(2, { message: "El nombre es obligatorio." }),
        apellidos: z
            .string()
            .min(2, { message: "El apellido es obligatorio." }),
        tipo_documento: z
            .enum(
                [
                    "Tarjeta de identidad",
                    "Registro civil",
                    "Cédula de ciudadanía",
                    "Documento extranjero",
                ],
                { required_error: "Debe seleccionar un tipo de documento." }
            )
            .optional(),
        documento_identidad: z
            .string()
            .min(5, { message: "El documento debe tener al menos 5 dígitos." }),
        correo: z
            .string()
            .min(1, { message: "El correo es obligatorio." })
            .email({ message: "Formato de correo inválido." }),
        telefono: z.string().min(10, {
            message: "El teléfono debe tener al menos 10 dígitos.",
        }),
        direccion: z
            .string()
            .min(10, { message: "La dirección es obligatoria." }),
        edad: z.string().min(1, { message: "La edad es obligatoria." }),
        rut: z.string().optional(),
        sede: z.string({ required_error: "Debe seleccionar una sede." }),
        grupo: z.string({ required_error: "Debe seleccionar un grupo." }),
        observaciones: z.string().max(160, {
            message: "Máximo 160 caracteres.",
        }),
        autoriza_uso_imagen: z.enum(["true", "false"], {
            required_error: "Selecciona una opción",
        }),
        acepta_reglamento: z.boolean().refine((val) => val === true, {
            message: "Debe aceptar el reglamento.",
        }),
        requiere_acudiente: z.boolean().default(false),
        // Datos acudiente
        acudiente: z
            .object({
                nombres: z.string().optional(),
                apellidos: z.string().optional(),
                tipo_documento: z
                    .enum(
                        [
                            "Tarjeta de identidad",
                            "Registro civil",
                            "Cédula de ciudadanía",
                            "Documento extranjero",
                        ],
                        {
                            required_error:
                                "Debe seleccionar un tipo de documento.",
                        }
                    )
                    .optional(),
                documento_identidad: z
                    .string()
                    .min(5, {
                        message: "El documento debe tener al menos 5 dígitos.",
                    })
                    .optional(),
                telefono: z
                    .string()
                    .min(10, {
                        message: "El teléfono debe tener al menos 10 dígitos.",
                    })
                    .optional(),
                email: z
                    .string()
                    .email({ message: "Formato de correo inválido." })
                    .optional(),
                rut: z.string().optional(),
            })
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.requiere_acudiente) {
            if (!data.tipo_documento) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Debe seleccionar un tipo de documento.",
                    path: ["tipo_documento"],
                });
            }
            if (!data.documento_identidad) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Debe seleccionar un tipo de documento.",
                    path: ["documento_identidad"],
                });
            }
        }
        if (data.requiere_acudiente) {
            const acudiente = data.acudiente ?? {};

            if (!acudiente.nombres || acudiente.nombres.length < 2) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El nombre del acudiente es obligatorio.",
                    path: ["acudiente", "nombres"],
                });
            }

            if (!acudiente.apellidos || acudiente.apellidos.length < 2) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El apellido del acudiente es obligatorio.",
                    path: ["acudiente", "apellidos"],
                });
            }

            if (!acudiente.tipo_documento) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Debe seleccionar un tipo de documento.",
                    path: ["acudiente", "tipo_documento"],
                });
            }

            if (
                !acudiente.documento_identidad ||
                acudiente.documento_identidad.length < 5
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El documento debe tener al menos 5 dígitos.",
                    path: ["acudiente", "documento_identidad"],
                });
            }

            if (!acudiente.telefono || acudiente.telefono.length < 10) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "El teléfono debe tener al menos 10 dígitos.",
                    path: ["acudiente", "telefono"],
                });
            }

            if (!acudiente.email) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "El correo electrónico del acudiente es obligatorio.",
                    path: ["acudiente", "email"],
                });
            }
        }
    });
type FormData = z.infer<typeof formSchema>;

export default function RegistrationPage() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombres: "",
            apellidos: "",
            documento_identidad: "",
            correo: "",
            telefono: "",
            direccion: "",
            edad: "",
            rut: "",
            observaciones: "",
            autoriza_uso_imagen: "false",
            acepta_reglamento: false,
            requiere_acudiente: false,
            acudiente: {
                nombres: "",
                apellidos: "",
                tipo_documento: undefined,
                documento_identidad: "",
                telefono: "",
                email: "",
                rut: "",
            },
        },
    });

    const onSubmit = (values: FormData) => {
        console.log({
            ...values,
            documento_identidad: parseInt(values.documento_identidad, 10),
            edad: parseInt(values.edad, 10),
            autoriza_uso_imagen: values.autoriza_uso_imagen === "true",
        });
    };



    const [requiereAcudiente, setRequiereAcudiente] = useState(false);
    const [sedes, setSedes] = useState<Sede[]>([]);
    const [grupos, setGrupos] = useState<Horario[]>();

    useEffect(() => {
        axios
            // .get(url)
            .get("/mock/grupos.json")
            .then((response) => {
                const apiResponse = response.data;
                if (apiResponse) {
                    setSedes(apiResponse);
                } else {
                    console.error(
                        "La respuesta de la API no tiene el formato esperado:",
                        apiResponse
                    );
                    setSedes([]);
                }
            })
            .catch((error: unknown) => {
                console.error("Error al obtener los datos:", error);
                setSedes([]);
            });
    }, []);
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto max-w-2xl px-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="bg-[url(./assets/piscina.jpg)] w-full h-40 rounded-t-lg bg-center bg-cover"></div>
                    <div className="p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                            Formulario de Inscripción Acuafit{" "}
                            {new Date().getFullYear()}
                        </h1>
                        {/* <div className="mb-6">
                        </div> */}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="requiere_acudiente"
                                    render={({ field }) => (
                                        <FormItem className="flex mt-8 flex-row items-center justify-start gap-3 rounded-lg border p-4">
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
                                        {/* Nombres */}
                                        <FormField
                                            control={form.control}
                                            name="acudiente.nombres"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nombres
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Apellidos */}
                                        <FormField
                                            control={form.control}
                                            name="acudiente.apellidos"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Apellidos
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Tipo de documento */}
                                        <FormField
                                            control={form.control}
                                            name="acudiente.tipo_documento"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Tipo de documento de
                                                        identidad
                                                    </FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            {TIPOS_DOCUMENTO.map(
                                                                (tipo) => (
                                                                    <FormItem
                                                                        key={
                                                                            tipo
                                                                        }
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
                                                                            {
                                                                                tipo
                                                                            }
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
                                            name="acudiente.documento_identidad"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Número de documento de
                                                        identidad
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
                                        {/* Teléfono */}
                                        <FormField
                                            control={form.control}
                                            name="acudiente.telefono"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Número de teléfono de
                                                        contacto
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="tel"
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
                                            name="acudiente.email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Correo electrónico de
                                                        contacto
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* RUT */}
                                        <FormField
                                            control={form.control}
                                            name="acudiente.rut"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-gray-700 font-medium mb-2">
                                                        Número de RUT (Dejar
                                                        vacío si no aplica)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                                <h3 className="font-semibold text-lg text-gray-800">
                                    Datos del Estudiante
                                </h3>
                                {/* Nombres */}
                                <FormField
                                    control={form.control}
                                    name="nombres"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Nombres
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                Apellidos
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
                                                Edad (años cumplidos)
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

                                {/* Tipo de documento */}
                                <FormField
                                    control={form.control}
                                    name="tipo_documento"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Tipo de documento de identidad
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {TIPOS_DOCUMENTO.map(
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
                                    name="documento_identidad"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Número de documento de identidad
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

                                {/* Correo */}
                                <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Correo electrónico de contacto
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
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
                                                Número de teléfono de contacto
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
                                                (incluyendo ciudad)
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
                                                Número de RUT (Dejar vacío si no
                                                aplica)
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                Sede de preferencia
                                            </FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setGrupos(sedes[parseInt(value)].horarios || []);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione una sede" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {sedes.map((g, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={index.toString()}
                                                        >
                                                            {g.nombre}
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
                                                Elija su grupo de natación
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {grupos && grupos.map((grupo, index) => (
                                                        <FormItem
                                                            key={index}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={
                                                                        grupo.id.toString()
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {grupo.tipo_grupo}, {toCapital(grupo.dia_semana)} de {grupo.hora_inicio} a {grupo.hora_fin}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Observaciones */}
                                <FormField
                                    control={form.control}
                                    name="observaciones"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Observaciones:
                                            </FormLabel>

                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Autorización de imagen */}
                                <FormField
                                    control={form.control}
                                    name="autoriza_uso_imagen"
                                    render={({ field }) => (
                                        <FormItem className="p-4 border border-gray-200 rounded-md">
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Autorización de uso de imagen
                                            </FormLabel>
                                            <p className="text-sm text-gray-500 my-2">
                                                ¿Permite el uso de fotografías
                                                y/o videos del estudiante para
                                                fines publicitarios? Conoce más
                                                en:{" "}
                                                <Link
                                                    to="https://docs.google.com/document/d/1sub1O661QHigJBqdSmgXI8l-YsMIPrUlgWr_XbLE5L8/edit?usp=sharing"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Documento de derechos de
                                                    imagen.
                                                </Link>
                                            </p>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="true" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Sí autorizo
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="false" />
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
                                    name="acepta_reglamento"
                                    render={({ field }) => (
                                        <FormItem className="p-4 border border-gray-200 rounded-md">
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Aceptación del Reglamento
                                                Acuafit
                                            </FormLabel>
                                            <FormDescription className="text-sm text-gray-500 mb-2">
                                                Conoce más en:{" "}
                                                <Link
                                                    to="https://docs.google.com/document/d/1I2yqhEhp1Zf0CwjOjEYGqlEC5pYjbHiuJv2HKsOKBhU/edit?usp=sharing"
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
