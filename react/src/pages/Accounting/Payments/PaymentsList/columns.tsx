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
    {
        accessorKey: "facturacion_id",
        header: "Factura",
    },
    {
        accessorKey: "monto",
        header: "Monto del pago",
    },
    {
        accessorKey: "fecha_pago",
        header: "Fecha de pago",
    },
    {
        accessorKey: "numero_referencia_pago",
        header: "Número de referencia",
    },
    {
        accessorKey: "metodo_pago",
        header: "Medio de pago",
    },
    {
        accessorKey: "soporte_pago",
        header: "Soporte de pago",
    },
    {
        accessorKey: "observaciones",
        header: "Observaciones",
    },
];
