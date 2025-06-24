import { useSedesStore } from "@/services/sedes/useSedesStore";
import { Sede } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Plus } from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

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
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    const { selectedSede, selectSede } = useSedesStore();

    const datos = {
        setIsModalOpen,
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
                                <DialogDescription>
                                    {selectedSede
                                        ? "Modifica los datos de la sede y haz clic en 'Actualizar' para guardar los cambios."
                                        : "Completa la información para registrar una nueva sede en el sistema."}
                                </DialogDescription>
                            </DialogHeader>
                            <LocationForm {...datos} />
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
