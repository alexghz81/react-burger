import React from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

const Content = ({ data, handleModal }) => {
  return (
    <section className={styles.content}>
      <BurgerIngredients data={data} handleModal={handleModal} />
      <BurgerConstructor data={data} handleModal={handleModal} />
    </section>
  );
};

Content.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default Content;
