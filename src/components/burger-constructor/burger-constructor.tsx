import React, { useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { IIngredient } from "../../services/types/data";

const BurgerConstructor = () => {
  const { ingredients, bun } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const dispatch = useAppDispatch();
  const { isAuthChecked } = useAppSelector((state) => state.auth);
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

  const ingredient: Array<IIngredient> = ingredients.filter(
    (el) => el.type !== "bun"
  );
  // const hasBun: boolean = useMemo(() => {
  //   if (bun) {
  //     return Object.keys(bun).length !== 0;
  //   }
  //   return false;
  // }, [bun]);
  const totalPrice: number = useMemo(() => {
    if (bun) {
      return bun.price * 2 + ingredients.reduce((sum, el) => sum + el.price, 0);
    } else {
      return ingredients.reduce((sum, el) => sum + el.price, 0);
    }
  }, [ingredients, bun]);

  const handleDelete = (id: string): void => {
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
      const orderIngredients: string[] = ingredients.map(
        (el: IIngredient) => el._id
      );
      if (bun) {
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
      {bun ? (
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
                key={el._id}
                index={index}
                findIngredient={findIngredient}
                reorderIngredient={reorderIngredient}
              />
            );
          })}
        </ul>
      ) : (
        !bun && (
          <div className={styles.empty_content}>
            <span className="text_type_main-default text_color_inactive">
              Перетащите сюда ингредиент, чтобы собрать заказ
            </span>
          </div>
        )
      )}
      {bun ? (
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
