import React from "react";
import styles from "./AnimatedBackground.module.scss";

const AnimatedBackground: React.FC = () => {
  return (
    <div className={styles.bgWrapper}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
};

export default AnimatedBackground;
