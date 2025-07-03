import { create } from "zustand";
import { Estudiante, PageLinks, PageNumRefs } from "@/types";
import * as estudiantesService from "@/services/estudiantes/estudiantesService";
import { FormDataInscripcion } from "@/pages/Registration/Registration";

interface EstudiantesStore {
    query: string | undefined;
    per_page: number | undefined;
    loading: boolean;
    pagination: string | undefined;
    error: string | null;
    pageLinks: PageLinks,
    pageNumRefs: PageNumRefs,
    estudiantes: Estudiante[];
    selectedEstudiante: Estudiante | null;
    setQuery: (search?: string) => void;
    setPerPage: (pages?: number) => void;
    deleteEstudiante: (id: number) => Promise<void>;
    getEstudianteById: (id: number) => Promise<Estudiante>;
    selectEstudiante: (estudiante: Estudiante | null) => void;
    createEstudiante: (data: Partial<FormDataInscripcion>) => Promise<void>;
    fetchEstudiantes: (page?: string, query?: string, per_page?: number) => Promise<void>;
    updateEstudiante: (id: number, data: Partial<FormDataInscripcion>) => Promise<void>;
    handlePageChange: (type: "first" | "previous" | "next" | "last") => Promise<void>;

}

export const useEstudiantesStore = create<EstudiantesStore>((set, get) => ({
    estudiantes: [],
    selectedEstudiante: null,
    loading: false,
    pagination: "",
    per_page: 10,
    query: undefined,
    error: null,
    pageLinks: {
        first_page_url: "",
        last_page_url: "",
        next_page_url: null,
        prev_page_url: null,
    },
    pageNumRefs: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        from: 0,
        to: 0,
        total: 0,
        next_page: null,
    },

    fetchEstudiantes: async (page?: string, query?: string, pages?: number) => {
        set({ loading: true, error: null });
        try {
            const response = await estudiantesService.getAll(page, query, pages);
            const { current_page,
                last_page,
                per_page,
                from,
                to,
                total,
                next_page,
                first_page_url,
                last_page_url,
                next_page_url,
                prev_page_url } = response;
            set({
                pageNumRefs: {
                    current_page,
                    last_page,
                    per_page,
                    from,
                    to,
                    total,
                    next_page
                }
            });
            set({
                pageLinks: {
                    first_page_url,
                    last_page_url,
                    next_page_url,
                    prev_page_url
                }
            });
            set({ estudiantes: response.data });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar estudiantes" });
        } finally {
            set({ loading: false });
        }
    },

    handlePageChange: async (page: string) => {
        const links = get().pageLinks;

        function urlSplitterPagination(url: string) {
            const clean = url.split("=")
            return clean.length >= 4 ? clean[3] : clean[1];
        }

        switch (page) {
            case "first":
                set({ pagination: urlSplitterPagination(links.first_page_url) });
                break;
            case "previous":
                set({ pagination: urlSplitterPagination(links.prev_page_url ?? "") });
                break;
            case "next":
                set({ pagination: urlSplitterPagination(links.next_page_url ?? "") });
                break;
            case "last":
                set({ pagination: urlSplitterPagination(links.last_page_url ?? "") });
                break;

        }

    },

    setQuery: (search?: string) => {
        set({ query: search });
    },
    setPerPage: (pages?: number) => {
        set({ per_page: pages });
    },

    createEstudiante: async (data) => {
        await estudiantesService.create(data);
        // await get().fetchEstudiantes();
    },

    updateEstudiante: async (id, data) => {
        await estudiantesService.update(id, data);
        // await get().fetchEstudiantes();
    },

    deleteEstudiante: async (id) => {
        await estudiantesService.remove(id);
        // await get().fetchEstudiantes();
    },
    getEstudianteById: async (id) => {
        const estudiante = await estudiantesService.getById(id);
        return estudiante;
    },


    selectEstudiante: (estudiante) => {
        set({ selectedEstudiante: estudiante });
    },
}));
