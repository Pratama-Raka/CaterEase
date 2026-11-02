import { Search } from "lucide-react";

function DaftarPesanan({ pesanan, dipilih, setDipilih, cari, setCari }) {
  const hasil = pesanan.filter((p) =>
    `${p.id} ${p.nama}`.toLowerCase().includes(cari.toLowerCase()),
  );

  return (
    <section className="kirim-card kirim-list">
      <div className="kirim-search">
        <Search size={17} />
        <input
          className="form-control"
          placeholder="Cari di sini..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
      </div>

      <div className="kirim-table-head">
        <span>ID Pesanan</span>
        <span>Pelanggan</span>
        <span>Tanggal</span>
        <span>Status</span>
      </div>

      <div className="kirim-orders">
        {hasil.map((p) => (
          <button
            key={p.id}
            className={`kirim-row ${dipilih.id === p.id ? "active" : ""}`}
            onClick={() => setDipilih(p)}
          >
            <span>#{p.id}</span>
            <span>{p.nama}</span>
            <span>{p.tanggal}</span>
            <span>{p.status}</span>
          </button>
        ))}
      </div>

      {!hasil.length && (
        <p className="text-center text-muted small mt-3">
          Pesanan tidak ditemukan.
        </p>
      )}
    </section>
  );
}

export default DaftarPesanan;
