import React, { useEffect } from "react";
import styles from "./profile-orders.module.css";
import LeftMenu from "../../components/left-menu/left-menu";
import { useDispatch, useSelector } from "react-redux";
import OrdersList from "../../components/orders-list/orders-list";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/reducers/ws-slice";
import { ORDERS_URL, PROFILE_ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/utils";

const ProfileOrders = () => {
  const { wsConnected, wsMessages } = useSelector((state) => state.ws);
  const { orders = [] } = wsMessages;
  const dispatch = useDispatch();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_wrapper}>
        <div className={styles.left_menu_wrapper}>
          <LeftMenu />
        </div>
        <div className={styles.orders_wrapper}>
          {orders.length !== 0 ? (
            <OrdersList orders={orders} className={styles.profile_orders} />
          ) : (
            <p className="text text_type_main-medium">У Вас нет заказов</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrders;
