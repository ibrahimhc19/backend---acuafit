import { Estudiante } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect } from "react";
import { useEstudiantesStore } from "@/services/estudiantes/useEstudiantesStore";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default function StudentsPage() {



    const { fetchEstudiantes, estudiantes, pagination, pageNumRefs, query, per_page } = useEstudiantesStore();
    useEffect(() => {
        fetchEstudiantes(pagination, query, per_page);
    }, [pagination, query, per_page]);

    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Estudiante>
                columns={columns(Number(pageNumRefs.from))}
                data={estudiantes ?? []}
            />
        </div>
    );
}
