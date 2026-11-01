<<<<<<< HEAD
import { useState } from "react";
import "./Sidebar.css";
import {
=======
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  BookOpen,
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
<<<<<<< HEAD
=======
  LogOut,
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
  Menu,
  Settings,
  Truck,
  Utensils,
  UsersRound,
} from "lucide-react";

function Sidebar() {
<<<<<<< HEAD
  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "katering", label: "Katering", icon: Utensils },
=======
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "katering", label: "Paket Katering", icon: Utensils  },
    { id: "menu-katering", label: "Menu Katering", icon: BookOpen  },
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
    { id: "anggota", label: "Anggota", icon: UsersRound },
    { id: "pesanan", label: "Pesanan", icon: ClipboardList },
    { id: "pengiriman", label: "Pengiriman", icon: Truck },
    { id: "laporan", label: "Laporan", icon: FileText },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];
<<<<<<< HEAD
  const [activeItem, setActiveItem] = useState("dashboard");
=======

  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
  const [isCollapsed, setIsCollapsed] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

<<<<<<< HEAD
  function selectItem(id) {
    setActiveItem(id);
    if (window.matchMedia("(max-width: 768px)").matches) setIsCollapsed(true);
=======
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
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
  }

  return (
    <aside className={`navbar${isCollapsed ? " navbar-collapsed" : ""}`}>
      <div className="navbar-header">
<<<<<<< HEAD
        <a
          className="navbar-brand"
          href="#dashboard"
          aria-label="Cater Ease"
          onClick={() => setActiveItem("dashboard")}
=======
        <Link
          className="navbar-brand"
          to="/dashboard"
          aria-label="Cater Ease"
          onClick={closeMobileMenu}
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
        >
          <span className="navbar-brand-full">CaterEase</span>
          <span className="navbar-brand-mark" aria-hidden="true">
            CE
          </span>
<<<<<<< HEAD
        </a>
=======
        </Link>

>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
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
<<<<<<< HEAD
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`navbar-link${isActive ? " is-active" : ""}`}
                  onClick={() => selectItem(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={isCollapsed ? item.label : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="navbar-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="navbar-label">{item.label}</span>
                  {isActive && (
                    <span className="navbar-chevron">
                      <ChevronRight size={15} aria-hidden="true" />
                    </span>
                  )}
                </a>
=======
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
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
              </li>
            );
          })}
        </ul>
      </nav>
<<<<<<< HEAD
=======

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
>>>>>>> 37ba8ce155e9c1170b062f645faeebcb27bf5dda
    </aside>
  );
}

export default Sidebar;
