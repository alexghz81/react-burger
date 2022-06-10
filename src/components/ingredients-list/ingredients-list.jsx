import React from "react";
import styles from "./ingredients-list.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientsList = ({ data }) => {
  return (
    <>
      <div className={`${styles.ingredients_list} mt-6 pb-10 pl-4`}>
        {data.map((item) => (
          <IngredientsItem key={item._id} data={item} />
        ))}
      </div>
    </>
  );
};

IngredientsList.propTypes = ingredientPropType;

export default IngredientsList;
