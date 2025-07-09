import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login/LoginPage.tsx"));
const Registration = lazy(
    () => import("./pages/Registration/Registration.tsx")
);
import Succes from "./pages/Registration/Success.tsx";
const NotFoundPage = lazy(
    () => import("./pages/NotFoundPage/NotFoundPage.tsx")
);

import Layout from "./layouts/Layout";
import Home from "./pages/Home.tsx";

import { Attendance } from "./pages/Attendance/Attendance.tsx";
const Students = lazy(() => import("./pages/Students/Students.tsx"));
const Register = lazy(() => import("./pages/Registration/Register.tsx"));

import { Groups } from "./pages/Groups/Groups.tsx";
const Schedules = lazy(() => import("./pages/Schedules/Schedules.tsx"));
const Locations = lazy(() => import("./pages/Locations/Locations.tsx"));

const Invoices = lazy(() => import("./pages/Accounting/Invoices/Invoices.tsx"));
import InvoiceRegistration from "./pages/Accounting/Invoices/register/InvoiceRegistration.tsx";
const Payments = lazy(() => import("./pages/Accounting/Payments/Payments.tsx"));
import PaymentRegistration from "./pages/Accounting/Payments/register/PaymentRegistration.tsx";

import { ProtectedRoute } from "./components/protectedRoutes.tsx";

export default function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/inscripcion" element={<Registration />} />
                <Route path="/inscripcion/exito" element={<Succes />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* <Route element={<ProtectedRoute />}> */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Home />} />
                    {/* Gestión Académica */}
                    <Route path="/asistencias" element={<Attendance />} />
                    <Route path="/estudiantes" element={<Students />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/registro/:id" element={<Register />} />
                    {/* Operacional */}
                    <Route path="/grupos" element={<Groups />} />
                    <Route path="/horarios" element={<Schedules />} />
                    <Route path="/sedes" element={<Locations />} />
                    {/* Contabilidad */}
                    <Route path="/facturas" element={<Invoices />} />
                    <Route
                        path="/facturas/inscripcion"
                        element={<InvoiceRegistration />}
                    />
                    <Route path="/pagos" element={<Payments />} />
                    <Route
                        path="/pagos/inscripcion"
                        element={<PaymentRegistration />}
                    />
                </Route>
                {/* </Route> */}
            </Routes>
        </div>
    );
}
