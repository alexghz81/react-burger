import React, { useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import ingredientsReducer from "../../services/reducers/ingredients-reducer";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_INGREDIENTS,
} from "../../services/actions/ingredients-actions";
import { TotalPriceContext } from "../../context/burger-constructor-context";
import { BurgerDemoDataContext } from "../../context/burger-demo-data-context";

const BurgerConstructor = ({ handleModal }) => {
  const ingredientsInitialState = { ingredients: [] };
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  const { demoData, setDemoData } = useContext(BurgerDemoDataContext);
  const [ingredientsState, ingredientsDispatch] = useReducer(
    ingredientsReducer,
    ingredientsInitialState
  );
  const [bun] = demoData.filter((el) => el.type === "bun");

  useEffect(() => {
    ingredientsDispatch({
      type: ADD_INGREDIENT,
      payload: demoData.filter((el) => el.type !== "bun"),
    });
    const price =
      ingredientsState.ingredients.reduce((acc, el) => {
        return acc + el.price;
      }, 0) +
      bun.price * 2;
    setTotalPrice(price);
  }, []);

  return (
    ingredientsState && (
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
          {ingredientsState.ingredients.map((el) => {
            return (
              <li className={styles.ingredients_item} key={uuidv4()}>
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
            <p className={`text text_type_digits-medium`}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={handleModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default React.memo(BurgerConstructor);
