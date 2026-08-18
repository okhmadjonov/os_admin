import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Bell } from "lucide-react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className={styles.header}>
      <div className={styles.brandAndTitle}>
        <div className={styles.brand}>
          <div className={styles.logoIcon} />
          <span className={styles.logoText}>LavaBiz.</span>
        </div>
        <h1 className={styles.pageTitle}>User management</h1>
      </div>

      <div className={styles.userSection}>
        <button className={styles.bellBtn} title="Notifications">
          <Bell size={18} />
          <span className={styles.dot} />
        </button>

        <div className={styles.userProfile}>
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            }
            alt="Avatar"
            className={styles.avatar}
          />
          <span className={styles.userName}>
            {user?.fullName || "Edvard salvator"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
