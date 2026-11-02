import React, { useState } from 'react';
import './Anggota.css';

const Anggota = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewMember, setViewMember] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPaket, setFilterPaket] = useState('Semua paket');
  const [filterStatus, setFilterStatus] = useState('Semua status');

  const [members, setMembers] = useState([
    { id: 1, name: 'Sari Hartono', phone: '08xxxx', address: 'Bojongsoang', paket: 'Mingguan', tanggal: '17/April/2026', status: 'Aktif', statusColor: 'bg-green' },
    { id: 2, name: 'Budi Santoso', phone: '08xxxx', address: 'Ciganitri', paket: 'Pending', tanggal: '10/April/2026', status: 'Tertunda', statusColor: 'bg-yellow' },
    { id: 3, name: 'Fitri Anisa', phone: '08xxxx', address: 'Buah Batu', paket: 'Mingguan', tanggal: '15/Jan/2026', status: 'Nonaktif', statusColor: 'bg-red' },
    { id: 4, name: 'Andi Wijaya', phone: '08xxxx', address: 'Sukabirus', paket: 'Bulanan', tanggal: '17/April/2026', status: 'Nonaktif', statusColor: 'bg-red' },
  ]);

  const handleSimpan = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputStatus = formData.get('status');
    
    let badgeColor = 'bg-green';
    if (inputStatus.toLowerCase() === 'nonaktif') badgeColor = 'bg-red';
    if (inputStatus.toLowerCase() === 'tertunda' || inputStatus.toLowerCase() === 'pending') badgeColor = 'bg-yellow';

    const newData = {
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      paket: formData.get('paket'),
      tanggal: '17/April/2026',
      status: inputStatus,
      statusColor: badgeColor
    };

    if (editingMember) {
      setMembers(members.map((m) => m.id === editingMember.id ? { ...m, ...newData } : m));
    } else {
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      setMembers([...members, { id: newId, ...newData }]);
    }

    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const konfirmasiHapus = () => {
    setMembers(members.filter(m => m.id !== memberToDelete.id));
    setIsDeleteModalOpen(false);
  };

  const bukaModalTambah = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const bukaModalEdit = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const bukaModalView = (member) => {
    setViewMember(member);
    setIsViewModalOpen(true);
  };

  const bukaModalDelete = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPaket = filterPaket === 'Semua paket' || member.paket.toLowerCase() === filterPaket.toLowerCase();
    const matchesStatus = filterStatus === 'Semua status' || member.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesPaket && matchesStatus;
  });

  return (
    <div className="anggota-container">
      
      {showToast && (
        <div className="toast-msg">
          <span>✓ Data Tersimpan</span>
          <button onClick={() => setShowToast(false)} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>X</button>
        </div>
      )}

      <div>
        <h1 className="header-title">Anggota</h1>
        <p className="header-subtitle">Kelola data anggota catering</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Jumlah Anggota</p>
            <p className="stat-value">{members.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Member Baru</p>
            <p className="stat-value">12</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Member Aktif</p>
            <p className="stat-value">{members.filter(m => m.status.toLowerCase() === 'aktif').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Member Nonaktif</p>
            <p className="stat-value">{members.filter(m => m.status.toLowerCase() === 'nonaktif').length}</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="filter-inputs">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg style={{ position: 'absolute', left: '10px', color: '#6c757d' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Cari nama" 
                style={{ width: '200px', paddingLeft: '32px' }} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select value={filterPaket} onChange={(e) => setFilterPaket(e.target.value)}>
              <option value="Semua paket">Semua paket</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Bulanan">Bulanan</option>
              <option value="Semester">Semester</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Semua status">Semua status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tertunda">Tertunda</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
          <button onClick={bukaModalTambah} className="btn-add">+</button>
        </div>

        <table className="anggota-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>No HP</th>
              <th>Alamat</th>
              <th>Paket</th>
              <th>Status</th>
              <th style={{textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td style={{fontWeight: 'bold'}}>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>{member.paket}</td>
                <td><span className={`status-badge ${member.statusColor}`}>{member.status === 'Aktif' || member.status === 'aktif' ? '✓ ' : ''}{member.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" onClick={() => bukaModalView(member)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="icon-btn" onClick={() => bukaModalEdit(member)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => bukaModalDelete(member)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="close-btn">X</button>
            <h2 className="modal-title">{editingMember ? 'Edit Member' : 'Tambah Member'}</h2>
            <form onSubmit={handleSimpan}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="name" placeholder defaultValue={editingMember ? editingMember.name : ''} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Alamat</label>
                  <input type="text" name="address" placeholder defaultValue={editingMember ? editingMember.address : ''} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select style={{ width: '90px', flexShrink: 0 }}><option>ID +62</option></select>
                    <input style={{ flex: 1 }} type="text" name="phone" placeholder defaultValue={editingMember ? editingMember.phone : ''} required />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Paket</label>
                  <select name="paket" defaultValue={editingMember ? editingMember.paket : 'Mingguan'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Semester">Semester</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={editingMember ? editingMember.status : 'Aktif'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required>
                    <option value="Aktif">Aktif</option>
                    <option value="Tertunda">Tertunda</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-save">Simpan</button>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && viewMember && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <button onClick={() => setIsViewModalOpen(false)} className="close-btn" style={{ fontSize: '20px' }}>✕</button>
            <h2 className="modal-title" style={{ color: '#2a3042', marginBottom: '24px' }}>Detail Member</h2>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#2a3042', fontSize: '18px' }}>{viewMember.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#495057', fontSize: '15px' }}>
              <div>Lokasi: {viewMember.address}</div>
              <div>No HP: {viewMember.phone}</div>
              <div>Paket: {viewMember.paket}</div>
              <div>Tanggal: {viewMember.tanggal}</div>
              <div>Status: {viewMember.status}</div>
            </div>
            <button 
              onClick={() => setIsViewModalOpen(false)} 
              style={{ background: '#f6c23e', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '6px', marginTop: '24px', cursor: 'pointer', fontWeight: '500', fontSize: '15px' }}>
              Tutup
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && memberToDelete && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} className="close-btn" style={{ fontSize: '20px' }}>✕</button>
            <h2 className="modal-title" style={{ color: '#2a3042', marginBottom: '24px' }}>Hapus Member</h2>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#2a3042', fontSize: '18px' }}>{memberToDelete.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#495057', fontSize: '15px' }}>
              <div>Lokasi: {memberToDelete.address}</div>
              <div>No HP: {memberToDelete.phone}</div>
              <div>Paket: {memberToDelete.paket}</div>
              <div>Tanggal: {memberToDelete.tanggal}</div>
              <div>Status: {memberToDelete.status}</div>
            </div>
            <button 
              onClick={konfirmasiHapus} 
              style={{ background: '#e74a3b', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', marginTop: '24px', cursor: 'pointer', fontWeight: '500', fontSize: '15px' }}>
              Ya, hapus member
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Anggota;