import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash.slice(1),
  );

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(window.location.hash.slice(1));
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <main className="app-main" aria-label="Konten dashboard">
        {currentPage === "pengaturan" && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
