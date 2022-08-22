import React from "react";
import * as PropTypes from "prop-types";
import IngredientsTitle from "../ingredients-title/ingredients-title";
import IngredientsList from "../ingredients-list/ingredients-list";
import styles from "./ingredients-section.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientsSection = ({ title, data, numberOfIngredient }) => {
  return (
    <div className={`${styles.ingredients_section}`}>
      <IngredientsTitle title={title} />
      <IngredientsList data={data} numberOfIngredient={numberOfIngredient} />
    </div>
  );
};
IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: ingredientPropType,
  numberOfIngredients: PropTypes.func.isRequired,
}.isRequired;

export default IngredientsSection;
