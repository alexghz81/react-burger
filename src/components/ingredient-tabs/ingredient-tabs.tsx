import React, { FC, useEffect } from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { setActiveTab } from "../../services/reducers/tab-slice";
import { useAppDispatch, useAppSelector } from "../../services/hook";

interface IIngredientTabsProps {
  scroll: Function;
}

const IngredientTabs: FC<IIngredientTabsProps> = ({ scroll }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.tab);

  useEffect(() => {
    scroll(activeTab);
  }, [activeTab]);

  return (
    <div className={styles.tabs}>
      <Tab
        value={"buns"}
        active={activeTab === "buns"}
        onClick={() => dispatch(setActiveTab("buns"))}
      >
        Булки
      </Tab>
      <Tab
        value={"sauces"}
        active={activeTab === "sauces"}
        onClick={() => dispatch(setActiveTab("sauces"))}
      >
        Соусы
      </Tab>
      <Tab
        value={"mains"}
        active={activeTab === "mains"}
        onClick={() => dispatch(setActiveTab("mains"))}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientTabs;
