import React from "react";
import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.center}>
      <div className={styles.spinner}>
        <div />
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </div>
    </div>
  );
};

export default Spinner;
