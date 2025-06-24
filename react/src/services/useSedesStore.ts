// src/stores/useSedesStore.ts
import { create } from "zustand";
import { Sede } from "@/types";
import * as sedesService from "@/services/sedesService";

interface SedesStore {
    sedes: Sede[];
    selectedSede: Sede | null;
    loading: boolean;
    error: string | null;

    fetchSedes: () => Promise<void>;
    createSede: (data: Partial<Sede>) => Promise<void>;
    updateSede: (id: number, data: Partial<Sede>) => Promise<void>;
    deleteSede: (id: number) => Promise<void>;
    selectSede: (sede: Sede | null) => void;
}

export const useSedesStore = create<SedesStore>((set, get) => ({
    sedes: [],
    selectedSede: null,
    loading: false,
    error: null,

    fetchSedes: async () => {
        set({ loading: true, error: null });
        try {
            const data = await sedesService.getAll();
            set({ sedes: data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar sedes" });
        } finally {
            set({ loading: false });
        }
    },

    createSede: async (data) => {
        await sedesService.create(data);
        await get().fetchSedes();
    },

    updateSede: async (id, data) => {
        await sedesService.update(id, data);
        await get().fetchSedes();
    },

    deleteSede: async (id) => {
        await sedesService.remove(id);
        await get().fetchSedes();
    },

    selectSede: (sede) => {
        set({ selectedSede: sede });
    },
}));
