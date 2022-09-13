import React from "react";
import styles from "./error-page.module.css";
import { Link } from "react-router-dom";
import errorImg from "../assets/images/404.png";

export const Error404 = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.error_img} src={errorImg} alt="Error 404 image" />
      <p className="text text_type_main-large pt-10 mt-10 mb-10">
        Такой страницы не существует.
      </p>
      <Link to="/" className={styles.link}>
        Вернуться
      </Link>
    </div>
  );
};
