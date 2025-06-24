import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useSedesStore } from "@/services/sedes/useSedesStore";
import {
    AlertDialogHeader,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { ModalState } from "@/types";

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre de la sede es obligatorio",
    }),
    direccion: z.string(),
});


export function LocationForm({setIsModalOpen}:ModalState) {
    const { selectSede, selectedSede, createSede, updateSede, deleteSede } = useSedesStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: selectedSede || {
            nombre: "",
            direccion: "-",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (selectedSede?.id) {
            try {
                await updateSede(selectedSede.id, values);
                toast.success("La sede fue actualizada correctamente.");
                selectSede(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error("No se pudo actualizar la sede. Intenta de nuevo.");
                console.error("Error al actualizar", e);
            }
        } else {
            try {
                await createSede(values);
                toast.success("La sede fue registrada correctamente.");
                selectSede(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error("No se pudo registrar la sede. Intenta de nuevo.");
                console.error("Error al registrar", e);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">
                        {selectedSede ? "Actualizar" : "Agregar"}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={!selectedSede}>Eliminar</Button>
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
                                        if (!selectedSede?.id) return;

                                        try {
                                            await deleteSede(
                                                selectedSede.id
                                            );
                                            toast.success(
                                                "La sede fue eliminada correctamente."
                                            );
                                            selectSede(null);
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
