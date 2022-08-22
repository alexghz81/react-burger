import React from "react";
import styles from "./ingredients-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const IngredientsItem = ({ data, numberOfIngredient }) => {
  const { _id, image, name, price, type } = data;
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      to={{ pathname: `/ingredients/${_id}`, state: { background: location } }}
      className={`${styles.ingredients_item}`}
      ref={dragRef}
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
      {numberOfIngredient(_id, type) > 0 && (
        <Counter count={numberOfIngredient(_id, type)} size={"default"} />
      )}
    </Link>
  );
};

IngredientsItem.propTypes = {
  data: ingredientPropType,
  numberOfIngredient: PropTypes.func.isRequired,
}.isRequired;

export default IngredientsItem;
