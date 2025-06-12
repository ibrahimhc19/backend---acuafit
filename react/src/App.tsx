import {
  BrowserRouter as Router,
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
import Registration from "./pages/Registration";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* <Route element={<DashboardLayout />}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/estudiantes" element={<Students />} />
            <Route path="/representantes" element={<Parents />} />
            <Route path="/sedes" element={<Locations />} />
            <Route path="/horarios" element={<Schedules />} />
            <Route path="/pagos" element={<Payments />} />
            <Route path="/facturacion" element={<Accounting />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/tabla" element={<Students />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}
