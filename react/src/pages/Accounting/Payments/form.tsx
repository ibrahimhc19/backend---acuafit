import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ModalState } from "@/types";
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
import { useSedesStore } from "@/services/sedes/useSedesStore";
import { useEffect } from "react";

const formSchema = z.object({
    factura_id: z.string({
        required_error: "Factura no válida",
    }),

    fecha_pago: z
        .string({
            required_error: "La fecha de pago es obligatoria",
        })
        .refine((val) => !isNaN(Date.parse(val)), "Fecha inválida"),

    monto_abono: z
        .union([
            z.string().regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido"),
            z.number(),
        ])
        .transform((val) => Number(val))
        .refine((val) => val > 0, "El monto debe ser mayor que cero"),

    medio_pago: z
        .string({
            required_error: "Selecciona un medio de pago",
        })
        .min(1, "Selecciona un medio de pago"),

    comprobante: z.string().optional(),

    observaciones: z.string().optional(),
});

export function ScheduleForm({ setIsModalOpen }: ModalState) {
    const { sedes, fetchSedes } = useSedesStore();
    const {
        selectHorario,
        selectedHorario,
        createHorario,
        updateHorario,
        deleteHorario,
    } = useHorariosStore();

    useEffect(() => {
        if (sedes.length === 0) {
            fetchSedes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fecha_pago: "",
            medio_pago: "",
            monto_abono: 0,
            comprobante: "",
            observaciones: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        // if (selectedHorario?.id) {
        //     try {
        //         await updateHorario(selectedHorario.id, values);
        //         toast.success("El horario fue actualizado correctamente.");
        //         selectHorario(null);
        //         setIsModalOpen(false);
        //     } catch (e) {
        //         toast.error(
        //             "No se pudo actualizar el horario. Intenta de nuevo."
        //         );
        //         console.error("Error al actualizar", e);
        //     }
        // } else {
        //     try {
        //         await createHorario(values);
        //         toast.success("El horario fue registrado correctamente.");
        //         selectHorario(null);
        //         setIsModalOpen(false);
        //     } catch (e) {
        //         toast.error(
        //             "No se pudo registrar el horario. Intenta de nuevo."
        //         );
        //         console.error("Error al registrar", e);
        //     }
        // }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fecha_pago"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de pago</FormLabel>
                            {/* Date picker o input tipo date */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="monto_abono"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto abonado</FormLabel>
                            {/* Input numérico */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="medio_pago"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medio de pago</FormLabel>
                            {/* Select: Transferencia, Efectivo, Nequi, Bancolombia, etc. */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comprobante"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comprobante o referencia</FormLabel>
                            {/* Input tipo texto */}
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
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
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
                                            setIsModalOpen(false);
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
