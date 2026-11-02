import {
  Search,
  Bell,
  CalendarDays,
  Mail,
  LayoutGrid,
  ChevronDown,
  Menu,
} from "lucide-react";
import "./Navbar.css";

function Navbar({ cari, setCari, onMenuClick }) {
  const notifikasi = [
    { Icon: Bell, jumlah: 12 },
    { Icon: CalendarDays, jumlah: 5 },
    { Icon: Mail, jumlah: 2 },
    { Icon: LayoutGrid, jumlah: "!", merah: true },
  ];

  return (
    <header className="navbar-admin">
      {/* Hamburger (mobile only) */}
      <button
        type="button"
        className="navbar-menu-btn"
        onClick={onMenuClick}
        aria-label="Buka menu"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {/* Pencarian */}
      <div className="navbar-search">
        <Search size={21} />
        <input
          placeholder="Search here"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        {/* Notifikasi */}
        <div className="navbar-icons">
          {notifikasi.map(({ Icon, jumlah, merah }, i) => (
            <button
              className="navbar-admin-icon"
              key={i}
              type="button"
              aria-label={`Notifikasi ${i + 1}`}
            >
              <Icon size={21} />
              <span className={merah ? "merah" : ""}>{jumlah}</span>
            </button>
          ))}
        </div>

        {/* Profil admin */}
        <div className="navbar-profile">
          <div className="navbar-avatar">AP</div>
          <div className="navbar-user">
            <strong>Azzhara Putri</strong>
            <small>Super Admin</small>
          </div>
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;