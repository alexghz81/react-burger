import React, { useEffect } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/reducers/ws-slice";
import { ORDERS_URL } from "../../utils/constants";
import OrdersItem from "../../components/orders-item/orders-item";

const Feed = () => {
  const { wsConnected, wsMessages } = useSelector((state) => state.ws);
  const dispatch = useDispatch();
  const { orders = [], total, totalToday } = wsMessages;

  console.log(orders);

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart(ORDERS_URL));
    }
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.orders_feed}>
        <div>
          <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
        </div>
        <div className={`${styles.orders_wrapper} pr-2`}>
          {orders.map((order) => (
            <OrdersItem order={order} />
          ))}
        </div>
      </div>
      <div className={styles.orders_status}>STATUS</div>
    </section>
  );
};

export default Feed;
