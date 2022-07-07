import React from "react";
import * as PropTypes from "prop-types";
import IngredientsTitle from "../ingredients-title/ingredients-title";
import IngredientsList from "../ingredients-list/ingredients-list";
import styles from "./ingredients-section.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientsSection = ({
  title,
  data,
  handleModal,
  numberOfIngredient,
}) => {
  return (
    <div className={`${styles.ingredients_section}`}>
      <IngredientsTitle title={title} />
      <IngredientsList
        data={data}
        handleModal={handleModal}
        numberOfIngredient={numberOfIngredient}
      />
    </div>
  );
};
IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: ingredientPropType,
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default IngredientsSection;
