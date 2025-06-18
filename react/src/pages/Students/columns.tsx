"use client";
import { Estudiante } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (indice: number): ColumnDef<Estudiante>[] => [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index + indice;
        },
    },
    {
        id: "nombresCompletos",
        accessorFn: (row) => {
            return `${row.nombres} ${row.apellidos}`;
        },
        header: "Nombres completos",
    },
    {
        accessorKey: "edad",
        header: "Edad",
    },
    {
        accessorKey: "correo",
        header: "Correo electrónico",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        accessorKey: "sede.nombre",
        header: "Sede",
    },
    {
        id: "horario",
        header: "Horario",
        accessorFn: (row) => {
            return `${row.horario.dia_semana}`;
        },
    },
];
