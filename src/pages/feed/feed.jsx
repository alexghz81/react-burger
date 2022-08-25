import React, { useEffect } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/reducers/ws-slice";
import { ORDERS_URL } from "../../utils/constants";
import OrdersList from "../../components/orders-list/orders-list";

const Feed = () => {
  const { wsConnected, wsMessages } = useSelector((state) => state.ws);
  const dispatch = useDispatch();
  const { orders = [], total, totalToday } = wsMessages;

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart(ORDERS_URL));
    }
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(wsGetMessage());
  // }, [wsMessages]);

  return (
    orders.length > 0 && (
      <section className={styles.wrapper}>
        <OrdersList orders={orders} />
        <div className={styles.orders_status}>
          <div className={styles.status_wrapper}>
            <div className={styles.completed_orders}>
              <div
                className={`${styles.order_title} text text_type_main-medium`}
              >
                Готовы:
              </div>
              <div
                className={`${styles.completed_orders_numbers} text text_type_digits-default mb-2`}
              >
                12345
              </div>
            </div>
            <div className={styles.in_progress_orders}>
              <div
                className={`${styles.order_title} text text_type_main-medium`}
              >
                В работе:
              </div>
              <div
                className={`${styles.orders_numbers} text text_type_digits-default mb-2`}
              >
                5678
              </div>
            </div>
          </div>
          <div className={`${styles.all_time_orders} pt-15 pb-15`}>
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <h3
              className={`${styles.all_time_orders_number} text text_type_digits-large`}
            >
              {total && total.toString().substring(0, 2)}&nbsp;
              {total && total.toString().substring(2)}
            </h3>
          </div>
          <div className={styles.today_orders}>
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <h3
              className={`${styles.today_orders_number} text text_type_digits-large`}
            >
              {totalToday}
            </h3>
          </div>
        </div>
      </section>
    )
  );
};

export default Feed;
