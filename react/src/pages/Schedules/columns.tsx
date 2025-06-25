import timeFormatter from "@/helpers/timeFormatter";
import {  Horario } from "@/types";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Horario>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index+1;
        },
    },
        {
        accessorKey: "tipo_grupo",
        header: "Grupo",
        accessorFn: ( row ) => {
            return `${row.tipo_grupo}`;
        },
    },
    {
        accessorKey: "sede.nombre",
        header: "Sede",
    },
    {
        accessorKey: "dia_semana",
        header: "Día",
    },

    {
        accessorKey: "hora_inicio",
        header: "Hora de inicio",
        accessorFn: ( row ) => {
            return `${timeFormatter(row.hora_inicio)}`
        }
    },
    {
        accessorKey: "hora_fin",
        header: "Hora de fin",
        accessorFn: ( row ) => {
            return `${timeFormatter(row.hora_fin)}`
        }
    },

];
