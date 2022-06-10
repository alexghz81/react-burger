import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./nav-item.module.css";

const NavItem = ({ title, logo, active, type }) => {
  const icon = {
    burger: () => <BurgerIcon type={type} />,
    list: () => <ListIcon type={type} />,
    profile: () => <ProfileIcon type={type} />,
  };

  const navItemStyle = `text text_type_main-default pl-2 ${
    active ? styles.active : styles.inactive
  }`;

  return (
    <a href="#" className={`${styles.nav_item} pr-5 pl-5 pt-4 pb-4`}>
      {icon[logo]()}
      <p className={navItemStyle}>{title}</p>
    </a>
  );
};

const navItemTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
});

NavItem.propTypes = navItemTypes.isRequired;

export default NavItem;
