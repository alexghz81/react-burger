import React from "react";
import * as PropTypes from "prop-types";
import IngredientsTitle from "../ingredients-title/ingredients-title";
import IngredientsList from "../ingredients-list/ingredients-list";
import styles from "./ingredients-section.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientsSection = ({ title, data, type }) => {
  return (
    <div className={`${styles.ingredients_section}`}>
      <IngredientsTitle title={title} />
      <IngredientsList data={data} />
    </div>
  );
};
IngredientsSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: ingredientPropType,
}.isRequired;

export default IngredientsSection;
