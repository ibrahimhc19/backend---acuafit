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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ModalState } from "@/types";
import { toast } from "sonner";
import { useHorariosStore } from "@/services/horarios/useHorariosStore";
import { Link } from "react-router-dom";
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

const formSchema = z.object({
    tipo_grupo: z.string().min(2, {
        message: "El grupo es obligatorio",
    }),
    dia_semana: z.string().min(2, {
        message: "La dirección de la horario es obligatoria",
    }),
    hora_inicio: z.string().min(2, {
        message: "La dirección de la horario es obligatoria",
    }),
    hora_fin: z.string().min(2, {
        message: "La dirección de la horario es obligatoria",
    }),
    sede_id: z.string().min(2, {
        message: "La dirección de la horario es obligatoria",
    }),
});

export function ScheduleForm({ setIsModalOpen }: ModalState) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        selectHorario,
        selectedHorario,
        createHorario,
        updateHorario,
        deleteHorario,
    } = useHorariosStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipo_grupo: "",
            dia_semana: "",
            hora_inicio: "",
            hora_fin: "",
            sede_id: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (selectedHorario?.id) {
            try {
                await updateHorario(selectedHorario.id, values);
                toast.success("La horario fue actualizada correctamente.");
                selectHorario(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo actualizar la horario. Intenta de nuevo."
                );
                console.error("Error al actualizar", e);
            }
        } else {
            try {
                await createHorario(values);
                toast.success("La horario fue registrada correctamente.");
                selectHorario(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error(
                    "No se pudo registrar la horario. Intenta de nuevo."
                );
                console.error("Error al registrar", e);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage email addresses in your{" "}
                                <Link to="/examples/forms">email settings</Link>
                                .
                            </FormDescription>
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
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage email addresses in your{" "}
                                <Link to="/examples/forms">email settings</Link>
                                .
                            </FormDescription>
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
                                <Input {...field} />
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
                                <Input {...field} />
                            </FormControl>
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
                            <Button
                                variant="destructive"
                                disabled={!selectedHorario}
                            >
                                Eliminar
                            </Button>
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
