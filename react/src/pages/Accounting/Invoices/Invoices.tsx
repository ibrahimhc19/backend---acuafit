import { Factura } from "@/types";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import axios from "axios";
// import { usePagosStore } from "@/services/pagos/usePagosStore";


export default function InvoicesPage() {
    // const { pagos, fetchPagos} = usePagosStore();
    const [facturas, setFacturas] = useState<Factura[]>([]);

    // useEffect(() => {
    //     fetchPagos();
    // }, []);

        useEffect(() => {
     axios
      .get("/mock/facturas.json")
      .then((response) => {
        const apiResponse = response.data;
        if (
          apiResponse
        ) {
          setFacturas(apiResponse);
        } else {
          console.error(
            "La respuesta de la API no tiene el formato esperado:",
            apiResponse
          );
          setFacturas([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setFacturas([]);
      });
}, []);
    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Factura> data={facturas} columns={columns} />
        </div>
    );
}
