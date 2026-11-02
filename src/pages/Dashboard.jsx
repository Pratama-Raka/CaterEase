import { useMemo, useState } from "react";
import { Search, ArrowUpRight, Download, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import dashboardData from "../data/data-dashboard.json";
import "./Dashboard.css";

const money = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;

function Dashboard() {
  const members = dashboardData.members || [];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const pageSize = 5;

  const filteredMembers = useMemo(() => members.filter((member) => {
    const keyword = search.toLowerCase();
    const matchesSearch = `${member.name} ${member.place} ${member.package}`.toLowerCase().includes(keyword);
    return matchesSearch && (status === "all" || member.status === status);
  }), [members, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleMembers = filteredMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function exportCsv() {
    const rows = [
      ["Nama Member", "Lokasi", "Paket", "Tanggal", "Status"],
      ...filteredMembers.map(({ name, place, package: packageName, date, status }) => [name, place, packageName, date, status]),
    ];
    const csv = "\uFEFF" + rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "caterease-members.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Data member berhasil diekspor.");
  }

  const { summary } = dashboardData;
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

  return (
    <main className="ce-dashboard">
      <header className="ce-page-heading">
        <h1>Dashboard</h1>
        <p>Ringkasan aktivitas CaterEase</p>
      </header>

      <section className="ce-stats">
        {[
          ["Total Order", summary.totalOrder, "Jumlah pesanan keseluruhan"],
          ["Total Member", summary.totalMember, "Member terdaftar"],
          ["Total Paket", summary.totalPaket, "Paket layanan tersedia"],
        ].map(([label, value, description]) => (
          <article className="ce-stat" key={label}>
            <span>{label}</span>
            <strong>{value}{label === "Total Order" && <ArrowUpRight size={19} />}</strong>
            <small>{description}</small>
          </article>
        ))}
      </section>

      <section className="ce-analytics">
        <article className="ce-panel ce-chart-panel">
          <div className="ce-panel-heading"><h2>Statistik Order</h2><span>Januari – Juni</span></div>
          <div className="ce-chart-legend">
            <span><i className="ce-legend-incoming" />Order masuk</span>
            <span><i className="ce-legend-completed" />Order selesai</span>
          </div>
          <svg className="ce-line-chart" viewBox="0 0 600 180" role="img" aria-label="Grafik garis statistik order">
            {[35, 70, 105, 140].map((y) => <line key={y} x1="25" y1={y} x2="575" y2={y} stroke="#edf0f4" />)}
            <path d="M25 125 C65 120 85 95 135 105 S200 75 245 88 S310 55 355 72 S420 45 465 60 S530 25 575 40" fill="none" stroke="#18c5b0" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M25 143 C65 135 85 120 135 125 S200 105 245 115 S310 90 355 100 S420 78 465 88 S530 60 575 72" fill="none" stroke="#f17c9f" strokeWidth="3.5" strokeLinecap="round" />
            {months.map((month, index) => <text key={month} x={25 + index * 110} y="170" textAnchor="middle" fill="#718096" fontSize="12">{month}</text>)}
          </svg>
        </article>

        <article className="ce-panel ce-income">
          <span>Total Income</span>
          <strong>{money(summary.totalIncome)} <ArrowUpRight size={19} /></strong>
          <p>Total pendapatan sementara</p>
        </article>
      </section>

      <section className="ce-panel ce-members">
        <div className="ce-members-heading">
          <div><h2>Daftar Member</h2><p>Kelola data member CaterEase</p></div>
          <button className="ce-export" onClick={exportCsv}><Download size={16} /> Export</button>
        </div>

        <div className="ce-table-tools">
          <label className="ce-search"><Search size={16} />
            <input value={search} placeholder="Cari nama, lokasi, atau paket..." onChange={(event) => { setSearch(event.target.value); setPage(1); }} />
          </label>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
            <option value="all">Semua Status</option>
            <option value="On Going">On Going</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="ce-table-scroll">
          <table className="ce-members-table">
            <thead><tr><th>Member</th><th>Paket</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>
              {visibleMembers.map((member) => (
                <tr key={member.id}>
                  <td><div className="ce-member">
                    <span className="ce-avatar" style={{ background: member.color || "#f5d4b1" }}>{member.name.charAt(0)}</span>
                    <span><strong>{member.name}</strong><small>{member.place}</small></span>
                  </div></td>
                  <td>{member.package}</td><td>{member.date}</td>
                  <td><span className={`ce-status ${member.status === "Completed" ? "is-completed" : ""}`}>{member.status}</span></td>
                </tr>
              ))}
              {!visibleMembers.length && <tr><td className="ce-empty" colSpan="4">Member tidak ditemukan.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="ce-pagination">
          <span>{filteredMembers.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredMembers.length)} dari {filteredMembers.length} member</span>
          <div>
            <button aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={17} /></button>
            <span>{currentPage} / {totalPages}</span>
            <button aria-label="Halaman selanjutnya" disabled={currentPage === totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight size={17} /></button>
          </div>
        </div>
      </section>

      {notice && <div className="ce-toast" role="status"><Check size={17} />{notice}<button aria-label="Tutup" onClick={() => setNotice("")}><X size={16} /></button></div>}
    </main>
  );
}

export default Dashboard;