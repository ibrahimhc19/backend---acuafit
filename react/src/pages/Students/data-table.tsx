"use client";
import { DataTableProps } from "@/types";
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
import { useState } from "react";

export function DataTable<TData, TValue>({
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

    const paginas = [
        { label: "10", value: 10 },
        { label: "15", value: 15 },
        { label: "20", value: 20 },
        { label: "30", value: 30 },
    ];

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}api/buscar?q=${query}`
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
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="hover:text-muted hover:bg-primary"
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
                    <SelectRows
                        value={paginas[0].value}
                        onValueChange={() => {}}
                        options={paginas}
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
