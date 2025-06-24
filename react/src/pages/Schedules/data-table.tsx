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
import { Horario } from "@/types";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];

}

export function DataTable<TValue, TData extends Horario>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });
    const [selectedRow, setSelectedRow] = useState<Horario | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary mb-8">
                Listado de Horarios
            </h1>

            <div className="rounded-md border">
                {isModalOpen && selectedRow && (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Editar Sede</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4 max-h-[500px]">
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
                                        value={selectedRow?.tipo_grupo ?? "N/A"}
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
                                        value={selectedRow?.sede.nombre ?? "N/A"}
                                    />
                                </div>
                            </form>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit">Guardar</Button>
                                <Button
                                    variant="destructive"
                                    type="submit"
                                    disabled
                                >
                                    Eliminar
                                </Button>
                            </DialogFooter>
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
                                        setSelectedRow(row.original);
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
