import React from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerConstructor = ({ data }) => {
  const getBun = (data, position, posDesc) => {
    console.log(data);
    const bun = data.find((item) => item.type === "bun");
    return (
      <li>
        <ConstructorElement
          text={`${bun.name} ${posDesc}`}
          type={position}
          isLocked={true}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
    );
  };

  const getIngredients = (data) => {
    const ingredientsArray = data.map((item) => {
      if (item.type === "bun") return;
      const { _id, name, price, image, type } = item;
      const res = [];
      res.push(
        <li className={styles.ingredients_item} key={_id}>
          <DragIcon type={"primary"} />
          <ConstructorElement text={name} thumbnail={image} price={price} />
        </li>
      );
      return res;
    });
    return [...ingredientsArray];
  };

  return (
    <section className={`${styles.burger_constructor} pt-25`}>
      <ul
        className={`${styles.burger_constructor_item} ${styles.position_top}`}
      >
        {getBun(data, "top", "(верх)")}
      </ul>
      <ul className={`${styles.burger_constructor_items} pl-4 pr-2`}>
        {getIngredients(data)}
      </ul>
      <ul
        className={`${styles.burger_constructor_item} ${styles.position_top}`}
      >
        {getBun(data, "bottom", "(низ)")}
      </ul>
      <div className={`${styles.burger_constructor_cost} mt-11 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text text_type_digits-medium`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = ingredientPropType;

export default BurgerConstructor;
