import React, { FC } from "react";
import styles from "./ingredients-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../services/types/data";

interface IIngredientsItem {
  data: IIngredient;
  numberOfIngredient: Function;
}

const IngredientsItem: FC<IIngredientsItem> = ({
  data,
  numberOfIngredient,
}): JSX.Element => {
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

export default IngredientsItem;
