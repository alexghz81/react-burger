import React, { useEffect } from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientTabs = ({ active, scroll }) => {
  const [currentTab, setCurrentTab] = React.useState(active);

  useEffect(() => {
    scroll(currentTab);
  }, [currentTab]);

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

IngredientTabs.propTypes = {
  active: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  scroll: PropTypes.func.isRequired,
}.isRequired;

export default IngredientTabs;
