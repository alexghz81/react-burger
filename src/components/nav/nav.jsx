import React from "react";
import styles from "./nav.module.css";
import PropTypes from "prop-types";
import NavItem from "../nav-item/nav-item";

const Nav = ({ items }) => {
  return (
    <nav className={styles.nav}>
      {items.map((item, i) => (
        <NavItem {...item} key={i} />
      ))}
    </nav>
  );
};

const navItemTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
});

Nav.propTypes = {
  items: PropTypes.arrayOf(navItemTypes.isRequired).isRequired,
};

export default Nav;
