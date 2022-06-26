import React, { memo } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import Nav from "../nav/nav";
import Profile from "../profile/profile";

const AppHeader = () => {
  const opts = [
    {
      title: "Конструктор",
      logo: "burger",
      active: true,
      type: "primary",
    },
    {
      title: "Лента заказов",
      logo: "list",
      active: false,
      type: "secondary",
    },
  ];

  const profileOpts = {
    title: "Личный кабинет",
    logo: "profile",
    type: "secondary",
    active: false,
  };
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header_content_wrapper}>
        <Nav items={opts} />
        <div className={styles.logo}>
          <Logo />
        </div>
        <Profile {...profileOpts} />
      </div>
    </header>
  );
};

export default memo(AppHeader);
