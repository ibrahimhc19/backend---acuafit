"use client";
import * as React from "react";
import { DataTableProps } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
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

export function DataTable<TData, TValue>({
  columns,
  data,
  previousPage,
  nextPage,
  currentPage,
  handlePageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    state: {
      sorting,
    },
  });

  return (
    <>
        <h1 className="scroll-m-20 flex-wrap text-3xl font-semibold text-primary">
          Listado de Estudiantes
        </h1>
      {/* <div className="flex sm:flex-row justify-between items-center mb-4 sm:mb-0 flex-col-reverse"> */}
        <div className="flex w-full max-w-sm  my-4 gap-2">
          <Input type="search" placeholder="Buscar" />
          <Button type="submit" variant="outline">
            Buscar
          </Button>
        </div>
        {/* <div className="flex items-center justify-end py-4">
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
        </div> */}
      {/* </div> */}
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
                            header.column.columnDef.header,
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
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:text-muted hover:bg-primary"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-0.5">
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
                <TableCell colSpan={columns.length} className="h-8 text-center">
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
