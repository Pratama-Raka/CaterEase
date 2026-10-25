import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function getCurrentPage() {
  return window.location.hash.slice(1) || "dashboard";
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    function syncCurrentPage() {
      setCurrentPage(getCurrentPage());
    }
    window.addEventListener("hashchange", syncCurrentPage);
    return () => window.removeEventListener("hashchange", syncCurrentPage);
  }, []);

  const pageTitle =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="app">
      <Sidebar activeItem={currentPage} />
      <main className="app-main" aria-label="Konten dashboard">
        {currentPage === "pengaturan" ? (
          <SettingsPage />
        ) : (
          <section className="page-placeholder" aria-labelledby="page-title">
            <h1 id="page-title">{pageTitle}</h1>
            <p>Konten halaman ini belum tersedia.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
