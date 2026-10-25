import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PaketCatering from './pages/PaketCatering';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  function renderPage() {
    switch (activePage) {
      case 'katering':
        return <PaketCatering />;

      case 'dashboard':
        return <h1>Dashboard</h1>;

      case 'anggota':
        return <h1>Anggota</h1>;

      case 'pesanan':
        return <h1>Pesanan</h1>;

      case 'pengiriman':
        return <h1>Pengiriman</h1>;

      case 'laporan':
        return <h1>Laporan</h1>;

      case 'pengaturan':
        return <h1>Pengaturan</h1>;

      default:
        return <h1>Dashboard</h1>;
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeItem={activePage}
        onSelectItem={setActivePage}
      />

      <main className="app-main" aria-label="Konten dashboard">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;