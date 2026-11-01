import { useState } from "react";
import buktiPengiriman from "../assets/catering-buffet.jpg";
import {
  Search,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Maximize2,
  Minimize2,
  Bell,
  CalendarDays,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import "./Pengiriman.css";

const pesanan = [
  {
    id: "102",
    nama: "Budi Santoso",
    tanggal: "12/04/2026",
    status: "Selesai",
    penerima: "Supri",
    hp: "0812-6387-3241",
    kurir: "0811-6738-2435",
    email: "santoso.budi@gmail.com",
  },
  {
    id: "022",
    nama: "Andi Wijaya",
    tanggal: "07/09/2026",
    status: "Selesai",
    penerima: "Dede",
    hp: "0821-2577-9826",
    kurir: "0821-0904-2422",
    email: "wijayaandi98@gmail.com",
  },
  {
    id: "110",
    nama: "Dewi Septiani",
    tanggal: "22/02/2026",
    status: "Selesai",
    penerima: "Rudi",
    hp: "0813-2204-1128",
    kurir: "0819-5827-3301",
    email: "dewi@gmail.com",
  },
];

const alamat =
  "Jl. Podomoro Boulevard Utara No. 1, Lengkong, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287";

const menu = ["Ayam Bakar", "Ikan Goreng", "Ayam Teriyaki", "Air Mineral"];

const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=107.60%2C-6.99%2C107.67%2C-6.94&layer=mapnik";

function Peta() {
  return <iframe title="Peta pengiriman Bandung" src={mapUrl} loading="lazy" />;
}

function Pengiriman() {
  const [dipilih, setDipilih] = useState(pesanan[1]);
  const [cari, setCari] = useState("");
  const [besar, setBesar] = useState(false);

  const hasil = pesanan.filter((p) =>
    `${p.id} ${p.nama}`.toLowerCase().includes(cari.toLowerCase()),
  );

  const informasi = [
    [
      "Informasi pelanggan",
      [
        [UserRound, dipilih.nama],
        [Phone, dipilih.hp],
        [Mail, dipilih.email],
      ],
    ],
    [
      "Informasi pengiriman",
      [
        [UserRound, dipilih.penerima],
        [Phone, dipilih.kurir],
      ],
    ],
  ];

  return (
    <div className="kirim-page">
      {/* Header admin */}

      {/* Navbar */}
      <header className="kirim-navbar">
        <div className="kirim-nav-search">
          <Search size={21} />
          <input
            type="text"
            placeholder="Search here"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
          />
        </div>

        <div className="kirim-nav-right">
          <div className="kirim-nav-icons">
            {[
              { Icon: Bell, angka: 12 },
              { Icon: CalendarDays, angka: 5 },
              { Icon: Mail, angka: 2 },
              { Icon: LayoutGrid, angka: "!", merah: true },
            ].map(({ Icon, angka, merah }, i) => (
              <button
                key={i}
                type="button"
                className="kirim-nav-icon"
                aria-label={`Notifikasi ${i + 1}`}
              >
                <Icon size={21} />
                <span className={merah ? "badge-merah" : ""}>{angka}</span>
              </button>
            ))}
          </div>

          <div className="kirim-nav-profile">
            <div className="kirim-nav-avatar">AP</div>

            <div className="kirim-nav-user">
              <strong>Azzhara Putri</strong>
              <small>Super Admin</small>
            </div>

            <ChevronDown size={17} />
          </div>
        </div>
      </header>

      {/* Judul halaman */}
      <div className="kirim-heading">
        <h1>Pengiriman</h1>
        <p>Kelola dan pantau pengiriman pesanan katering.</p>
      </div>

      {/* Tata letak halaman */}
      <div className={`kirim-layout ${besar ? "besar" : ""}`}>
        {/* Daftar pesanan */}
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

        {/* Detail pesanan */}
        <section className="kirim-card kirim-detail">
          <div className="kirim-detail-head">
            <h2>Detail Pesanan</h2>
            <button
              aria-label={besar ? "Perkecil detail" : "Perbesar detail"}
              onClick={() => setBesar(!besar)}
            >
              {besar ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
            </button>
          </div>

          <div className="kirim-detail-grid">
            {/* Informasi pelanggan dan pengiriman */}
            <div className="kirim-main">
              <div className="kirim-info-grid">
                {informasi.map(([judul, items]) => (
                  <div key={judul}>
                    <h3>{judul}</h3>

                    {items.map(([Icon, teks], i) => (
                      <div className="kirim-info" key={i}>
                        <span className="kirim-icon">
                          <Icon size={18} />
                        </span>
                        <span>{teks}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Status pengiriman */}
              <div className="kirim-soft kirim-status">
                <h3>Status</h3>
                <div className="kirim-steps">
                  <span>Pesanan Dikonfirmasi</span>
                  <span>→</span>
                  <span>Konfirmasi Pengiriman</span>
                  <span>→</span>
                  <span>Dalam Pengiriman</span>
                  <span>→</span>
                  <span className="kuning">Pesanan Tiba</span>
                </div>
              </div>

              {/* Informasi tambahan saat diperbesar */}
              {besar && (
                <div className="kirim-extra">
                  {/* Waktu kedatangan */}
                  <div className="kirim-soft kirim-center">
                    <h3>Waktu kedatangan</h3>
                    <p>21:40</p>
                  </div>

                  {/* Catatan pengiriman */}
                  <div className="kirim-soft">
                    <h3>Catatan Khusus</h3>
                    <p>Diterima dengan saudara Firna</p>
                  </div>

                  {/* Bukti pengiriman */}
                  <div className="kirim-soft">
                    <h3>Bukti Pengiriman</h3>

                    <div className="kirim-bukti">
                      <img
                        src={buktiPengiriman}
                        alt="Bukti pengiriman katering"
                        className="bukti-img"
                      />
                    </div>
                  </div>

                  {/* Paket katering */}
                  <div className="kirim-soft">
                    <h3>Package Choosen</h3>
                    <p>Menu:</p>
                    <ul>
                      {menu.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Peta dan alamat pengiriman */}
            <div className="kirim-map-column">
              {besar && (
                <div className="kirim-soft kirim-big-map">
                  <Peta />
                </div>
              )}

              <div className="kirim-soft kirim-address">
                <h3>Alamat</h3>
                <div className="kirim-address-grid">
                  <Peta />
                  <div>
                    <MapPin size={16} />
                    <p>{alamat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Pengiriman;
