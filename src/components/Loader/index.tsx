import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Yuklanmoqda..." }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner} />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Loader;
