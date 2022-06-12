import React from "react";
import styles from "./title.module.css";
import PropTypes from "prop-types";

const Title = (props) => {
  return (
    <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>
      {props.children}
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;

export default Title;
