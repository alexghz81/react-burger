import React, { useEffect } from "react";
import styles from "./profile-orders.module.css";
import LeftMenu from "../../components/left-menu/left-menu";
import OrdersList from "../../components/orders-list/orders-list";
import {
  wsAuthConnectionClosed,
  wsAuthConnectionStart,
} from "../../services/reducers/ws-slice";
import { PROFILE_ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../services/hook";

const ProfileOrders = () => {
  const { wsMessages } = useAppSelector((state) => state.ws);
  const { orders } = wsMessages;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      wsAuthConnectionStart(
        `${PROFILE_ORDERS_URL}?token=${getCookie("accessToken")}`
      )
    );
    return () => {
      dispatch(wsAuthConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_wrapper}>
        <div className={styles.left_menu_wrapper}>
          <LeftMenu />
        </div>
        <div className={styles.orders_wrapper}>
          {orders && orders.length !== 0 ? (
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
