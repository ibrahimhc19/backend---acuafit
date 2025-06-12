"use client"
import { Estudiante } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const columns = (indice: number): ColumnDef<Estudiante>[] => [
    {
    accessorKey: "id",
    header: "#",
    cell: () => {
      return indice++;
    }
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
    }
  },
  { header: "Acciones",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0"> {/* alto celdas */}
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.nombres.toString())}
            >
              Ver estudiante
            </DropdownMenuItem>
            <DropdownMenuItem >Editar estudiante</DropdownMenuItem>
            <DropdownMenuItem>Eliminar estudiante</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]