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
import { ModalState } from "@/types";
import { toast } from "sonner";
import { useHorariosStore } from "@/services/horarios/useHorariosStore";

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre de la horario es obligatorio",
    }),
    direccion: z.string().min(2, {
        message: "La dirección de la horario es obligatoria",
    }),
});

export function ScheduleForm({setIsModalOpen}:ModalState) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { selectHorario, selectedHorario, createHorario, updateHorario, deleteHorario } = useHorariosStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            direccion: "-",
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
                toast.error("No se pudo actualizar la horario. Intenta de nuevo.");
                console.error("Error al actualizar", e);
            }
        } else {
            try {
                await createHorario(values);
                toast.success("La horario fue registrada correctamente.");
                selectHorario(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error("No se pudo registrar la horario. Intenta de nuevo.");
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
