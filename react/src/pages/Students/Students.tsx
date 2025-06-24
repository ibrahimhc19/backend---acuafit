import { Estudiante, PageLinks, PageNumRefs } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.withCredentials= true;
axios.defaults.withXSRFToken= true;

export default function StudentsPage() {
    const [tableData, setTableData] = useState<Estudiante[]>([]);
    const [pageNumRefs, setPageNumRefs] = useState<PageNumRefs>({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        from: 0,
        to: 0,
        total: 0,
        next_page: null,
    });
    const [pageLinks, setPageLinks] = useState<PageLinks>({
        first_page_url: "",
        last_page_url: "",
        next_page_url: null,
        prev_page_url: null,
    });

    const [url, setUrl] = useState(
        `${import.meta.env.VITE_APP_API_URL}client/estudiantes`
    );

    const handlePageChange = (type: "first" | "previous" | "next" | "last") => {
        let nextUrl: string | null = null;

        switch (type) {
            case "first":
                nextUrl = pageLinks.first_page_url;
                break;
            case "previous":
                nextUrl = pageLinks.prev_page_url;
                break;
            case "next":
                nextUrl = pageLinks.next_page_url;
                break;
            case "last":
                nextUrl = pageLinks.last_page_url;
                break;
        }

        if (nextUrl !== null) {
            setUrl(nextUrl);
        }
    };

    // const func = (page: string) => {
    //     return `https:${page.split(":")[1]}`;
    // };

    // const handlePageChange = (type: "first" | "previous" | "next" | "last") => {
    //     let nextUrl: string | null = null;

    //     switch (type) {
    //         case "first":
    //             nextUrl = func(pageLinks.first_page_url);
    //             break;
    //         case "previous":
    //             nextUrl = func(pageLinks.prev_page_url ?? "");
    //             break;
    //         case "next":
    //             nextUrl = func(pageLinks.next_page_url ?? "");
    //             break;
    //         case "last":
    //             nextUrl = func(pageLinks.last_page_url);
    //             break;
    //     }

    //     if (nextUrl !== null) {
    //         setUrl(nextUrl);
    //     }
    // };

    useEffect(() => {
        axios
            .get(url)
            // .get("/mock/data.json")
            .then((response) => {
                const apiResponse = response.data;
                if (
                    apiResponse &&
                    apiResponse.data &&
                    Array.isArray(apiResponse.data)
                ) {
                    setPageNumRefs({ ...apiResponse });
                    setPageLinks({ ...apiResponse });
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
            <DataTable<unknown, Estudiante>
                columns={columns(Number(pageNumRefs.from))}
                data={tableData}
                handlePageChange={handlePageChange}
                pageNumRefs={pageNumRefs}
                pageLinks={pageLinks}
            />
        </div>
    );
}
