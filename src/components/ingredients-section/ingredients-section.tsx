import React, { FC } from "react";
import IngredientsTitle from "../ingredients-title/ingredients-title";
import IngredientsList from "../ingredients-list/ingredients-list";
import styles from "./ingredients-section.module.css";
import { IIngredient } from "../../services/types/data";

interface IIngredientsSectionProps {
  title: string;
  data: IIngredient[];
  numberOfIngredient: Function;
}

const IngredientsSection: FC<IIngredientsSectionProps> = ({
  title,
  data,
  numberOfIngredient,
}): JSX.Element => {
  return (
    <div className={`${styles.ingredients_section}`}>
      <IngredientsTitle title={title} />
      <IngredientsList data={data} numberOfIngredient={numberOfIngredient} />
    </div>
  );
};

export default IngredientsSection;
