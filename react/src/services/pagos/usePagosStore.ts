import { create } from "zustand";
import { Pago } from "@/types";
import * as pagosService from "@/services/pagos/pagosService";

interface PagosStore {
    pagos: Pago[];
    selectedPago: Pago | null;
    loading: boolean;
    error: string | null;

    fetchPagos: () => Promise<void>;
    createPago: (data: Partial<Pago>) => Promise<void>;
    updatePago: (id: number, data: Partial<Pago>) => Promise<void>;
    deletePago: (id: number) => Promise<void>;
    selectPago: (pago: Pago | null) => void;
}

export const usePagosStore = create<PagosStore>((set, get) => ({
    pagos: [],
    selectedPago: null,
    loading: false,
    error: null,

    fetchPagos: async () => {
        set({ loading: true, error: null });
        try {
            const data = await pagosService.getAll();
            set({ pagos: data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({ error: err.message || "Error al cargar pagos" });
        } finally {
            set({ loading: false });
        }
    },

    createPago: async (data) => {
        await pagosService.create(data);
        await get().fetchPagos();
    },

    updatePago: async (id, data) => {
        await pagosService.update(id, data);
        await get().fetchPagos();
    },

    deletePago: async (id) => {
        await pagosService.remove(id);
        await get().fetchPagos();
    },

    selectPago: (pago) => {
        set({ selectedPago: pago });
    },
}));
