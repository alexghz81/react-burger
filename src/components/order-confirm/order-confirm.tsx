import React, { FC } from "react";
import styles from "./order-confirm.module.css";
import done from "../../assets/images/done.png";
import { useAppSelector } from "../../services/hook";

const OrderConfirm: FC = (): JSX.Element => {
  const { number, hasError, errorMessage } = useAppSelector(
    (state) => state.order
  );
  return hasError ? (
    <div
      className={`${styles.error_message} text_type_main-default text_color_inactive`}
    >
      {errorMessage}
    </div>
  ) : (
    <div className={`${styles.order_details} text mt-4`}>
      <h3 className={`${styles.order_number} text_type_digits-large`}>
        {number}
      </h3>
      <p className={`${styles.order_details_text} text_type_main-medium pt-8`}>
        идентификатор заказа
      </p>
      <img
        src={done}
        alt="DONE Image"
        className={`${styles.order_details_done} mt-15 mb-15`}
      />
      <p className={`${styles.order_details_text} text_type_main-default pb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.order_details_text} text text_type_main-default text_color_inactive pb-15`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderConfirm;
