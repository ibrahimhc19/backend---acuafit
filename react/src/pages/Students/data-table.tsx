import { DataTableProps, Estudiante } from "@/types";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function DataTable<TValue, TData extends Estudiante>({
    columns,
    data,
    previousPage,
    nextPage,
    currentPage,
    handlePageChange,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    const [selectedRow, setSelectedRow] = useState<Estudiante | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nombres, setNombres] = useState("");

    useEffect(() => {
        if (selectedRow) {
            setNombres(`${selectedRow.nombres} ${selectedRow.apellidos}`);
        }
    }, [selectedRow]);
    return (
        <>
            <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary">
                Listado de Estudiantes
            </h1>
            <div className="flex w-full max-w-sm  my-4 gap-2">
                <Input type="search" placeholder="Buscar" />
                <Button type="submit" variant="outline">
                    Buscar
                </Button>
            </div>
            {isModalOpen && selectedRow && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detalles del Estudiante</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4 overflow-auto max-h-[500px]">
                            <div>
                                <label
                                    htmlFor="nombres"
                                    className="block font-semibold"
                                >
                                    Nombres completos
                                </label>
                                <input
                                    id="nombres"
                                    type="text"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="edad"
                                    className="block font-semibold"
                                >
                                    Edad
                                </label>
                                <input
                                    id="edad"
                                    type="text"
                                    value={selectedRow?.edad ?? "N/A"}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="documento"
                                    className="block font-semibold"
                                >
                                    Documento
                                </label>
                                <input
                                    id="documento"
                                    type="text"
                                    value={`${selectedRow?.tipo_documento} ${selectedRow?.documento_identidad}`}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="correo"
                                    className="block font-semibold"
                                >
                                    Correo
                                </label>
                                <input
                                    id="correo"
                                    type="email"
                                    value={selectedRow?.correo}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="telefono"
                                    className="block font-semibold"
                                >
                                    Teléfono
                                </label>
                                <input
                                    id="telefono"
                                    type="tel"
                                    value={selectedRow?.telefono}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="direccion"
                                    className="block font-semibold"
                                >
                                    Dirección
                                </label>
                                <input
                                    id="direccion"
                                    type="text"
                                    value={selectedRow?.direccion ?? "N/A"}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="rut"
                                    className="block font-semibold"
                                >
                                    RUT
                                </label>
                                <input
                                    id="rut"
                                    type="text"
                                    value={selectedRow?.rut}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="acepta_reglamento"
                                    className="block font-semibold"
                                >
                                    Acepta reglamento
                                </label>
                                <input
                                    id="acepta_reglamento"
                                    type="text"
                                    value={
                                        selectedRow?.acepta_reglamento
                                            ? "Sí"
                                            : "No"
                                    }
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="autoriza_uso_imagen"
                                    className="block font-semibold"
                                >
                                    Autoriza uso de imagen
                                </label>
                                <input
                                    id="autoriza_uso_imagen"
                                    type="text"
                                    value={
                                        selectedRow?.autoriza_uso_imagen
                                            ? "Sí"
                                            : "No"
                                    }
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="observaciones"
                                    className="block font-semibold"
                                >
                                    Observaciones
                                </label>
                                <textarea
                                    id="observaciones"
                                    value={selectedRow?.observaciones ?? "N/A"}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            {/* Información del Representante */}
                            {selectedRow?.representante && (
                                <div>
                                    <h3 className="text-xl font-semibold mt-4">
                                        Representante
                                    </h3>
                                    <div>
                                        <label
                                            htmlFor="representante_nombres"
                                            className="block font-semibold"
                                        >
                                            Nombres completos
                                        </label>
                                        <input
                                            id="representante_nombres"
                                            type="text"
                                            value={`${selectedRow?.representante.nombres} ${selectedRow?.representante.apellidos}`}
                                            disabled
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="representante_documento"
                                            className="block font-semibold"
                                        >
                                            Documento
                                        </label>
                                        <input
                                            id="representante_documento"
                                            type="text"
                                            value={`${selectedRow?.representante.tipo_documento} ${selectedRow?.representante.documento_identidad}`}
                                            disabled
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="representante_telefono"
                                            className="block font-semibold"
                                        >
                                            Teléfono
                                        </label>
                                        <input
                                            id="representante_telefono"
                                            type="tel"
                                            value={
                                                selectedRow?.representante
                                                    .telefono
                                            }
                                            disabled
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="representante_email"
                                            className="block font-semibold"
                                        >
                                            Correo
                                        </label>
                                        <input
                                            id="representante_email"
                                            type="email"
                                            value={
                                                selectedRow?.representante.email
                                            }
                                            disabled
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Información de la Sede */}
                            <div>
                                <h3 className="text-xl font-semibold mt-4">
                                    Sede
                                </h3>
                                <div>
                                    <label
                                        htmlFor="sede_nombre"
                                        className="block font-semibold"
                                    >
                                        Nombre de Sede
                                    </label>
                                    <input
                                        id="sede_nombre"
                                        type="text"
                                        value={selectedRow?.sede.nombre}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="sede_direccion"
                                        className="block font-semibold"
                                    >
                                        Dirección de Sede
                                    </label>
                                    <input
                                        id="sede_direccion"
                                        type="text"
                                        value={selectedRow?.sede.direccion}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Información del Horario */}
                            <div>
                                <h3 className="text-xl font-semibold mt-4">
                                    Horario
                                </h3>
                                <div>
                                    <label
                                        htmlFor="horario_dia"
                                        className="block font-semibold"
                                    >
                                        Día de la semana
                                    </label>
                                    <input
                                        id="horario_dia"
                                        type="text"
                                        value={selectedRow?.horario.dia_semana}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="horario_hora_inicio"
                                        className="block font-semibold"
                                    >
                                        Hora de inicio
                                    </label>
                                    <input
                                        id="horario_hora_inicio"
                                        type="text"
                                        value={selectedRow?.horario.hora_inicio}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="horario_hora_fin"
                                        className="block font-semibold"
                                    >
                                        Hora de fin
                                    </label>
                                    <input
                                        id="horario_hora_fin"
                                        type="text"
                                        value={selectedRow?.horario.hora_fin}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            <div className="rounded-md border">
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
            <div className="flex flex-row justify-end items-center mb-4 sm:mb-0">
                <div className="flex items-center justify-end py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("first")}
                        disabled={previousPage === null ? true : false}
                        className="hover:bg-primary hover:text-white"
                    >
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("previous")}
                        disabled={previousPage === null ? true : false}
                        className="hover:bg-primary hover:text-white mx-2"
                    >
                        <ChevronLeft />
                    </Button>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink>{currentPage}</PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("next")}
                        disabled={nextPage === null ? true : false}
                        className="hover:bg-primary hover:text-white mx-2"
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("last")}
                        disabled={nextPage === null ? true : false}
                        className="hover:bg-primary hover:text-white"
                    >
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
