import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PaketCatering from "./pages/PaketCatering";
import MenuKatering from "./pages/MenuKatering";
import SettingsPage from "./pages/SettingsPage";
import Anggota from "./pages/anggota";
import Dashboard from "./pages/Dashboard";
import Pesanan from "./pages/Pesanan";
import LoginPage from "./pages/LoginPage";
import "./theme.css";
import "./App.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={`app ${isLoginPage ? "app-auth" : ""}`}>
      {!isLoginPage && <Sidebar />}

      <main className={`app-main ${isLoginPage ? "auth-main" : ""}`} aria-label="Konten dashboard">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/katering" element={<PaketCatering />} />
          <Route path="/menu-katering" element={<MenuKatering />} />
          <Route path="/anggota" element={<Anggota />} />
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/laporan" element={null} />
          <Route path="/pengaturan" element={<SettingsPage />} />
          <Route path="/pengiriman" element={null} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
