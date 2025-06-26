// import timeFormatter from "@/helpers/timeFormatter";
import { Pago } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Pago>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index + 1;
        },
    },
    // {
    //     accessorKey: "tipo_grupo",
    //     header: "Grupo",
    //     accessorFn: (row) => {
    //         return `${row.tipo_grupo}`;
    //     },
    // },
    {
        accessorKey: "monto",
        header: "Monto",
    },
    {
        accessorKey: "fecha_pago",
        header: "Fecha",
    },
    {
        accessorKey: "metodo_pago",
        header: "Metodo de pago",
    },
    {
        accessorKey: "numero_referencia_pago",
        header: "Número de referencia",
    },
    {
        accessorKey: "soporte_pago",
        header: "Soporte de pago",
    },
    {
        accessorKey: "estudiante",
        header: "Estudiante",
    },

    // {
    //     accessorKey: "hora_inicio",
    //     header: "Hora de inicio",
    //     accessorFn: ( row ) => {
    //         return `${timeFormatter(row.hora_inicio)}`
    //     }
    // },
    // {
    //     accessorKey: "hora_fin",
    //     header: "Hora de fin",
    //     accessorFn: ( row ) => {
    //         return `${timeFormatter(row.hora_fin)}`
    //     }
    // },
];
