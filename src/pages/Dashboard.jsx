import { useMemo, useState } from 'react';
import {
    Search, Bell, Mail, CalendarDays, ChevronDown, ArrowUpRight,
    LayoutGrid, List, Download, Printer, Filter, SlidersHorizontal,
    Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Maximize2,
    Check, X
} from 'lucide-react';
import './Dashboard.css';

// Data contoh sementara. Hubungkan ke API/database setelah backend tersedia.
const initialMembers = [
    { id: 1, name: 'Craven C', place: 'Kost Raffles', package: 'Weekly', date: '17/April/2026', status: 'On Going', color: '#f5d4b1' },
    { id: 2, name: 'Yeremia Hot', place: 'Dormitory no 3', package: 'Monthly', date: '10/April/2026', status: 'On Going', color: '#e9c4a7' },
    { id: 3, name: 'Nathania Angel', place: 'PBB', package: 'Monthly', date: '15/Jan/2026', status: 'On Going', color: '#f0cbab' },
    { id: 4, name: 'Azzhara Putri', place: 'Dormitory no 2', package: 'Semester', date: '21/April/2026', status: 'On Going', color: '#e7c3aa' },
    { id: 5, name: 'Dika Pratama', place: 'Kost Emerald', package: 'Weekly', date: '23/April/2026', status: 'Completed', color: '#d2e5c3' },
    { id: 6, name: 'Rania Salsabila', place: 'Asrama Putri', package: 'Monthly', date: '25/April/2026', status: 'On Going', color: '#e5d8f1' },
    { id: 7, name: 'Rizky Mahendra', place: 'Kost Anggrek', package: 'Weekly', date: '26/April/2026', status: 'Completed', color: '#c7e3f2' },
    { id: 8, name: 'Tiara Maharani', place: 'Dormitory no 5', package: 'Monthly', date: '27/April/2026', status: 'On Going', color: '#f4dfbf' },
    { id: 9, name: 'Fajar Ramadhan', place: 'Kost Melati', package: 'Semester', date: '28/April/2026', status: 'On Going', color: '#d9dbed' },
    { id: 10, name: 'Nabila Zahra', place: 'Asrama Putri', package: 'Weekly', date: '30/April/2026', status: 'Completed', color: '#f2cee1' },
    { id: 11, name: 'Farhan Akbar', place: 'Kost Mawar', package: 'Monthly', date: '01/May/2026', status: 'On Going', color: '#d1e8d5' },
];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const chartOne = [1000, 1350, 2600, 3800, 3600, 3500, 4100, 5000, 5100, 4800, 5200, 5400];
const chartTwo = [1400, 1900, 2600, 2850, 2500, 1900, 2000, 3900, 4700, 4500, 4900, 5400];

function smoothPath(values, width = 720, height = 220) {
    const left = 34; const right = 12; const top = 15; const bottom = 15;
    const points = values.map((value, index) => ({
        x: left + (index * (width - left - right)) / (values.length - 1),
        y: top + (1 - value / 6000) * (height - top - bottom),
    }));
    return points.reduce((path, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const previous = points[index - 1];
        const middleX = (previous.x + point.x) / 2;
        return `${path} C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`;
    }, '');
}
function OrderChart() {
    return (
        <div className="ce-chart-wrap">
            <div className="ce-chart-legend"><span><i className="ce-dot ce-dot-a" />Order masuk</span><span><i className="ce-dot ce-dot-b" />Order selesai</span></div>
            <svg className="ce-chart-svg" viewBox="0 0 760 270" role="img" aria-label="Grafik contoh pesanan masuk dan selesai Januari sampai Desember">
                {[1000, 2000, 3000, 4000, 5000].map(tick => <g key={tick}><text x="5" y={15 + (1 - tick / 6000) * 190 + 4} className="ce-axis-text">{tick / 1000}k</text></g>)}
                <path d={smoothPath(chartOne)} fill="none" stroke="#20ddc3" strokeWidth="2.6" strokeLinecap="round" />
                <path d={smoothPath(chartTwo)} fill="none" stroke="#ff83aa" strokeWidth="2.6" strokeLinecap="round" />
                {MONTHS.map((m, i) => <text key={m} className="ce-axis-text" textAnchor="middle" x={34 + i * 674 / 11} y="260">{m}</text>)}
            </svg>
        </div>
    );
}

const formatMoney = value => `Rp${value.toLocaleString('id-ID')}`;
function Dashboard() {
    const [members, setMembers] = useState(initialMembers);
    const [query, setQuery] = useState('');
    const [view, setView] = useState('list');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [notice, setNotice] = useState('');
    const [activeDialog, setActiveDialog] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pageSize = 5;
    const filtered = useMemo(() => members.filter(m =>
        (statusFilter === 'all' || m.status === statusFilter) &&
        `${m.name} ${m.place} ${m.package}`.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => sortAsc ? a.id - b.id : b.id - a.id), [members, query, statusFilter, sortAsc]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const shown = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const allShownSelected = shown.length > 0 && shown.every(m => selected.includes(m.id));
    const toggleSelected = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
    function exportCsv() {
        const rows = [['Nama Member', 'Lokasi', 'Paket', 'Tanggal', 'Status'], ...filtered.map(m => [m.name, m.place, m.package, m.date, m.status])];
        const csv = '\uFEFF' + rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'caterease-members.csv'; anchor.click(); URL.revokeObjectURL(url);
        setNotice('Data member berhasil diekspor ke CSV.');
    }
    function confirmDelete() {
        if (activeDialog?.type !== 'delete') return;
        setMembers(s => s.filter(m => m.id !== activeDialog.member.id));
        setSelected(s => s.filter(id => id !== activeDialog.member.id));
        setActiveDialog(null); setNotice('Member dihapus dari data demo.');
    }
    function saveEdit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setMembers(s => s.map(m => m.id === activeDialog.member.id ? { ...m, name: String(data.get('name')), place: String(data.get('place')), package: String(data.get('package')) } : m));
        setActiveDialog(null); setNotice('Perubahan member berhasil disimpan pada data demo.');
    }
    return (
        <div className="ce-dashboard">
            <header className="ce-topbar">
                <div className="ce-search ce-search-global"><Search size={19} /><input aria-label="Cari member dari header" placeholder="Search here" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /></div>
                <div className="ce-top-actions">
                    <div className="ce-popup-anchor"><button className="ce-icon-button ce-badged" aria-label="Notifikasi" onClick={() => setNotificationsOpen(v => !v)}><Bell size={20} /><span className="ce-bubble">12</span></button>{notificationsOpen && <div className="ce-popover">12 notifikasi baru (data contoh)</div>}</div>
                    <button className="ce-icon-button ce-badged" aria-label="Jadwal" onClick={() => setNotice('Fitur jadwal akan dihubungkan setelah halaman pengiriman tersedia.')}><CalendarDays size={20} /><span className="ce-bubble">5</span></button>
                    <button className="ce-icon-button ce-badged" aria-label="Pesan" onClick={() => setNotice('Fitur pesan belum terhubung.')}><Mail size={20} /><span className="ce-bubble">2</span></button>
                    <div className="ce-popup-anchor"><button className="ce-icon-button ce-badged" aria-label="Pesanan penting" onClick={() => setNotice('Ada 1 pesanan yang perlu ditinjau (contoh).')}><LayoutGrid size={20} /><span className="ce-bubble ce-bubble-red">!</span></button></div>
                </div>
                <div className="ce-profile-anchor"><button className="ce-profile" onClick={() => setProfileOpen(v => !v)} aria-expanded={profileOpen}><span className="ce-avatar ce-profile-avatar">AP</span><span className="ce-profile-text"><strong>Azzhara Putri</strong><small>Super Admin</small></span><ChevronDown size={16} /></button>{profileOpen && <div className="ce-profile-menu">Akun Admin • Tampilan demo</div>}</div>
            </header>

            <div className="ce-content">
                <div className="ce-heading-row"><h1>Dashboard</h1><div className="ce-heading-tools"><div className="ce-search ce-search-secondary"><Search size={19} /><input aria-label="Cari data member" placeholder="Search here" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /></div><button className={`ce-switch-button ${view === 'list' ? 'ce-active' : ''}`} title="Tampilan tabel" aria-label="Tampilan tabel" onClick={() => setView('list')}><List size={21} /></button><button className={`ce-switch-button ${view === 'grid' ? 'ce-active' : ''}`} title="Tampilan kartu" aria-label="Tampilan kartu" onClick={() => setView('grid')}><LayoutGrid size={20} /></button></div></div>

                <section className="ce-stats" aria-label="Ringkasan bisnis">
                    <article className="ce-stat"><h2>Total Order</h2><div className="ce-stat-number">420 <ArrowUpRight size={22} /></div><p>Increase compared to last week</p><span>Revenues report →</span></article>
                    <article className="ce-stat"><h2>Total Member</h2><div className="ce-stat-number">45</div><p>70% dormitory and 30% boarding house</p><span>All deals →</span></article>
                    <article className="ce-stat ce-stat-package"><h2>Total Paket</h2><div className="ce-stat-number">5</div><p>All Paket →</p></article>
                </section>

                <section className="ce-analytics" aria-label="Grafik dan pemasukan">
                    <article className="ce-chart-panel"><div className="ce-panel-title"><h2>Order Chart</h2><button onClick={exportCsv}>Export</button></div><OrderChart /></article>
                    <article className="ce-income"><h2>Total Income</h2><div className="ce-income-number">{formatMoney(40000000)} <ArrowUpRight size={22} /></div><p>Increase compared to last week</p><span>Revenues report →</span></article>
                </section>

                <section className="ce-members-panel" aria-label="Daftar member terbaru">
                    <div className="ce-table-toolbar"><div className="ce-toolbar-left"><SlidersHorizontal size={17} /><div className="ce-search ce-search-table"><Search size={15} /><input placeholder="Search" aria-label="Cari pada tabel" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /></div><span className="ce-selected-label">{selected.length} Selected</span></div><div className="ce-toolbar-right"><span className="ce-range">{filtered.length ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span><button aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={17} /></button><button aria-label="Halaman selanjutnya" disabled={currentPage === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight size={17} /></button><span className="ce-toolbar-separator" /><button title="Filter status" aria-label="Ubah filter status" onClick={() => { setStatusFilter(s => s === 'all' ? 'On Going' : s === 'On Going' ? 'Completed' : 'all'); setPage(1) }}><Filter size={17} /></button><button title="Cetak" aria-label="Cetak tabel" onClick={() => window.print()}><Printer size={17} /></button><button title="Download CSV" aria-label="Download CSV" onClick={exportCsv}><Download size={17} /></button><button title="Urutkan data" aria-label="Balik urutan data" onClick={() => setSortAsc(v => !v)}><Maximize2 size={17} /></button></div></div>
                    {statusFilter !== 'all' && <p className="ce-filter-info">Filter: {statusFilter} <button onClick={() => setStatusFilter('all')}>Hapus filter <X size={13} /></button></p>}
                    {view === 'list' ? <div className="ce-table-scroll"><table className="ce-members-table"><thead><tr><th><input type="checkbox" aria-label="Pilih semua member yang terlihat" checked={allShownSelected} onChange={() => setSelected(s => allShownSelected ? s.filter(id => !shown.some(m => m.id === id)) : [...new Set([...s, ...shown.map(m => m.id)])])} /></th><th>Name of Member</th><th>Packet</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead><tbody>{shown.map(member => <tr key={member.id}><td><input type="checkbox" aria-label={`Pilih ${member.name}`} checked={selected.includes(member.id)} onChange={() => toggleSelected(member.id)} /></td><td><div className="ce-member-cell"><span className="ce-avatar" style={{ background: member.color }}>{member.name.slice(0, 1)}</span><span><strong>{member.name}</strong><small>{member.place}</small></span></div></td><td>{member.package}</td><td><span className="ce-date">{member.date}</span></td><td><span className={`ce-status ${member.status === 'Completed' ? 'ce-status-done' : ''}`}>{member.status}</span></td><td><div className="ce-row-actions"><button title="Detail" aria-label={`Lihat ${member.name}`} onClick={() => setActiveDialog({ type: 'view', member })}><Eye size={16} /></button><button title="Edit" aria-label={`Edit ${member.name}`} onClick={() => setActiveDialog({ type: 'edit', member })}><Pencil size={15} /></button><button title="Hapus" aria-label={`Hapus ${member.name}`} onClick={() => setActiveDialog({ type: 'delete', member })}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table>{!shown.length && <p className="ce-empty">Tidak ada member yang sesuai pencarian.</p>}</div> : <div className="ce-member-grid">{shown.map(member => <article className="ce-member-card" key={member.id}><span className="ce-avatar" style={{ background: member.color }}>{member.name[0]}</span><strong>{member.name}</strong><small>{member.place}</small><p>{member.package} • {member.date}</p><span className="ce-status">{member.status}</span><button onClick={() => setActiveDialog({ type: 'view', member })}>Detail <Eye size={15} /></button></article>)}{!shown.length && <p>Tidak ada member ditemukan.</p>}</div>}
                </section>
            </div>
            {notice && <div className="ce-toast" role="status"><Check size={17} />{notice}<button aria-label="Tutup pesan" onClick={() => setNotice('')}><X size={16} /></button></div>}
            {activeDialog && <div className="ce-modal-overlay" role="presentation" onMouseDown={() => setActiveDialog(null)}><div className="ce-modal" role="dialog" aria-modal="true" aria-label="Informasi member" onMouseDown={e => e.stopPropagation()}><div className="ce-modal-head"><h2>{activeDialog.type === 'view' ? 'Detail Member' : activeDialog.type === 'edit' ? 'Edit Member' : 'Hapus Member'}</h2><button onClick={() => setActiveDialog(null)} aria-label="Tutup"><X size={20} /></button></div>{activeDialog.type === 'edit' ? <form onSubmit={saveEdit}><label>Nama<input name="name" defaultValue={activeDialog.member.name} required /></label><label>Lokasi<input name="place" defaultValue={activeDialog.member.place} required /></label><label>Paket<select name="package" defaultValue={activeDialog.member.package}><option>Weekly</option><option>Monthly</option><option>Semester</option></select></label><button className="ce-primary" type="submit">Simpan perubahan</button></form> : <><p><strong>{activeDialog.member.name}</strong></p><p>Lokasi: {activeDialog.member.place}</p><p>Paket: {activeDialog.member.package}</p><p>Tanggal: {activeDialog.member.date}</p><p>Status: {activeDialog.member.status}</p>{activeDialog.type === 'delete' ? <button className="ce-danger" onClick={confirmDelete}>Ya, hapus member</button> : <button className="ce-primary" onClick={() => setActiveDialog(null)}>Tutup</button>}</>}</div></div>}
        </div>
    );
}
export default Dashboard;
