import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.errorCode}>404</div>
      <h2>Sahifa topilmadi</h2>
      <p>Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.</p>
      <Link to="/" className={styles.homeBtn}>
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
