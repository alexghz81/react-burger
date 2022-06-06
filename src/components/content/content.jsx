import React from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientPropType } from "../../utils/prop-types";

const Content = ({ data }) => {
  return (
    <section className={styles.content}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </section>
  );
};

Content.propTypes = ingredientPropType;

export default Content;
