import React, { FC } from "react";
import styles from "./ingredients-title.module.css";

interface IIngredientsTitle {
  title: string;
}

const IngredientsTitle: FC<IIngredientsTitle> = ({ title }): JSX.Element => {
  return (
    <h2 className={`${styles.ingredients_title} text text_type_main-medium`}>
      {title}
    </h2>
  );
};

export default IngredientsTitle;
