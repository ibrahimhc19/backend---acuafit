import {  Sede } from "@/types";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Sede>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return row.index+1;
        },
    },    
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    
    {
        accessorKey: "direccion",
        header: "Dirección",
    },
    
];
