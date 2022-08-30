import React, { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header_content_wrapper} text text_type_main-default`}
      >
        <ul className={`${styles.nav}`}>
          <li>
            <NavLink
              to={"/"}
              className={`${styles.nav_item} pr-5 pl-5 pt-4 pb-4`}
              activeClassName={styles.active}
              exact
            >
              <BurgerIcon />
              <p>Конструктор</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/feed"}
              className={`${styles.nav_item} pr-5 pl-5 pt-4 pb-4`}
              activeClassName={styles.active}
              exact
            >
              <ListIcon />
              <p>Лента заказов</p>
            </NavLink>
          </li>
        </ul>
        <NavLink to={"/"} className={styles.logo}>
          <Logo />
        </NavLink>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to={"/profile"}
              className={`${styles.nav_item}  pr-5 pl-5 pt-4 pb-4`}
              activeClassName={styles.active}
              exact
            >
              <ProfileIcon />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default memo(AppHeader);
