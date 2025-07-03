import axios from "@/api/axios";
import { FormDataInscripcion } from "@/pages/Registration/Registration";
import { LaravelValidationError } from "@/types";
import { AxiosError } from "axios";

export const getAll = async (page?: string, query?: string, per_page?: number) => {
    try {
        if (query && query?.trim() !== "") {
            const res = await axios.get(`client/buscar?q=${encodeURIComponent(query)}&per_page=${per_page}${page? `&page=${page}` : ""}`);
            return res.data
        } else {
            const params = new URLSearchParams();
            if (per_page) params.append("per_page", per_page.toString());
            if (page) params.append("page", page);

            const res = await axios.get(`client/estudiantes?${params.toString()}`);

            return res.data
        }

    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.validationErrors;
        throw { message, validationErrors };
    }
};

export const getById = async (id: number) => {
    try {
        const res = await axios.get(`client/estudiante/${id}`);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.validationErrors;
        throw { message, validationErrors };
    }

};

export const create = async (data: Partial<FormDataInscripcion>) => {
    try {
        const res = await axios.post("client/estudiante", data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.validationErrors;
        throw { message, validationErrors };

    }
};

export const update = async (id: number, data: Partial<FormDataInscripcion>) => {
    try {
        const res = await axios.patch(`client/estudiante/${id}`, data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.validationErrors;
        throw { message, validationErrors };
    }
};

export const remove = async (id: number) => {
    try {
        const res = await axios.delete(`client/estudiante/${id}`);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.validationErrors;
        throw { message, validationErrors };
    }

};

