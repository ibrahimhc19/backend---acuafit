import { Sede } from "@/types";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect } from "react";
import { columns } from "./columns";
import { useSedesStore } from "@/services/useSedesStore";
// Local
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Local

export default function LocationsPage() {
    const { sedes, fetchSedes } = useSedesStore();

    useEffect(() => {
        fetchSedes();
    }, []);
    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Sede> data={sedes} columns={columns} />
        </div>
    );
}
