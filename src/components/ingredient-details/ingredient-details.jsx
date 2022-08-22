import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { showModal } from "../../services/reducers/modal-slice";

export default function IngredientDetails() {
  const { id } = useParams();
  const { allIngredients } = useSelector((state) => state?.ingredients);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const ingredient = allIngredients?.find(
    (ingredient) => ingredient._id === id
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(showModal({ title: "Детали ингредиента" }));
  }, []);

  return (
    <div className={`${styles.ingredient_details}`}>
      {!location.state?.background && (
        <h2
          className={`${styles.ingredient_page_title} text text_type_main-large pb-5`}
        >
          {modal?.title}
        </h2>
      )}
      <img src={ingredient?.image_large} alt="" />
      <p
        className={`${styles.ingredient_name} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredient?.name}
      </p>
      <ul
        className={`${styles.ingredient_description} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.ingredient_description_item}>
          Калории,ккал{" "}
          <span className={`text_type_digits-default mt-2`}>
            {ingredient?.calories}
          </span>
        </li>
        <li className={styles.ingredient_description_item}>
          Белки, г{" "}
          <span className={`text_type_digits-default mt-2`}>
            {ingredient?.proteins}
          </span>
        </li>
        <li className={styles.ingredient_description_item}>
          Жиры, г{" "}
          <span className={`text_type_digits-default mt-2`}>
            {ingredient?.fat}
          </span>
        </li>
        <li className={styles.ingredient_description_item}>
          Углеводы, г{" "}
          <span className={`text_type_digits-default mt-2`}>
            {ingredient?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}
