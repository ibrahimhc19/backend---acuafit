import { Pago } from "@/types";
import { DataTable } from "./data-table";
import { useEffect } from "react";
import { columns } from "./columns";
import { usePagosStore } from "@/services/pagos/usePagosStore";


export default function InvoicesPage() {
    const { pagos, fetchPagos} = usePagosStore();

    useEffect(() => {
        fetchPagos();
    }, []);
    return (
        <div className="container mx-auto px-6 py-4 lg:px-8 min-h-[68vh]">
            <DataTable<unknown, Pago> data={pagos} columns={columns} />
        </div>
    );
}
