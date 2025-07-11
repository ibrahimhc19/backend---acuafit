import { DataTableProps, Estudiante } from "@/types";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
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
    Plus,
} from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { useState } from "react";

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
import { useEstudiantesStore } from "@/services/estudiantes/useEstudiantesStore";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

export function DataTable<TValue, TData extends Estudiante>({
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
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        selectEstudiante,
        selectedEstudiante,
        pageNumRefs,
        pageLinks,
        handlePageChange,
        query,
        setQuery,
        setPerPage,
        deleteEstudiante,
    } = useEstudiantesStore();

    return (
        <>
            <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary">
                Listado de Estudiantes
            </h1>
            <div className="flex w-full justify-between my-4 gap-2">
                <div className="flex gap-2">
                    <Input
                        type="search"
                        placeholder="Buscar"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="hover:bg-primary hover:text-white"
                                onClick={() => setQuery("")}
                            >
                                Limpiar
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Limpia la barra de búsqueda
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-primary hover:text-white flex justify-self-end h-9 cursor-pointer"
                            onClick={() => {
                                selectEstudiante(null);
                                navigate("/registro", { replace: true });
                            }}
                        >
                            <Plus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Crea un nuevo registro</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {isModalOpen && selectedEstudiante && (
                <Dialog
                    open={isModalOpen}
                    onOpenChange={(open) => {
                        setIsModalOpen(open);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl text-left">
                                {/* {nombres} */}
                            </DialogTitle>
                        </DialogHeader>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles del Estudiante
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-1 text-balance">
                                    <p>
                                        <b>Nombre completo:</b>{" "}
                                        {selectedEstudiante.nombres}{" "}
                                        {selectedEstudiante.apellidos}
                                    </p>
                                    <p>
                                        <b>Edad:</b> {selectedEstudiante.edad}
                                    </p>
                                    <p>
                                        <b>Documento:</b>{" "}
                                        {selectedEstudiante.tipo_documento}{" "}
                                        {selectedEstudiante.documento_identidad}
                                    </p>
                                    <p>
                                        <b>Correo:</b>{" "}
                                        {selectedEstudiante.correo}
                                    </p>
                                    <p>
                                        <b>Teléfono:</b>{" "}
                                        {selectedEstudiante.telefono}
                                    </p>
                                    <p>
                                        <b>Dirección:</b>{" "}
                                        {selectedEstudiante.direccion}
                                    </p>
                                    <p>
                                        <b>RUT:</b>{" "}
                                        {selectedEstudiante.rut ?? "N/A"}
                                    </p>
                                    <p>
                                        <b>Acepta el reglamento:</b>{" "}
                                        {selectedEstudiante.acepta_reglamento
                                            ? "Sí"
                                            : "No"}
                                    </p>
                                    <p>
                                        <b>Autoriza uso de imagen:</b>{" "}
                                        {selectedEstudiante.autoriza_uso_imagen
                                            ? "Sí"
                                            : "No"}
                                    </p>
                                    <p>
                                        <b>Observaciones:</b>{" "}
                                        {selectedEstudiante.observaciones ??
                                            "N/A"}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            {selectedEstudiante.acudiente && (
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-bold text-[16px]">
                                        Detalle del Acudiente
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-1 text-balance">
                                        <p>
                                            <b>Nombres:</b>{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .nombres
                                            }{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .apellidos
                                            }
                                        </p>
                                        <p>
                                            <b>Documento:</b>{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .tipo_documento
                                            }{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .documento_identidad
                                            }
                                        </p>
                                        <p>
                                            <b>Teléfono:</b>{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .telefono
                                            }
                                        </p>
                                        <p>
                                            <b>Correo:</b>{" "}
                                            {
                                                selectedEstudiante?.acudiente
                                                    .email
                                            }
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles de la Sede
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-1 text-balance">
                                    <p>
                                        <b>Nombre:</b>{" "}
                                        {selectedEstudiante?.sede.nombre}
                                    </p>
                                    <p>
                                        <b>Dirección:</b>{" "}
                                        {selectedEstudiante?.sede.direccion ??
                                            "N/A"}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="font-bold text-[16px]">
                                    Detalles del Horario
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-1 text-balance">
                                    <p>
                                        <b>Día de la semana:</b>{" "}
                                        {selectedEstudiante?.horario.dia_semana}
                                    </p>
                                    <p>
                                        <b>Hora de inicio:</b>{" "}
                                        {timeFormatter(
                                            selectedEstudiante?.horario
                                                .hora_inicio
                                        )}
                                    </p>
                                    <p>
                                        <b>Hora de fin:</b>{" "}
                                        {timeFormatter(
                                            selectedEstudiante?.horario.hora_fin
                                        )}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                onClick={() => {
                                    const id = selectedEstudiante?.id;
                                    selectEstudiante(null);
                                    navigate(`/registro/${id}`, {
                                        replace: true,
                                    });
                                }}
                            >
                                Editar
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    {selectedEstudiante && (
                                        <Button
                                            variant="destructive"
                                            disabled={
                                                isDeleting
                                                    ? true
                                                    : !selectedEstudiante
                                            }
                                        >
                                            {isDeleting
                                                ? "Eliminando"
                                                : "Eliminar"}
                                        </Button>
                                    )}
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            ¿Estás seguro?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción eliminará
                                            permanentemente el estudiante
                                            seleccionado.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-destructive"
                                            onClick={async () => {
                                                if (!selectedEstudiante?.id)
                                                    return;
                                                setIsDeleting(true);
                                                try {
                                                    await deleteEstudiante(
                                                        selectedEstudiante.id
                                                    );
                                                    toast.success(
                                                        "El estudiante fue eliminado correctamente."
                                                    );
                                                    selectEstudiante(null);
                                                    setIsModalOpen(false);
                                                } catch (e) {
                                                    toast.error(
                                                        "No se pudo eliminar el estudiante. Intenta de nuevo."
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
                                            {isDeleting
                                                ? "Eliminando"
                                                : "Confirmar"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            {/* <Button
                                disabled={isDeleting}
                                variant="destructive"
                                type="submit"
                                onClick={async () => {
                                    if (!selectedEstudiante?.id) return;
                                    setIsDeleting(true);
                                    try {
                                        await deleteEstudiante(
                                            selectedEstudiante.id
                                        );
                                        toast.success(
                                            "El estudiante fue eliminado correctamente."
                                        );
                                        selectEstudiante(null);
                                        setIsModalOpen(false);
                                    } catch (e) {
                                        toast.error(
                                            "No se pudo eliminar el estudiante. Intenta de nuevo."
                                        );
                                        console.error("Error al eliminar", e);
                                    } finally {
                                        setIsDeleting(false);
                                    }
                                }}
                            >
                                {isDeleting ? "Eliminando" : "Eliminar"}
                            </Button> */}
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
                                        selectEstudiante(row.original);
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
                    <Select
                        disabled={isLoading}
                        defaultValue="10"
                        onValueChange={async (e) => {
                            setIsLoading(true);
                            try {
                                setPerPage(Number(e));
                            } catch (error) {
                                console.log(error);
                                toast.error(
                                    "Error al cambiar el número de filas por página"
                                );
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filas</SelectLabel>
                                {FILAS.map((fila, index) => (
                                    <SelectItem
                                        key={index}
                                        value={fila.value.toString()}
                                    >
                                        {fila.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        await handlePageChange("first");
                                    } catch (error) {
                                        console.log(error);
                                        toast.error(
                                            "Error al cambiar de página"
                                        );
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={
                                    pageLinks.prev_page_url === null ||
                                    isLoading
                                }
                                className="hover:bg-primary hover:text-white hidden sm:block"
                            >
                                <ChevronsLeft />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Primera página</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        await handlePageChange("previous");
                                    } catch (error) {
                                        console.log(error);
                                        toast.error(
                                            "Error al cambiar de página"
                                        );
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={
                                    pageLinks.prev_page_url === null ||
                                    isLoading
                                }
                                className="hover:bg-primary hover:text-white"
                            >
                                <ChevronLeft />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Página anterior</TooltipContent>
                    </Tooltip>

                    <Pagination className="hidden sm:flex mr-1">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink>
                                    {pageNumRefs.current_page}
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        await handlePageChange("next");
                                    } catch (error) {
                                        console.log(error);
                                        toast.error(
                                            "Error al cambiar de página"
                                        );
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={
                                    pageLinks.next_page_url === null ||
                                    isLoading
                                }
                                className="hover:bg-primary hover:text-white"
                            >
                                <ChevronRight />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Siguiente página</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        await handlePageChange("last");
                                    } catch (error) {
                                        console.log(error);
                                        toast.error(
                                            "Error al cambiar de página"
                                        );
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={
                                    pageLinks.next_page_url === null ||
                                    isLoading
                                }
                                className="hover:bg-primary hover:text-white hidden sm:block"
                            >
                                <ChevronsRight />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Última página</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}
