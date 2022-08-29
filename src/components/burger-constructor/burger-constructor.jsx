import React, { useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  resetConstructor,
} from "../../services/reducers/constructor-slice";
import ConstructorItem from "../constructor-item/constructor-item";
import { showModal } from "../../services/reducers/modal-slice";
import { fetchOrder } from "../../services/reducers/order-slice";
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.auth);
  const history = useHistory();
  const [, drop] = useDrop({
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

  const handleDelete = (id) => {
    dispatch(removeIngredient(id));
  };

  const findIngredient = useCallback(
    (id) => {
      const ingredient = ingredients.filter((el) => el.id === id)[0];
      return { index: ingredients.indexOf(ingredient) };
    },
    [ingredients]
  );

  const reorderIngredient = useCallback(
    (id, toIndex) => {
      const { index } = findIngredient(id);
      dispatch(reorderIngredients({ index, toIndex }));
    },
    [findIngredient, ingredients, dispatch]
  );

  const handleModal = () => {
    if (isAuthChecked) {
      const orderIngredients = ingredients.map((el) => el._id);
      if (bun._id) {
        orderIngredients.push(bun._id);
        orderIngredients.push(bun._id);
      }
      dispatch(fetchOrder(orderIngredients));
      dispatch(showModal({ type: "order", title: "", visible: true }));
      dispatch(resetConstructor());
    } else {
      history.push("/login");
    }
  };

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
          {ingredient.map((el, index) => {
            return (
              <ConstructorItem
                element={el}
                handleDelete={handleDelete}
                key={el.id}
                index={index}
                findIngredient={findIngredient}
                reorderIngredient={reorderIngredient}
              />
            );
          })}
        </ul>
      ) : (
        !hasBun && (
          <div className={styles.empty_content}>
            <span className="text_type_main-default text_color_inactive">
              Перетащите сюда ингредиент, чтобы собрать заказ
            </span>
          </div>
        )
      )}
      {hasBun ? (
        <ul
          className={`${styles.burger_constructor_item} ${styles.position_bottom}`}
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

export default React.memo(BurgerConstructor);
