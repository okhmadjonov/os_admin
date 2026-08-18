import React from "react";
import { Link } from "react-router-dom";
import styles from "./Forbidden.module.scss";

const Forbidden: React.FC = () => {
  return (
    <div className={styles.forbiddenContainer}>
      <div className={styles.code}>403</div>
      <h2>Ruxsat Berilmadi</h2>
      <p>
        Sizda ushbu sahifani ko'rish uchun yetarli huquqlar mavjud emas.
      </p>
      <Link to="/" className={styles.backBtn}>
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default Forbidden;
