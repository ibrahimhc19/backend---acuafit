import { Horario } from "@/types";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
// Local
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Local

export default function SchedulesPage() {
    const [tableData, setTableData] = useState<Horario[]>([]);

    const url = `${import.meta.env.VITE_APP_API_URL}client/horarios`;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                const apiResponse = response.data;
                if (
                    apiResponse &&
                    apiResponse.data &&
                    Array.isArray(apiResponse.data)
                ) {
                    setTableData(apiResponse.data);
                } else {
                    console.error(
                        "La respuesta de la API no tiene el formato esperado:",
                        apiResponse
                    );
                    setTableData([]);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setTableData([]);
            });
    }, [url]);

    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Horario>
            data={tableData}
            columns={columns} />
        </div>
    );
}
