import { useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import PaketCatering from "./pages/PaketCatering";
import MenuKatering from "./pages/MenuKatering";
import Pesanan from "./pages/Pesanan";
import Pengiriman from "./pages/Pengiriman";
import SettingsPage from "./pages/SettingsPage";
import Anggota from "./pages/anggota";
import LoginPage from "./pages/LoginPage";
import { getSession } from "./api/session";
import "./theme.css";
import "./App.css";

function ProtectedRoute() {
  return getSession() ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const [cari, setCari] = useState("");
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
        {!isLoginPage && <Navbar cari={cari} setCari={setCari} />}

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
            <Route path="/menu-katering" element={<MenuKatering />} />
            <Route path="/anggota" element={<Anggota />} />
            <Route path="/pesanan" element={<Pesanan />} />
            <Route
            path="/pengiriman"
            element={<Pengiriman cari={cari} setCari={setCari} />}
          />
            <Route path="/laporan" element={null} />
            <Route path="/pengaturan" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
