import Sidebar from "./components/Sidebar";
import Pesanan from "./pages/Pesanan";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="app-main" aria-label="Konten dashboard">
        <Pesanan />
      </main>
    </div>
  );
}

export default App;