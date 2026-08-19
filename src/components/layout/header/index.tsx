import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, Dispatch } from "@/redux";
import { Bell, LogOut } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch.auth.logout();
    toast.info("Tizimdan muvaffaqiyatli chiqdingiz");
    navigate("/login");
  };

  const displayName = user?.fullName || user?.username || "SuperAdmin";
  const displayRole = user?.position || user?.department || "Administrator";

  return (
    <header className={styles.header}>
      <div className={styles.brandAndTitle}>
        <div className={styles.brand}>
          <div className={styles.logoIcon} />
          <span className={styles.logoText}>Online Store</span>
        </div>
        <h1 className={styles.pageTitle}>Boshqaruv paneli</h1>
      </div>

      <div className={styles.userSection}>
        <button className={styles.bellBtn} title="Xabarnomalar">
          <Bell size={18} />
          <span className={styles.dot} />
        </button>

        <div className={styles.userProfile}>
          <div className={styles.userAvatarIcon}>
            {user?.avatar ? (
              <img src={user.avatar} alt={displayName} />
            ) : (
              <FaRegUser size={20} />
            )}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userRoleBadge}>{displayRole}</span>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout} title="Chiqish">
          <LogOut size={16} />
          <span>Chiqish</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
