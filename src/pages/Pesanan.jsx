import { useState } from "react";
import { Search, UserRound, CalendarDays, MapPin } from "lucide-react";
import "./Pesanan.css";

const orders = [
  {
    id: "102",
    nama: "Budi Santoso",
    tanggal: "12/04/2026",
    status: "Terkonfirmasi",
    acara: "Pernikahan",
    alamat: "Jl. Melati no 12",
    paket: "Paket Silver",
    porsi: 150,
    harga: 40000,
  },
  {
    id: "022",
    nama: "Dewi Resque",
    tanggal: "07/09/2026",
    status: "Tertunda",
    acara: "Ulang Tahun Anak",
    alamat: "Jl. Sidoarjo no 89",
    paket: "Paket Gold",
    porsi: 500,
    harga: 55000,
  },
];

function Pesanan() {
  const [selected, setSelected] = useState(orders[0]);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pesanan">
      <section className="order-list">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Cari pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h3>Daftar Pesanan</h3>

        {filteredOrders.map((order) => (
          <button
            className="order-item"
            key={order.id}
            onClick={() => setSelected(order)}
          >
            <b>#{order.id}</b>
            <span>{order.nama}</span>
            <small>{order.status}</small>
          </button>
        ))}
      </section>

      <section className="order-detail">
        <h2>Order Details</h2>

        <div className="detail-item">
          <UserRound />
          <div>
            <small>Nama Pelanggan</small>
            <b>{selected.nama}</b>
          </div>
        </div>

        <div className="detail-item">
          <CalendarDays />
          <div>
            <small>Detail Acara</small>
            <b>{selected.acara}</b>
            <span>{selected.tanggal}</span>
          </div>
        </div>

        <div className="detail-item">
          <MapPin />
          <div>
            <small>Alamat</small>
            <b>{selected.alamat}</b>
          </div>
        </div>

        <div className="package-box">
          <h3>{selected.paket}</h3>
          <p>{selected.porsi} Porsi</p>
          <p>Rp{selected.harga.toLocaleString("id-ID")} / porsi</p>
          <hr />
          <b>
            Total: Rp
            {(selected.harga * selected.porsi).toLocaleString("id-ID")}
          </b>
        </div>

        <button
          className="confirm-button"
          onClick={() => alert("Pesanan dikonfirmasi")}
        >
          Konfirmasi Pesanan
        </button>
      </section>
    </div>
  );
}

export default Pesanan;