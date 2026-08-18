import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Bell } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className={styles.header}>
      <div className={styles.brandAndTitle}>
        <div className={styles.brand}>
          <div className={styles.logoIcon} />
          <span className={styles.logoText}>Sololearn</span>
        </div>
        <h1 className={styles.pageTitle}>User management</h1>
      </div>

      <div className={styles.userSection}>
        <button className={styles.bellBtn} title="Notifications">
          <Bell size={18} />
          <span className={styles.dot} />
        </button>

        <div className={styles.userProfile}>
          <div className={styles.userAvatarIcon}>
            <FaRegUser size={22} />
          </div>
          <span className={styles.userName}>
            {user?.fullName || "Martin Iden"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
