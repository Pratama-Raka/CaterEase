import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Truck,
  Utensils,
  UsersRound,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "katering", label: "Katering", icon: Utensils },
    { id: "anggota", label: "Anggota", icon: UsersRound },
    { id: "pesanan", label: "Pesanan", icon: ClipboardList },
    { id: "pengiriman", label: "Pengiriman", icon: Truck },
    { id: "laporan", label: "Laporan", icon: FileText },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];

  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

  const [isCollapsed, setIsCollapsed] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function syncBreakpoint(event) {
      setIsMobile(event.matches);
      setIsCollapsed(event.matches);
    }

    mediaQuery.addEventListener("change", syncBreakpoint);

    return () => mediaQuery.removeEventListener("change", syncBreakpoint);
  }, []);

  function closeMobileMenu() {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }

  function handleLogout() {
    setShowLogout(false);
    navigate("/login");
  }

  return (
    <aside className={`navbar${isCollapsed ? " navbar-collapsed" : ""}`}>
      <div className="navbar-header">
        <Link
          className="navbar-brand"
          to="/dashboard"
          aria-label="Cater Ease"
          onClick={closeMobileMenu}
        >
          <span className="navbar-brand-full">CaterEase</span>
          <span className="navbar-brand-mark" aria-hidden="true">
            CE
          </span>
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          aria-expanded={!isCollapsed}
          aria-controls="primary-navigation"
          aria-label={isCollapsed ? "Buka menu" : "Tutup menu"}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>

      <h2 className="navbar-heading">Menu utama</h2>

      <nav
        id="primary-navigation"
        className="navbar-nav"
        aria-label="Menu utama"
      >
        <ul className="navbar-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={`/${item.id}`}
                  end
                  className={({ isActive }) =>
                    `navbar-link${isActive ? " is-active" : ""}`
                  }
                  onClick={closeMobileMenu}
                  aria-label={isCollapsed ? item.label : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <span className="navbar-icon">
                        <Icon size={20} aria-hidden="true" />
                      </span>

                      <span className="navbar-label">{item.label}</span>

                      {isActive && (
                        <span className="navbar-chevron">
                          <ChevronRight size={15} aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="navbar-logout">
        <button
          type="button"
          className="navbar-link"
          onClick={() => setShowLogout(true)}
          title={isCollapsed ? "Logout" : undefined}
        >
          <span className="navbar-icon">
            <LogOut size={20} aria-hidden="true" />
          </span>
          <span className="navbar-label">Logout</span>
        </button>
      </div>

      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Konfirmasi Logout</h3>
            <p>Apakah kamu yakin ingin keluar dari CaterEase?</p>

            <div className="logout-actions">
              <button
                type="button"
                className="logout-cancel"
                onClick={() => setShowLogout(false)}
              >
                Batal
              </button>

              <button
                type="button"
                className="logout-confirm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
