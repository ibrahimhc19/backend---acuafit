import { create } from "zustand";
import { Horario } from "@/types";
import * as horariosService from "@/services/horarios/horariosService";

interface HorariosStore {
    horarios: Horario[];
    selectedHorario: Horario | null;
    loading: boolean;
    error: string | null;

    fetchHorarios: () => Promise<void>;
    createHorario: (data: Partial<Horario>) => Promise<void>;
    updateHorario: (id: number, data: Partial<Horario>) => Promise<void>;
    deleteHorario: (id: number) => Promise<void>;
    selectHorario: (horario: Horario | null) => void;
}

export const useHorariosStore = create<HorariosStore>((set, get) => ({
    horarios: [],
    selectedHorario: null,
    loading: false,
    error: null,

    fetchHorarios: async () => {
        set({ loading: true, error: null });
        try {
            const data = await horariosService.getAll();
            set({ horarios: data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar horarios" });
        } finally {
            set({ loading: false });
        }
    },

    createHorario: async (data) => {
        await horariosService.create(data);
        await get().fetchHorarios();
    },

    updateHorario: async (id, data) => {
        await horariosService.update(id, data);
        await get().fetchHorarios();
    },

    deleteHorario: async (id) => {
        await horariosService.remove(id);
        await get().fetchHorarios();
    },

    selectHorario: (horario) => {
        set({ selectedHorario: horario });
    },
}));
