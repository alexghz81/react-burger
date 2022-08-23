import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./orders-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { sortIngredients } from "../../utils/utils";

const OrdersItem = ({ order, status }) => {
  const { number, ingredients, price, name } = order;
  const { allIngredients } = useSelector((state) => state.ingredients);
  const { path } = useRouteMatch();
  const history = useHistory();
  const remainingIngredients = ingredients.length - 5;
  const [ingredientsArray, setIngredientsArray] = useState([]);

  useEffect(() => {
    if (ingredients.length && allIngredients.length) {
      const orderIngredients = [];
      ingredients.forEach((item) => {
        const ingredient = allIngredients.filter((elem) => elem._id === item);
        if (ingredient) {
          if (
            ingredient[0].type === "bun" &&
            ingredients.find((el) => el._id === ingredient[0]._id)
          ) {
            return null;
          }
          orderIngredients.push(ingredient[0]);
        }
      });
      setIngredientsArray(sortIngredients(orderIngredients));
    }
  }, [allIngredients, ingredients]);

  console.log("ingredients Array ", ingredientsArray);

  const handleClick = () => {
    history.push(path);
    history.replace(`${path}/${order.number}`);
  };

  return (
    ingredientsArray.length > 0 && (
      <div className={styles.wrapper} onClick={handleClick}>
        <div className={`${styles.header} mb-6`}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">
            Сегодня, 00:00 i-GMT+3
          </span>
        </div>
        <div className={`${styles.order_name} text text_type_main-medium mb-6`}>
          {name}
        </div>
        <div className={`${styles.ingredients} mt-6`}>
          <div className={styles.images}>
            {ingredientsArray.length < 6 &&
              ingredientsArray.map((ingredient, index) => (
                <div
                  className={styles.element}
                  style={{ zIndex: 6 - index, left: `-${16 * index}px` }}
                  key={Math.random() * (500 - 10) + 10}
                >
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={styles.little_image}
                  />
                </div>
              ))}
            {ingredients.length > 5 &&
              ingredients.slice(0, 5).map((ingredient, index) => (
                <div
                  className={styles.element}
                  style={{ zIndex: 6 - index, left: `-${25 * index}px` }}
                  key={Math.random() * (200 - 10) + 10}
                >
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
              ))}
            {/*{ingredients.length > 5 && (*/}
            {/*  <div*/}
            {/*    className={styles.element}*/}
            {/*    style={{ zIndex: 1, left: `-125px` }}*/}
            {/*    key={Math.random() * (200 - 10) + 10}*/}
            {/*  >*/}
            {/*    <img*/}
            {/*      className={styles.bigOrder__image}*/}
            {/*      src={bigOrderImage}*/}
            {/*      alt={`+${remainingOrder} дополнительны${*/}
            {/*        remainingOrder === 1 ? "й" : "х"*/}
            {/*      } ингредиент${*/}
            {/*        remainingOrder === 1 ? "" : remainingOrder > 4 ? "ов" : "а"*/}
            {/*      } в заказе`}*/}
            {/*    />*/}
            {/*<span className={styles.bigOrder}>{`+${remainingIngredients}`}</span>*/}
          </div>
          <span
            className={`${styles.total__cost} text text_type_digits-default`}
          >
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    )
  );
};

export default OrdersItem;
