import axios from "@/api/axios";
import { LaravelValidationError, Pago } from "@/types";
import { AxiosError } from "axios";

export const getAll = async () => {
    try {
        const res = await axios.get("client/pagos");
        const response = res.data;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }
};

export const create = async (data: Partial<Pago>) => {
    try {
        const res = await axios.post("client/pago", data);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };

    }
};

export const update = async (id: number, data: Partial<Pago>) => {
    try {
        const res = await axios.patch(`client/pago/${id}`, data);
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
        const res = await axios.delete(`client/pago/${id}`);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError<LaravelValidationError>
        const message = axiosError.response?.data?.message ?? "Error inesperado";
        const validationErrors = axiosError.response?.data?.errors;
        throw { message, validationErrors };
    }

};
