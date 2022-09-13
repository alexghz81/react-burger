import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ORDERS_URL, PROFILE_ORDERS_URL } from "../../utils/constants";
import OrderStatus from "../../utils/order-status";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/reducers/ws-slice";
import moment from "moment";
import "moment/locale/ru";
import { getCookie, sortIngredients } from "../../utils/utils";
import styles from "./order-info.module.css";
import OrderIngredientImage from "../../components/order-ingredient-image/order-ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { IIngredient, IOrder } from "../../services/types/data";

interface IOrderInfoProps {
  modal: boolean;
}

interface ILocationState {
  background: { pathname: string } | null;
  from: { pathname: string };
}

const OrderInfo: FC<IOrderInfoProps> = ({ modal = false }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.ingredients.allIngredients);
  const { wsConnected, wsMessages } = useAppSelector((state) => state.ws);
  const location = useLocation<ILocationState>();
  const [order, setOrder] = useState<IOrder>();
  const [ingredientsData, setIngredientsData] = useState<IIngredient[]>();
  const [orderPrice, setOrderPrice] = useState<number>();

  useEffect(() => {
    if (!wsConnected && !location.state?.background) {
      dispatch(
        wsConnectionStart(
          location.pathname.includes("orders")
            ? `${PROFILE_ORDERS_URL}?token=${getCookie("accessToken")}`
            : ORDERS_URL
        )
      );
    }
    return () => {
      wsConnectionClosed();
    };
  }, [dispatch]);

  useEffect(() => {
    const res = wsMessages.orders.find((order) => order._id === id);
    if (res) {
      setOrder(res);
    }
  }, [wsMessages.orders, data, order]);

  useEffect(() => {
    location.state.background = null;
  }, []);

  const getIngredient = (id: string) => {
    let result: IIngredient | undefined = undefined;
    if (data.length > 0) {
      result = data.find((item) => item._id === id);
      if (result) {
        return result;
      }
    }
  };

  const count = (array: string[]) => {
    return array.reduce((acc: { [el: string]: number }, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
  };
  const countIngredients = order?.ingredients && count(order?.ingredients);

  const getIngredientsData = () => {
    const data: IIngredient[] = [];
    const uniqIngredients = [...Array.from(new Set(order?.ingredients))];
    uniqIngredients.forEach((id) => {
      const gettedIngredient: IIngredient | undefined = getIngredient(id);
      if (gettedIngredient) {
        data.push(gettedIngredient);
      }
    });
    setIngredientsData(sortIngredients(data));
  };

  const getPrice = () => {
    const price: IIngredient[] = [];
    data.length > 0 &&
      order &&
      order?.ingredients.forEach((id) => {
        const ingredient: IIngredient | undefined = getIngredient(id);
        if (ingredient) {
          price.push(ingredient);
        }
      });
    data.length > 0 &&
      price &&
      setOrderPrice(price?.reduce((acc, el) => acc + el?.price, 0));
  };

  useEffect(() => {
    getIngredientsData();
    getPrice();
  }, [data, order]);

  const date = new Date();
  const dateOffset = date.getTimezoneOffset();
  moment.locale("ru");
  const orderDate =
    order &&
    moment.utc(order.createdAt).utcOffset(-dateOffset).locale("ru").calendar();

  return (
    <>
      {order && ingredientsData && countIngredients && (
        <div
          style={!modal ? { marginTop: 122 + "px" } : {}}
          className={styles.order_info_wrapper}
        >
          <h3 className={`${styles.order_number} text text_type_main-medium`}>
            # {order?.number}
          </h3>
          <p
            className={`${styles.order_name} text text_type_main-medium mb-3 mt-10`}
          >
            {order?.name}
          </p>
          <p
            className={
              (order?.status === OrderStatus.done.type ? styles.ready : "") +
              " text text_type_main-default mb-15"
            }
          >
            {OrderStatus[order?.status].text}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul
            className={`${styles.ingredients_wrapper} text text_type_main-default`}
          >
            {ingredientsData &&
              ingredientsData.map((el, idx) => (
                <li className={`${styles.ingredient_wrapper}`} key={idx}>
                  <OrderIngredientImage {...el} />
                  <p className={styles.name}>{el?.name}</p>
                  <div
                    className={`${styles.cost} text text_type_digits-default`}
                  >
                    {countIngredients[el?._id]} x {el?.price}&nbsp;
                    <div className={styles.currency}>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div
            className={`${styles.info_wrapper} text text_type_digits-default`}
          >
            <span className="text text_type_main-default text_color_inactive">
              {orderDate} i-GMT+3
            </span>
            <div className={styles.price_wrapper}>
              {orderPrice}
              <div className={styles.currency}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
