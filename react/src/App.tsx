import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import Locations from "./pages/Locations.tsx";
import Accounting from "./pages/Accounting/Accounting.tsx";
import Students from "./pages/Students/Students.tsx";
import Schedules from "./pages/Schedules.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home.tsx";
import Parents from "./pages/Parents.tsx";
import Payments from "./pages/Payments.tsx";
import Login from "./components/login-form.tsx";
import Registration from "./pages/Registration.tsx";
import { ProtectedRoute } from "./components/protectedRoutes.tsx";

export default function App() {
  return (
    <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registration />} />
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
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}
