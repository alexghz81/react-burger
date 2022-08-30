import React from "react";
import styles from "./order-confirm.module.css";
import done from "../../assets/images/done.png";
import { useSelector } from "react-redux";

export default function OrderConfirm() {
  const { number, hasError, errorMessage } = useSelector(
    (state) => state.order
  );
  return hasError ? (
    <div
      className={`${styles.error_message} text_type_main-default text_color_inactive`}
    >
      {errorMessage}
    </div>
  ) : (
    number && (
      <div className={`${styles.order_details} text mt-4`}>
        <h3 className={`${styles.order_number} text_type_digits-large`}>
          {number}
        </h3>
        <p
          className={`${styles.order_details_text} text_type_main-medium pt-8`}
        >
          идентификатор заказа
        </p>
        <img
          src={done}
          alt="DONE Image"
          className={`${styles.order_details_done} mt-15 mb-15`}
        />
        <p
          className={`${styles.order_details_text} text_type_main-default pb-2`}
        >
          Ваш заказ начали готовить
        </p>
        <p
          className={`${styles.order_details_text} text text_type_main-default text_color_inactive pb-15`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    )
  );
}
