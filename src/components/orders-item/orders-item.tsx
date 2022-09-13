import React, { FC, useEffect, useState } from "react";
import styles from "./orders-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { sortIngredients } from "../../utils/utils";
import moment from "moment";
import "moment/locale/ru";
import OrderIngredientImage from "../order-ingredient-image/order-ingredient-image";
import OrderStatus from "../../utils/order-status";
import { useAppSelector } from "../../services/hook";
import { IIngredient, IOrder } from "../../services/types/data";
import { useLocation } from "react-router-dom";

interface IOrdersItemProps {
  order: IOrder;
}

interface ILocationState {
  state: { pathname: string };
}

const OrdersItem: FC<IOrdersItemProps> = ({ order }): JSX.Element => {
  const { number, ingredients, name, createdAt } = order;
  const { allIngredients } = useAppSelector((state) => state.ingredients);
  const [ingredientsArray, setIngredientsArray] = useState<IIngredient[]>([]);
  const location = useLocation<ILocationState>();
  useEffect(() => {
    if (ingredients.length > 0 && allIngredients.data.length > 0) {
      const orderIngredients: IIngredient[] = [];
      ingredients.forEach((item) => {
        const ingredient = allIngredients.data.filter(
          (elem) => elem._id === item
        );
        if (ingredient.length > 0) {
          orderIngredients.push(ingredient[0]);
        }
      });
      setIngredientsArray(sortIngredients(orderIngredients));
    }
  }, [allIngredients, ingredients]);

  const orderPrice = ingredientsArray.reduce((sum, el) => sum + el.price, 0);
  const date = new Date();
  const dateOffset = date.getTimezoneOffset();
  moment.locale("ru");
  const orderDate = moment
    .utc(createdAt)
    .utcOffset(-dateOffset)
    .locale("ru")
    .calendar();

  return (
    order && (
      <div className={styles.wrapper}>
        <div className={`${styles.header} mb-6`}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">
            {orderDate} i-GMT+3
          </span>
        </div>
        <div className={`${styles.order_name} text text_type_main-medium`}>
          {name}
        </div>
        {location.pathname.includes("orders") && (
          <p
            className={
              (order?.status === OrderStatus.done.type
                ? styles.ready
                : styles.not_ready) + " text text_type_main-default mb-6 mt-2"
            }
          >
            {OrderStatus[order?.status].text}
          </p>
        )}
        <div className={`${styles.ingredients} mt-6`}>
          <div className={styles.images}>
            {ingredientsArray.map((ingredient, index) => {
              if (index < 5) {
                return (
                  <OrderIngredientImage
                    key={index}
                    {...ingredient}
                    index={index}
                  />
                );
              } else if (index === 5) {
                return (
                  <OrderIngredientImage
                    key={index}
                    {...ingredient}
                    number={ingredientsArray.length - 5}
                    overlay={true}
                    index={index}
                  />
                );
              }
            })}
          </div>
          <div
            className={`${styles.total__cost} text text_type_digits-default`}
          >
            {orderPrice}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  );
  // );
};
export default OrdersItem;
