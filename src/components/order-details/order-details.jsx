import React from "react";
import styles from "./order-details.module.css";
import done from "../../assets/images/done.png";

export default function OrderDetails() {
  return (
    <div className={`${styles.order_details} text mt-4`}>
      <h3 className={`${styles.order_number} text_type_digits-large`}>
        034536
      </h3>
      <p className={`text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img
        src={done}
        alt="DONE"
        className={`${styles.order_details_done} mt-15 mb-15`}
      />
      <p className={`${styles.order_details_text} text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className="text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}