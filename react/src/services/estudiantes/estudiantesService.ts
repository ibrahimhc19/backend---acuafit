import axios from "@/api/axios";
import { LaravelValidationError, Estudiante } from "@/types";
import { AxiosError } from "axios";

export const getAll = async () => {
    try {
        const res = await axios.get("client/estudiantes");
        const response = res.data;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }
};
export const searchAll = async (query:string) => {
    try {
        const res = await axios.get(`client/buscar?q=${query}`);
        const response = res.data;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }
};

export const create = async (data: Partial<Estudiante>) => {
    try {
        const res = await axios.post("client/estudiante", data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };

    }
};

export const update = async (id: number, data: Partial<Estudiante>) => {
    try {
        const res = await axios.patch(`client/estudiante/${id}`, data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
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
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }

};
