import React from "react";
import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const { data } = useSelector((state) => state.modal);
  const { image_large, name, calories, proteins, fat, carbohydrates } = data;
  return (
    <div className={`${styles.ingredient_details}`}>
      <img src={image_large} alt="" />
      <p
        className={`${styles.ingredient_name} text text_type_main-medium mt-4 mb-8`}
      >
        {name}
      </p>
      <ul
        className={`${styles.ingredient_description} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.ingredient_description_item}>
          Калории,ккал{" "}
          <span className={`text_type_digits-default mt-2`}>{calories}</span>
        </li>
        <li className={styles.ingredient_description_item}>
          Белки, г{" "}
          <span className={`text_type_digits-default mt-2`}>{proteins}</span>
        </li>
        <li className={styles.ingredient_description_item}>
          Жиры, г <span className={`text_type_digits-default mt-2`}>{fat}</span>
        </li>
        <li className={styles.ingredient_description_item}>
          Углеводы, г{" "}
          <span className={`text_type_digits-default mt-2`}>
            {carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = ingredientPropType;
