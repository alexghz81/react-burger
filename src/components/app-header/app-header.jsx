import React, { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  LockIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import Nav from "../nav/nav";
import Profile from "../profile/profile";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  // const opts = [
  //   {
  //     title: "Конструктор",
  //     logo: "burger",
  //     active: true,
  //     type: "primary",
  //     link: "/",
  //   },
  //   {
  //     title: "Лента заказов",
  //     logo: "list",
  //     active: false,
  //     type: "secondary",
  //     link: "/orders-feed",
  //   },
  // ];
  //
  // const profileOpts = {
  //   title: "Личный кабинет",
  //   logo: "profile",
  //   type: "secondary",
  //   active: false,
  //   link: "/profile",
  // };
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
              to={"/orders-feed"}
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
        {/*<Nav items={opts} />*/}
        {/*<div className={styles.logo}>*/}
        {/*  <Logo />*/}
        {/*</div>*/}
        {/*<Profile {...profileOpts} />*/}
      </div>
    </header>
  );
};

export default memo(AppHeader);
