import { Horario } from "@/types";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect } from "react";
import { columns } from "./columns";
import { useHorariosStore } from "@/services/horarios/useHorariosStore";
// Local
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Local

export default function SchedulesPage() {
    const { horarios, fetchHorarios } = useHorariosStore();

    useEffect(() => {
        fetchHorarios();
    }, []);
    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Horario> data={horarios} columns={columns} />
        </div>
    );
}
