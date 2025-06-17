import {
    ColumnDef,
} from "@tanstack/react-table"
import { ReactNode } from "react";

export interface IFormInput {
    email: string;
    password: string;
}

export interface Estudiante {
    id: number;
    nombres: string;
    apellidos: string;
    tipo_documento: string;
    documento_identidad: string;
    edad: number;
    representante_id?: number;
    sede_id: number;
    horario_id: number;
    fecha_inscripcion: string;
    correo: string;
    direccion: string;
    telefono: string;
    rut: string;
    autoriza_uso_imagen: boolean;
    acepta_reglamento: boolean;
    observaciones: string;
    representante: Representante;
    sede: Sede;
    horario: Horario;
}

export interface Representante {
    id: number;
    nombres: string;
    apellidos: string;
    tipo_documento: string;
    documento_identidad: string;
    telefono: string;
    email: string;
    direccion: string | null;
    rut: string | null;
}

export interface Sede {
    id: number;
    nombre: string;
    direccion: string;
}

export interface Horario {
    id: number;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    handlePageChange: (type: 'first' | 'previous' | 'next' | 'last') => void
    nextPage: string | null
    previousPage: string | null
    currentPage: number
}

export interface FormData {
    nombres_estudiante: string;
    apellidos_estudiante: string;
    tipo_documento_estudiante: string;
    numero_documento_estudiante: string;
    requiere_acudiente: boolean;
    nombre_acudiente: string;
    numero_documento_acudiente: string;
    email_contacto: string;
    direccion_residencia: string;
    celular_contacto: string;
    numero_rut: string;
    edad_estudiante: string;
    sede: string;
    grupo_horario: string;
    autorizacion_imagen: string;
    acuerdo_reglamento: boolean;
}

export interface FormErrors {
    [key: string]: string;
}


export interface AuthProviderProps {
    children: ReactNode;
}


export interface AuthContextType {
user: unknown;
login: (data: IFormInput) => Promise<void>;
logout: (data: IFormInput) => Promise<void>;
apiError: string;
getUser: () => Promise<void>;
}

// export interface User {
//     email: string
//     nombre: string
// }
