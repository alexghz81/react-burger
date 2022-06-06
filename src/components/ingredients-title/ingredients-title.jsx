import React from "react";
import styles from "./ingredients-title.module.css";
import PropTypes from "prop-types";
const IngredientsTitle = ({ title }) => {
  console.log(title);
  return (
    <h2 className={`${styles.ingredients_title} text text_type_main-medium`}>
      {title}
    </h2>
  );
};

IngredientsTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IngredientsTitle;
