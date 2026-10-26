import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PaketCatering from "./pages/PaketCatering";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import Pesanan from "./pages/Pesanan";
import Pengiriman from "./pages/Pengiriman";
import Anggota from "./pages/anggota";
import "./theme.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="app-main" aria-label="Konten dashboard">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/katering" element={<PaketCatering />} />
          <Route path="/anggota" element={<Anggota />} />
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/laporan" element={null} />
          <Route path="/pengaturan" element={<SettingsPage />} />
          <Route path="/pengiriman" element={<Pengiriman />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
