import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PaketCatering from "./pages/PaketCatering";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import Pesanan from "./pages/Pesanan";
import Pengiriman from "./pages/Pengiriman";
import Anggota from "./pages/anggota";
import LoginPage from "./pages/LoginPage";
import { getSession } from "./api/session";
import "./theme.css";
import "./App.css";

function ProtectedRoute() {
  return getSession() ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const showSidebar = !isLoginPage && getSession();

  return (
    <div className={`app ${isLoginPage ? "app-auth" : ""}`}>
      {showSidebar && <Sidebar />}

      <main
        className={`app-main ${isLoginPage ? "auth-main" : ""}`}
        aria-label="Konten dashboard"
      >
        <Routes>
          <Route
            path="/login"
            element={
              getSession() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/katering" element={<PaketCatering />} />
            <Route path="/anggota" element={<Anggota />} />
            <Route path="/pesanan" element={<Pesanan />} />
            <Route path="/laporan" element={null} />
            <Route path="/pengaturan" element={<SettingsPage />} />
            <Route path="/pengiriman" element={<Pengiriman />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
