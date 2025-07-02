import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toCapital from "@/helpers/toCapital";
import { useParams } from "react-router-dom";
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
import { Horario } from "@/types";
import { TIPOS_DOCUMENTO } from "@/config/constants";
import { useEstudiantesStore } from "@/services/estudiantes/useEstudiantesStore";
import { useSedesStore } from "@/services/sedes/useSedesStore";
import { useHorariosStore } from "@/services/horarios/useHorariosStore";

const formSchema = z
    .object({
        nombres: z.string().min(2, { message: "El nombre es obligatorio." }),
        apellidos: z
            .string()
            .min(2, { message: "El apellido es obligatorio." }),
        tipo_documento: z
            .enum(
                TIPOS_DOCUMENTO as [
                    (typeof TIPOS_DOCUMENTO)[number],
                    ...string[]
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
        sede_id: z.string({ required_error: "Debe seleccionar una sede." }),
        horario_id: z.string({ required_error: "Debe seleccionar una sede." }),
        // grupo: z.string({ required_error: "Debe seleccionar un grupo." }),
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
                        TIPOS_DOCUMENTO as [
                            (typeof TIPOS_DOCUMENTO)[number],
                            ...string[]
                        ],
                        {
                            required_error:
                                "Debe seleccionar un tipo de documento.",
                        }
                    )
                    .optional(),
                documento_identidad: z.string().optional(),
                telefono: z.string().optional(),
                email: z.string().optional(),
                rut: z.string().optional(),
            })
            .optional(),
    })
    .superRefine((data, ctx) => {
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
    const { getEstudianteById } = useEstudiantesStore();
    const [requiereAcudiente, setRequiereAcudiente] = useState(false);
    const { fetchSedes, sedes } = useSedesStore();
    const { fetchHorarios, horarios } = useHorariosStore();
    const [grupos, setGrupos] = useState<Horario[]>();
    const [estudianteExists, setEstudianteExists] = useState(false);
    const { id } = useParams();
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
            sede_id: "",
            horario_id: "",
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
        console.log(values);
    };
    const tipoDocumentoValido = (
        value: string | undefined
    ):
        | "Tarjeta de identidad"
        | "Registro civil"
        | "Cédula de ciudadanía"
        | "Documento extranjero"
        | undefined => {
        const validValues = TIPOS_DOCUMENTO;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return validValues.includes(value ?? "") ? (value as any) : undefined;
    };

    const validBoolean = (
        value: string | undefined
    ): "true" | "false" | undefined => {
        const bool = ["true", "false"];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return bool.includes(value ?? "") ? (value as any) : undefined;
    };

    useEffect(() => {
        if (horarios.length === 0) {
            fetchHorarios();
        }
        fetchSedes();
    }, [horarios]);

    useEffect(() => {
        if (!id) return;
        const fetchEstudiante = async () => {
            try {
                await fetchSedes();
                const estudiante = await getEstudianteById(Number(id));
                if (estudiante?.sede_id) {
                    setGrupos(
                        horarios.filter(
                            (horario) =>
                                horario.sede_id.toString() ===
                                estudiante?.sede_id.toString()
                        )
                    );
                }
                if (estudiante) {
                    setEstudianteExists(true);
                    const reqA = estudiante.acudiente_id ? true : false;
                    setRequiereAcudiente(reqA);
                    form.reset({
                        nombres: estudiante.nombres ?? "",
                        apellidos: estudiante.apellidos ?? "",
                        tipo_documento: tipoDocumentoValido(
                            estudiante.tipo_documento
                        ),
                        documento_identidad:
                            estudiante.documento_identidad ?? "",
                        correo: estudiante.correo ?? "",
                        telefono: estudiante.telefono ?? "",
                        direccion: estudiante.direccion ?? "",
                        edad: estudiante.edad.toString() ?? "",
                        rut: estudiante.rut ?? "",
                        sede_id: estudiante.sede_id.toString(),
                        horario_id: estudiante.horario_id.toString(),
                        observaciones: estudiante.observaciones ?? "",
                        autoriza_uso_imagen: validBoolean(
                            estudiante.autoriza_uso_imagen?.toString()
                        ),
                        acepta_reglamento: estudiante.acepta_reglamento,
                        requiere_acudiente: reqA,

                        acudiente: {
                            nombres: estudiante.acudiente?.nombres ?? "",
                            apellidos: estudiante.acudiente?.apellidos ?? "",
                            tipo_documento: tipoDocumentoValido(
                                estudiante.acudiente?.tipo_documento
                            ),
                            documento_identidad:
                                estudiante.acudiente?.documento_identidad ?? "",
                            telefono: estudiante.acudiente?.telefono ?? "",
                            email: estudiante.acudiente?.email ?? "",
                            rut: estudiante.acudiente?.rut ?? "",
                        },
                    });
                }
            } catch (error) {
                console.error("Error al obtener estudiante:", error);
            }
        };

        fetchEstudiante();
    }, [id, horarios]);

    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto max-w-2xl px-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <div
                        className={`${
                            estudianteExists
                                ? "bg-primary h-10"
                                : "bg-[url(./assets/piscina.jpg)] h-40"
                        } w-full rounded-t-lg bg-center bg-cover`}
                    ></div>
                    <div className="p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                            {/* Formulario de Inscripción Acuafit{" "} */}
                            {estudianteExists
                                ? "Edición de Estudiante"
                                : "Formulario de Inscripción Acuafit"}{" "}
                            {new Date().getFullYear()}
                        </h1>
                        {/* <div className="mb-6">
                        </div> */}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(
                                    onSubmit,
                                    (errors) => {
                                        console.log(
                                            "Errores de validación:",
                                            errors
                                        );
                                    }
                                )}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="requiere_acudiente"
                                    render={({ field }) => (
                                        <FormItem className="flex mt-8 flex-row items-center justify-start gap-3 rounded-lg border p-4">
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    {requiereAcudiente
                                                        ? "El estudiante requiere acudiente"
                                                        : "¿El estudiante es menor de edad y/o requiere datos de acudiente?"}
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
                                                            value={
                                                                field.value ??
                                                                ""
                                                            }
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            {TIPOS_DOCUMENTO.map(
                                                                (
                                                                    tipo,
                                                                    index
                                                                ) => (
                                                                    <FormItem
                                                                        key={
                                                                            index
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
                                                    value={field.value ?? ""}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {TIPOS_DOCUMENTO.map(
                                                        (tipo, index) => (
                                                            <FormItem
                                                                key={index}
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
                                    name="sede_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Sede de preferencia
                                            </FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setGrupos(
                                                        horarios.filter(
                                                            (horario) =>
                                                                horario.sede_id.toString() ===
                                                                value.toString()
                                                        )
                                                    );
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione una sede" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {sedes.map(
                                                        (sede, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={sede.id.toString()}
                                                            >
                                                                {sede.nombre}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Grupo */}
                                <FormField
                                    control={form.control}
                                    name="horario_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700 font-medium mb-2">
                                                Elija su grupo de natación
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value ?? ""}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {grupos &&
                                                    grupos.length > 0 ? (
                                                        grupos.map(
                                                            (grupo, index) => (
                                                                <FormItem
                                                                    key={index}
                                                                    className="flex items-center gap-3"
                                                                >
                                                                    <FormControl>
                                                                        <RadioGroupItem
                                                                            value={grupo.id.toString()}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {
                                                                            grupo.tipo_grupo
                                                                        }
                                                                        ,{" "}
                                                                        {toCapital(
                                                                            grupo.dia_semana
                                                                        )}{" "}
                                                                        de{" "}
                                                                        {
                                                                            grupo.hora_inicio
                                                                        }{" "}
                                                                        a{" "}
                                                                        {
                                                                            grupo.hora_fin
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        )
                                                    ) : (
                                                        <FormLabel>
                                                            No hay horarios
                                                            disponibles
                                                        </FormLabel>
                                                    )}
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
                                                    value={field.value ?? ""}
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
                                                        disabled={
                                                            estudianteExists
                                                        }
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
                                        {estudianteExists
                                            ? "Actualizar registro"
                                            : "Enviar inscripción"}
                                    </Button>
                                    {!estudianteExists && (
                                        <Button
                                            type="reset"
                                            variant="outline"
                                            onClick={() => form.reset()}
                                        >
                                            Limpiar formulario
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
