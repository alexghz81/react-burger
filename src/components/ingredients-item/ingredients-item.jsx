import React from "react";
import styles from "./ingredients-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientsItem = ({ data, handleModal }) => {
  const { _id, image, name, price, count } = data;
  return (
    <div
      className={`${styles.ingredients_item}`}
      onClick={() => handleModal(_id, "ingredient")}
    >
      <img src={image} alt={name} className={styles.ingredients_image} />
      <div
        className={`${styles.ingredients_cost_wrapper} text text_type_digits-default mt-1 mb-1`}
      >
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredients_title} text text_type_main-default`}>
        {name}
      </p>
      {count ? <Counter count={count} size={"default"} /> : null}
    </div>
  );
};

IngredientsItem.propTypes = ingredientPropType;

export default IngredientsItem;
