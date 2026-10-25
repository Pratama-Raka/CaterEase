import { useState } from "react";
import "./Sidebar.css";
import {
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  Truck,
  Utensils,
  UsersRound,
} from "lucide-react";

function Sidebar({activeItem, onSelectItem}) {
  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "katering", label: "Katering", icon: Utensils },
    { id: "anggota", label: "Anggota", icon: UsersRound },
    { id: "pesanan", label: "Pesanan", icon: ClipboardList },
    { id: "pengiriman", label: "Pengiriman", icon: Truck },
    { id: "laporan", label: "Laporan", icon: FileText },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];

  const [isCollapsed, setIsCollapsed] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

function selectItem(id) {
  onSelectItem(id);

  if (window.matchMedia("(max-width: 768px)").matches) {
    setIsCollapsed(true);
  }
}

  return (
    <aside className={`navbar${isCollapsed ? " navbar-collapsed" : ""}`}>
      <div className="navbar-header">
        <a
          className="navbar-brand"
          href="#dashboard"
          aria-label="Cater Ease"
          onClick={() => onSelectItem("dashboard")}
        >
          <span className="navbar-brand-full">CaterEase</span>
          <span className="navbar-brand-mark" aria-hidden="true">
            CE
          </span>
        </a>
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
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
