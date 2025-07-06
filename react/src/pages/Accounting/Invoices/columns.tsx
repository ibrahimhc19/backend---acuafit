// import timeFormatter from "@/helpers/timeFormatter";
import { Factura } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Factura>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index + 1;
        },
    },
        {
        accessorKey: "estudiante_id",
        header: "Estudiante",
    },
    {
        accessorKey: "acudiente_id",
        header: "Acudiente",
    },
    {
        accessorKey: "tipo_documento",
        header: "Tipo documento",
    },
    {
        accessorKey: "numero_documento",
        header: "Documento",
    },
    {
        accessorKey: "email",
        header: "Correo electrónico",
    },
    {
        accessorKey: "direccion",
        header: "Dirección",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        accessorKey: "sede_id",
        header: "Sede",
    },
    {
        accessorKey: "fecha_emision",
        header: "Fecha de emisión",
    },
    {
        accessorKey: "fecha_vencimiento",
        header: "Fecha de vencimiento",
    },
    {
        accessorKey: "categoria",
        header: "Categoría",
    },
    {
        accessorKey: "concepto",
        header: "Concepto",
    },
    {
        accessorKey: "valor_matricula",
        header: "Valor matrícula",
    },
    {
        accessorKey: "monto_total",
        header: "Valor total",
    },
];
