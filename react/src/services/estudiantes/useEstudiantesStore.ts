import { create } from "zustand";
import { Estudiante } from "@/types";
import * as estudiantesService from "@/services/estudiantes/estudiantesService";

interface EstudiantesStore {
    estudiantes: Estudiante[];
    selectedEstudiante: Estudiante | null;
    loading: boolean;
    error: string | null;

    fetchEstudiantes: () => Promise<void>;
    searchEstudiantes: (query:string) => Promise<void>;
    createEstudiante: (data: Partial<Estudiante>) => Promise<void>;
    updateEstudiante: (id: number, data: Partial<Estudiante>) => Promise<void>;
    deleteEstudiante: (id: number) => Promise<void>;
    selectEstudiante: (estudiante: Estudiante | null) => void;
}

export const useEstudiantesStore = create<EstudiantesStore>((set, get) => ({
    estudiantes: [],
    selectedEstudiante: null,
    loading: false,
    error: null,

    fetchEstudiantes: async () => {
        set({ loading: true, error: null });
        try {
            const data = await estudiantesService.getAll();
            set({ estudiantes: data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar estudiantes" });
        } finally {
            set({ loading: false });
        }
    },
    searchEstudiantes: async (query) => {
        set({ loading: true, error: null });
        try {
            const data = await estudiantesService.searchAll(query);
            set({ estudiantes: data });
            // Deuda
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar estudiantes" });
        } finally {
            set({ loading: false });
        }
    },

    createEstudiante: async (data) => {
        await estudiantesService.create(data);
        await get().fetchEstudiantes();
    },

    updateEstudiante: async (id, data) => {
        await estudiantesService.update(id, data);
        await get().fetchEstudiantes();
    },

    deleteEstudiante: async (id) => {
        await estudiantesService.remove(id);
        await get().fetchEstudiantes();
    },

    selectEstudiante: (estudiante) => {
        set({ selectedEstudiante: estudiante });
    },
}));
