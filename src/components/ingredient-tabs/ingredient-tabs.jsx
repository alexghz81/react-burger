import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientTabs = ({ active }) => {
  const [currentTab, setCurrentTab] = React.useState(active);
  return (
    <div className={styles.tabs}>
      <Tab value={"bun"} active={currentTab === "bun"} onClick={setCurrentTab}>
        Булки
      </Tab>
      <Tab
        value={"sauce"}
        active={currentTab === "sauce"}
        onClick={setCurrentTab}
      >
        Соусы
      </Tab>
      <Tab
        value={"main"}
        active={currentTab === "main"}
        onClick={setCurrentTab}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientTabs;
