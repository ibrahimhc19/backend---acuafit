import { Estudiante } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const columns = (indice:number): ColumnDef<Estudiante>[] => [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index + indice;
        },
    },
    {
        id: "acudiente",
        cell: ({ row }) => {
            const acudienteId = row.original.acudiente_id;

            return acudienteId ? (
                <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                    variant="secondary"
                    asChild
                >
                    <Link to="#">A</Link>
                </Badge>
            ) : null;
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
