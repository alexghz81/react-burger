import React from "react";
import styles from "../../pages/feed/feed.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { v4 as uuid } from "uuid";
import OrdersItem from "../orders-item/orders-item";

const OrdersList = ({ orders }) => {
  const match = useRouteMatch();
  const location = useLocation();
  return (
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
  );
};

export default OrdersList;
