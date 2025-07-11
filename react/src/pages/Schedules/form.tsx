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
import { DIAS_SEMANA, TIPOS_GRUPO } from "@/config/constants";
import { useSedesStore } from "@/services/sedes/useSedesStore";
import { useEffect, useState } from "react";

const formSchema = z
    .object({
        tipo_grupo: z.enum(
            TIPOS_GRUPO as [(typeof TIPOS_GRUPO)[number], ...string[]]
        ),
        dia_semana: z.enum(
            DIAS_SEMANA as [(typeof DIAS_SEMANA)[number], ...string[]]
        ),
        hora_inicio: z
            .string()
            .min(1, { message: "La hora de inicio es obligatoria" }),
        hora_fin: z
            .string()
            .min(1, { message: "La hora de fin es obligatoria" }),
        sede_id: z.string().min(1, {
            message: "La dirección de la horario es obligatoria",
        }),
    })
    .refine(
        (data) => {
            const [h1, m1] = data.hora_inicio.split(":").map(Number);
            const [h2, m2] = data.hora_fin.split(":").map(Number);
            const inicioMinutos = h1 * 60 + m1;
            const finMinutos = h2 * 60 + m2;
            return finMinutos > inicioMinutos;
        },
        {
            message: "La hora de fin debe ser posterior a la hora de inicio",
            path: ["hora_fin"],
        }
    );

export function ScheduleForm({ setIsModalOpen }: ModalState) {
    const { sedes, fetchSedes } = useSedesStore();
    const {
        selectHorario,
        selectedHorario,
        createHorario,
        updateHorario,
        deleteHorario,
    } = useHorariosStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (sedes.length === 0) {
            fetchSedes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipo_grupo: `${selectedHorario?.tipo_grupo ?? ""}`,
            dia_semana: `${selectedHorario?.dia_semana ?? ""}`,
            hora_inicio: `${selectedHorario?.hora_inicio ?? "07:00:00"}`,
            hora_fin: `${selectedHorario?.hora_fin ?? "08:00:00"}`,
            sede_id: `${selectedHorario?.sede_id ?? ""}`,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        if (selectedHorario?.id) {
            try {
                await updateHorario(selectedHorario.id, values);
                toast.success("El horario fue actualizado correctamente.");
                selectHorario(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo actualizar el horario. Intenta de nuevo."
                );
                console.error("Error al actualizar", e);
            } finally {
                setIsSubmitting(false);
                setIsModalOpen(false);
            }
        } else {
            try {
                await createHorario(values);
                toast.success("El horario fue registrado correctamente.");
                selectHorario(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo registrar el horario. Intenta de nuevo."
                );
                console.error("Error al registrar", e);
            } finally {
                setIsSubmitting(false);
                setIsModalOpen(false);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="tipo_grupo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grupo</FormLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tipos de grupo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {TIPOS_GRUPO.map((tipo, index) => (
                                        <SelectItem key={index} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dia_semana"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Día</FormLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Opciones de días" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {DIAS_SEMANA.map((dia, index) => (
                                        <SelectItem key={index} value={dia}>
                                            {dia}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

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
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Opciones de sedes" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sedes.map((s, index) => (
                                        <SelectItem
                                            key={index}
                                            value={s.id.toString()}
                                        >
                                            {s.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hora_inicio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hora de inicio</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="time"
                                    id="time-picker"
                                    step="1"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hora_fin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hora de fin</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="time"
                                    id="time-picker"
                                    step="1"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? "Actualizando"
                            : selectedHorario
                            ? "Actualizar"
                            : "Agregar"}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            {selectedHorario && (
                                <Button
                                    variant="destructive"
                                    disabled={
                                        isDeleting ? true : !selectedHorario
                                    }
                                >
                                    {isDeleting ? "Eliminando" : "Eliminar"}
                                </Button>
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
                                    className="bg-destructive"
                                    disabled={isSubmitting}
                                    onClick={async () => {
                                        if (!selectedHorario?.id) return;
                                        setIsDeleting(true);
                                        try {
                                            await deleteHorario(
                                                selectedHorario.id
                                            );
                                            toast.success(
                                                "El horario fue eliminado correctamente."
                                            );
                                            selectHorario(null);
                                            setIsModalOpen(false);
                                        } catch (e) {
                                            toast.error(
                                                "No se pudo eliminar el horario. Intenta de nuevo."
                                            );
                                            console.error(
                                                "Error al eliminar",
                                                e
                                            );
                                        } finally {
                                            setIsDeleting(false);
                                            setIsModalOpen(false);
                                        }
                                    }}
                                >
                                    {isDeleting ? "Eliminando" : "Confirmar"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </form>
        </Form>
    );
}
