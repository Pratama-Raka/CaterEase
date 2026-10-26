import React, { useState } from "react";
import "./Anggota.css"; // Ini buat manggil desain CSS-nya

const Anggota = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [members] = useState([
    {
      id: 1,
      name: "Sari Hartono",
      phone: "08xxxx",
      address: "Bojongsoang",
      paket: "Mingguan",
      status: "Aktif",
      statusColor: "bg-green",
    },
    {
      id: 2,
      name: "Budi Santoso",
      phone: "08xxxx",
      address: "Ciganitri",
      paket: "Pending",
      status: "Tertunda",
      statusColor: "bg-yellow",
    },
    {
      id: 3,
      name: "Fitri Anisa",
      phone: "08xxxx",
      address: "Buah Batu",
      paket: "Mingguan",
      status: "Nonaktif",
      statusColor: "bg-red",
    },
    {
      id: 4,
      name: "Andi Wijaya",
      phone: "08xxxx",
      address: "Sukabirus",
      paket: "Bulanan",
      status: "Nonaktif",
      statusColor: "bg-red",
    },
    {
      id: 5,
      name: "Dewi Septiani",
      phone: "08xxxx",
      address: "Asrama Telkom",
      paket: "Mingguan",
      status: "Aktif",
      statusColor: "bg-green",
    },
    {
      id: 6,
      name: "Erlangga Alfa",
      phone: "08xxxx",
      address: "Asrama Telkom",
      paket: "Bulanan",
      status: "Aktif",
      statusColor: "bg-green",
    },
  ]);

  const handleSimpan = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="anggota-container">
      {showToast && (
        <div className="toast-msg">
          <span>✓ Data Tersimpan</span>
          <button
            onClick={() => setShowToast(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      )}

      <div>
        <h1 className="header-title">Anggota</h1>
        <p className="header-subtitle">Kelola data anggota catering</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#fd7e14" }}>
            👥
          </div>
          <div className="stat-info">
            <p className="stat-label">Jumlah Anggota</p>
            <p className="stat-value">145</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#0d6efd" }}>
            👤+
          </div>
          <div className="stat-info">
            <p className="stat-label">Member Baru</p>
            <p className="stat-value">12</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#198754" }}>
            📅
          </div>
          <div className="stat-info">
            <p className="stat-label">Member Aktif</p>
            <p className="stat-value">112</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#dc3545" }}>
            ❌
          </div>
          <div className="stat-info">
            <p className="stat-label">Member Nonaktif</p>
            <p className="stat-value">8</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="filter-inputs">
            <input
              type="text"
              placeholder="🔍 Cari nama"
              style={{ width: "200px" }}
            />
            <select>
              <option>Semua paket</option>
            </select>
            <select>
              <option>Semua status</option>
            </select>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-add">
            +
          </button>
        </div>

        <table className="anggota-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>No HP</th>
              <th>Alamat</th>
              <th>Paket</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={{ fontWeight: "bold" }}>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>{member.paket}</td>
                <td>
                  <span className={`status-badge ${member.statusColor}`}>
                    {member.status === "Aktif" ? "✓ " : ""}
                    {member.status}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button className="action-btn">👁️</button>
                  <button className="action-btn">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="close-btn">
              X
            </button>
            <h2 className="modal-title">Tambah Member</h2>

            <form onSubmit={handleSimpan}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Sari Hartono" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Alamat</label>
                  <input type="text" placeholder="Jalan Raya BojongSoang" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <select style={{ width: "100px" }}>
                      <option>ID +62</option>
                    </select>
                    <input type="text" placeholder="(555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Paket</label>
                  <input type="text" placeholder="Mingguan" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input type="text" placeholder="Aktif" />
                </div>
              </div>

              <button type="submit" className="btn-save">
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anggota;
