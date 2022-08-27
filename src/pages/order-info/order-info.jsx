import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import PropTypes from "prop-types";

const OrderInfo = ({ modal = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allIngredients } = useSelector((state) => state.ingredients);
  const { wsConnected, wsMessages } = useSelector((state) => state.ws);
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.data);
  const [data, setData] = useState();
  const [orderPrice, setOrderPrice] = useState();

  useEffect(() => {
    if (!wsConnected) {
      dispatch(
        wsConnectionStart(
          location.pathname.includes("orders")
            ? `${PROFILE_ORDERS_URL}?token=${getCookie("accessToken")}`
            : ORDERS_URL
        )
      );
    }
    return () => wsConnected && dispatch(wsConnectionClosed());
  }, [wsConnected, dispatch]);

  const getOrder = () => {
    if (!order) {
      const ord =
        wsMessages.length !== 0 &&
        wsMessages?.orders.find((order) => order._id === id);
      setOrder(ord);
    }
  };

  useEffect(() => {
    getOrder();
  }, [wsMessages.orders, allIngredients, order]);

  useEffect(() => {
    location.state = null;
  }, []);

  const getIngredient = (id) => {
    let result = null;
    if (allIngredients.length > 0) {
      result = allIngredients.find((item) => item._id === id);
      return result;
    }
  };

  const count = (array) => {
    return array.reduce((stack, value) => {
      return stack[value] ? stack[value]++ : (stack[value] = 1), stack;
    }, {});
  };
  const countIngredients = order?.ingredients && count(order?.ingredients);

  const getIngredientsData = () => {
    const data = [];
    const uniqIngredients = [...new Set(order?.ingredients)];
    uniqIngredients.forEach((id) => {
      data.push(getIngredient(id));
    });
    setData(sortIngredients(data));
  };

  const getPrice = () => {
    const price = [];
    allIngredients.length > 0 &&
      order &&
      order?.ingredients.forEach((id) => {
        price?.push(getIngredient(id));
      });
    allIngredients.length > 0 &&
      price &&
      setOrderPrice(price?.reduce((acc, el) => acc + el?.price, 0));
  };

  useEffect(() => {
    getIngredientsData();
    getPrice();
  }, [allIngredients, order]);

  const date = new Date();
  const dateOffset = date.getTimezoneOffset();
  moment.locale("ru");
  const orderDate =
    order &&
    moment.utc(order.createdAt).utcOffset(-dateOffset).locale("ru").calendar();

  return (
    <>
      {order && data && countIngredients && (
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
            {data &&
              data.map((el, idx) => (
                <li className={`${styles.ingredient_wrapper}`} key={idx}>
                  <OrderIngredientImage {...el} />
                  <p className={styles.name}>{el?.name}</p>
                  <div
                    className={`${styles.cost} text text_type_digits-default`}
                  >
                    {countIngredients[el?._id]} x {el?.price}&nbsp;
                    <CurrencyIcon type="primary" className={styles.currency} />
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
              <CurrencyIcon type="primary" className={styles.currency} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

OrderInfo.propTypes = {
  modal: PropTypes.bool.isRequired,
}.isRequired;

export default OrderInfo;
