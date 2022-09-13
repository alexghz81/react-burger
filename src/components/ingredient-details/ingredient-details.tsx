import React, { FC, useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hook";

interface ILocationState {
  background: { pathname: string } | null;
  from: { pathname: string };
}

interface IIngredientDetailsProps {
  modal: boolean;
}

export const IngredientDetails: FC<IIngredientDetailsProps> = ({
  modal = false,
}): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data } = useAppSelector((state) => state?.ingredients.allIngredients);
  const ingredient = data?.find((ingredient) => ingredient._id === id);
  const location = useLocation<ILocationState>();

  useEffect(() => {
    location.state.background = null;
  }, []);

  return (
    <div className={`${styles.ingredient_details}`}>
      <h2
        className={
          !modal
            ? `${styles.ingredient_page_title} text text_type_main-large pb-5`
            : `${styles.ingredient_modal_title} text text_type_main-large pb-5`
        }
      >
        Детали ингредиента
      </h2>
      <img src={ingredient?.image_large} alt="" />
      <p className={` text text_type_main-medium mt-4 mb-8`}>
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
};
