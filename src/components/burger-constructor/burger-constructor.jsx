import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientsReducer from "../../services/reducers/reducers";
import { TotalPriceContext } from "../../services/burger-constructor-context";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/reducers/constructor-slice";

const BurgerConstructor = ({ handleModal }) => {
  // const ingredientsInitialState = { ingredients: [] };
  // const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  // const [ingredientsState, ingredientsDispatch] = useReducer(
  //   ingredientsReducer,
  //   ingredientsInitialState
  // );

  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const [{ isHover }, drop] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });
  const ingredient = ingredients.filter((el) => el.type !== "bun");
  const hasBun = useMemo(() => Object.keys(bun).length !== 0, [bun]);
  const totalPrice = useMemo(() => {
    return (
      (hasBun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, el) => sum + el.price, 0)
    );
  }, [ingredients, bun]);

  useEffect(() => {
    //   ingredientsDispatch({
    //     type: ADD_INGREDIENT,
    //     payload: demoData.filter((el) => el.type !== "bun"),
    //   });
    //   const price =
    //     ingredientsState.ingredients.reduce((acc, el) => {
    //       return acc + el.price;
    //     }, 0) +
    //     bun.price * 2;
    //   setTotalPrice(price);
  }, []);

  return (
    <section className={`${styles.burger_constructor} pt-25`} ref={drop}>
      {hasBun ? (
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
      ) : null}
      {ingredients.length > 0 ? (
        <ul className={`${styles.burger_constructor_items} pl-4 pr-2`}>
          {ingredient.map((el) => {
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
      ) : (
        <div className={styles.empty_content}>
          <span className="text_type_main-default text_color_inactive">
            Перетащите сюда ингредиент, чтобы собрать заказ
          </span>
        </div>
      )}
      {hasBun ? (
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
      ) : null}
      {totalPrice > 0 ? (
        <div className={`${styles.burger_constructor_cost} mt-11 mr-4`}>
          <div className={`${styles.cost} mr-10`}>
            <p className={`text text_type_digits-medium`}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={handleModal}>
            Оформить заказ
          </Button>
        </div>
      ) : null}
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default React.memo(BurgerConstructor);
