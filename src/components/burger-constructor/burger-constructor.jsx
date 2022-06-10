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
  const bun = data.find((el) => el.type === "bun");
  const ingredients = data.filter((el) => el.type !== "bun");

  return (
    <section className={`${styles.burger_constructor} pt-25`}>
      <ul
        className={`${styles.burger_constructor_item} ${styles.position_top}`}
      >
        <ConstructorElement
          text={`${bun.name} (верх)`}
          type={"top"}
          isLocked={true}
          thumbnail={bun.image}
          price={bun.price}
        />
      </ul>
      <ul className={`${styles.burger_constructor_items} pl-4 pr-2`}>
        {ingredients.map((el) => {
          return (
            <li className={styles.ingredients_item} key={el._id}>
              <DragIcon type={"primary"} />
              <ConstructorElement
                text={el.name}
                thumbnail={el.image}
                price={el.price}
              />
            </li>
          );
        })}
      </ul>
      <ul
        className={`${styles.burger_constructor_item} ${styles.position_top}`}
      >
        <ConstructorElement
          text={`${bun.name} (низ)`}
          type={"bottom"}
          isLocked={true}
          thumbnail={bun.image}
          price={bun.price}
        />
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
