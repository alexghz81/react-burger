import React, { FC } from "react";
import styles from "../../pages/feed/feed.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import OrdersItem from "../orders-item/orders-item";
import { IOrder } from "../../services/types/data";

interface IOrdersListProps {
  orders: IOrder[];
  className?: string;
}

interface ILocationState {
  background: string;
  data: IOrder;
}

const OrdersList: FC<IOrdersListProps> = ({ orders }) => {
  const match = useRouteMatch();
  const location = useLocation<ILocationState>();
  return (
    <div className={styles.orders_feed}>
      {!location.pathname.includes("profile") && (
        <div>
          <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
        </div>
      )}
      <div className={`${styles.orders_wrapper} pr-2`}>
        {orders.map((order) => (
          <Link
            className={styles.link}
            key={order._id}
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
