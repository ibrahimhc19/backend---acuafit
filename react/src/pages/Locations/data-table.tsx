/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSedesStore } from "@/services/useSedesStore";
import { Sede } from "@/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { LocationForm } from "./form";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TValue, TData extends Sede>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedSede, selectSede, createSede, updateSede, deleteSede } =
        useSedesStore();

    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
    });

    useEffect(() => {
        if (selectedSede) {
            setFormData({
                nombre: selectedSede.nombre || "",
                direccion: selectedSede.direccion || "",
            });
        } else {
            setFormData({
                nombre: "",
                direccion: "",
            });
        }
    }, [selectedSede]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedSede?.id) {
            try {
                await updateSede(selectedSede.id, formData);
                console.log("Actualizo");
                toast.success("La sede fue actualizada correctamente.");
                selectSede(null);
                setIsModalOpen(false);
            } catch (e) {
                toast.error("No se pudo actualizar la sede. Intenta de nuevo.");
                console.error("Error al actualizar", e);
            }
        } else {
            try {
                await createSede(formData);
                console.log("Registro");
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
        <>
            <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary mb-8">
                Listado de Sedes
            </h1>

            <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-white flex justify-self-end mb-4 cursor-pointer"
                onClick={() => {
                    selectSede(null);
                    setIsModalOpen(true);
                }}
            >
                <Plus />
            </Button>

            <div className="rounded-md border">
                {isModalOpen && (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedSede
                                        ? "Editar Sede"
                                        : "Agregar Sede"}
                                </DialogTitle>
                            </DialogHeader>
                            <LocationForm {...selectedSede}/>
                            {/* <form
                                onSubmit={handleSubmit}
                                className="space-y-4 max-h-[500px]"
                            >
                                <div>
                                    <Label
                                        htmlFor="nombre"
                                        className="block font-semibold"
                                    >
                                        Nombre
                                    </Label>
                                    <Input
                                        id="nombre"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="direccion"
                                        className="block font-semibold"
                                    >
                                        Dirección
                                    </Label>
                                    <Input
                                        id="direccion"
                                        type="text"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                    />
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">
                                        {" "}
                                        {selectedSede
                                            ? "Actualizar"
                                            : "Agregar"}
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">
                                                Eliminar
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    ¿Estás seguro?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción eliminará
                                                    permanentemente la sede
                                                    seleccionada.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancelar
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={async () => {
                                                        if (!selectedSede?.id)
                                                            return;

                                                        try {
                                                            await deleteSede(
                                                                selectedSede.id
                                                            );
                                                            toast.success(
                                                                "La sede fue eliminada correctamente."
                                                            );
                                                            selectSede(null);
                                                            setIsModalOpen(
                                                                false
                                                            );
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
                            </form> */}
                        </DialogContent>
                    </Dialog>
                )}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="text-gray-600">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => {
                                        selectSede(row.original);
                                        setIsModalOpen(true);
                                    }}
                                    className="hover:text-muted hover:bg-primary cursor-pointer"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-0.5"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-8 text-center"
                                >
                                    No hay resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
