
import { useEffect, useState } from "react";
import { Search, UserRound, CalendarDays, MapPin } from "lucide-react";
import "./Pesanan.css";

function Pesanan() {
  const [orders, setOrders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/src/data/pesanan.json")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setSelected(data[0] || null);
      })
      .catch((error) => console.error("Gagal mengambil pesanan:", error));

    fetch("/src/data/paket-katering.json")
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Gagal mengambil paket:", error));
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.namaPelanggan.toLowerCase().includes(search.toLowerCase())
  );

  const selectedPackage = packages.find(
    (item) => item.id === selected?.paketId
  );

  function handleConfirm() {
    setMessage("Pesanan berhasil dikonfirmasi!");
  }

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
            onClick={() => {
              setSelected(order);
              setMessage("");
            }}
          >
            <b>#{order.id}</b>
            <span>{order.namaPelanggan}</span>
            <small>{order.status}</small>
          </button>
        ))}

        {filteredOrders.length === 0 && (
          <p>Pesanan tidak ditemukan.</p>
        )}
      </section>

      <section className="order-detail">
        <h2>Order Details</h2>

        {selected && (
          <>
            <div className="detail-item">
              <UserRound />
              <div>
                <small>Nama Pelanggan</small>
                <b>{selected.namaPelanggan}</b>
              </div>
            </div>

            <div className="detail-item">
              <CalendarDays />
              <div>
                <small>Detail Acara</small>
                <b>Belum tersedia</b>
              </div>
            </div>

            <div className="detail-item">
              <MapPin />
              <div>
                <small>Alamat</small>
                <b>Belum tersedia</b>
              </div>
            </div>

            <div className="package-box">
              <h3>
                {selectedPackage?.name || "Paket Katering"}
              </h3>

              <p>{selected.jumlahPorsi} Porsi</p>

              <p>
                Rp
                {(selected.totalHarga / selected.jumlahPorsi).toLocaleString("id-ID")}
                {" / porsi"}
              </p>

              <hr />

              <b>
                Total: Rp
                {selected.totalHarga.toLocaleString("id-ID")}
              </b>
            </div>

            <button
              className="confirm-button"
              onClick={handleConfirm}
              disabled={selected.status === "Terkonfirmasi"}
            >
              Konfirmasi Pesanan
            </button>

            {message && (
              <div className="confirm-message">
                {message}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Pesanan;
