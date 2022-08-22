import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./nav-item.module.css";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({ title, logo, type, link }) => {
  const icons = {
    burger: <BurgerIcon type={type} />,
    list: <ListIcon type={type} />,
    profile: <ProfileIcon type={type} />,
  };

  // const navItemStyle = `text text_type_main-default pl-2 ${
  //   active ? styles.active : styles.inactive
  // }`;

  return (
    <NavLink
      to={link}
      className={` ${styles.nav_item} pr-5 pl-5 pt-4 pb-4`}
      activeClassName={styles.active}
    >
      {icons[logo]}
      <p className={"text text_type_main-default pl-2"}>{title}</p>
    </NavLink>
  );
};

const navItemTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

NavItem.propTypes = navItemTypes.isRequired;

export default NavItem;
