import React from "react";
import styles from "./order-ingredient-image.module.css";

const OrderIngredientImage = ({
  image_mobile,
  overlay,
  number,
  name,
  index = 0,
}) => {
  return (
    <>
      {overlay ? (
        <div className={styles.pic_container}>
          <figure
            className={styles.pic_border}
            style={{ zIndex: 6 - index, left: `-${16 * index}px` }}
          >
            <img
              src={image_mobile}
              alt={name}
              className={`${styles.image} ${styles.image_overlay}`}
            />
            <span className={`${styles.number} text text_type_digits-default`}>
              +{number}
            </span>
          </figure>
        </div>
      ) : (
        <div className={styles.pic_container}>
          <figure
            className={styles.pic_border}
            style={{ zIndex: 6 - index, left: `-${16 * index}px` }}
          >
            <img src={image_mobile} alt={name} className={styles.image} />
          </figure>
        </div>
      )}
    </>
  );
};

export default OrderIngredientImage;
