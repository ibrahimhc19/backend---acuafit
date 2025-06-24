import axios from "@/api/axios";
import { LaravelValidationError, Sede } from "@/types";
import { AxiosError } from "axios";

export const getAll = async () => {
    try {
        const res = await axios.get("client/sedes");
        const response = res.data;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }
};

export const create = async (data: Partial<Sede>) => {
    try {
        const res = await axios.post("client/sede", data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };

    }
};

export const update = async (id: number, data: Partial<Sede>) => {
    try {
        const res = await axios.patch(`client/sede/${id}`, data);
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
        const res = await axios.delete(`client/sede/${id}`);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }

};
