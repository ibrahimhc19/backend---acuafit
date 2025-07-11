import {
    ColumnDef,
} from "@tanstack/react-table"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PropsWithChildren, ReactNode } from "react";

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
    acudiente_id?: number;
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
    acudiente: acudiente;
    sede: Sede;
    horario: Horario;
    requiere_acudiente: boolean;
}

export interface acudiente {
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
    horarios: Horario[];
}

export interface Horario {
    id: number;
    tipo_grupo: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    sede_id: string;
    sede: Sede;
}

export interface Pago {
    id: number;
    facturacion_id: number;
    estudiante_id: number;
    monto: number;
    fecha_pago: string;
    metodo_pago: string;
    numero_referencia_pago: string;
    soporte_pago: string;
    estudiante: Estudiante;
    factura: Factura;
}
export interface Factura {
    id: number;
    estudiante_id: number;
    estudiante: Estudiante;
    pagado_por: string;
    tipo_documento_pagador: string;
    documento_pagador: string;
    correo_pagador: string;
    direccion_pagador: string;
    celular_pagador: string;
    concepto: string;
    categoria_pago: string;
    valor_curso: number;
    valor_matricula: number;
    sede_id: number;
    sede: Sede;
    fecha_limite_exoneracion: string;
    created_at: string
}


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    // handlePageChange: (type: 'first' | 'previous' | 'next' | 'last') => void;
    // pageLinks: PageLinks;
    // pageNumRefs: PageNumRefs;
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

export interface PageNumRefs {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    next_page: number | null;
}
export interface PageLinks {
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface AuthProviderProps {
    children: ReactNode;
}


export interface AuthContextType {
    user: User | null;
    login: (data: IFormInput) => Promise<void>;
    logout: () => Promise<void>;
    apiError: string | null;
    setApiError: (error: string | null) => void;
    getUser: () => Promise<void>;
    loading: boolean;
    hasRole: (role: string) => boolean;
    hasPermission: (perm: string) => boolean;
}

export interface User {
    id: number;
    name: string;
    email: string
    password: string;
    nombres: string
    apellidos: string
    role: string
    tipo_documento: string;
    documento_identidad: string;
    telefono: string;
    avatar_url: string;
    avatar_initials: string;
    roles: string[];
    permissions: string[];
    google_id: string;
}

export interface ProtectedRouteProps {
    redirectPath?: string;
}

// export type ProtectedRouteProps = PropsWithChildren & {
//     redirectPath?: string;
//     allowedRoles?: User["roles"][];
// }

export interface LaravelValidationError {
    message: string;
    errors?: Record<string, string[]>;
    validationErrors?: Record<string, string[]>;
};



export interface ModalState {
    setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
}
