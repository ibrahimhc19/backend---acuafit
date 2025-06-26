import { DataTableProps, Estudiante } from "@/types";
import {
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
import { SelectRows } from "./select";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import timeFormatter from "@/helpers/timeFormatter";
import { FILAS } from "@/config/constants";

export function DataTable<TValue, TData extends Estudiante>({
    columns,
    data,
    pageNumRefs,
    pageLinks,
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

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}client/buscar?q=${query}`
            );
            const data = await response.json();
            setResults(data);
            console.log(results);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary">
                Listado de Estudiantes
            </h1>
            <div className="flex w-full max-w-sm  my-4 gap-2">
                <Input
                    type="search"
                    placeholder="Buscar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="outline"
                    onClick={handleSearch}
                    disabled={loading}
                    className="hover:bg-primary hover:text-white"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </Button>
                <Button
                    type="submit"
                    variant="outline"
                    className="hover:bg-primary hover:text-white"
                >
                    Limpiar
                </Button>
            </div>
            {isModalOpen && selectedRow && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl text-left">{nombres}</DialogTitle>
                        </DialogHeader>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles del Estudiante
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        <b>Nombres:</b> {nombres}
                                    </p>
                                    <p>
                                        <b>Edad:</b> {selectedRow.edad}
                                    </p>
                                    <p>
                                        <b>Documento:</b>{" "}
                                        {selectedRow.tipo_documento}{" "}
                                        {selectedRow.documento_identidad}
                                    </p>
                                    <p>
                                        <b>Correo:</b> {selectedRow.correo}
                                    </p>
                                    <p>
                                        <b>Teléfono:</b> {selectedRow.telefono}
                                    </p>
                                    <p>
                                        <b>Dirección:</b>{" "}
                                        {selectedRow.direccion}
                                    </p>
                                    <p>
                                        <b>RUT:</b> {selectedRow.rut ?? "N/A"}
                                    </p>
                                    <p>
                                        <b>Acepta el reglamento:</b>{" "}
                                        {selectedRow.acepta_reglamento
                                            ? "Sí"
                                            : "No"}
                                    </p>
                                    <p>
                                        <b>Autoriza uso de imagen:</b>{" "}
                                        {selectedRow.autoriza_uso_imagen
                                            ? "Sí"
                                            : "No"}
                                    </p>
                                    <p>
                                        <b>Observaciones:</b>{" "}
                                        {selectedRow.observaciones}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            {selectedRow.acudiente && (
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-bold text-[16px]">
                                        Detalle del Acudiente
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p>
                                            <b>Nombres:</b>{" "}
                                            {selectedRow?.acudiente.nombres}{" "}
                                            {
                                                selectedRow?.acudiente
                                                    .apellidos
                                            }
                                        </p>
                                        <p>
                                            <b>Documento:</b>{" "}
                                            {
                                                selectedRow?.acudiente
                                                    .tipo_documento
                                            }{" "}
                                            {
                                                selectedRow?.acudiente
                                                    .documento_identidad
                                            }
                                        </p>
                                        <p>
                                            <b>Teléfono:</b>{" "}
                                            {
                                                selectedRow?.acudiente
                                                    .telefono
                                            }
                                        </p>
                                        <p>
                                            <b>Correo:</b>{" "}
                                            {selectedRow?.acudiente.email}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles de la Sede
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        <b>Nombre:</b>{" "}
                                        {selectedRow?.sede.nombre}
                                    </p>
                                    <p>
                                        <b>Dirección:</b>{" "}
                                        {selectedRow?.sede.direccion}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles del Horario
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        <b>Día de la semana:</b>{" "}
                                        {selectedRow?.horario.dia_semana}
                                    </p>
                                    <p>
                                        <b>Hora de inicio:</b>{" "}
                                        {timeFormatter(selectedRow?.horario.hora_inicio)}
                                    </p>
                                    <p>
                                        <b>Hora de fin:</b>{" "}
                                        {timeFormatter(selectedRow?.horario.hora_fin)}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Editar</Button>
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
                <div className="flex items-center justify-end py-4 space-x-1">
                    {/* Deuda */}
                    <SelectRows
                        value={FILAS[0].value}
                        onValueChange={() => {}}
                        options={FILAS}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("first")}
                        disabled={
                            pageLinks.prev_page_url === null ? true : false
                        }
                        className="hover:bg-primary hover:text-white hidden sm:block"
                    >
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("previous")}
                        disabled={
                            pageLinks.prev_page_url === null ? true : false
                        }
                        className="hover:bg-primary hover:text-white"
                    >
                        <ChevronLeft />
                    </Button>
                    <Pagination className="hidden sm:flex mr-1">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink>
                                    {pageNumRefs.current_page}
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("next")}
                        disabled={
                            pageLinks.next_page_url === null ? true : false
                        }
                        className="hover:bg-primary hover:text-white"
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange("last")}
                        disabled={
                            pageLinks.next_page_url === null ? true : false
                        }
                        className="hover:bg-primary hover:text-white hidden sm:block"
                    >
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
