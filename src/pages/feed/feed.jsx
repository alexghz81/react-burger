import React, { useEffect } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/reducers/ws-slice";
import { ORDERS_URL } from "../../utils/constants";
import OrdersItem from "../../components/orders-item/orders-item";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Feed = () => {
  const { wsConnected, wsMessages } = useSelector((state) => state.ws);
  const dispatch = useDispatch();
  const { orders = [], total, totalToday } = wsMessages;
  const match = useRouteMatch();
  const location = useLocation();

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
        <div className={styles.orders_feed}>
          <div>
            <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
          </div>
          <div className={`${styles.orders_wrapper} pr-2`}>
            {orders.map((order) => (
              <Link
                className={styles.link}
                key={uuid()}
                to={{
                  pathname: `${match.url}/${order._id}`,
                  state: { background: location, data: order },
                }}
              >
                <OrdersItem order={order} />
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.orders_status}>STATUS</div>
      </section>
    )
  );
};

export default Feed;
