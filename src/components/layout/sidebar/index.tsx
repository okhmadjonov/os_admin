import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/redux";
import {
  Home,
  Users,
  ClipboardList,
  Box,
  BarChart2,
  FileText,
  Ticket,
  LogOut,
} from "lucide-react";
import styles from "./Sidebar.module.scss";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/", label: "Users", icon: Users },
  { path: "/orders", label: "Orders", icon: ClipboardList },
  { path: "/products", label: "Products", icon: Box },
  { path: "/analysis", label: "Analysis", icon: BarChart2 },
  { path: "/blogs", label: "blogs", icon: FileText },
  { path: "/tickets", label: "Tickets", icon: Ticket },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();

  const handleLogout = () => {
    dispatch.auth.logout();
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navSection}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end={item.path === "/"}
            >
              <span className={styles.label}>{item.label}</span>
              <span className={styles.icon}>
                <Icon size={18} />
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.footerSection}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span>Logout</span>
          <span className={styles.icon}>
            <LogOut size={18} />
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
