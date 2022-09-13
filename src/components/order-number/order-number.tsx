import React, { FC, useEffect, useState } from "react";
import styles from "./order-number.module.css";

interface IOrderNumberProps {
  number: number[];
}

const OrderNumber: FC<IOrderNumberProps> = ({ number }) => {
  const [ordersNumbers, setOrdersNumbers] = useState<number[]>([]);

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
