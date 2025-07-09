import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import {
    Form,
    // FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useHorariosStore } from "@/services/horarios/useHorariosStore";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
// import { DIAS_SEMANA, TIPOS_GRUPO } from "@/config/constants";
import { useSedesStore } from "@/services/sedes/useSedesStore";
import { useEffect } from "react";

const formSchema = z.object({
    estudiante_id: z.string({
        required_error: "Selecciona un estudiante",
    }),

    concepto: z
        .string({
            required_error: "Selecciona un concepto",
        })
        .min(1, "El concepto no puede estar vacío"),

    valor_matricula: z
        .union([
            z.string().regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido"),
            z.number(),
        ])
        .transform((val) => Number(val) || 0)
        .optional(),

    monto_total: z
        .union([
            z.string().regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido"),
            z.number(),
        ])
        .transform((val) => Number(val))
        .refine((val) => val > 0, "El monto total debe ser mayor que cero"),

    fecha_emision: z
        .string({
            required_error: "La fecha de emisión es obligatoria",
        })
        .refine((val) => !isNaN(Date.parse(val)), "Fecha no válida"),

    fecha_vencimiento: z
        .string()
        .optional()
        .refine(
            (val) => !val || !isNaN(Date.parse(val)),
            "Fecha de vencimiento inválida"
        ),

    sede_id: z.string({
        required_error: "Selecciona una sede",
    }),

    observaciones: z.string().optional(),
});

export function InvoiceForm() {
    const { sedes, fetchSedes } = useSedesStore();
    const {
        selectHorario,
        selectedHorario,
        createHorario,
        updateHorario,
        deleteHorario,
    } = useHorariosStore();

    useEffect(() => {
        if (!sedes || sedes.length === 0) {
            fetchSedes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concepto: "",
            valor_matricula: 0,
            monto_total: 0,
            observaciones: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (selectedHorario?.id) {
            try {
                await updateHorario(selectedHorario.id, values);
                toast.success("El horario fue actualizado correctamente.");
                selectHorario(null);
                // setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo actualizar el horario. Intenta de nuevo."
                );
                console.error("Error al actualizar", e);
            }
        } else {
            try {
                await createHorario(values);
                toast.success("El horario fue registrado correctamente.");
                selectHorario(null);
                // setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo registrar el horario. Intenta de nuevo."
                );
                console.error("Error al registrar", e);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="estudiante_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estudiante</FormLabel>
                            {/* Aquí puedes usar un Select o Combobox */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="concepto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Concepto</FormLabel>
                            {/* Por ejemplo: matrícula, mensualidad, bimestre, trimestre */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="valor_matricula"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor matrícula</FormLabel>
                            {/* Input numérico opcional */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="monto_total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto total</FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fecha_emision"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de emisión</FormLabel>
                            {/* Date picker o input tipo date */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fecha_vencimiento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de vencimiento</FormLabel>
                            {/* Date picker o input tipo date */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sede_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sede</FormLabel>
                            {/* Select o Combobox */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="observaciones"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Observaciones</FormLabel>
                            {/* Textarea */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    {/* <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose> */}
                    <Button type="submit">
                        {selectedHorario ? "Actualizar" : "Agregar"}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            {selectedHorario && (
                                <Button variant="destructive">Eliminar</Button>
                            )}
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Estás seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción eliminará permanentemente la
                                    sede seleccionada.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={async () => {
                                        if (!selectedHorario?.id) return;

                                        try {
                                            await deleteHorario(
                                                selectedHorario.id
                                            );
                                            toast.success(
                                                "La sede fue eliminada correctamente."
                                            );
                                            selectHorario(null);
                                            // setIsModalOpen(false);
                                        } catch (e) {
                                            toast.error(
                                                "No se pudo eliminar la sede. Intenta de nuevo."
                                            );
                                            console.error(
                                                "Error al eliminar",
                                                e
                                            );
                                        }
                                    }}
                                >
                                    Confirmar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </form>
        </Form>
    );
}
