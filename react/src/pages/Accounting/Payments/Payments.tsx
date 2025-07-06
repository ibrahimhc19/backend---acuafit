import { Pago } from "@/types";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
// import { usePagosStore } from "@/services/pagos/usePagosStore";
// Local
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Local

export default function PaymentsPage() {
    // const { pagos, fetchPagos} = usePagosStore();
    const [pagos, setPagos] = useState<Pago[]>([]);

    // useEffect(() => {
    //     fetchPagos();
    // }, []);
    useEffect(() => {
     axios
      .get("/mock/pagos.json")
      .then((response) => {
        const apiResponse = response.data;
        if (
          apiResponse
        ) {
          setPagos(apiResponse);
        } else {
          console.error(
            "La respuesta de la API no tiene el formato esperado:",
            apiResponse
          );
          setPagos([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setPagos([]);
      });
}, []);

    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Pago> data={pagos} columns={columns} />
        </div>
    );
}
