import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./components/login-form.tsx"));
import Layout from "./layouts/Layout";
import Home from "./pages/Home.tsx";
const Students = lazy(() => import("./pages/Students/Students.tsx"));
const Parents = lazy(() => import("./pages/Parents.tsx"));
const Locations = lazy(() => import("./pages/Locations/Locations.tsx"));
const Schedules = lazy(() => import("./pages/Schedules/Schedules.tsx"));
const Payments = lazy(() => import("./pages/Payments.tsx"));
const Accounting = lazy(() => import("./pages/Accounting/Accounting.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));
const Registration = lazy(() => import("./pages/Registration.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
import { ProtectedRoute } from "./components/protectedRoutes.tsx";

export default function App() {
  return (
    <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inscripcion" element={<Registration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/estudiantes" element={<Students />} />
              <Route path="/representantes" element={<Parents />} />
              <Route path="/sedes" element={<Locations />} />
              <Route path="/horarios" element={<Schedules />} />
              <Route path="/pagos" element={<Payments />} />
              <Route path="/facturacion" element={<Accounting />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/registro" element={<Register />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}
