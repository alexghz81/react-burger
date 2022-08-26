import React, { useEffect, useState } from "react";
import styles from "./order-number.module.css";

const OrderNumber = ({ number }) => {
  const [ordersNumbers, setOrdersNumbers] = useState();

  useEffect(() => {
    setOrdersNumbers(number);
  }, [number]);

  return (
    <div className={styles.orders_wrapper}>
      {ordersNumbers &&
        ordersNumbers.map((item, index) => (
          <span className={styles.number} key={index}>
            {item}
          </span>
        ))}
    </div>
  );
};

export default OrderNumber;
