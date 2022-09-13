import React, { FC } from "react";
import styles from "./ingredients-list.module.css";
import IngredientsItem from "../ingredients-item/ingredients-item";
import { IIngredient } from "../../services/types/data";

interface IIngredientsListProps {
  data: IIngredient[];
  numberOfIngredient: Function;
}

const IngredientsList: FC<IIngredientsListProps> = ({
  data,
  numberOfIngredient,
}): JSX.Element => {
  return (
    <>
      <div className={`${styles.ingredients_list} mt-6 pb-10 pl-4`}>
        {data.map((item) => (
          <IngredientsItem
            key={item._id}
            data={item}
            numberOfIngredient={numberOfIngredient}
          />
        ))}
      </div>
    </>
  );
};

export default IngredientsList;
