// import { FileText } from "lucide-react";
export const DIAS_SEMANA = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];
// Si se va a modificar también se debe cambiar el enum en el backend
export const TIPOS_GRUPO = [
    "Adultos",
    "Hidroaeróbicos",
    "Apnea",
    "Niños",
    "Niños 2-4 años",
    "Niños 5-10 años",
    "Bebés 10-23 meses",
];

export const TIPOS_DOCUMENTO = ["TI", "RC", "CC", "DE"];

// export const TIPOS_DOCUMENTO = [
//     "Tarjeta de identidad",
//     "Registro civil",
//     "Cédula de ciudadanía",
//     "Documento extranjero",
// ];

export const FILAS = [
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
];
// export const TIPOS_DOCUMENTO = [
//     { label: "Tarjeta de identidad", value: "TI" },
//     { label: "Registro civil", value: "RC" },
//     { label: "Cédula de ciudadanía", value: "CC" },
//     { label: "Documento extranjero", value: "DE" },
// ];


export const CONCEPTOS = [
    { name: "Matrícula", value: "matricula" },
    { name: "Mensualidad", value: "mensualidad" },
    { name: "Bimestre", value: "bimestre" },
    { name: "Trimestre", value: "trimestre" },
];

export const LINKS = [
    {
        name: "Gestión académica",
        children: [
            { name: "Asistencias", href: "/asistencias" },
            { name: "Estudiantes", href: "/estudiantes" },
            { name: "Registro", href: "/registro" },
        ],
    },
    {
        name: "Operación de clases",
        children: [
            { name: "Grupos", href: "/grupos" },
            { name: "Horarios", href: "/horarios" },
            { name: "Sedes", href: "/sedes" },
        ],
    },
    {
        name: "Contabilidad",
        // icon: <FileText className="h-5 w-5 text-primary group-hover:text-white" />,
        role: "contadora",
        children: [
            { name: "Listado de facturas", href: "/facturas" },
            { name: "Inscripción de facturas", href: "/facturas/inscripcion" },
            { name: "Listado de pagos", href: "/pagos" },
            { name: "Inscripción de pagos", href: "/pagos/inscripcion" },
        ],
    },
];
