import React, { useContext, useEffect } from "react";
import styles from "./order-details.module.css";
import done from "../../assets/images/done.png";
import { BurgerDemoDataContext } from "../../context/burger-demo-data-context";
import { getOrderNumber } from "../../utils/get-data-from-api";

export default function OrderDetails() {
  const { demoData } = useContext(BurgerDemoDataContext);
  console.log(demoData);

  useEffect((demoData) => {
    console.log(demoData);
    try {
      getOrderNumber(demoData);
    } catch (e) {
      return console.log(e);
    }
  }, []);

  return (
    demoData && (
      <div className={`${styles.order_details} text mt-4`}>
        <h3 className={`${styles.order_number} text_type_digits-large`}>
          034536
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
