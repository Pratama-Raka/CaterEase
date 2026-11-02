import { useState } from "react";
import {
  CalendarDays, Download, Search, ShoppingBag, Wallet, Users, TrendingUp,
} from "lucide-react";
import "./Laporan.css";

// Data contoh untuk tampilan demonstrasi.
const reports = [
  {
    id: "orders",
    label: "Jumlah Pesanan",
    icon: ShoppingBag,
    title: "Ringkasan Pesanan",
    description: "Ringkasan jumlah pesanan selama periode yang dipilih.",
    value: "420",
    change: "+12%",
    chart: [28, 36, 31, 48, 43, 58, 52, 68, 61, 78, 72, 88],
    statuses: [
      { label: "Selesai", value: 280, color: "green" },
      { label: "Diproses", value: 100, color: "yellow" },
      { label: "Dibatalkan", value: 40, color: "red" },
    ],
  },
  {
    id: "income",
    label: "Pendapatan",
    icon: Wallet,
    title: "Ringkasan Pendapatan",
    description: "Ringkasan pendapatan selama periode yang dipilih.",
    value: "Rp40.000.000",
    change: "+12%",
    chart: [25, 32, 30, 45, 42, 56, 54, 65, 60, 76, 72, 90],
    statuses: [
      { label: "Paket katering", value: "Rp28 jt", color: "green" },
      { label: "Pesanan tambahan", value: "Rp8 jt", color: "yellow" },
      { label: "Lainnya", value: "Rp4 jt", color: "blue" },
    ],
  },
  {
    id: "members",
    label: "Jumlah Anggota",
    icon: Users,
    title: "Ringkasan Anggota",
    description: "Ringkasan status anggota selama periode yang dipilih.",
    value: "45",
    change: "+5%",
    chart: [18, 24, 22, 30, 35, 32, 42, 46, 51, 58, 62, 70],
    statuses: [
      { label: "Aktif", value: 32, color: "green" },
      { label: "Baru", value: 8, color: "blue" },
      { label: "Tidak aktif", value: 5, color: "orange" },
    ],
  },
  {
    id: "growth",
    label: "Perkembangan",
    icon: TrendingUp,
    title: "Ringkasan Perkembangan",
    description: "Perkembangan kinerja CaterEase selama periode yang dipilih.",
    value: "84%",
    change: "+12%",
    chart: [20, 28, 27, 35, 40, 48, 45, 58, 64, 70, 76, 84],
    statuses: [
      { label: "Target tercapai", value: "84%", color: "green" },
      { label: "Sisa target", value: "16%", color: "yellow" },
    ],
  },
];

const sampleRows = [
  { id: "ORD-102", name: "Craven C", package: "Mingguan", date: "17/04/2026", status: "Berlangsung" },
  { id: "ORD-101", name: "Yeremia Hot", package: "Mingguan", date: "10/04/2026", status: "Selesai" },
  { id: "ORD-100", name: "Budi Santoso", package: "Bulanan", date: "08/04/2026", status: "Selesai" },
  { id: "ORD-099", name: "Dewi Resque", package: "Bulanan", date: "05/04/2026", status: "Diproses" },
  { id: "ORD-098", name: "Farhan Akbar", package: "Mingguan", date: "02/04/2026", status: "Dibatalkan" },
];

function TrendChart({ values }) {
  const points = values
    .map((value, index) => {
      const x = 28 + (index * 544) / (values.length - 1);
      const y = 184 - value * 1.48;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="laporan-chart">
      <div className="laporan-chart-legend">
        <span><i /> Tren periode berjalan</span>
      </div>
      <svg viewBox="0 0 600 220" role="img" aria-label="Grafik tren laporan">
        {[42, 78, 114, 150, 186].map((y) => (
          <line key={y} x1="28" y1={y} x2="572" y2={y} className="laporan-grid-line" />
        ))}
        <polygon points={`28,186 ${points} 572,186`} className="laporan-chart-area" />
        <polyline points={points} className="laporan-chart-line" />
        {values.map((value, index) => (
          <circle
            key={index}
            cx={28 + (index * 544) / (values.length - 1)}
            cy={184 - value * 1.48}
            r="3.2"
            className="laporan-chart-point"
          />
        ))}
        {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((month, index) => (
          <text key={month} x={28 + index * 108.8} y="210" className="laporan-chart-label">
            {month}
          </text>
        ))}
      </svg>
    </div>
  );
}

function Laporan() {
  const [activeTab, setActiveTab] = useState("orders");
  const [period, setPeriod] = useState("1–30 April 2026");
  const [search, setSearch] = useState("");

  const activeReport = reports.find((report) => report.id === activeTab) || reports[0];
  const filteredRows = sampleRows.filter((row) =>
    `${row.id} ${row.name} ${row.package} ${row.status}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function handleExport() {
    window.print();
  }

  return (
    <main className="laporan-page">
      <div className="laporan-toolbar">
        <label className="laporan-select">
          <CalendarDays size={17} />
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option>1–30 April 2026</option>
            <option>1–31 Maret 2026</option>
            <option>1–28 Februari 2026</option>
          </select>
        </label>
      </div>

      <nav className="laporan-tabs" aria-label="Kategori laporan">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              type="button"
              className={`laporan-tab ${activeTab === report.id ? "active" : ""}`}
              onClick={() => setActiveTab(report.id)}
            >
              <Icon size={18} />
              <span>{report.label}</span>
            </button>
          );
        })}
      </nav>

      <section className="laporan-summary">
        <div className="laporan-summary-heading">
          <div>
            <h1>{activeReport.title}</h1>
            <p>{activeReport.description} <span>{period}</span></p>
          </div>
          <button className="laporan-export-btn" onClick={handleExport}>
            <Download size={18} />
            Ekspor
          </button>
        </div>

        <div className="laporan-summary-grid">
          <article className="laporan-chart-card">
            <div className="laporan-card-heading">
              <h2>Tren {activeReport.label}</h2>
              <span>Per bulan</span>
            </div>
            <TrendChart values={activeReport.chart} />
          </article>

          <article className="laporan-status-card">
            <h2>
              {activeTab === "orders" ? "Status Pesanan"
                : activeTab === "income" ? "Sumber Pendapatan"
                : activeTab === "members" ? "Status Anggota"
                : "Capaian Target"}
            </h2>
            <div className="laporan-status-list">
              {activeReport.statuses.map((item) => (
                <div className="laporan-status-item" key={item.label}>
                  <span className={`laporan-status-dot ${item.color}`} />
                  <span className="laporan-status-name">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="laporan-highlight">
              <span>Total {activeReport.label.toLowerCase()}</span>
              <strong>{activeReport.value}</strong>
              <small>{activeReport.change} dibanding periode sebelumnya</small>
            </div>
          </article>
        </div>
      </section>

      <section className="laporan-table-card">
        <div className="laporan-table-heading">
          <div>
            <h2>Rincian Data</h2>
            <p>Daftar data pesanan sebagai contoh laporan</p>
          </div>
          <label className="laporan-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Cari nama atau pesanan..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="laporan-table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Nama Member</th>
                <th>Paket</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length ? filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className="laporan-member-name">{row.name}</td>
                  <td>{row.package}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`laporan-badge ${row.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="laporan-empty">Data tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="laporan-table-footer">
          Menampilkan {filteredRows.length} dari {sampleRows.length} data contoh
        </div>
      </section>

      <p className="laporan-demo-note">
        Catatan: angka dan daftar pada halaman ini merupakan data simulasi untuk demonstrasi.
      </p>
    </main>
  );
}

export default Laporan;