import React, { FC } from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../services/hook";

const Content: FC = (): JSX.Element => {
  const { data } = useAppSelector((state) => state.ingredients.allIngredients);

  return (
    data && (
      <section className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    )
  );
};

export default Content;
